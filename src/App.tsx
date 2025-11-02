import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useUser } from "./context/UserContext";
import ProfileSettings from "./components/ProfileSettings";
import Home from "./pages/Home.tsx"; // we'll create this in a moment
import Navbar from "./components/Navbar"; // optional, for navigation

export default function App() {
  const { user, loading } = useUser();

  if (loading) return <p>Loading...</p>;

  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Redirect unauthenticated users to home (sign-in) page */}
        <Route path="/" element={<Home />} />
        <Route
          path="/profile"
          element={user ? <ProfileSettings /> : <Navigate to="/" />}
        />
        {/* Add more pages as you build them */}
      </Routes>
    </Router>
  );
}
