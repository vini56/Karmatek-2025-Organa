from pydantic import BaseModel
from typing import Optional, Dict
from datetime import datetime

class OrganBase(BaseModel):
    organ_type: str
    recovery_date: datetime
    expected_preservation_time: float  # in hours
    donor_age: int
    donor_blood_type: str
    donor_gender: str
    cause_of_death: Optional[str] = None
    organ_size: Optional[str] = None
    organ_condition_rating: str  # Excellent, Good, Fair, Poor
    # hla_test: Optional[Dict[str, str]] = None  # Dictionary to store HLA test values
    hla_a: Optional[str] = None
    hla_b: Optional[str] = None
    hla_c: Optional[str] = None
    hla_drb1: Optional[str] = None
    hla_dqb1: Optional[str] = None
    donor_hospital: str
    current_location: Optional[str] = None
    transport_arrangements: Optional[str] = None
    medical_history: Optional[str] = None
    viral_testing_status: str  # Negative, Positive, Pending
    organ_biopsy_results: Optional[str] = None
    # location: str
    status: str = "available"

class OrganCreate(OrganBase):
    hospital_id: int

class OrganOut(OrganBase):
    id: int
    created_at: datetime
    # email: str = None # Add email field
    # staff_id: int =None # Add staff_id field
    
    class Config:
        from_attributes = True

class OrganUpdate(BaseModel):
    status: Optional[str] = None
    location: Optional[str] = None
    transport_arrangements: Optional[str] = None
