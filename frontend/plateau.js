const socket = io('http://localhost:3000');
let gameInfo = null;

let donneur = null;
let players;
let message = document.getElementById("message");
let zoneDeJeu = document.getElementById("zoneDeJeu");
let usernameBox = document.getElementById("usernameBox");
let ecrire = document.getElementById("ecrire");
let plateau = document.getElementById("plateau");
let boutonChoix = document.getElementById("buttonChoix");
let player1 = document.getElementById("player1");
let player2 = document.getElementById("player2");
let player3 = document.getElementById("player3");

socket.on("message", data => {
    afficheMessage(data);
    message.scrollTop = message.scrollHeight;
});

socket.on('startGame', function (data) {
    usernameBox.style.display = "none";
    ecrire.style.display = "block";
    plateau.style.display = "block";

    players = data.players;
    donneur = data.donneur;

    let p = document.createElement("p");
    p.id = "donneur";
    p.className = "blanc";
    let content = document.createTextNode(
        `Donneur : ${players[donneur].username}`
    );
    p.appendChild(content);
    zoneDeJeu.append(p);


    if (players[donneur].socketId === socket.id) {

        boutonChoix.style.display = "flex";

        let p = document.createElement("p");
        p.id = `player${donneur}data`;
        p.className = "blanc";
        let content = document.createTextNode(
            `${players[donneur].username}`
        );
        let content1 = document.createTextNode(
            `Score : ${players[donneur].score}`
        );

        p.appendChild(content);
        p.appendChild(document.createElement("br"));
        p.appendChild(content1);
        let V = {
            prop0: "player0",
            prop1: "player1",
            prop2: "player2",
            prop3: "player3",
        };
        let a = V["prop" + donneur];
        eval(a).appendChild(p);

        let main = new Hand("player0");
        main.addCard(players[donneur].hand, false);

        for (let index = 1; index < players.length; index++) {

            let p = document.createElement("p");
            p.id = `player${index}data`;
            p.className = "blanc";
            let content = document.createTextNode(
                `${players[index].username}`
            );
            let content1 = document.createTextNode(
                `Score : ${players[index].score}`
            );

            p.appendChild(content);
            p.appendChild(document.createElement("br"));
            p.appendChild(content1);
            let V = {
                prop1: "player1",
                prop2: "player2",
                prop3: "player3",
            };
            let a = V["prop" + index];
            eval(a).append(p);
        }

    } else {
        for (let index = 1; index < players.length; index++) {

            if (players[index].socketId === socket.id) {
                let p = document.createElement("p");
                p.id = `player${index}data`;
                p.className = "blanc";
                let content = document.createTextNode(
                    `${players[index].username}`
                );
                let content1 = document.createTextNode(
                    `Score : ${players[index].score}`
                );

                p.appendChild(content);
                p.appendChild(document.createElement("br"));
                p.appendChild(content1);
                let V = {
                    prop0: "player0",
                    prop1: "player1",
                    prop2: "player2",
                    prop3: "player3",
                };
                let a = V["prop0"];
                eval(a).append(p);

                let main = new Hand("player0");
                main.addCard(players[index].hand, false);

                if (index == 1) {
                    [0, 2, 3].forEach(el => {
                        let p = document.createElement("p");
                        p.id = `player${el}data`;
                        p.className = "blanc";
                        let content = document.createTextNode(
                            `${players[el].username}`
                        );
                        let content1 = document.createTextNode(
                            `Score : ${players[el].score}`
                        );

                        p.appendChild(content);
                        p.appendChild(document.createElement("br"));
                        p.appendChild(content1);
                        let V = {
                            prop0: "player0",
                            prop1: "player1",
                            prop2: "player2",
                            prop3: "player3",
                        };
                        if (el == 0) {
                            let a = V["prop3"];
                            eval(a).append(p);
                        } else if (el == 2) {
                            let a = V["prop1"];
                            eval(a).append(p);
                        } else {
                            let a = V["prop2"];
                            eval(a).append(p);
                        }

                    });
                } else if (index == 2) {
                    [0, 1, 3].forEach(el => {
                        let p = document.createElement("p");
                        p.id = `player${el}data`;
                        p.className = "blanc";
                        let content = document.createTextNode(
                            `${players[el].username}`
                        );
                        let content1 = document.createTextNode(
                            `Score : ${players[el].score}`
                        );

                        p.appendChild(content);
                        p.appendChild(document.createElement("br"));
                        p.appendChild(content1);
                        let V = {
                            prop0: "player0",
                            prop1: "player1",
                            prop2: "player2",
                            prop3: "player3",
                        };
                        if (el == 0) {
                            let a = V["prop2"];
                            eval(a).append(p);
                        } else if (el == 1) {
                            let a = V["prop3"];
                            eval(a).append(p);
                        } else {
                            let a = V["prop1"];
                            eval(a).append(p);
                        }

                    });
                } else {
                    [0, 1, 2].forEach(el => {
                        let p = document.createElement("p");
                        p.id = `player${el}data`;
                        p.className = "blanc";
                        let content = document.createTextNode(
                            `${players[el].username}`
                        );
                        let content1 = document.createTextNode(
                            `Score : ${players[el].score}`
                        );

                        p.appendChild(content);
                        p.appendChild(document.createElement("br"));
                        p.appendChild(content1);
                        let V = {
                            prop0: "player0",
                            prop1: "player1",
                            prop2: "player2",
                            prop3: "player3",
                        };
                        if (el == 0) {
                            let a = V["prop1"];
                            eval(a).append(p);
                        } else if (el == 1) {
                            let a = V["prop2"];
                            eval(a).append(p);
                        } else {
                            let a = V["prop3"];
                            eval(a).append(p);
                        }

                    });
                }

            }
        }
    }



});

boutonChoix.addEventListener('click', e => {
    e.preventDefault();
    console.log(e.target.value)
    boutonChoix.style.display = "none";
    let choix = e.target.value;
    socket.emit("choixContrat", {
        socketId: socket.id,
        choix: choix
    });
});

socket.on('contrat', data => {
    let p = document.createElement("p");
    p.id = "contrat";
    p.className = "blanc";
    let content = document.createTextNode(
        `Contrat : ${data.choix}`
    );
    p.appendChild(content);
    zoneDeJeu.append(p);
});

socket.on("gameInfo", function (info) {
    gameInfo = info;

    let p = document.createElement("p");
    p.id = "tableIndex";
    p.className = "blanc";
    let content = document.createTextNode(
        `Table : n°${gameInfo.tableIndex}`
    );
    p.appendChild(content);
    zoneDeJeu.append(p);
});



const startGame = function () {
    let username = $('#username').val();

    socket.emit('join', {
        username: username
    });
}