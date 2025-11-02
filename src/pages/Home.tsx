import { useUser } from "../context/UserContext";

export default function Home() {
  const { user, signInWithEmail, signOut } = useUser();

  return (
    <div className="p-6 text-center">
      <h1 className="text-2xl font-bold mb-4">Roommates Chores App</h1>

      {!user ? (
        <>
          <p className="mb-2">Sign in to start tracking chores:</p>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            className="border p-2 rounded mb-2"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                signInWithEmail((e.target as HTMLInputElement).value);
              }
            }}
          />
        </>
      ) : (
        <>
          <p>Welcome, {user.email || "User"}!</p>
          <button
            onClick={signOut}
            className="bg-red-500 text-white px-4 py-2 rounded mt-4"
          >
            Sign Out
          </button>
        </>
      )}
    </div>
  );
}
