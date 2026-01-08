import express from "express";
import cors from "cors";
import { games } from "./fakeDB.js";

// Création de l'application expres //
const app = express();

// Middleware pour parser le corps des requêtes en JSON //
app.use(express.json());

// Configuration de CORS //
app.use(cors());

// Routes //
app.get("/api/games", (req, res) => {
  res.json(games);
});

app.post("/api/games", (req, res) => {
  const newGame = req.body;
  games.push({...newGame, id: games.length + 1});
  res.status(201).json({message: "Game created successfully"}); 
});

// Démarage du serveur //
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
