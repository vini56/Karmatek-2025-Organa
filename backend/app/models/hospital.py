from sqlalchemy import Column, Integer, String
from ..database import Base

class Hospital(Base):
    __tablename__ = "hospitals"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, nullable=False)
    location = Column(String, nullable=False)
    contact_email = Column(String, unique=True, nullable=False)
    contact_phone = Column(String, nullable=False)
    # admin_id = Column(Integer, nullable=True)
