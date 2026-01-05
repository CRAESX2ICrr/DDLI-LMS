"use client";

import { useState, useRef } from "react";
import Player from "@vimeo/player";

const VIDEO_PROGRESS_KEY = "vimeo-progress-676247342";

export default function useVideoProgress() {
  const playerRef = useRef(null);

  const [isReady, setIsReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [hasEnded, setHasEnded] = useState(false);

  const initPlayer = async (container) => {
    if (playerRef.current) return;

    const player = new Player(container, {
      url: "https://player.vimeo.com/video/676247342",
      autoplay: true,
      controls: false,
      responsive: true,
    });

    playerRef.current = player;

    // WAIT FOR PLAYER TO BE READY
    await player.ready();
    setIsReady(true);

    const dur = await player.getDuration();
    setDuration(dur);

    const saved = localStorage.getItem(VIDEO_PROGRESS_KEY);
    if (saved) {
      const { time } = JSON.parse(saved);
      const safeTime = Math.min(time, dur - 0.5);
      await player.setCurrentTime(safeTime);
      setCurrentTime(safeTime);
    }

    player.on("play", () => setIsPlaying(true));
    player.on("pause", () => setIsPlaying(false));

    player.on("timeupdate", (e) => {
      setCurrentTime(e.seconds);
      localStorage.setItem(
        VIDEO_PROGRESS_KEY,
        JSON.stringify({ time: e.seconds })
      );
    });

    player.on("ended", () => {
      setHasEnded(true);
      setIsPlaying(false);
      localStorage.removeItem(VIDEO_PROGRESS_KEY);
    });
  };

const togglePlay = async () => {
  const player = playerRef.current;
  if (!player || !isReady) return;

  const isPaused = await player.getPaused();
  isPaused ? await player.play() : await player.pause();
};

  const restart = async () => {
    const player = playerRef.current;
    if (!player || !isReady) return;

    await player.setCurrentTime(0);
    await player.play();
    setHasEnded(false);
  };

  const seekBack = async () => {
    const player = playerRef.current;
    if (!player || !isReady) return;

    const newTime = Math.max(currentTime - 15, 0);
    await player.setCurrentTime(newTime);
  };

  const formatTime = (t) =>
    `${Math.floor(t / 60)}:${String(Math.floor(t % 60)).padStart(2, "0")}`;

  return {
    isPlaying,
    currentTime,
    duration,
    hasEnded,
    initPlayer,
    togglePlay,
    restart,
    seekBack,
    formatTime,
  };
}
