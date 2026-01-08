import React from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom"; 
async function createGame(newGame) {
  const response = await fetch("http://localhost:3000/api/games", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newGame),
  });
  return response.json();
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

  const { mutate } = useMutation({
    mutationFn: createGame,
    onSuccess: () => {
      // Invalider la query "games" pour rafraîchir la liste
      queryClient.invalidateQueries({ queryKey: ["games"] });
      
      reset();
    },
  });

  const onSubmit = (formData) => {
    console.log(formData);
    mutate({
      name: formData.name,
      platform: formData.platform,
      genre: formData.genre,
    });
    navigate("/");
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
        <button type="submit">Create Game</button>
      </form>
    </div>
  );
}
