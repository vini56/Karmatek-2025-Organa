from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from .routes import auth, organs, patients, matching, notification, hospital, ws_router
# from . import models
from .models import Base
from .database import engine

# Drop and create all tables
# Base.metadata.drop_all(bind=engine)

Base.metadata.create_all(bind=engine)

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/") 
async def root():
    return {"message": "Hello World"}

@app.websocket("/ws/{client_id}")
async def websocket_endpoint(websocket: WebSocket, client_id: int):
    await websocket.accept()
    ws_router.add_ws(websocket, client_id)
    try:
        while True:
            data = await websocket.receive_text()
            await ws_router.send_message(client_id, data)
    except WebSocketDisconnect:
        ws_router.remove_ws(client_id)

# app.include_router(notification.router, prefix="/api")


app.include_router(auth.router, prefix="/api/auth", tags=["Authentication"])
app.include_router(patients.router, prefix="/api/patients", tags=["Patients"])
app.include_router(matching.router, prefix="/api/matching", tags=["Matching"])
app.include_router(organs.router, prefix="/api/organs", tags=["Organs"])
app.include_router(hospital.router, prefix="/api/hospitals", tags=["Hospitals"])
app.include_router(notification.router, prefix="/api/notifications", tags=["Notifications"])
# app.include_router(ws.router, prefix="/ws", tags=["Websocket"])

# dfrsgv
