from sqlalchemy import Column, Integer, Float, String, ForeignKey, DateTime
from sqlalchemy.sql import func
from ..database import Base

class Match(Base):
    __tablename__ = "matches"

    id = Column(Integer, primary_key=True, index=True)
    organ_id = Column(Integer, ForeignKey("organs.id"))
    patient_id = Column(Integer, ForeignKey("patients.id"))
    match_score = Column(Float)
    status = Column(String)  # pending, accepted, rejected
    matched_by = Column(Integer, ForeignKey("users.id"))  # doctor who approved
    created_at = Column(DateTime(timezone=True), server_default=func.now())