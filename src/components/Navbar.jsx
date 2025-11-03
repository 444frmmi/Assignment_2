import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  const linkClass = (path) =>
    `px-3 py-2 rounded-md transition ${
      location.pathname === path
        ? "bg-white text-pink-400 shadow-md"
        : "text-white hover:bg-white hover:text-pink-400 "
    }`;

  return (
    <header className="bg-pink-300  backdrop-blur-md shadow-md sticky top-0 z-10">
      <div className="max-w-6xl mx-auto flex items-center justify-between p-4">
        <Link to="/" className="text-2xl font-bold text-white tracking-wide">
           Drone Dashboard
        </Link>
        <nav className="flex gap-3">
          <Link to="/" className={linkClass("/")}>
            Config
          </Link>
          <Link to="/add-log" className={linkClass("/add-log")}>
            Add Log
          </Link>
          <Link to="/logs" className={linkClass("/logs")}>
            Logs
          </Link>
        </nav>
      </div>
    </header>
  );
}
