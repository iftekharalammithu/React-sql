const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const mysql = require("mysql");
require("dotenv").config();

const cors = require("cors");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Welcome to the home page!");
});

const db = mysql.createConnection({
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database,
  port: process.env.port,
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to database:", err);
    return;
  }
  console.log("Connected to database!");
});

app.get("/create-database", (req, res) => {
  const tableName = "mithu1stdb";
  const sql = `CREATE TABLE IF NOT EXISTS ${tableName} (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL
  )`;
  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error creating table:", err);
      res.status(500).send("Error creating table");
    } else {
      console.log("Table created successfully!");
      res.status(200).send("Table created successfully");
    }
  });
});

app.get("/insert-data", (req, res) => {
  const name = req.query.name;
  const email = req.query.email;
  const sql = `INSERT INTO mithu1stdb (name, email) VALUES (?, ?)`;
  db.query(sql, [name, email], (err, result) => {
    if (err) {
      console.error("Error inserting data:", err);
      res.status(500).send("Error inserting data");
    } else {
      console.log("Data inserted successfully!");
      res.status(200).send("Data inserted successfully");
    }
  });
});

app.get("/delete-data", (req, res) => {
  const name = req.query.name;
  const sql = `DELETE FROM mithu1stdb WHERE name = ?`;
  db.query(sql, [name], (err, result) => {
    if (err) {
      console.error("Error deleting data:", err);
      res.status(500).send("Error deleting data");
    } else {
      console.log("Data deleted successfully!");
      res.status(200).send("Data deleted successfully");
    }
  });
});

app.get("/update-data", (req, res) => {
  const name = req.query.name;
  const newName = req.query.newName;
  const sql = `UPDATE mithu1stdb SET name = ? WHERE name = ?`;
  db.query(sql, [newName, name], (err, result) => {
    if (err) {
      console.error("Error updating data:", err);
      res.status(500).send("Error updating data");
    } else {
      console.log("Data updated successfully!");
      res.status(200).send("Data updated successfully");
    }
  });
});

app.get("/get-all-data", (req, res) => {
  const sql = `SELECT * FROM mithu1stdb`;
  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error fetching data:", err);
      res.status(500).send("Error fetching data");
    } else {
      res.status(200).json(result);
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
