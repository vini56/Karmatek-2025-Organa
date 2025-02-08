from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Float
from sqlalchemy.sql import func
from ..database import Base

class Organ(Base):
    __tablename__ = "organs"

    id = Column(Integer, primary_key=True, index=True)
    
    # Organ Information
    organ_type = Column(String, nullable=False)
    recovery_date = Column(DateTime, nullable=False)
    expected_preservation_time = Column(Float, nullable=False)  # in hours

    # Donor Information
    donor_age = Column(Integer, nullable=False)
    donor_blood_type = Column(String, nullable=False)
    donor_gender = Column(String, nullable=False)
    cause_of_death = Column(String, nullable=True)

    # Organ Condition
    organ_size = Column(String, nullable=True)
    organ_condition_rating = Column(String, nullable=False)  # Excellent, Good, Fair, Poor

    # HLA Typing (Stored as JSON)
    hla_a = Column(String, nullable=True)
    hla_b = Column(String, nullable=True)
    hla_c = Column(String, nullable=True)
    hla_drb1 = Column(String, nullable=True)
    hla_dqb1 = Column(String, nullable=True)

    # Location Details
    donor_hospital = Column(String, nullable=False)
    current_location = Column(String, nullable=True) # Current Hospital or In Transit
    transport_arrangements = Column(String, nullable=True)

    # Additional Information
    medical_history = Column(String, nullable=True)
    viral_testing_status = Column(String, nullable=False)  # Negative, Positive, Pending
    organ_biopsy_results = Column(String, nullable=True)

    # Foreign Key & Status
    hospital_id = Column(Integer, ForeignKey("hospitals.id"))  # Hospital managing the organ
    status = Column(String, nullable=False)  # available, in_transit, transplanted

    created_at = Column(DateTime(timezone=True), server_default=func.now())
