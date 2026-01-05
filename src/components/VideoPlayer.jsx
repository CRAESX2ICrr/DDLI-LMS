"use client";

import { useEffect, useRef } from "react";
import { Play, Pause, RotateCcw, Clock, Rewind } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import useVideoProgress from "@/hooks/useVideoProgress";

export default function VideoPlayer() {
  const { setState } = useAuth();
  const vimeoRef = useRef(null);

  const {
    isPlaying,
    currentTime,
    duration,
    hasEnded,
    initPlayer,
    togglePlay,
    restart,
    seekBack,
    formatTime,
  } = useVideoProgress();

  useEffect(() => {
    if (vimeoRef.current) {
      initPlayer(vimeoRef.current);
    }
  }, []);

  const handleContinue = () => {
    setState(prev => ({
      ...prev,
      videoCompleted: true,
      step: "POSTTEST",
    }));
  };

  return (
    <main className="min-h-[calc(100vh-72px)] flex items-center justify-center px-4">
      <div className="w-full max-w-7xl rounded-3xl bg-gradient-to-br from-[#18144a] via-[#3a3478] to-[#2b2b55] p-6 text-white">

        {/* VIMEO VIDEO */}
        <div className="rounded-xl overflow-hidden mb-2">
          <div ref={vimeoRef} className="w-full h-[550px]" />
        </div>

        {/* CONTROLS */}
        <div className="flex items-center justify-between mb-6 bg-black/20 rounded-2xl px-6 py-2">
          <div className="flex items-center gap-4">
            <button onClick={togglePlay} className="p-3 rounded-full bg-indigo-600">
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            </button>

            <button onClick={restart} className="p-2 rounded-full bg-white/10">
              <RotateCcw size={18} />
            </button>

            <button onClick={seekBack} className="p-2 rounded-full bg-white/10">
              <Rewind size={18} />
            </button>
          </div>

          <div className="flex items-center gap-2 text-sm text-indigo-200">
            <Clock size={16} />
            {formatTime(currentTime)} / {formatTime(duration)}
          </div>
        </div>

        {/* CONTINUE */}
        <div className="text-center">
          <button
            onClick={handleContinue}
            disabled={!hasEnded}
            className={`px-8 py-2 rounded-full ${
              hasEnded
                ? "bg-indigo-600"
                : "bg-white/20 opacity-50 cursor-not-allowed"
            }`}
          >
            Continue to Post-Test
          </button>

          {!hasEnded && (
            <p className="mt-3 text-xs text-indigo-200/70">
              You must watch the entire video to continue
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
