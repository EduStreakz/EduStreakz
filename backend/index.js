import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pg from "pg";

dotenv.config();
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});

app.post("/api/progress", async (req, res) => {
  const { userId, game, score } = req.body;
  try {
    await pool.query("INSERT INTO scores (user_id, game, score) VALUES ($1, $2, $3)", [userId, game, score]);
    res.status(200).json({ message: "Score opgeslagen!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => console.log(`Server running on port ${port}`));
