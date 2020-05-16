const socketio = require("socket.io");
const formatMessage = require("../utils/message.js");
const Game = require('../lib/game.js');

module.exports = function (server) {
    // io server
    const io = socketio(server);

    let tables = [];
    let connectionsLimit = 4;
    let plateauName = "Plateau Bot";
    let players;
    let game;

    io.on('connection', function (socket) {
        console.log('new connection ', socket.id);

        socket.on('join', data => {


            if (tables.length === 0 || !tables[tables.length - 1].isWaiting()) {
                game = new Game();
                tables.push(game);
            } else {
                game = tables[tables.length - 1];
            }
            game.addPlayer(data.username, socket);
            //console.log("game ", game);


            let indexOfTable = tables.length - 1;
            game.emitPlayers('message',
                formatMessage(plateauName,
                    `vous êtes sur la table ${indexOfTable} et il y a ${game.getNumPlayers()} joueur(s)`)
            );

            if (game.getNumPlayers() < connectionsLimit) {
                game.emitOnePlayer(socket, "message",
                    formatMessage(plateauName, "nous attendons un autre joueur."));
            } else if (game.getNumPlayers() == connectionsLimit) {
                game.emitPlayers('gameInfo', {
                    'tableIndex': tables.length - 1,
                    'players': game.getNumPlayers()
                });

                game.startGame();
            }
        });

        socket.on('choixContrat', data => {
            console.log(data);
            game.refreshChoiceContrat(data.socketId, data.choix);
            game.emitPlayers('contrat', data);
        });

        socket.on('disconnect', function () {
            console.log('disconnect');
        });
    });


};