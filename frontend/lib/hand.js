class Hand {
    constructor(id) {
        this.id = id;
        this.fieldNode = document.getElementById(id);
        this.cardsNode = document.getElementById(id + "Cards");
        //this.scoreTextNode = document.getElementById(id + "Score").firstChild;
        this.leftIncr = 1.3;
        this.topIncr = 1.5;
        this.cards = [];
    }

    addCard(cards, down) {
        let node;
        let left;
        let top;
        if (this.id === "player1" || this.id === "player3") {
            top = 1.2;
        } else {
            top = 0;
        }
        if (this.id === "player0" || this.id === "player2") {
            left = 0;
            top = -1.5;
        } else {
            left = 0;
        }

        // Create a card node for display, set as face down if requested.
        cards.forEach(card => {
            let c = new Card(card.rank, card.suit);

            node = c.cardCreateNode();
            if (down) node.firstChild.style.visibility = "hidden";
            if (this.id === "player0") {
                node.style.left = left + "em";
                left += this.leftIncr;
            }
            if (this.id === "player2") {
                node.style.left = left + "em";
                node.style.top = 0.5 + "em";
                left += this.leftIncr;
            }
            if (this.id === "player1" || this.id === "player3") {
                node.style.top = top + "em";
                node.style.left = 1 + "em";
                top += this.topIncr;
            }

            this.cardsNode.appendChild(node);
        });
    }
}