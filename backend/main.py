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

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
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