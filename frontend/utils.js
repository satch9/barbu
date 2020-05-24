function playedCard(card, player) {
    let selectedCard;
    if (card.path.length == 15) {
        selectedCard = card.path[2];
    } else {
        selectedCard = card.path[1];
    }

    console.log(card);
    let rank = {};
    rank.shortName = selectedCard.textContent.split('')[0];
    let suit = {};
    let index = selectedCard.id.split('card')[1];
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
    let playerSuivant = player + 1;
    socket.emit('sendCard', {
        'gameInfoTable': gameInfo.tableIndex,
        'cardValue': selectedCard.id,
        'cardPlayed': {
            'rank': rank,
            'suit': suit,
            'index': index,
            'playerSuivant': playerSuivant,
            'peut_jouer': true
        }
    });
    console.log(document.getElementById(selectedCard.id));
    zoneDeJeu.append(document.getElementById(selectedCard.id));
    document.getElementById(selectedCard.id).style.top = "4em";
    document.getElementById(selectedCard.id).style.left = "6em";


}