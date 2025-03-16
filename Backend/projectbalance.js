const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const app = express();
const dbPath = "/home/lucaspi/apps/data/pb.sqlite3";

let db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        return console.error("Connection error with database: ", err.message);
    }
    console.log("Database connected");
});

app.use(express.static('Frontend'));
app.use(express.json())

app.listen(4444, '0.0.0.0', () => {
    console.log("App listening on port 4444");
})

//Custom 404 page
app.use((req, res) => {
    res.status(404);
    res.send('<h1>Congratulations. You searched for a side, which does not exist (404)</h1>');
});