let ws;

async function websocket_init() {
    return new Promise((resolve, reject) => {
        if (ws) {
            ws.onerror = ws.onopen = ws.onclose = null;
            ws.close();
            console.log("triggered");
            
        }
        ws = new WebSocket("ws://localhost:8085/");
        ws.onclose = () => {
            ws = null;
            websocket_init();
        }
        ws.onopen = () => {
            resolve(ws);
        }
    });
}