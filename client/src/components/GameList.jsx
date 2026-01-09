import { Link } from "react-router-dom";
import { useMutation, useQueryClient } from '@tanstack/react-query'; 
import { useNavigate } from 'react-router-dom'; 

async function deleteGame(id) {
  try {
    const response = await fetch(`http://localhost:3000/api/games/${id}`, {
      method: "DELETE",
     
    });
    // Vérifie si le status est OK on retourne 200 - 209
    if (!response.ok) {
      // Lancer une erreur pour que React Query la capture
      const errorData = await response
        .json()
        .catch(() => ({ message: "Erreur lors de la suppression  du jeu" }));
      throw new Error(
        errorData.message ||
          `Erreur ${response.status}: ${response.statusText}`
      );
    }
    return response.json();
  } catch (error) {
    // Si c'est déjà une erreur que nous avons lancée, la relancer
    if (error instanceof Error) {
      throw error;
    }
    // Sinon, c'est une erreur réseau ou autre
    throw new Error("Erreur de connexion au serveur. Veuillez réessayer.");
  }
}
export default function GameList(props) {
  const games = props.games;
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  if (!games || !Array.isArray(games)) {
    return <div>Aucun jeu disponible</div>;
  }

  const {mutate } = useMutation({mutationFn:deleteGame, onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["games"] });
    navigate("/");
  }})

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this game?")) {
      mutate(id); 
    }
  }

  return (
    <div className="games-grid">
      {games.map((game) => (
        <div key={game.id} className="game-card">
          <h3>{game.name || "Nom non disponible"}</h3>
          <p>{game.platform || "Plateforme non disponible"}</p>
          <p>{game.genre || "Genre non disponible"}</p>
          <div>
            <Link to={`/update/${game.id}`} className="btn">
              Edit
            </Link>
            <button onClick={() => handleDelete(game.id)} className="btn-delete">Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}
