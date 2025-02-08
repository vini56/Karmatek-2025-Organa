export function connectWebSocket(hospitalId: number | string, onMessage: any) {
    const socket = new WebSocket(`ws://localhost:8000/ws/${hospitalId}`);

    socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        onMessage(data.message);
    };

    socket.onclose = () => {
        console.log("WebSocket disconnected");
    };

    return socket;
}
