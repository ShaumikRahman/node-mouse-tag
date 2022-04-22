const express = require("express");
const path = require('path');
const http = require('http');
const app = express();
const server = http.createServer(app);
const {Server} = require('socket.io');
const PORT = process.env.PORT || 3000;

const io = new Server(server);

app.use(express.static(path.join(__dirname, "public")));

io.on('connection', (socket) => {
    console.log('connected', socket.id)
})

server.listen(PORT, () => {
    console.log(`server started on ${PORT}`);
})