"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Heart, HeartOff } from "lucide-react"; // icon trái tim

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
  const [showPopover, setShowPopover] = useState(true);

  useEffect(() => {
    // Tự động ẩn popover sau 3 giây
    const timer = setTimeout(() => setShowPopover(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (autoPlay && audioRef.current) {
      // Autoplay có thể bị chặn trên iOS/Chrome
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

      {/* Popover hướng dẫn bật nhạc */}
      {showPopover && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="fixed bottom-20 right-6 z-50 bg-white text-black text-sm px-3 py-2 rounded-lg shadow-lg border"
        >
          Nhấn để bật nhạc nền 🎵
        </motion.div>
      )}

      {/* Nút điều khiển */}
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={togglePlay}
        title={playing ? "Tắt nhạc" : "Bật nhạc"}
        className="fixed bottom-6 right-6 z-50 rounded-full bg-red-700 p-3 text-white shadow-lg hover:bg-red-600 transition"
      >
        {playing ? <Heart size={22} /> : <HeartOff size={22} />}
      </motion.button>
    </>
  );
}
