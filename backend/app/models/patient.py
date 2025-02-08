from sqlalchemy.sql import func
from ..database import Base
from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Float
from sqlalchemy.dialects.postgresql import JSONB


# class Patient(Base):
#     __tablename__ = "patients"

#     id = Column(Integer, primary_key=True, index=True)
#     name = Column(String)
#     blood_type = Column(String)
#     organ_needed = Column(String)
#     priority_status = Column(Integer)  # 1-10
#     hospital_id = Column(Integer, ForeignKey("users.id"))
#     status = Column(String)  # waiting, matched, transplanted
#     location = Column(String)
#     medical_history = Column(String)
#     created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    

class Patient(Base):
    __tablename__ = "patients"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    hospital_id = Column(Integer, ForeignKey("hospitals.id"))  # Reference hospital table
    blood_type = Column(String, nullable=False)
    organ_needed = Column(String, nullable=False)
    priority_status = Column(Float, nullable=False)  # 1-10 with step 0.1
    location = Column(String, nullable=False)
    zip_code = Column(Integer, nullable=False)
    medical_history = Column(String)
    date_of_birth = Column(DateTime, nullable=True)
    gender = Column(String, nullable=False)
    weight_in_kg = Column(Float, nullable=True)
    height_in_cm = Column(Float, nullable=True)
    email = Column(String, nullable=False, unique=True)
    phone_number = Column(String, nullable=False)
    primary_diagnosis = Column(String, nullable=False)
    hla_test = Column(JSONB, nullable=True)  # Store as JSON for flexibility
    pra_score = Column(Float, nullable=True)
    previous_transplant = Column(Integer, nullable=False, default=0)
    comorbidities = Column(String, nullable=True)
    current_medications = Column(String, nullable=True)
    treating_in_hospital = Column(String, nullable=True)
    insurance_details = Column(String, nullable=True)
    # hospital_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    status = Column(String, nullable=False, default="waiting")  # waiting, matched, transplanted
    created_at = Column(DateTime(timezone=True), server_default=func.now())
