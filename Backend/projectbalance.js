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
        db.run('CREATE TABLE IF NOT EXISTS Income (Transaction_Number INTEGER PRIMARY KEY AUTOINCREMENT, Transaction_Name TEXT, Transaction_Category TEXT NOT NULL, Transaction_Value REAL NOT NULL, Transaction_Date TEXT NOT NULL)', (err) => {
            if (err) {
                return console.error("Error during creation of Income Table: ", err.message);
            }
            console.log("Table Income created or already existing");
        });
        db.run('CREATE TABLE IF NOT EXISTS Savings (Transaction_Number INTEGER PRIMARY KEY AUTOINCREMENT, Transaction_Name TEXT NOT NULL, Transaction_Category TEXT NOT NULL, Transaction_Value REAL NOT NULL, Transaction_Date TEXT NOT NULL)', (err) => {
            if (err) {
                return console.error("Error during creation of Savings Table: ", err.message);
            }
            console.log("Table Savings created or already existing");
        });
        db.run('CREATE TABLE IF NOT EXISTS Spendings (Transaction_Number INTEGER PRIMARY KEY AUTOINCREMENT, Transaction_Name TEXT NOT NULL, Transaction_Category TEXT NOT NULL, Transaction_Value REAL NOT NULL, Transaction_Date TEXT NOT NULL)', (err) => {
            if (err) {
                return console.error("Error during creation of Spendings Table: ", err.message);
            }
            console.log("Table Spendings created or already existing");
        });
    });
});

app.use(express.static('Frontend'));
app.use(express.json());

app.post('/newTransaction', (req, res) => {
    const {transactionType, transactionName, transactionDate, transactionValue, transactionCategory} = req.body;
    if (transactionType === 'income') {
        const sql = `INSERT INTO Income (Transaction_Category, Transaction_Value, Transaction_Date) VALUES (?, ?, ?)`;
        db.run(sql, [transactionCategory, transactionValue, transactionDate], function(err) {
            if (err) {
                console.error("Error inserting Income: ", err.message);
                return res.status(500).json({error: err.message});
            }
            res.json({ message: "Income transaction inserted", id: this.lastID });
        });
    } else if (transactionType === 'savings') {
        const sql = `INSERT INTO Savings (Transaction_Name, Transaction_Category, Transaction_Value, Transaction_Date) VALUES (?, ?, ?, ?)`;
        db.run(sql, [transactionName, transactionCategory, transactionValue, transactionDate], function(err) {
            if (err) {
                console.error("Error inserting Savings:", err.message);
                return res.status(500).json({ error: err.message });
            }
            res.json({ message: "Savings transaction inserted", id: this.lastID });
        });
    } else if (transactionType === 'spendings') {
        const sql = `INSERT INTO Spendings (Transaction_Name, Transaction_Value, Transaction_Date) VALUES (?, ?, ?)`;
        db.run(sql, [transactionName, transactionValue, transactionDate], function(err) {
            if (err) {
                console.error("Error inserting Spendings:", err.message);
                return res.status(500).json({ error: err.message });
            }
            res.json({ message: "Spendings transaction inserted", id: this.lastID });
        });
    } else {
        res.status(400).json({ error: "Invalid transaction type" });
    }
});

app.get('/transactionTable', (req, res) => {
    const sql = 'SELECT Transaction_Date AS date, Transaction_Name AS name, Transaction_Category AS category, Transaction_Value AS value FROM Income UNION ALL SELECT Transaction_Date, Transaction_Name, Transaction_Category, Transaction_Value FROM Savings UNION ALL SELECT Transaction_Date, Transaction_Name, Transaction_Category AS category, Transaction_Value FROM Spendings ORDER BY date DESC';
    db.all(sql, [], (err, rows) => {
        if (err) {
            console.error("Error while calling transactions: ", err.message);
            return res.status(500).json({error: err.message});
        }
        res.json({transactions: rows});
    });
});

app.listen(4444, '0.0.0.0', () => {
    console.log("App listening on port 4444");
})

//Custom 404 page
app.use((req, res) => {
    res.status(404);
    res.send('<h1>Congratulations. You searched for a side, which does not exist (404)</h1>');
});