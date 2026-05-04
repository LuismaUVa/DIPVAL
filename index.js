import express from "express";
import mysql from "mysql2/promise";

const app = express();

// ⚠️ Usa variables de entorno de Railway
const pool = mysql.createPool({
  host: process.env.MYSQLHOST,
  port: process.env.MYSQLPORT,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE
});

app.get("/incidencias", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM incidencias");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => console.log("API corriendo"));