"use client";

import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

const initialState = {
  user: null,                 // { username, role }
  step: "PRETEST",            // PRETEST | VIDEO | POSTTEST
  pretestScore: null,
  posttestScore: null,
  videoCompleted: false,
};

export function AuthProvider({ children }) {
  const [state, setState] = useState(initialState);
  const [loading, setLoading] = useState(true); // 👈 ADD THIS

  // Restore from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("lms-state");

    if (saved) {
      setState(JSON.parse(saved));
    }

    setLoading(false); // 👈 hydration complete
  }, []);

  // Persist to localStorage (after hydration)
  useEffect(() => {
    if (loading) return;

    localStorage.setItem("lms-state", JSON.stringify(state));
  }, [state, loading]);

  const login = (username, role) => {
    setState(prev => ({
      ...prev,
      user: { username, role },
      step: "PRETEST",
    }));
  };

const logout = () => {
  localStorage.removeItem("lms-state");
  localStorage.removeItem("pre-test-progress");
  localStorage.removeItem("post-test-progress");
  localStorage.removeItem("vimeo-progress-676247342"); 

  localStorage.removeItem("lms-questions");

  setState(initialState);
};


  return (
    <AuthContext.Provider
      value={{
        ...state,
        setState,
        login,
        logout,
        loading, 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
