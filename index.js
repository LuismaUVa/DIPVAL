import express from "express";
import mysql from "mysql2/promise";

const app = express();

const pool = mysql.createPool(process.env.DATABASE_URL);

// 👇 LEER POR ID
app.get("/incidencias/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const [rows] = await pool.query(
      "SELECT * FROM incidencias WHERE id_caso = ?",
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "No encontrado" });
    }

    res.json(rows[0]);

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000);