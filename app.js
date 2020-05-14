let express = require("express");
let path = require("path");

let app = express();

app.use(express.static(path.join(__dirname, "frontend")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend/views/plateau.html"));
});

/* app.get("/plateau.html", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend/views/plateau.html"));
});
 */
module.exports = app;