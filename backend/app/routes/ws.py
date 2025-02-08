from fastapi import websockets, WebSocketDisconnect, WebSocket, APIRouter

router = APIRouter()

@router.get("/")
async def root():
    return {"message": "Websocket Home"}

# @router.websocket("/ws")
# async def websocket_endpoint(websocket: WebSocket):
#     await websocket.accept()
#     try:
#         while True:
#             data = await websocket.receive_text()
#             await websocket.send_text(f"Message text was: {data}")
#     except WebSocketDisconnect:
#         await websocket.close()