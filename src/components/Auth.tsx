import { useState } from "react";
import { useUser } from "../context/UserContext";

export default function Auth() {
  const { signInWithEmail } = useUser();
  const [email, setEmail] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await signInWithEmail(email);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">Roommates Chores</h1>
      <form onSubmit={handleLogin} className="w-80 bg-white p-6 rounded-2xl shadow">
        <p className="mb-2 text-gray-600 text-center">Sign in with your email:</p>
        <input
          className="w-full border border-gray-300 rounded-lg p-2 mb-4"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white rounded-lg py-2 font-semibold hover:bg-blue-700"
        >
          Send Magic Link
        </button>
      </form>
    </div>
  );
}
