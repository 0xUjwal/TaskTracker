import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { ThemeContext } from "../context/ThemeContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const { darkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h2>TaskTracker</h2>
      </div>
      <div className="navbar-right">
        <button className="theme-toggle" onClick={toggleTheme} title="Toggle theme">
          {darkMode ? "☀️" : "🌙"}
        </button>
        {user && (
          <>
            <span className="navbar-user">Hi, {user.name}</span>
            <button className="btn btn-outline" onClick={logout}>
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
