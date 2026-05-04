import express from "express";
import mysql from "mysql2/promise";

const app = express();

import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  port: process.env.MYSQLPORT
});

app.get("/incidencias", async (req, res) => {
  try {
    // 👇 leer desde HEADERS
    const id = req.headers["id"];

    if (!id) {
      return res.status(400).json({ error: "Falta header id" });
    }

    const [rows] = await pool.query(
      "SELECT * FROM incidencias WHERE id_caso = ?",
      [id]
    );

    res.json(rows[0] || null);

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000);