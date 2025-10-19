"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react"; // cần: pnpm add lucide-react

export default function BackgroundMusic({
  src = "/audio/background.mp3",
  autoPlay = true,
  loop = true,
}: {
  src?: string;
  autoPlay?: boolean;
  loop?: boolean;
}) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(autoPlay);

  useEffect(() => {
    if (autoPlay && audioRef.current) {
      // iOS/Chrome sẽ chặn autoplay => cần thao tác người dùng
      const playPromise = audioRef.current.play();
      if (playPromise) {
        playPromise.catch(() => setPlaying(false));
      }
    }
  }, [autoPlay]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      audioRef.current.play();
      setPlaying(true);
    }
  };

  return (
    <>
      <audio ref={audioRef} src={src} loop={loop} />
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={togglePlay}
        title={playing ? "Tắt nhạc" : "Bật nhạc"}
        className="fixed bottom-6 right-6 z-50 rounded-full bg-black backdrop-blur-lg p-3 text-white hover:bg-gray-200 hover:text-black transition"
      >
        {playing ? <Volume2 size={22} /> : <VolumeX size={22} />}
      </motion.button>
    </>
  );
}
