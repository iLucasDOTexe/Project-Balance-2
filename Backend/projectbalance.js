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
    const year = req.query.year;
    const month = req.query.month; // undefined, wenn "Ganzes Jahr" ausgewählt wurde
  
    // Baue die WHERE-Bedingung basierend auf den Parametern
    let whereClause = '';
    let params = [];
  
    if (year) {
      whereClause = "WHERE strftime('%Y', Transaction_Date) = ?";
      params.push(year);
      if (month) {
        whereClause += " AND strftime('%m', Transaction_Date) = ?";
        params.push(month);
      }
    }
  
    // Da du drei Tabellen per UNION zusammenführst, muss die WHERE-Klausel für jede Tabelle angewendet werden
    const sql = `
      SELECT Transaction_Number AS id, Transaction_Date AS date, Transaction_Name AS name, Transaction_Category AS category, Transaction_Value AS value, 'income' AS transactionType 
      FROM Income ${whereClause}
      UNION ALL 
      SELECT Transaction_Number AS id, Transaction_Date AS date, Transaction_Name AS name, Transaction_Category AS category, Transaction_Value AS value, 'savings' AS transactionType 
      FROM Savings ${whereClause}
      UNION ALL 
      SELECT Transaction_Number AS id, Transaction_Date AS date, Transaction_Name AS name, Transaction_Category AS category, Transaction_Value AS value, 'spendings' AS transactionType 
      FROM Spendings ${whereClause}
      ORDER BY date DESC
    `;
  
    // Wiederhole die Parameter für jede der drei Abfragen
    const unionParams = [...params, ...params, ...params];
  
    db.all(sql, unionParams, (err, rows) => {
      if (err) {
        console.error("Error while calling transactions: ", err.message);
        return res.status(500).json({ error: err.message });
      }
      res.json({ transactions: rows });
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
    const year = req.query.year;
    const month = req.query.month;
    let whereClause = '';
    let params = [];
  
    if (year) {
      whereClause = "WHERE strftime('%Y', Transaction_Date) = ?";
      params.push(year);
      if (month) {
        whereClause += " AND strftime('%m', Transaction_Date) = ?";
        params.push(month);
      }
    }
  
    // Einnahmen filtern
    db.get(`SELECT IFNULL(SUM(Transaction_Value), 0) AS incomeSum FROM Income ${whereClause}`, params, (err, incomeRow) => {
      if (err) {
        console.error("Error calculating income sum: ", err.message);
        return res.status(500).json({ error: err.message });
      }
      const incomeSum = incomeRow.incomeSum;
  
      // Ausgaben filtern
      db.get(`SELECT IFNULL(SUM(Transaction_Value), 0) AS spendingsSum FROM Spendings ${whereClause}`, params, (err, spendingRow) => {
        if (err) {
          console.error("Error calculating spendings sum: ", err.message);
          return res.status(500).json({ error: err.message });
        }
        const spendingsSum = spendingRow.spendingsSum;
  
        // Sparen filtern
        db.get(`SELECT IFNULL(SUM(Transaction_Value), 0) AS savingsSum FROM Savings ${whereClause}`, params, (err, savingsRow) => {
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
    const year = req.query.year;
    const month = req.query.month;
    let whereClause = '';
    let params = [];
  
    if (year) {
      whereClause = "WHERE strftime('%Y', Transaction_Date) = ?";
      params.push(year);
      if (month) {
        whereClause += " AND strftime('%m', Transaction_Date) = ?";
        params.push(month);
      }
    }
  
    // Summe der Einnahmen im Zeitraum
    db.get(`SELECT IFNULL(SUM(Transaction_Value), 0) AS incomeSum FROM Income ${whereClause}`, params, (err, incomeRow) => {
      if (err) {
        console.error("Error calculating income sum: ", err.message);
        return res.status(500).json({ error: err.message });
      }
      const incomeSum = incomeRow.incomeSum;
      
      // Summe der Ausgaben im Zeitraum
      db.get(`SELECT IFNULL(SUM(Transaction_Value), 0) AS spendingsSum FROM Spendings ${whereClause}`, params, (err, spendingRow) => {
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

app.get('/balanceBar', (req, res) => {
    const year = req.query.year;
    const selectedMonth = req.query.month; // falls vorhanden, z. B. "05"
    const monthNames = ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'];
    let startDate, endDate, labels;
  
    if (!selectedMonth) {
      // Ganzes Jahr: Zeitraum = 01.01. bis 31.12.
      startDate = `${year}-01-01`;
      endDate = `${year}-12-31`;
      labels = monthNames;
    } else {
      // Spezifischer Monat gewählt: 12-Monats-Fenster berechnen
      const selMonthNum = parseInt(selectedMonth, 10); // z. B. 5 für Mai
      // Enddatum: letzter Tag des ausgewählten Monats
      const endDateObj = new Date(year, selMonthNum, 0); // Letzter Tag des Monats
      endDate = `${year}-${("0" + selMonthNum).slice(-2)}-${("0" + endDateObj.getDate()).slice(-2)}`;
  
      // Startdatum: Erster Tag des Monats, der 11 Monate vor dem ausgewählten liegt
      let startDateObj = new Date(year, selMonthNum - 1, 1);
      startDateObj.setMonth(startDateObj.getMonth() - 11);
      const sYear = startDateObj.getFullYear();
      const sMonth = ("0" + (startDateObj.getMonth() + 1)).slice(-2);
      const sDay = ("0" + startDateObj.getDate()).slice(-2);
      startDate = `${sYear}-${sMonth}-${sDay}`;
  
      // Labels für das 12-Monats-Fenster berechnen:
      labels = [];
      let tempDate = new Date(startDateObj);
      for (let i = 0; i < 12; i++) {
        labels.push(monthNames[tempDate.getMonth()]);
        tempDate.setMonth(tempDate.getMonth() + 1);
      }
    }
  
    // Arrays mit 12 Feldern (oder 12 Elementen, falls Ganzes Jahr)
    let incomeData = new Array(labels.length).fill(0);
    let expensesData = new Array(labels.length).fill(0);
    let savingsData = new Array(labels.length).fill(0);
  
    // Wir gruppieren hier nach Jahr-Monat (Format "YYYY-MM")
    const queryIncome = `
      SELECT strftime('%Y-%m', Transaction_Date) AS ym, SUM(Transaction_Value) AS total
      FROM Income
      WHERE Transaction_Date BETWEEN ? AND ?
      GROUP BY ym
    `;
    db.all(queryIncome, [startDate, endDate], (err, incomeRows) => {
      if (err) return res.status(500).json({ error: err.message });
      incomeRows.forEach(row => {
        // row.ym hat das Format "YYYY-MM"
        const [rowYear, rowMonth] = row.ym.split('-').map(Number);
        const [sYear, sMonth] = startDate.split('-').map(Number);
        // Berechne den Index als Differenz in Monaten:
        const index = (rowYear - sYear) * 12 + (rowMonth - sMonth);
        if (index >= 0 && index < incomeData.length) {
          incomeData[index] = row.total;
        }
      });
  
      const queryExpenses = `
        SELECT strftime('%Y-%m', Transaction_Date) AS ym, SUM(Transaction_Value) AS total
        FROM Spendings
        WHERE Transaction_Date BETWEEN ? AND ?
        GROUP BY ym
      `;
      db.all(queryExpenses, [startDate, endDate], (err, expenseRows) => {
        if (err) return res.status(500).json({ error: err.message });
        expenseRows.forEach(row => {
          const [rowYear, rowMonth] = row.ym.split('-').map(Number);
          const [sYear, sMonth] = startDate.split('-').map(Number);
          const index = (rowYear - sYear) * 12 + (rowMonth - sMonth);
          if (index >= 0 && index < expensesData.length) {
            expensesData[index] = row.total;
          }
        });
  
        const querySavings = `
          SELECT strftime('%Y-%m', Transaction_Date) AS ym, SUM(Transaction_Value) AS total
          FROM Savings
          WHERE Transaction_Date BETWEEN ? AND ?
          GROUP BY ym
        `;
        db.all(querySavings, [startDate, endDate], (err, savingsRows) => {
          if (err) return res.status(500).json({ error: err.message });
          savingsRows.forEach(row => {
            const [rowYear, rowMonth] = row.ym.split('-').map(Number);
            const [sYear, sMonth] = startDate.split('-').map(Number);
            const index = (rowYear - sYear) * 12 + (rowMonth - sMonth);
            if (index >= 0 && index < savingsData.length) {
              savingsData[index] = row.total;
            }
          });
  
          res.json({
            labels,
            income: incomeData,
            expenses: expensesData,
            savings: savingsData
          });
        });
      });
    });
  });
  

app.get('/incomeDoughnut', (req, res) => {
    const year = req.query.year;
    const month = req.query.month;
    
    let whereClause = '';
    let params = [];
    
    if (year) {
      whereClause = "WHERE strftime('%Y', Transaction_Date) = ?";
      params.push(year);
      if (month) {
        whereClause += " AND strftime('%m', Transaction_Date) = ?";
        params.push(month);
      }
    }
    
    const sql = `
      SELECT Transaction_Category AS category, SUM(Transaction_Value) AS total 
      FROM Income 
      ${whereClause}
      GROUP BY Transaction_Category
    `;
    
    db.all(sql, params, (err, rows) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      const labels = [];
      const data = [];
      rows.forEach(row => {
        labels.push(row.category);
        data.push(row.total);
      });
      res.json({ labels, data });
    });
  });
  
  app.get('/spendingsDoughnut', (req, res) => {
    const year = req.query.year;
    const month = req.query.month;
    
    let whereClause = '';
    let params = [];
    
    if (year) {
      whereClause = "WHERE strftime('%Y', Transaction_Date) = ?";
      params.push(year);
      if (month) {
        whereClause += " AND strftime('%m', Transaction_Date) = ?";
        params.push(month);
      }
    }
    
    const sql = `
      SELECT Transaction_Category AS category, SUM(Transaction_Value) AS total 
      FROM Spendings 
      ${whereClause}
      GROUP BY Transaction_Category
    `;
    
    db.all(sql, params, (err, rows) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      const labels = [];
      const data = [];
      rows.forEach(row => {
        labels.push(row.category);
        data.push(row.total);
      });
      res.json({ labels, data });
    });
  });
  

  app.get('/savingsDoughnut', (req, res) => {
    const year = req.query.year;
    const month = req.query.month;
    
    let whereClause = '';
    let params = [];
    
    if (year) {
      whereClause = "WHERE strftime('%Y', Transaction_Date) = ?";
      params.push(year);
      if (month) {
        whereClause += " AND strftime('%m', Transaction_Date) = ?";
        params.push(month);
      }
    }
    
    const sql = `
      SELECT Transaction_Category AS category, SUM(Transaction_Value) AS total
      FROM Savings
      ${whereClause}
      GROUP BY Transaction_Category
    `;
    
    db.all(sql, params, (err, rows) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      const labels = [];
      const data = [];
      rows.forEach(row => {
        labels.push(row.category);
        data.push(row.total);
      });
      res.json({ labels, data });
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