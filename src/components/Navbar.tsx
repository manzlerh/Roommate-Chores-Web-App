import { Link } from "react-router-dom";
import { useUser } from "../context/UserContext";

export default function Navbar() {
  const { user } = useUser();

  return (
    <nav className="flex justify-between items-center bg-gray-100 p-4 shadow">
      <h1 className="font-bold text-lg">🏠 Chores App</h1>
      <div className="flex gap-4">
        <Link to="/">Home</Link>
        {user && <Link to="/profile">Profile</Link>}
      </div>
    </nav>
  );
}
