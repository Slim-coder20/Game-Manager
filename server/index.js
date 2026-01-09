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
  games.push({ ...newGame, id: games.length + 1 });
  res.status(201).json({ message: "Game created successfully" });
});

// Route pour récupérer une liste de jeur depuis son ID  //
app.get("/api/games/:id", (req, res) => {
  const { id } = req.params;
  const game = games.find((game) => game.id === Number(id));
  if (!game) {
    return res.status(404).json({ message: "Game not found" });
  }
  res.json(game);
});

// Route pour mettre a jour une liste de jeu //
app.put("/api/games/:id", (req, res) => {
  const { id } = req.params;
  const newUpdatedGame = req.body;
  const index = games.findIndex((game) => game.id === Number(id));
  if (index === -1) {
    return res.status(404).json({ message: "Game not found" });
  }
  // Ne mettre à jour que les propriétés fournies (évite d'écraser avec undefined)
  games[index] = {
    ...games[index],
    ...(newUpdatedGame.name && { name: newUpdatedGame.name }),
    ...(newUpdatedGame.platform && { platform: newUpdatedGame.platform }),
    ...(newUpdatedGame.genre && { genre: newUpdatedGame.genre }),
  };
  res.json(games[index]);
});

// Démarage du serveur //
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
