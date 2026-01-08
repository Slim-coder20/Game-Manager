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

// Démarage du serveur //
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
