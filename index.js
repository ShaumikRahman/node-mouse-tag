const express = require("express");
const path = require('path');
const http = require('http');
const app = express();
const server = http.createServer(app);
const socketio = require('socket.io');
const PORT = process.env.PORT || 3000;

const io = socketio(server);

app.use(express.static(path.join(__dirname, "public")));

server.listen(PORT, () => {
    console.log(`server started on ${PORT}`);
})