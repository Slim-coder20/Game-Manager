import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function UpdateGame() {
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // Récupération de liste de jeux depuis l'id //
  async function fetchGames() {
    const response = await fetch(`http://localhost:3000/api/games/${id}`);
    return response.json();
  }

  // Récupération de liste de jeu depuis son ID pour le mettre a jour //
  async function editGame(updatedGame) {
    try {
      const response = await fetch(`http://localhost:3000/api/games/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedGame),
      });
      // Vérifie si le status est OK on retourne 200 - 209
      if (!response.ok) {
        // Lancer une erreur pour que React Query la capture
        const errorData = await response
          .json()
          .catch(() => ({ message: "Erreur lors de la mise à jour  du jeu" }));
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

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["game", id],
    queryFn: fetchGames,
  });

  const {
    mutate,
    isPending: isUpdating,
    isError: isMutationError,
    error: mutationError,
  } = useMutation({
    mutationFn: editGame,
    onSuccess: () => {
      // Invalider la query de la liste des jeux pour rafraîchir les données
      queryClient.invalidateQueries({ queryKey: ["games"] });
      queryClient.invalidateQueries({ queryKey: ["game", id] });
      // Rediriger vers la page d'accueil après une mise à jour réussie
      navigate("/");
    },
    onError: (error) => {
      console.error("Erreur lors de la mise à jour:", error);
    },
  });

  useEffect(() => {
    if (data) {
      reset({
        name: data.name || "",
        platform: data.platform || "",
        genre: data.genre || "",
      });
    }
  }, [data, reset]);

  if (isLoading) return <p className="page-container">Loading Game...</p>;
  if (isError) return <p className="page-container">Error: {error.message}</p>;

  const onSubmit = (formData) => {
    console.log("Soumission du formulaire:", formData);
    mutate({
      name: formData.name,
      platform: formData.platform,
      genre: formData.genre,
    });
  };

  return (
    <div className="page-container">
      <h2>Update Game {id}</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="form-container bg-card"
        style={{ padding: "1rem" }}
      >
        <label htmlFor="">Game Name</label>
        <input
          type="text"
          placeholder="E.g  Super Mario ..."
          {...register("name", { required: "Name is required" })}
        />
        {errors.name && <p style={{ color: "red" }}>{errors.name.message}</p>}
        <label htmlFor="">Platform</label>
        <input
          type="text"
          placeholder="E.g Switch, PC, Xbox ..."
          {...register("platform", { required: "Platform is required" })}
        />
        {errors.platform && (
          <p style={{ color: "red" }}>{errors.platform.message}</p>
        )}
        <label htmlFor="">Genre</label>
        <input
          type="text"
          placeholder="E.G Action, Adventure, RPG ..."
          {...register("genre", { required: "Genre is required" })}
        />
        {errors.genre && <p style={{ color: "red" }}>{errors.genre.message}</p>}
        {isMutationError && (
          <p style={{ color: "red" }}>
            {mutationError?.message ||
              "Une erreur est survenue lors de la mise à jour"}
          </p>
        )}
        <button type="submit" disabled={isUpdating}>
          {isUpdating ? "Mise à jour en cours..." : "Update Game"}
        </button>
      </form>
    </div>
  );
}
