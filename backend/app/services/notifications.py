from sqlalchemy.orm import Session
from ..models.notification import Notification 
from ..websocket.notifications import notify_hospital

def create_notification(db: Session, hospital_id: int, message: str):
    """Creates a notification record in the database and sends it via WebSocket."""
    notification = Notification(hospital_id=hospital_id, message=message)
    db.add(notification)
    db.commit()
    db.refresh(notification)

    # Send real-time notification via WebSocket
    return notification

async def send_realtime_notification(hospital_id: int, message: str):
    """Triggers WebSocket to send notifications to the hospital's active users."""
    await notify_hospital(hospital_id, message)
