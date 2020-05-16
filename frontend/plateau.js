const socket = io('http://localhost:3000');
let gameInfo = null;

let donneur = null;
let players;
let message = document.getElementById("message");

socket.on("message", data => {
    afficheMessage(data);

    message.scrollTop = message.scrollHeight;
});

socket.on('startGame', function (data) {
    document.getElementById("usernameBox").style.display = "none";
    document.getElementById("ecrire").style.display = "block";
    document.getElementById("plateau").style.display = "block";

    players = data.players;
    donneur = data.donneur;

    let zoneDeJeu = document.getElementById("zoneDeJeu");
    let p = document.createElement("p");
    p.id = "donneur";
    let content = document.createTextNode(
        `Donneur : ${players[donneur].username}`
    );
    p.appendChild(content);
    zoneDeJeu.append(p);

    for (let index = 0; index < players.length; index++) {
        console.log(players[index]);
        if (players[index].socketId === socket.id) {
            if (index === donneur) {
                document.getElementById("buttonChoix").style.display = "flex";
                switch (index) {
                    case 0:
                        let mainDonneur0 = new Hand("player0");
                        mainDonneur0.addCard(players[index].hand, false);
                        break;
                    case 1:
                        let mainDonneur1 = new Hand("player1");
                        mainDonneur1.addCard(players[index].hand, false);
                        break;
                    case 2:
                        let mainDonneur2 = new Hand("player2");
                        mainDonneur2.addCard(players[index].hand, false);
                        break;
                    case 3:
                        let mainDonneur3 = new Hand("player3");
                        mainDonneur3.addCard(players[index].hand, false);
                        break;

                }
            } else {
                switch (index) {
                    case 0:
                        let main0 = new Hand("player0");
                        main0.addCard(players[index].hand, false);
                        break;
                    case 1:
                        let main1 = new Hand("player1");
                        main1.addCard(players[index].hand, false);
                        break;
                    case 2:
                        let main2 = new Hand("player2");
                        main2.addCard(players[index].hand, false);
                        break;
                    case 3:
                        let main3 = new Hand("player3");
                        main3.addCard(players[index].hand, false);
                        break;

                }
            }
        } else {
            switch (index) {
                case 0:
                    let main0 = new Hand("player0");
                    main0.addCard(players[index].hand, true);
                    break;
                case 1:
                    let main1 = new Hand("player1");
                    main1.addCard(players[index].hand, true);
                    break;
                case 2:
                    let main2 = new Hand("player2");
                    main2.addCard(players[index].hand, true);
                    break;
                case 3:
                    let main3 = new Hand("player3");
                    main3.addCard(players[index].hand, true);
                    break;

            }
        }

    }

});

document.getElementById('buttonChoix').addEventListener('click', e => {
    e.preventDefault();
    console.log(e.target.value)
    document.getElementById("buttonChoix").style.display = "none";
    let choix = e.target.value;
    socket.emit("choixContrat", {
        socketId: socket.id,
        choix: choix
    });
});

socket.on('contrat', data => {
    let zoneDeJeu = document.getElementById("zoneDeJeu");
    let p = document.createElement("p");
    p.id = "contrat";
    let content = document.createTextNode(
        `Contrat : ${data.choix}`
    );
    p.appendChild(content);
    zoneDeJeu.append(p);
});

socket.on("gameInfo", function (info) {
    console.log(info);
    gameInfo = info;

    let zoneDeJeu = document.getElementById("zoneDeJeu");
    let p = document.createElement("p");
    p.id = "tableIndex";
    let content = document.createTextNode(
        `Table : n°${gameInfo.tableIndex}`
    );
    p.appendChild(content);
    zoneDeJeu.append(p);
});



var startGame = function () {
    console.log(socket);
    var username = $('#username').val();

    console.log(username);
    socket.emit('join', {
        username: username
    });
}