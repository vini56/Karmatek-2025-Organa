from pydantic import BaseModel, EmailStr
from typing import Optional, Dict
from datetime import datetime

class PatientBase(BaseModel):
    name: str
    blood_type: str
    organ_needed: str
    priority_status: float  # 1-10 with step 0.1
    location: str
    zip_code: int
    medical_history: Optional[str] = None
    date_of_birth: Optional[datetime] = None
    gender: str
    weight_in_kg: Optional[float] = None
    height_in_cm: Optional[float] = None
    email: EmailStr
    phone_number: str
    primary_diagnosis: str
    hla_test: Optional[Dict[str, str]] = None  # Dictionary to store HLA test values
    pra_score: Optional[float] = None
    previous_transplant: int = 0
    comorbidities: Optional[str] = None
    current_medications: Optional[str] = None
    treating_in_hospital: Optional[str] = None
    insurance_details: Optional[str] = None

class PatientCreate(PatientBase):
    hospital_id: int

class PatientOut(PatientBase):
    id: int
    status: str
    created_at: datetime
    
    class Config:
        from_attributes = True

class PatientUpdate(BaseModel):
    priority_status: Optional[float] = None
    status: Optional[str] = None
    medical_history: Optional[str] = None
