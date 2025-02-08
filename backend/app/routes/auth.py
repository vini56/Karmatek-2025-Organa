from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from .. import database, models, schemas, utils
from ..utils.oauth2 import create_access_token

router = APIRouter()

@router.post("/register", response_model=schemas.UserOut)
def create_user(user: schemas.UserCreate, db: Session = Depends(database.get_db)):
    # Hash the password
    hashed_password = utils.hash_password(user.password)
    user.password = hashed_password
    
    new_user = models.User(**user.model_dump())
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

@router.post("/login")
def login(user_credentials: schemas.UserLogin, db: Session = Depends(database.get_db)):
    # Query for a user with matching hospital_id and staff_id
    user = db.query(models.User).filter(
        models.User.hospital_id == user_credentials.hospital_id,
        models.User.staff_id == user_credentials.staff_id
    ).first()
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Invalid hospital ID or staff ID"
        )
    
    # Verify the password
    if not utils.verify_password(user_credentials.password, user.password):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Invalid password"
        )
    
    # Create an access token
    access_token = create_access_token(data={"user_id": user.id, "role": user.role})
    
    return {"access_token": access_token, "token_type": "bearer"}

@router.get("/logout")
def logout():
    return {"message": "Logout successful"}