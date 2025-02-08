from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from .. import database, models, schemas
# from ..utils.oauth2 import get_current_user

router = APIRouter()

@router.post("/", response_model=schemas.PatientOut)
def create_patient(
    patient: schemas.PatientCreate, 
    db: Session = Depends(database.get_db),
    # current_user: models.User = Depends(get_current_user)
):
    new_patient = models.Patient(**patient.dict())
    db.add(new_patient)
    db.commit()
    db.refresh(new_patient)
    return new_patient

@router.get("/{id}", response_model=schemas.PatientOut)
def get_patient(
    id: int, 
    db: Session = Depends(database.get_db),
    # current_user: models.User = Depends(get_current_user)
):
    patient = db.query(models.Patient).filter(models.Patient.id == id).first()
    if not patient:
        raise HTTPException(status_code=404, detail="Patient not found")
    return patient

@router.get("/", response_model=List[schemas.PatientOut])
def get_patients(
    db: Session = Depends(database.get_db),
    # current_user: models.User = Depends(get_current_user)
):
    patients = db.query(models.Patient).all()
    return patients

@router.put("/{id}", response_model=schemas.PatientOut)
def update_patient(
    id: int,
    patient_update: schemas.PatientUpdate,
    db: Session = Depends(database.get_db),
    # current_user: models.User = Depends(get_current_user)
):
    patient_query = db.query(models.Patient).filter(models.Patient.id == id)
    patient = patient_query.first()

    if not patient:
        raise HTTPException(status_code=404, detail="Patient not found")

    patient_query.update(patient_update.dict(exclude_unset=True), synchronize_session=False)
    db.commit()
    return patient_query.first()