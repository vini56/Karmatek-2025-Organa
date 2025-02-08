from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.sql import func
from ..database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    password = Column(String)  # Store hashed password
    role = Column(String)  # Enum: "staff", "admin"

    hospital_id = Column(Integer, ForeignKey("hospitals.id"), index=True)  # Link to hospitals table
    staff_id = Column(String, unique=True, index=True)  # Unique within hospital

    created_at = Column(DateTime(timezone=True), server_default=func.now())
