function afficheMessage(message) {
    let m = document.getElementById("message");
    let ul = document.createElement("ul");

    let content = document.createTextNode(
        `${message.username} : ${message.text}`
    );
    ul.id = "messageLi";
    m.append(ul);
    let li = document.createElement("li");

    li.appendChild(content);
    let ulLi = document.getElementById("messageLi");
    ulLi.append(li);
}