import react from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="navbar">
      <div className="navbar-title">
        GameStore
      </div>
      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/create">Add Game</Link>
        
      </div>
      {/* <div className="navbar-toggle">
        <button className="theme-switch">
          <span className="slider round"></span>
        </button>
      </div> */}
    </div>
  );
}
