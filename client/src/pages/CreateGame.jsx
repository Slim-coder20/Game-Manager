import React from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
async function createGame(newGame) {
  try {
    const response = await fetch("http://localhost:3000/api/games", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newGame),
    });

    // Vérifier si la réponse est OK (status 200-299)
    if (!response.ok) {
      // Lancer une erreur pour que React Query la capture
      const errorData = await response
        .json()
        .catch(() => ({ message: "Erreur lors de la création du jeu" }));
      throw new Error(
        errorData.message || `Erreur ${response.status}: ${response.statusText}`
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

export default function CreateGame() {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const navigate = useNavigate();

  const { mutate, isError, error } = useMutation({
    mutationFn: createGame,
    onSuccess: () => {
      // Invalider la query "games" pour rafraîchir la liste
      queryClient.invalidateQueries({ queryKey: ["games"] });

      reset();
      navigate("/");
    },
    onError: (error) => {
      // Gérer l'erreur ici si nécessaire
      console.error("Erreur lors de la création du jeu:", error);
    },
  });

  const onSubmit = (formData) => {
    console.log(formData);
    mutate({
      name: formData.name,
      platform: formData.platform,
      genre: formData.genre,
    });
    // Note: navigate("/") est maintenant dans onSuccess
  };

  return (
    <div className="page-container">
      <h2>Add A New Game</h2>
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
        {isError && (
          <p style={{ color: "red" }}>
            {error?.message || "Une erreur est survenue"}
          </p>
        )}
        <button type="submit">Create Game</button>
      </form>
    </div>
  );
}
