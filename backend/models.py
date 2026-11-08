from sqlalchemy import Column, Integer, String, Float, Date, ForeignKey, Text
from sqlalchemy.orm import relationship
from backend.database import Base

class Farmer(Base):
    __tablename__ = "farmers"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    phone = Column(String(15), unique=True, nullable=False)
    village = Column(String(100))
    district = Column(String(100))
    state = Column(String(100))
    land_size_acres = Column(Float)

    policies = relationship("InsurancePolicy", back_populates="farmer")
    claims = relationship("Claim", back_populates="farmer")


class InsurancePolicy(Base):
    __tablename__ = "policies"

    id = Column(Integer, primary_key=True, index=True)
    policy_number = Column(String(50), unique=True, nullable=False)
    farmer_id = Column(Integer, ForeignKey("farmers.id"))
    crop = Column(String(100))
    season = Column(String(50))
    insured_area = Column(Float)
    coverage_amount = Column(Float)

    farmer = relationship("Farmer", back_populates="policies")


class Claim(Base):
    __tablename__ = "claims"

    id = Column(Integer, primary_key=True, index=True)
    claim_number = Column(String(50), unique=True, nullable=False)
    farmer_id = Column(Integer, ForeignKey("farmers.id"))
    crop = Column(String(100))
    disaster_type = Column(String(100))
    incident_date = Column(Date)
    estimated_loss = Column(Float)
    status = Column(String(30), default="submitted")
    officer_remarks = Column(Text)

    farmer = relationship("Farmer", back_populates="claims")
    assessment = relationship("SatelliteAssessment", back_populates="claim", uselist=False)


class SatelliteAssessment(Base):
    __tablename__ = "satellite_assessments"

    id = Column(Integer, primary_key=True, index=True)
    claim_id = Column(Integer, ForeignKey("claims.id"), unique=True)
    ndvi_before = Column(Float)
    ndvi_after = Column(Float)
    damage_percentage = Column(Float)
    damage_class = Column(String(30))
    model_confidence = Column(Float)

    claim = relationship("Claim", back_populates="assessment")
