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
      <div className="min-h-screen flex items-center justify-center text-[50px] text-white">
        Loading…
      </div>
    );
  }

  if (!user) {
    return <Login />;
  }

  // ADMIN
  if (user.role === "ADMIN") {
    return <Admin />;
  }

  // USER FLOW ONLY
  return (
    <>
      {step === "PRETEST" && <Pretest />}
      {step === "VIDEO" && <VideoPlayer />}
      {step === "POSTTEST" && <Posttest />}
    </>
  );
}
















// component uses a state-driven, declarative approach where UI output
// is a pure function of state, with conditional rendering used to enforce
// authentication, role-based access, and step-by-step workflow progression.
