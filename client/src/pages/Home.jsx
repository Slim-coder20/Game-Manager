import React from "react";
import GameList from "../components/GameList";
import { useQuery } from "@tanstack/react-query";

/**
 *
 * cette fonction fetch les jeux de la base de données depuis le serveur //
 */
async function fetchGames() {
  const response = await fetch("http://localhost:3000/api/games");
  return response.json();
}

export default function Home() {
  //
  const { data, isLoading } = useQuery({
    queryKey: ["games"],
    queryFn: fetchGames,
  });
  console.log("Données reçues:", data);
  console.log("Type de données:", Array.isArray(data) ? "Array" : typeof data);
  if (isLoading) return <div className="page-container">Loading games ...</div>;
  if (!data)
    return <div className="page-container">Aucune donnée disponible</div>;
  return (
    <div className="page-container">
      <h1>My Games</h1>
      <div className="bg-card" style={{ marginTop: "1rem", padding: "1rem" }}>
        <GameList games={Array.isArray(data) ? data : []} />
      </div>
    </div>
  );
}
