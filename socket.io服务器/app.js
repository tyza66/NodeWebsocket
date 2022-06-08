const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { /* options */ });

app.all('/', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

io.on("connection", (socket) => {
    console.log("用户连接");
    socket.on('giao', (a) => { 
        console.log(a) 
        if(a == 'hello'){
            socket.emit('giaogiao', "呦呦呦");
        }
    });
    
});

httpServer.listen(3000, () => {
    console.log("服务器启动成功")
});