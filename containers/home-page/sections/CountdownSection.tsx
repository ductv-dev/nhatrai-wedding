"use client";

import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function getTimeLeft(to: Date): TimeLeft {
  const diff = Math.max(0, to.getTime() - Date.now());
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds };
}

export default function CountdownSection({
  targetISO,
  title = "Đếm ngược tới ngày cưới",
  note,
}: {
  targetISO: string;
  title?: string;
  note?: string;
}) {
  const target = useMemo(() => new Date(targetISO), [targetISO]);
  const [left, setLeft] = useState<TimeLeft>(() => getTimeLeft(target));

  useEffect(() => {
    const id = setInterval(() => setLeft(getTimeLeft(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  return (
    <section className="container mx-auto px-4 sm:px-6 text-center font-[PlayfairDisplay]">
      {/* Tiêu đề */}
      <h2 className="text-xl sm:text-3xl md:text-4xl mb-6 sm:mb-8 font-light tracking-wide text-[#b14d4d]">
        {title}
      </h2>

      {/* Lưới số đếm */}
      <div className="mx-auto grid max-w-2xl grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-5">
        <Card label="Ngày" value={left.days} />
        <Card label="Giờ" value={left.hours} />
        <Card label="Phút" value={left.minutes} />
        <Card label="Giây" value={left.seconds} />
      </div>

      {note && (
        <p className="mt-6 sm:mt-8 text-xs sm:text-base italic text-gray-600">
          {note}
        </p>
      )}
    </section>
  );
}

function Card({ label, value }: { label: string; value: number }) {
  return (
    <div className="relative rounded-xl sm:rounded-2xl border border-[#b14d4d]/30 bg-white backdrop-blur-md px-4 py-4 sm:px-5 sm:py-6 shadow-sm hover:shadow-md transition-all duration-500">
      <div
        className="font-light tabular-nums text-[#b14d4d] flex justify-center items-center
                      text-[clamp(22px,9.5vw,40px)] sm:text-[clamp(28px,5vw,48px)]"
      >
        <AnimatePresence mode="popLayout">
          <motion.span
            key={value}
            initial={{ opacity: 0, y: 18, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -18, scale: 0.92 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            {value}
          </motion.span>
        </AnimatePresence>
      </div>
      <div className="mt-1.5 sm:mt-2 text-[clamp(10px,3.6vw,14px)] sm:text-[clamp(12px,2.2vw,16px)] text-gray-700 tracking-wide">
        {label}
      </div>
    </div>
  );
}
