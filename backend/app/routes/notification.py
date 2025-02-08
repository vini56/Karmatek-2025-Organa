from fastapi import APIRouter, Depends, WebSocket, WebSocketDisconnect
from sqlalchemy.orm import Session
from ..database import get_db
from ..models.notification import Notification
# from ..config import SECRET_KEY, ALGORITHM
from ..services.notifications import create_notification, send_realtime_notification
from jose import jwt, JWTError
from ..models import User
# from app.config import SECRET_KEY, ALGORITHM 



router = APIRouter()




async def get_current_user(token: str, db: Session):
    try:
        # payload = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        payload = "dummy_payload"
        user_id: int = payload.get("user_id")
        if user_id is None:
            return None
        user = db.query(User).filter(User.id == user_id).first()
        return user
    except JWTError:
        return None

@router.get("/{hospital_id}")
def get_notifications(hospital_id: int, db: Session = Depends(get_db)):
    """Fetch all notifications for a hospital."""
    return db.query(Notification).filter(Notification.hospital_id == hospital_id).all()

@router.post("/")
async def send_notification(hospital_id: int, message: str, db: Session = Depends(get_db)):
    """Create a notification and send it in real-time."""
    notification = create_notification(db, hospital_id, message)
    await send_realtime_notification(hospital_id, message)
    return {"message": "Notification sent", "data": notification}
