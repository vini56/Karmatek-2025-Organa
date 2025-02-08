from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime


    # id = Column(Integer, primary_key=True, index=True)
    # name = Column(String, unique=True, nullable=False)
    # location = Column(String, nullable=False)
    # contact_email = Column(String, unique=True, nullable=False)
    # contact_phone = Column(String, nullable=False)
    # admin_id = Column(Integer, nullable=True)

class HospitalBase(BaseModel):
    name: str
    location: str
    contact_email: EmailStr
    contact_phone: str

class HospitalCreate(HospitalBase):
    pass

class HospitalOut(HospitalBase):
    id: int
    created_at: datetime
    
    class Config:
        from_attributes = True

class HospitalUpdate(HospitalBase):
    pass
