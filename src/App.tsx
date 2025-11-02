import { useUser } from "./context/UserContext";
import Auth from "./components/Auth";

function App() {
  const { user, loading, signOut } = useUser();

  if (loading) return <p className="text-center mt-20">Loading...</p>;

  if (!user) return <Auth />;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-50">
      <h1 className="text-2xl font-bold mb-2">Welcome, {user.email}</h1>
      <button
        onClick={signOut}
        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
      >
        Sign Out
      </button>
    </div>
  );
}

export default App;
