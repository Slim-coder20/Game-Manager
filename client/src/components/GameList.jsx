import { Link } from "react-router-dom";

export default function GameList(props) {
  const games = props.games;

  if (!games || !Array.isArray(games)) {
    return <div>Aucun jeu disponible</div>;
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
          </div>
        </div>
      ))}
    </div>
  );
}
