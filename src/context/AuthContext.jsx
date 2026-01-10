"use client";

import { createContext, useContext, useEffect, useState } from "react";   //cr global state, read state any, run side effect(load,save), store data

const AuthContext = createContext(null);          // global container that any component can read from using useAuth()

const initialState = {
  user: null,                 // { username, role }
  step: "PRETEST",            // PRETEST | VIDEO | POSTTEST
  pretestScore: null,
  posttestScore: null,
  videoCompleted: false,
};

export function AuthProvider({ children }) {
  const [state, setState] = useState(initialState);
  const [loading, setLoading] = useState(true); 


  // Restore from localStorage
useEffect(() => {
  const saved = localStorage.getItem("lms-state");

  if (saved) {
    try {
      const parsed = JSON.parse(saved);

      const validSteps = ["PRETEST", "VIDEO", "POSTTEST"];

      setState({
        ...initialState,
        ...parsed,
        step: validSteps.includes(parsed.step)
          ? parsed.step
          : "PRETEST",
      });
    } catch {
      setState(initialState);
    }
  }

  setLoading(false);
}, []);                   //  empty dependency array [] means: “Never run this again.”


// Persist to localStorage 
  useEffect(() => {
    if (loading) return;                                          // still loading, exit immediately. prevents the rest of the code from running when conditions aren’t safe yet.

    localStorage.setItem("lms-state", JSON.stringify(state));
  }, [state, loading]);



  const login = (username, role) => {
    setState(prev => ({
      ...prev,                                                  // spread prev so we're copying the existing app state and only updating user; otherwise the state setter would replace the whole object and we'd lose progress fields like step and scores."
      user: { username, role },
 
      step: prev.step ?? "PRETEST",                             // keep the current step if it was persisted; default to PRETEST only if unset
    }));
  };

  const logout = () => {
    setState(prev => ({ ...prev, user: null }));                    // keep progress and step, only clear the user object
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
