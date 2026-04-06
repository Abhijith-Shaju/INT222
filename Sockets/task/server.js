import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import path from 'path';
import { fileURLToPath } from 'url';
import { setTimeout } from 'timers';

let app = express();

let http = createServer(app);
let io = new Server(http);

let __filename = fileURLToPath(import.meta.url);
let __dirname = path.dirname(__filename);

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/client.html"));
});

io.on("connect", (socket) => {
    console.log("client is connected");

    const interval = setInterval(() => {
        socket.emit("clientMsg", "Hey Client!");
    }, 2000);

    setTimeout( () => clearInterval(interval), 20000);

    socket.on("sendMsg", (msg) => {
        console.log(`Server recieved the message : ${msg}`)
    })
    socket.on("disconnect", () => {
        console.log("Client is disconnected");
    })
})

http.listen(3000);