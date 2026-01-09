import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreateGame from "./pages/CreateGame";
import UpdateGame from "./pages/UpdateGame";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import { useThemeStore } from "./store/useThemeStore";

function App() {
  // Utilisation du store pour le thème dark mode //
  const { theme } = useThemeStore();
  // Utilisation du useEffect pour basculer le thème dark mode //
  // On utilise le useEffect pour que le thème soit basculé lorsque le composant est monté //
  useEffect(() => {
    // Appliquer la classe à l'élément html pour que les variables CSS fonctionnent globalement
    document.documentElement.classList.remove("light-mode", "dark-mode");
    document.documentElement.classList.add(`${theme}-mode`);

    // Aussi appliquer au body pour la compatibilité
    document.body.classList.remove("light-mode", "dark-mode");
    document.body.classList.add(`${theme}-mode`);
  }, [theme]);

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreateGame />} />
        <Route path="/update/:id" element={<UpdateGame />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
