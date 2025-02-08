from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from .. import database, models, schemas
from ..services.matching import MatchingService
from ..utils.oauth2 import get_current_user

router = APIRouter()

@router.get("/organ/{organ_id}/matches")
def get_matches(
    organ_id: int,
    db: Session = Depends(database.get_db),
    current_user: models.User = Depends(get_current_user)
):
    organ = db.query(models.Organ).filter(models.Organ.id == organ_id).first()
    if not organ:
        raise HTTPException(status_code=404, detail="Organ not found")
    
    matches = MatchingService.find_matches(organ, db)
    return matches

@router.post("/approve/{match_id}")
def approve_match(
    match_id: int,
    db: Session = Depends(database.get_db),
    current_user: models.User = Depends(get_current_user)
):
    match = db.query(models.Match).filter(models.Match.id == match_id).first()
    if not match:
        raise HTTPException(status_code=404, detail="Match not found")
    
    match.status = "accepted"
    match.matched_by = current_user.id
    
    # Update organ and patient status
    organ = db.query(models.Organ).filter(models.Organ.id == match.organ_id).first()
    patient = db.query(models.Patient).filter(models.Patient.id == match.patient_id).first()
    
    organ.status = "matched"
    patient.status = "matched"
    
    db.commit()
    return {"message": "Match approved successfully"}