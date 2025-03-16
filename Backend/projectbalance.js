const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const app = express();
const dbPath = "/home/lucaspi/apps/ProjectBalanceApp/running/data/pb.sqlite3";

let db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        return console.error("Connection error with database: ", err.message);
    }
    console.log("Database connected");

    db.serialize(() => {
        db.run('CREATE TABLE IF NOT EXISTS Income (Transaction_Number INTEGER PRIMATY KEY ANTOINCREMENT, Transaction_Name TEXT NOT NULL, Transaction_Value REAL NOT NULL, Transaction_Date TEXT NOT NULL)', (err) => {
            if (err) {
                return console.error("Error during creation of Income Table: ", err.message);
            }
            console.log("Table Income created or already existing");
        });
        db.run('CREATE TABLE IF NOT EXISTS Savings (Transaction_Number INTEGER PRIMATY KEY ANTOINCREMENT, Transaction_Name TEXT NOT NULL, Transaction_Category TEXT, Transaction_Value REAL NOT NULL, Transaction_Date TEXT NOT NULL)', (err) => {
            if (err) {
                return console.error("Error during creation of Savings Table: ", err.message);
            }
            console.log("Table Savings created or already existing");
        });
        db.run('CREATE TABLE IF NOT EXISTS Spendings (Transaction_Number INTEGER PRIMATY KEY ANTOINCREMENT, Transaction_Name TEXT NOT NULL, Transaction_Value REAL NOT NULL, Transaction_Date TEXT NOT NULL)', (err) => {
            if (err) {
                return console.error("Error during creation of Spendings Table: ", err.message);
            }
            console.log("Table Spendings created or already existing");
        });
    });

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