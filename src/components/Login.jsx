"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

export default function Login() {
  const { login } = useAuth(); 

  const [role, setRole] = useState("USER");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    // ADMIN LOGIN
    if (role === "ADMIN") {
      if (username === "adminer" && password === "admin1234") {
        setError("");
        login(username, "ADMIN");
        return;
      } else {
        setError("Invalid admin credentials");
        return;
      }
    }

    // USER LOGIN
    if (role === "USER") {
      if (username.toLowerCase() === "clayton" && password === "12345678") {
        setError("");
        login(username, "USER");
        return;
      } else {
        setError("Invalid username or password");
        return;
      }
    }
  };

  return (
    <div className="min-h-[calc(100vh-72px)] flex items-center justify-center">
      <div className="w-full max-w-md min-h-[500px] rounded-3xl bg-gradient-to-br from-[#18144a] via-[#3a3478] to-[#2b2b55] shadow-2xl p-10 border border-white/10 flex flex-col justify-center">

        <h2 className="text-2xl font-semibold text-white text-center mb-1">
          Welcome to QUIZZLY
        </h2>
        <p className="text-sm text-indigo-200/80 text-center mb-8">
          Sign in to continue
        </p>

        {/* Role Toggle */}
        <div className="flex justify-center mb-8">
          <div className="flex rounded-full bg-black/30 p-1 border border-white/10">
            <button
              onClick={() => setRole("USER")}
              className={`px-6 py-2 rounded-full text-sm transition ${
                role === "USER"
                  ? "bg-white/20 text-white"
                  : "text-indigo-200 hover:text-white"
              }`}
            >
              User
            </button>

            <button
              onClick={() => setRole("ADMIN")}
              className={`px-6 py-2 rounded-full text-sm transition ${
                role === "ADMIN"
                  ? "bg-white/20 text-white"
                  : "text-indigo-200 hover:text-white"
              }`}
            >
              Admin
            </button>
          </div>
        </div>

        {/* Credentials */}
        <div className="space-y-4">
          <input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full rounded-lg bg-black/30 px-4 py-2.5 text-white placeholder-indigo-200/60 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg bg-black/30 px-4 py-2.5 text-white placeholder-indigo-200/60 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {error && (
          <p className="mt-4 text-sm text-red-400 text-center">{error}</p>
        )}

        <button
          onClick={handleLogin}
          className="mt-8 mx-auto block px-10 py-2 rounded-full bg-indigo-600 text-sm font-medium text-white shadow-lg shadow-indigo-600/30 hover:bg-indigo-500 transition"
        >
          Login as {role}
        </button>
      </div>
    </div>
  );
}
