from pydantic import BaseModel
from typing import Optional
from datetime import date

class FarmerCreate(BaseModel):
    name: str
    phone: str
    village: Optional[str] = None
    district: Optional[str] = None
    state: Optional[str] = None
    land_size_acres: Optional[float] = None

class FarmerResponse(FarmerCreate):
    id: int
    class Config:
        from_attributes = True

class PolicyCreate(BaseModel):
    policy_number: str
    farmer_id: int
    crop: str
    season: str
    insured_area: float
    coverage_amount: float

class PolicyResponse(PolicyCreate):
    id: int
    class Config:
        from_attributes = True

class ClaimCreate(BaseModel):
    farmer_id: int
    crop: str
    disaster_type: str
    incident_date: date
    estimated_loss: float

class ClaimResponse(ClaimCreate):
    id: int
    claim_number: str
    status: str
    officer_remarks: Optional[str] = None
    class Config:
        from_attributes = True

class ClaimStatusUpdate(BaseModel):
    status: str
    officer_remarks: Optional[str] = None

# Satellite assessment schemas
class SatelliteAssessmentCreate(BaseModel):
    claim_id: int
    ndvi_before: float
    ndvi_after: float

class SatelliteAssessmentResponse(BaseModel):
    id: int
    claim_id: int
    ndvi_before: float
    ndvi_after: float
    damage_percentage: float
    damage_class: str
    model_confidence: float

    class Config:
        from_attributes = True