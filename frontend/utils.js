function playedCard(card, player) {
    let selectedCard;
    if (card.path.length == 15) {
        selectedCard = card.path[2];
    } else {
        selectedCard = card.path[1];
    }

    console.log(selectedCard);
    let rank = {};
    let suit = {};
    //let index = {};
    let playerSuivant = 0;
    if (selectedCard.textContent.split('')[0] == 1) {
        rank.shortName = '10';
        console.log('selectedCard.id.split(card)[2]', selectedCard.id.split('card')[2]);
        //index.num = selectedCard.id.split('card')[2];
        switch (selectedCard.textContent.split('')[2]) {
            case "\u2663":
                suit.name = "clubs";
                break;
            case "\u2666":
                suit.name = "diamonds";
                break;
            case "\u2665":
                suit.name = "hearts";
                break;
            case "\u2660":
                suit.name = "spades";
                break;
            default:
                suit.name = null;
        }
        playerSuivant = player + 1;
        socket.emit('sendCard', {
            'gameInfoTable': gameInfo.tableIndex,
            'cardValue': selectedCard.id,
            'cardPlayed': {
                'rank': rank,
                'suit': suit,
                'index': selectedCard.id.split('card')[1],
                'playerSuivant': playerSuivant,
                'peut_jouer': true
            }
        });
    } else {
        rank.shortName = selectedCard.textContent.split('')[0];
        //index.num = selectedCard.id.split('card')[1];
        switch (selectedCard.textContent.split('')[1]) {
            case "\u2663":
                suit.name = "clubs";
                break;
            case "\u2666":
                suit.name = "diamonds";
                break;
            case "\u2665":
                suit.name = "hearts";
                break;
            case "\u2660":
                suit.name = "spades";
                break;
            default:
                suit.name = null;
        }
        playerSuivant = player + 1;
        socket.emit('sendCard', {
            'gameInfoTable': gameInfo.tableIndex,
            'cardValue': selectedCard.id,
            'cardPlayed': {
                'rank': rank,
                'suit': suit,
                'index': selectedCard.id.split('card')[1],
                'playerSuivant': playerSuivant,
                'peut_jouer': true
            }
        });
    }



    console.log(document.getElementById(selectedCard.id));
    zoneDeJeu.append(document.getElementById(selectedCard.id));
    document.getElementById(selectedCard.id).style.top = "8em";
    document.getElementById(selectedCard.id).style.left = "3em";


}