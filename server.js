const express = require("express");
const WebSocket = require("ws");
const https = require("https");
const fs = require("fs");



const port = 8085;

const app = express();

app.use(express.static("public"));

app.get("/admin", (request, response) => {
    response.sendFile(__dirname+"/public/admin.html");
});
app.get("/", (request, response) => {
    response.sendFile(__dirname+"/public/index.html");
});

app.get("*", (request, response) => {
    response.status(404).send("Player, you have traveled too far and reached the void. Please head back, there is nothing to be found here.");
});



const web_server = app.listen(port, () => {console.log("Express started: ",port)});
const websocket_server = new WebSocket.Server({ server: web_server });


const players_list = new Map();

websocket_server.on("connection", socket => {
    console.log("server - connect");
    

    


    socket.on("message", message => {
        let parsed_data = JSON.parse(message);
        switch (parsed_data.type) {
            case "Room":
                //console.log(WSserver.clients);
                WebSocket_RoomHandler(socket, userList, parsedData, roomList, WSserver.clients, WebSocket);
                break;
            case "Game":
                WebSocket_GameHandler(socket, userList, parsedData, roomList, WSserver.clients, WebSocket);
                break;
            case "Chat":
                WebSocket_ChatHandler(socket, userList, parsedData);
                break;
            
            default:
                console.error("Defaulted",message.toString());
                break;
        }
    });

    socket.on("close", () => {
        /* TODO
        Remove the player from the admin view.
        Remove the player from the other players view.
        */
    });

});