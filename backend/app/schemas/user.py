from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime

# Base schema shared across different operations
class UserBase(BaseModel):
    email: EmailStr
    staff_id: str

# Schema for creating a user
class UserCreate(UserBase):
    password: str
    role: str
    hospital_id: int

# Schema for user login
class UserLogin(BaseModel):
    hospital_id: int = 1
    staff_id: str
    password: str

# Schema for user output
class UserOut(BaseModel):
    id: int
    email: EmailStr
    staff_id: str
    hospital_id: Optional[int]
    created_at: datetime

    class Config:
        from_attributes = True
