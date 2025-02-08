from fastapi import APIRouter, Depends, HTTPException, status
from ..schemas import HospitalCreate, HospitalOut, HospitalUpdate
from sqlalchemy.orm import Session
# from ..utils.oauth2 import get_current_user

from .. import database, models, schemas


router = APIRouter()

@router.get("/")
def get_hospitals(
    db: Session = Depends(database.get_db),
    # current_user: models.User = Depends(get_current_user)
):
    hospitals = db.query(models.Hospital).all()
    return hospitals


@router.get("/{hospital_id}")
def get_hospital(
    hospital_id: int,
    db: Session = Depends(database.get_db),
    # current_user: models.User = Depends(get_current_user)
):
    hospital = db.query(models.Hospital).filter(models.Hospital.id == hospital_id).first()
    if not hospital:
        raise HTTPException(status_code=404, detail="Hospital not found")
    return hospital

    # return {"message": f"Get hospital with ID {hospital_id}"}

@router.post("/")
def create_hospital(hospital: HospitalCreate, db: Session = Depends(database.get_db),
                    # current_user: models.User = Depends(get_current_user)
):
    new_hospital = models.Hospital(
        name=hospital.name,
        location=hospital.location,
        contact_phone=hospital.contact_phone,
        contact_email= hospital.contact_email,
        # admin_id=None
    )
    db.add(new_hospital)
    db.commit()
    db.refresh(new_hospital)
    return new_hospital