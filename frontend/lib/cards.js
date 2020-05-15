class Card {
    constructor(rank, suit) {
        this.rank = rank;
        this.suit = suit;
    }
    cardToString() {
        let rank = "";
        switch (this.rank.shortName) {
            case "A":
                rank = "Ace";
                break;
            case "2":
                rank = "Two";
                break;
            case "3":
                rank = "Three";
                break;
            case "4":
                rank = "Four";
                break;
            case "5":
                rank = "Five";
                break;
            case "6":
                rank = "Six";
                break;
            case "7":
                rank = "Seven";
                break;
            case "8":
                rank = "Eight";
                break;
            case "9":
                rank = "Nine";
                break;
            case "10":
                rank = "Ten";
                break;
            case "J":
                rank = "Jack";
                break;
            case "Q":
                rank = "Queen";
                break;
            case "K":
                rank = "King";
                break;
            default:
                rank = null;
                break;
        }
        let suit;
        switch (this.suit) {
            case "C":
                suit = "Clubs";
                break;
            case "D":
                suit = "Diamonds";
                break;
            case "H":
                suit = "Hearts";
                break;
            case "S":
                suit = "Spades";
                break;
            default:
                suit = null;
                break;
        }

        if (rank == null || suit == null) return "";

        return rank + " of " + suit;
    }

    cardCreateNode() {
        let cardNode, frontNode, spotNode, tempNode, textNode;
        let indexStr, spotChar;

        // This is the main node, a DIV tag.

        cardNode = document.createElement("DIV");
        cardNode.className = "card";

        // Build the front of card.

        frontNode = document.createElement("DIV");
        frontNode.className = "front";

        // Get proper character for card suit and change font color if
        // necessary.

        spotChar = "\u00a0";
        switch (this.suit.name) {
            case "clubs":
                spotChar = "\u2663";
                break;
            case "diamonds":
                frontNode.className += " red";
                spotChar = "\u2666";
                break;
            case "hearts":
                frontNode.className += " red";
                spotChar = "\u2665";
                break;
            case "spades":
                spotChar = "\u2660";
                break;
            default:
                spotChar = null;
        }

        // Create and add the index (rank) to the upper-left corner of the
        // card.

        indexStr = this.rank.shortName;
        if (indexStr === "") {
            indexStr = "\u00a0";
        }
        spotNode = document.createElement("DIV");
        spotNode.className = "index";
        textNode = document.createTextNode(indexStr);
        spotNode.appendChild(textNode);
        spotNode.appendChild(document.createElement("BR"));
        textNode = document.createTextNode(spotChar);
        spotNode.appendChild(textNode);
        frontNode.appendChild(spotNode);

        // Create and add spots based on card rank (Ace thru 10).

        spotNode = document.createElement("DIV");
        textNode = document.createTextNode(spotChar);
        spotNode.appendChild(textNode);
        if (this.rank.shortName === "A") {
            spotNode.className = "ace";
            tempNode = spotNode.cloneNode(true);
            frontNode.appendChild(tempNode);
        }
        if (
            this.rank.shortName === "3" ||
            this.rank.shortName === "5" ||
            this.rank.shortName === "9"
        ) {
            spotNode.className = "spotB3";
            tempNode = spotNode.cloneNode(true);
            frontNode.appendChild(tempNode);
        }
        if (this.rank.shortName === "2" || this.rank.shortName === "3") {
            spotNode.className = "spotB1";
            tempNode = spotNode.cloneNode(true);
            frontNode.appendChild(tempNode);
        }
        if (this.rank.shortName === "2" || this.rank.shortName === "3") {
            spotNode.className = "spotB5";
            tempNode = spotNode.cloneNode(true);
            frontNode.appendChild(tempNode);
        }
        if (
            this.rank.shortName === "4" ||
            this.rank.shortName === "5" ||
            this.rank.shortName === "6" ||
            this.rank.shortName === "7" ||
            this.rank.shortName === "8" ||
            this.rank.shortName === "9" ||
            this.rank.shortName === "10"
        ) {
            spotNode.className = "spotA1";
            tempNode = spotNode.cloneNode(true);
            frontNode.appendChild(tempNode);
            spotNode.className = "spotA5";
            tempNode = spotNode.cloneNode(true);
            frontNode.appendChild(tempNode);
            spotNode.className = "spotC1";
            tempNode = spotNode.cloneNode(true);
            frontNode.appendChild(tempNode);
            spotNode.className = "spotC5";
            tempNode = spotNode.cloneNode(true);
            frontNode.appendChild(tempNode);
        }
        if (
            this.rank.shortName === "6" ||
            this.rank.shortName === "7" ||
            this.rank.shortName === "8"
        ) {
            spotNode.className = "spotA3";
            tempNode = spotNode.cloneNode(true);
            frontNode.appendChild(tempNode);
            spotNode.className = "spotC3";
            tempNode = spotNode.cloneNode(true);
            frontNode.appendChild(tempNode);
        }
        if (
            this.rank.shortName === "7" ||
            this.rank.shortName === "8" ||
            this.rank.shortName === "10"
        ) {
            spotNode.className = "spotB2";
            tempNode = spotNode.cloneNode(true);
            frontNode.appendChild(tempNode);
        }
        if (this.rank.shortName === "8" || this.rank.shortName === "10") {
            spotNode.className = "spotB4";
            tempNode = spotNode.cloneNode(true);
            frontNode.appendChild(tempNode);
        }
        if (this.rank.shortName === "9" || this.rank.shortName === "10") {
            spotNode.className = "spotA2";
            tempNode = spotNode.cloneNode(true);
            frontNode.appendChild(tempNode);
            spotNode.className = "spotA4";
            tempNode = spotNode.cloneNode(true);
            frontNode.appendChild(tempNode);
            spotNode.className = "spotC2";
            tempNode = spotNode.cloneNode(true);
            frontNode.appendChild(tempNode);
            spotNode.className = "spotC4";
            tempNode = spotNode.cloneNode(true);
            frontNode.appendChild(tempNode);
        }

        // For face cards (Jack, Queen or King), create and add the proper
        // image.

        tempNode = document.createElement("IMG");
        tempNode.className = "face";
        if (this.rank.shortName === "J") tempNode.src = "graphics/jack.gif";
        if (this.rank.shortName === "Q") tempNode.src = "graphics/queen.gif";
        if (this.rank.shortName === "K") tempNode.src = "graphics/king.gif";

        // For face cards, add suit characters to the upper-left and
        // lower-right corners.

        if (
            this.rank.shortName === "J" ||
            this.rank.shortName === "Q" ||
            this.rank.shortName === "K"
        ) {
            frontNode.appendChild(tempNode);
            spotNode.className = "spotA1";
            tempNode = spotNode.cloneNode(true);
            frontNode.appendChild(tempNode);
            spotNode.className = "spotC5";
            tempNode = spotNode.cloneNode(true);
            frontNode.appendChild(tempNode);
        }

        // Add front node to the card node.

        cardNode.appendChild(frontNode);

        // Return the card node.

        return cardNode;
    }
}