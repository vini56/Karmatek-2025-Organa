from fastapi import WebSocket, WebSocketDisconnect
import json

active_connections = {}

async def websocket_endpoint(websocket: WebSocket, hospital_id: int):
    """Handles WebSocket connection for a hospital."""
    await websocket.accept()
    
    # Register hospital connection
    if hospital_id not in active_connections:
        active_connections[hospital_id] = []
    active_connections[hospital_id].append(websocket)

    try:
        while True:
            await websocket.receive_text()  # Keep the connection open
    except WebSocketDisconnect:
        active_connections[hospital_id].remove(websocket)

async def notify_hospital(hospital_id: int, message: str):
    """Sends a real-time message to all connected staff in a hospital."""
    if hospital_id in active_connections:
        for connection in active_connections[hospital_id]:
            await connection.send_text(json.dumps({"message": message}))
