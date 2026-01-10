"use client";

import { useAuth } from "@/context/AuthContext";

export default function Header() {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();     // resets state + localStorage
  };

  return (
    <header className="w-full bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e]">
      <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
      <div className="flex items-baseline gap-2">
        <h1 className="text-white text-xl font-semibold tracking-wider">
          QUIZZLY
        </h1>
        <h2 className="hidden sm:block text-xs font-normal text-indigo-200/70">   {/* Hidden on mobile */ }
          by Clayton Pereira
        </h2>
      </div>


        {user && (
          <div className="flex items-center gap-4 text-sm text-white/90">

            <span className="whitespace-nowrap">
              Hello <strong>{user.username}</strong>
              <span className="hidden sm:inline">
                  {" "}· Role: 
                <strong>{user.role}</strong>
              </span>
            </span>


            <button
              onClick={handleLogout}
              className="bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-md transition"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
