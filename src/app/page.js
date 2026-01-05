"use client";

import Login from "@/components/Login";
import Pretest from "@/components/Pretest";
import Posttest from "@/components/Posttest";
import VideoPlayer from "@/components/VideoPlayer";
import Admin from "@/components/Admin"; 
import { useAuth } from "@/context/AuthContext";

export default function Home() {
  const { user, step, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading…
      </div>
    );
  }

  if (!user) {
    return <Login />;
  }

  // 🔑 ADMIN OVERRIDE (THIS IS THE KEY FIX)
  if (user.role === "ADMIN") {
    return <Admin />;
  }

  // 👇 USER FLOW ONLY
  return (
    <>
      {step === "PRETEST" && <Pretest />}
      {step === "VIDEO" && <VideoPlayer />}
      {step === "POSTTEST" && <Posttest />}
    </>
  );
}
