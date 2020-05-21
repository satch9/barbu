function playedCard(card) {
    let selectedCard;
    if (card.path.length == 15) {
        selectedCard = card.path[2].id;
    } else {
        selectedCard = card.path[1].id;
    }
    socket.emit('sendCard', {
        'gameInfo': gameInfo,
        'cardValue': selectedCard
    });
    zoneDeJeu.appendChild(document.getElementById(selectedCard));
    document.querySelector('.selected').remove();

}