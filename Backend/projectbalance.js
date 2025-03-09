const express = require("express");
const app = express();

app.get("/", (req, res) => {
    res.send("I am inside  docker whoop whoop!");
});

const port = 4400;
app.listen(port, () => {
    console.log('Express listening at http://localhost:${port}');
});