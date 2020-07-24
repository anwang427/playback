var express = require('express');
var path = require("path");
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var port = 8000;

// Chat events when client connects
app.use(express.static(path.join(__dirname, "public")));

server.listen(process.env.PORT || 8000, function() {
    console.log("Listening to port: " + port);
});

io.sockets.on("connection", function(socket) {
    
    socket.on('join', function(room) {
        socket.join(room);
    });

    //disconnect
    socket.on("disconnect", function() {
        socket.disconnect();
     });

    //recieving and publishing messages
    socket.on('chat message', function(msg) {
        //once client has connected, recieve ping about which room they wish to join
        io.to(room).emit('chat message', msg);
        console.log(msg);
    });
});
