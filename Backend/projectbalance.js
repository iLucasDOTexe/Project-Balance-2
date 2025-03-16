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
        db.run('CREATE TABLE IF NOT EXISTS Income (Transaction_Number INTEGER PRIMARY KEY AUTOINCREMENT, Transaction_Name TEXT NOT NULL, Transaction_Category TEXT NOT NULL, Transaction_Value REAL NOT NULL, Transaction_Date TEXT NOT NULL)', (err) => {
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
        const sql = `INSERT INTO Income (transaction_Name, Transaction_Category, Transaction_Value, Transaction_Date) VALUES (?, ?, ?, ?)`;
        db.run(sql, [transactionCategory, transactionCategory, transactionValue, transactionDate], function(err) {
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
        const sql = `INSERT INTO Spendings (Transaction_Name, Transaction_Category, Transaction_Value, Transaction_Date) VALUES (?, ?, ?, ?)`;
        db.run(sql, [transactionName, transactionCategory, transactionValue, transactionDate], function(err) {
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
    const sql = `
        SELECT Transaction_Number AS id, Transaction_Date AS date, Transaction_Name AS name, Transaction_Category AS category, Transaction_Value AS value, 'income' AS transactionType FROM Income 
        UNION ALL 
        SELECT Transaction_Number AS id, Transaction_Date AS date, Transaction_Name AS name, Transaction_Category AS category, Transaction_Value AS value, 'savings' AS transactionType FROM Savings 
        UNION ALL 
        SELECT Transaction_Number AS id, Transaction_Date AS date, Transaction_Name AS name, Transaction_Category AS category, Transaction_Value AS value, 'spendings' AS transactionType FROM Spendings 
        ORDER BY date DESC`;
    db.all(sql, [], (err, rows) => {
        if (err) {
            console.error("Error while calling transactions: ", err.message);
            return res.status(500).json({error: err.message});
        }
        res.json({transactions: rows});
    });
});

app.delete('/deleteTransaction', (req, res) => {
    const { id, transactionType } = req.body;
    let sql;
    if (transactionType === 'income') {
        sql = "DELETE FROM Income WHERE Transaction_Number = ?";
    } else if (transactionType === 'savings') {
        sql = "DELETE FROM Savings WHERE Transaction_Number = ?";
    } else if (transactionType === 'spendings') {
        sql = "DELETE FROM Spendings WHERE Transaction_Number = ?";
    } else {
        return res.status(400).json({ error: "Invalid transaction type" });
    }
    db.run(sql, [id], function(err) {
        if (err) {
            console.error("Error deleting transaction: ", err.message);
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: "Transaction deleted", id });
    });
});

app.get('/availableIncome', (req, res) => {
    db.get("SELECT IFNULL(SUM(Transaction_Value), 0) AS incomeSum FROM Income", (err, incomeRow) => {
        if (err) {
            console.error("Error calculating income sum: ", err.message);
            return res.status(500).json({ error: err.message });
        }
        const incomeSum = incomeRow.incomeSum;
        db.get("SELECT IFNULL(SUM(Transaction_Value), 0) AS spendingsSum FROM Spendings", (err, spendingRow) => {
            if (err) {
                console.error("Error calculating spendings sum: ", err.message);
                return res.status(500).json({ error: err.message });
            }
            const spendingsSum = spendingRow.spendingsSum;
            db.get("SELECT IFNULL(SUM(Transaction_Value), 0) AS savingsSum FROM Savings", (err, savingsRow) => {
                if (err) {
                    console.error("Error calculating savings sum: ", err.message);
                    return res.status(500).json({ error: err.message });
                }
                const savingsSum = savingsRow.savingsSum;
                const absolute = incomeSum - spendingsSum - savingsSum;
                const relative = incomeSum ? (absolute / incomeSum) * 100 : 0;
                res.json({ absolute, relative });
            });
        });
    });
});

app.get('/spendingsMade', (req, res) => {
    db.get("SELECT IFNULL(SUM(Transaction_Value), 0) AS incomeSum FROM Income", (err, incomeRow) => {
        if (err) {
            console.error("Error calculating income sum: ", err.message);
            return res.status(500).json({ error: err.message });
        }
        const incomeSum = incomeRow.incomeSum;
        db.get("SELECT IFNULL(SUM(Transaction_Value), 0) AS spendingsSum FROM Spendings", (err, spendingRow) => {
            if (err) {
                console.error("Error calculating spendings sum: ", err.message);
                return res.status(500).json({ error: err.message });
            }
            const spendingsSum = spendingRow.spendingsSum;
            const absolute = spendingsSum;
            const relative = incomeSum ? (absolute / incomeSum) * 100 : 0;
            res.json({ absolute, relative });
        });
    });
});

app.get('/savingsQuote', (req, res) => {
    db.get("SELECT IFNULL(SUM(Transaction_Value), 0) AS incomeSum FROM Income", (err, incomeRow) => {
        if (err) {
            console.error("Error calculating income sum: ", err.message);
            return res.status(500).json({ error: err.message });
        }
        const incomeSum = incomeRow.incomeSum;
        db.get("SELECT IFNULL(SUM(Transaction_Value), 0) AS savingsSum FROM Savings", (err, savingsRow) => {
            if (err) {
                console.error("Error calculating savings sum: ", err.message);
                return res.status(500).json({ error: err.message });
            }
            const savingsSum = savingsRow.savingsSum;
            const absolute = savingsSum;
            const relative = incomeSum ? (absolute / incomeSum) * 100 : 0;
            res.json({ absolute, relative });
        });
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