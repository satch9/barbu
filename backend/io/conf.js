const socketio = require("socket.io");
const Game = require('../lib/game.js');

module.exports = function (server) {
    // io server
    const io = socketio(server);

    let tables;
    let connectionsLimit = 2;
    let plateauName = "Plateau Bot";

    io.on('connection', function (socket) {
        console.log('new connection ', socket.id);

        socket.on('join', socket => {
            let game;

            if (tables.length === 0 || !tables[tables.length - 1].isWaiting()) {
                game = new Game();
                tables.push(game);
            } else {
                game = tables[tables.length - 1];
            }
            game.addPlayer(data.username, socket);

            game.emitPlayers('gameInfo', {
                'tableIndex': tables.length - 1,
                'players': game.getNumPlayers()
            });

            if (game.getNumPlayers() < connectionsLimit) {
                game.emitOnePlayer(socket.id, "message",
                    formatMessage(plateauName, "nous attendons un autre joueur."));
            } else if (game.getNumPlayers() > connectionsLimit) {
                game.emitOnePlayer(socket.id, "message",
                    formatMessage(plateauName, "quota de joueurs atteint."));
                return;
            } else if (game.getNumPlayers() == connectionsLimit) {
                game.startGame();
            }
        })

        socket.on('disconnect', function () {
            console.log('disconnect');
        });
    });


};