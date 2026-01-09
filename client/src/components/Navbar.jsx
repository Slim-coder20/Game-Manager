import react from "react";
import { Link } from "react-router-dom";
import { useThemeStore } from "../store/useThemeStore";
export default function Navbar() {
  // Utilisation du store pour le thème dark mode //
  const { theme, toggleTheme } = useThemeStore(); 
  
  // Fonction pour basculer le thème dark mode // 
  const isDarkMode = theme === "dark"; 
  
  return (
    // Classe navbar avec la classe dark-mode si le thème est dark // 
    <div className={`navbar ${isDarkMode ? "dark-mode" : ""}`}>
      <div className="navbar-title">
        GameStore
      </div>
      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/create">Add Game</Link>
        
        {/* Toggle pour le thème dark mode avec le store */}
        <label className="theme-switch">
          <input type="checkbox" checked={isDarkMode} onChange={toggleTheme} aria-label="Toggle theme"/>
          <span className="slider round"></span>
        </label>
      </div>
    
    </div>
  );
}
