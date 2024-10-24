

async function run() {
    await websocket_init();
    if (!ws) {
        console.error("unable to connect to server.");
        return false;
    } else {
        console.log("connected to server.");
    }

    //TODO
    
}