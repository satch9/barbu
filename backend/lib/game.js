const {
    decks
} = require("cards");
const formatMessage = require("../utils/message.js");
const Player = require('./player.js');
let plateauName = "Plateau Bot";

class Game {
    constructor(numCards = null) {
        this.cardsPerPlayer = numCards || 8;
        this.players = [];
        this.status = 0;
        this.gameWinner = null;
        this.deck = new decks.PiquetDeck();
        this.donneur = null;
    }

    getDonneur() {
        this.donneur %= this.players.length;
        return this.donneur;
    }
    setCardsPerPlayer(numCards) {
        this.cardsPerPlayer = numCards;
    };
    getNumPlayers() {
        return this.players.length;
    };
    getPlayers() {

        let p = this.players.map(function (p) {
            return {
                'username': p.username,
                'socketId': p.socket.id,
                'hand': p.hand,
                'currentCard': p.currentCard,
                'score': p.score,
                'choiceContrat': p.choiceContrat
            }
        });
        return p;

    }
    addPlayer(playername, socket) {
        this.players.push(new Player(playername, socket));

        if (this.getNumPlayers() >= 2) {
            this.emitPlayers('message', formatMessage(plateauName, `Bienvenue ${playername}`));
        } else {
            if (this.getNumPlayers.length == 0) {
                this.emitOnePlayer(0, 'message', formatMessage(plateauName, `Bienvenue ${playername}`));
            }

        }

    }

    startGame() {
        this.status = 1;
        this.emitPlayers('message', formatMessage(plateauName, `La table est complète. \n
        Nous allons vous distribuer vos cartes.
        `));

        this.dealCards();
        //console.log("class game ", this.players);
        this.emitPlayers('startGame', {
            'players': this.players.map(function (p) {
                return {
                    'username': p.username,
                    'socketId': p.socket.id,
                    'hand': p.hand,
                    'currentCard': p.currentCard,
                    'score': p.score,
                    'choiceContrat': p.choiceContrat
                }
            }),
            'donneur': this.getDonneur(),
            'peut_jouer': true
        });
        this.emitPlayers('message', formatMessage(plateauName, `Cartes distribuées. `));
        this.emitPlayers('message', formatMessage(plateauName, `La partie peut commencer.`));
        this.emitPlayers('message', formatMessage(plateauName, `Bonne chance à tous !!`));
    }

    dealCards() {
        // Shuffle the deck
        this.deck.shuffleAll();
        // Draw a hand of 8 cards from the deck
        for (let p = 0; p < this.players.length; p++) {
            let hand = this.deck.draw(this.cardsPerPlayer);
console.log('hand', hand);
            hand.sort(function (a, b) {
                return a.suit > b.suit;
            });
            /* console.log("newHand ", newHand.sort(function (a, b) {
                return a.suit < b.suit;
            })); */
            this.players[p].addHand(hand);
            /* console.log("players ", this.players[p].hand); */
        }

    }


    refreshCards(peut_jouer) {
        for (var pn = 0; pn < this.getNumPlayers(); pn++) {
            this.players[pn].hand.sort(function (a, b) {
                return a.suit > b.suit;
            });
        }
    }

    turn(d) {
        this.refreshChoiceContrat(d);
        this.emitPlayers('contrat', d);
        this.emitPlayers('message', formatMessage(plateauName, `C'est au tour de ${this.players[d.joueur_suivant].username} de jouer.`));
        this.emitPlayers('jouer1carte', {
            'player': d.joueur_suivant,
            'peut_jouer': true
        });
    }

    refreshChoiceContrat(data) {
        this.findPlayer(data.socketId).setChoiceContrat(data.choix);
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
    emitOnePlayer(pn, eventName, payload) {
        this.players[pn].emit(eventName, payload);
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