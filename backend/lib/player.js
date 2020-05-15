class Player {
    constructor(playername, socket) {
        this.username = playername;
        this.socket = socket;
        this.hand = null;
        this.currentCard = null;
        this.score = 0;
        this.choiceContrat = [];
    }

    addHand(hand) {
        this.hand = hand;
    }
    removeCardInHand(card) {
        for (i = 0; i < this.hand.length; i++) {
            if (this.hand[i].compare(card) === 0) {
                this.hand.splice(i, 1);
                break;
            }
        }
    }

    getNumCards() {
        return this.hand.length;
    };
    emit(eventName, payload) {
        this.socket.emit(eventName, payload);
    }

}
module.exports = Player;