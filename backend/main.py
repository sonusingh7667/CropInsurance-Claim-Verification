import os
from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
import uuid

from backend.database import engine, Base, get_db
from backend import models, schemas
from backend.satellite import calculate_damage

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="CropSure API",
    description="Crop Insurance Claim Verification System",
    version="1.0.0"
)

CORS_ORIGINS = os.getenv("CORS_ORIGINS", "http://localhost:5173")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[origin.strip() for origin in CORS_ORIGINS.split(",") if origin.strip()],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message": "Welcome to CropSure API", "status": "running"}

@app.get("/health")
def health():
    return {"status": "healthy", "application": "CropSure"}

# FARMER APIs

@app.post("/farmers", response_model=schemas.FarmerResponse)
def create_farmer(farmer: schemas.FarmerCreate, db: Session = Depends(get_db)):
    if db.query(models.Farmer).filter(models.Farmer.phone == farmer.phone).first():
        raise HTTPException(status_code=400, detail="Phone already registered")

    new_farmer = models.Farmer(**farmer.model_dump())
    db.add(new_farmer)
    db.commit()
    db.refresh(new_farmer)
    return new_farmer

@app.get("/farmers", response_model=list[schemas.FarmerResponse])
def get_farmers(db: Session = Depends(get_db)):
    return db.query(models.Farmer).all()

# POLICY APIs

@app.post("/policies", response_model=schemas.PolicyResponse)
def create_policy(policy: schemas.PolicyCreate, db: Session = Depends(get_db)):
    if not db.query(models.Farmer).filter(models.Farmer.id == policy.farmer_id).first():
        raise HTTPException(status_code=404, detail="Farmer not found")

    if db.query(models.InsurancePolicy).filter(
        models.InsurancePolicy.policy_number == policy.policy_number
    ).first():
        raise HTTPException(status_code=400, detail="Policy number already exists")

    new_policy = models.InsurancePolicy(**policy.model_dump())
    db.add(new_policy)
    db.commit()
    db.refresh(new_policy)
    return new_policy

@app.get("/policies", response_model=list[schemas.PolicyResponse])
def get_policies(db: Session = Depends(get_db)):
    return db.query(models.InsurancePolicy).all()

# CLAIM APIs

@app.post("/claims", response_model=schemas.ClaimResponse)
def create_claim(claim: schemas.ClaimCreate, db: Session = Depends(get_db)):
    if not db.query(models.Farmer).filter(models.Farmer.id == claim.farmer_id).first():
        raise HTTPException(status_code=404, detail="Farmer not found")

    policy = db.query(models.InsurancePolicy).filter(
        models.InsurancePolicy.farmer_id == claim.farmer_id
    ).first()

    if not policy:
        raise HTTPException(status_code=400, detail="No registered insurance policy")

    new_claim = models.Claim(
        claim_number="CLM-" + uuid.uuid4().hex[:10].upper(),
        **claim.model_dump(),
        status="submitted"
    )

    db.add(new_claim)
    db.commit()
    db.refresh(new_claim)
    return new_claim

@app.get("/claims", response_model=list[schemas.ClaimResponse])
def get_claims(db: Session = Depends(get_db)):
    return db.query(models.Claim).all()

@app.get("/claims/{claim_id}", response_model=schemas.ClaimResponse)
def get_claim(claim_id: int, db: Session = Depends(get_db)):
    claim = db.query(models.Claim).filter(models.Claim.id == claim_id).first()
    if not claim:
        raise HTTPException(status_code=404, detail="Claim not found")
    return claim

@app.patch("/claims/{claim_id}/status", response_model=schemas.ClaimResponse)
def update_claim_status(
    claim_id: int,
    update: schemas.ClaimStatusUpdate,
    db: Session = Depends(get_db)
):
    allowed = ["submitted", "under_review", "approved", "rejected"]
    if update.status not in allowed:
        raise HTTPException(status_code=400, detail="Invalid claim status")

    claim = db.query(models.Claim).filter(models.Claim.id == claim_id).first()
    if not claim:
        raise HTTPException(status_code=404, detail="Claim not found")

    claim.status = update.status
    claim.officer_remarks = update.officer_remarks
    db.commit()
    db.refresh(claim)
    return claim

# SATELLITE ASSESSMENT APIs

@app.post(
    "/satellite-assessments",
    response_model=schemas.SatelliteAssessmentResponse
)
def create_satellite_assessment(
    assessment: schemas.SatelliteAssessmentCreate,
    db: Session = Depends(get_db)
):
    claim = db.query(models.Claim).filter(
        models.Claim.id == assessment.claim_id
    ).first()

    if not claim:
        raise HTTPException(status_code=404, detail="Claim not found")

    existing = db.query(models.SatelliteAssessment).filter(
        models.SatelliteAssessment.claim_id == assessment.claim_id
    ).first()

    if existing:
        raise HTTPException(status_code=400, detail="Assessment already exists")

    try:
        result = calculate_damage(
            assessment.ndvi_before,
            assessment.ndvi_after
        )
    except ValueError as error:
        raise HTTPException(status_code=400, detail=str(error))

    new_assessment = models.SatelliteAssessment(
        claim_id=assessment.claim_id,
        ndvi_before=assessment.ndvi_before,
        ndvi_after=assessment.ndvi_after,
        damage_percentage=result["damage_percentage"],
        damage_class=result["damage_class"],
        model_confidence=0.0
    )

    db.add(new_assessment)
    db.commit()
    db.refresh(new_assessment)

    return new_assessment

@app.get(
    "/satellite-assessments/{claim_id}",
    response_model=schemas.SatelliteAssessmentResponse
)
def get_satellite_assessment(claim_id: int, db: Session = Depends(get_db)):
    assessment = db.query(models.SatelliteAssessment).filter(
        models.SatelliteAssessment.claim_id == claim_id
    ).first()

    if not assessment:
        raise HTTPException(status_code=404, detail="Assessment not found")

    return assessment

# DYNAMIC GOOGLE EARTH ENGINE SATELLITE ASSESSMENT
from pydantic import BaseModel, Field
from pathlib import Path
from fastapi.staticfiles import StaticFiles
import ee
import google.auth
import requests
import os

class GEEAssessmentRequest(BaseModel):
    latitude: float = Field(ge=-90, le=90)
    longitude: float = Field(ge=-180, le=180)
    radius_m: int = Field(default=5000, ge=100, le=50000)
    before_start: str = "2026-06-01"
    before_end: str = "2026-10-01"
    after_start: str = "2026-10-16"
    after_end: str = "2026-11-08"

SATELLITE_DIR = Path(__file__).resolve().parent.parent / "public" / "satellite"
SATELLITE_DIR.mkdir(parents=True, exist_ok=True)

app.mount(
    "/satellite-images",
    StaticFiles(directory=str(SATELLITE_DIR)),
    name="satellite-images"
)

@app.post("/satellite-assessments/gee")
def gee_satellite_assessment(request: GEEAssessmentRequest):
    try:
        project_id = "true-server-488608-f0"
        credentials, _ = google.auth.default(
            quota_project_id=project_id
        )
        credentials.refresh(
            google.auth.transport.requests.Request()
        )

        ee.Initialize(credentials=credentials, project=project_id)

        aoi = ee.Geometry.Point([
            request.longitude, request.latitude
        ]).buffer(request.radius_m)

        collection = (
            ee.ImageCollection("COPERNICUS/S2_SR_HARMONIZED")
            .filterBounds(aoi)
            .filter(ee.Filter.lt("CLOUDY_PIXEL_PERCENTAGE", 30))
        )

        def best_image(start, end):
            images = collection.filterDate(start, end).sort(
                "CLOUDY_PIXEL_PERCENTAGE"
            )
            if images.size().getInfo() == 0:
                raise HTTPException(
                    status_code=404,
                    detail=f"No suitable Sentinel-2 image found for {start} to {end}"
                )
            return ee.Image(images.first())

        before = best_image(request.before_start, request.before_end)
        after = best_image(request.after_start, request.after_end)

        ndvi_before = before.normalizedDifference(
            ["B8", "B4"]
        ).rename("NDVI")

        ndvi_after = after.normalizedDifference(
            ["B8", "B4"]
        ).rename("NDVI")

        def mean_ndvi(image):
            return image.reduceRegion(
                reducer=ee.Reducer.mean(),
                geometry=aoi,
                scale=10,
                maxPixels=1e9
            ).get("NDVI").getInfo()

        before_value = mean_ndvi(ndvi_before)
        after_value = mean_ndvi(ndvi_after)

        if before_value is None or after_value is None:
            raise HTTPException(
                status_code=422,
                detail="NDVI could not be calculated for this location."
            )

        change = (
            ((before_value - after_value) / before_value) * 100
            if before_value > 0 else None
        )

        def image_date(image):
            return ee.Date(
                image.get("system:time_start")
            ).format("YYYY-MM-dd").getInfo()

        def save_thumbnail(image, filename, ndvi=False):
            if ndvi:
                visual = image.visualize(
                    min=-0.2,
                    max=0.8,
                    palette=["brown", "yellow", "lightgreen", "darkgreen"]
                )
            else:
                visual = image.visualize(
                    bands=["B4", "B3", "B2"],
                    min=0,
                    max=3000,
                    gamma=1.3
                )

            url = visual.getThumbURL({
                "region": aoi,
                "dimensions": 700,
                "format": "png"
            })

            response = requests.get(
                url,
                headers={
                    "Authorization": f"Bearer {credentials.token}",
                    "x-goog-user-project": project_id
                },
                timeout=60
            )
            response.raise_for_status()

            output = SATELLITE_DIR / filename
            output.write_bytes(response.content)
            return f"/satellite-images/{filename}"

        import uuid
        image_id = uuid.uuid4().hex[:12]

        return {
            "location": {
                "latitude": request.latitude,
                "longitude": request.longitude,
                "radius_m": request.radius_m
            },
            "source": "Sentinel-2 SR Harmonized",
            "before": {
                "date": image_date(before),
                "cloud_cover": before.get(
                    "CLOUDY_PIXEL_PERCENTAGE"
                ).getInfo(),
                "mean_ndvi": round(before_value, 4),
                "rgb_image": save_thumbnail(
                    before, f"{image_id}-before-rgb.png"
                ),
                "ndvi_image": save_thumbnail(
                    ndvi_before, f"{image_id}-before-ndvi.png", True
                )
            },
            "after": {
                "date": image_date(after),
                "cloud_cover": after.get(
                    "CLOUDY_PIXEL_PERCENTAGE"
                ).getInfo(),
                "mean_ndvi": round(after_value, 4),
                "rgb_image": save_thumbnail(
                    after, f"{image_id}-after-rgb.png"
                ),
                "ndvi_image": save_thumbnail(
                    ndvi_after, f"{image_id}-after-ndvi.png", True
                )
            },
            "relative_ndvi_decline_percent": (
                round(change, 2) if change is not None else None
            ),
            "interpretation": (
                "Vegetation-index change only; not proof of crop damage."
            )
        }

    except HTTPException:
        raise
    except Exception as error:
        raise HTTPException(
            status_code=500,
            detail=f"Earth Engine assessment failed: {str(error)[:500]}"
        )
