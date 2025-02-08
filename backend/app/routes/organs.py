from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from .. import database, models, schemas
from ..utils.oauth2 import get_current_user
from ..services.ai_service import AIService

router = APIRouter()

@router.post("/", response_model=schemas.OrganOut)
def create_organ(
    organ: schemas.OrganCreate,
    db: Session = Depends(database.get_db),
    # current_user: models.User = Depends(get_current_user)
):
    new_organ = models.Organ(**organ.model_dump())
    db.add(new_organ)
    db.commit()
    db.refresh(new_organ)
    # check if it matches with any patient
    
    return new_organ

@router.get("/", response_model=List[schemas.OrganOut])
def get_organs(
    db: Session = Depends(database.get_db),
    current_user: models.User = Depends(get_current_user)
):
    organs = db.query(models.Organ).filter(models.Organ.status == "available").all()
    return organs

@router.put("/{id}", response_model=schemas.OrganOut)
def update_organ(
    id: int,
    organ_update: schemas.OrganUpdate,
    db: Session = Depends(database.get_db),
    current_user: models.User = Depends(get_current_user)
):
    organ_query = db.query(models.Organ).filter(models.Organ.id == id)
    organ = organ_query.first()
    
    if not organ:
        raise HTTPException(status_code=404, detail="Organ not found")
        
    organ_query.update(organ_update.dict(exclude_unset=True))
    db.commit()
    return organ_query.first()