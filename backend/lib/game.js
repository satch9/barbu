const {
    decks
} = require("cards");
const Player = require('./player.js');

class Game {
    constructor(numCards = null) {
        this.cardsPerPlayer = numCards || 8;
        this.players = [];
        this.status = 0;
        this.gameWinner = null;
        this.deck = new decks.PiquetDeck();
        this.donneur = null;
    }

    randomDonneur() {
        this.donneur = Math.floor(Math.random() * this.players.length);
        return this.donneur;
    }
    setCardsPerPlayer(numCards) {
        this.cardsPerPlayer = numCards;
    };
    getNumPlayers() {
        return this.players.length;
    };
    addPlayer(playername, socket) {
        this.players.push(new Player(playername, socket));
    }



    hasGameEnded() {
        return this.status == 2;
    }
    isWaiting() {
        return this.status === 0;
    }
    emitPlayers(eventName, payload) {
        // console.log("Emit:", eventName, payload);

        for (var pn = 0; pn < this.getNumPlayers(); pn++) {
            // console.log("Emit p" + pn + " (Socket: " + this.players[pn].socket.id + "):", eventName, payload);
            this.players[pn].emit(eventName, payload);
        }
    }
    emitOnePlayer(socketId, eventName, payload) {
        this.findPlayer(socketId).emit(eventName, payload);
    }
    findPlayer(socketId) {
        for (var pn = 0; pn < this.getNumPlayers(); pn++) {
            if (this.players[pn].socket.id == socketId) {
                return this.players[pn];
            }
        }
    }

}
module.exports = Game;