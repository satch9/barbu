const socketio = require("socket.io");

module.exports = function (server) {
    // io server
    const io = socketio(server);


    io.on('connection', function (socket) {
        console.log('new connection ', socket.id);

        socket.on('disconnect', function () {
            console.log('disconnect');
        });
    });


};