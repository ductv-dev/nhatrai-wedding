"use client";

import { PixelImage } from "@/components/ui/pixel-image";
import { motion, type Variants } from "framer-motion";
import CountdownSection from "./sections/CountdownSection";

export const HomePage: React.FC = () => {
  const weddingISO = "2025-11-29T10:30:00+07:00";
  const accentColor = "#b14d4d";

  const containerV: Variants = {
    hidden: { opacity: 0, y: 16 },
    show: {
      opacity: 1,
      y: 0,
      transition: { when: "beforeChildren", staggerChildren: 0.12 },
    },
  };

  const itemV: Variants = {
    hidden: { opacity: 0, y: 8 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  const infoCardV: Variants = {
    hidden: { opacity: 0, y: 40 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 28,
        delay: 0,
        when: "beforeChildren",
        staggerChildren: 0.12,
      },
    },
  };

  return (
    <div className="mx-auto max-w-xl min-h-screen bg-[#752323]">
      {/* === Thiệp mời === */}
      <motion.section
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
        variants={containerV}
        className="relative mx-auto w-full p-4 text-center"
      >
        <motion.h1
          variants={itemV}
          className="text-xl sm:text-2xl mb-3 text-white"
        >
          Save the date | 29 November 2025
        </motion.h1>

        <motion.div
          variants={itemV}
          className="mt-6 text-[clamp(26px,6vw,42px)] text-white"
          style={{
            fontFamily: "Great Vibes, cursive",
          }}
        >
          Viết Đức &amp; Ngọc Anh
        </motion.div>
      </motion.section>

      {/* === Ảnh cưới === */}
      <div className="relative max-w-xl mx-auto px-6">
        <PixelImage
          src="/images/1_doc.jpg"
          responsive
          aspectRatio={0.8}
          rounded={12}
        />
      </div>

      {/* === Thông tin hai họ === */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
        variants={infoCardV}
        className="relative mt-14 w-full bg-white/95 border border-white/70
                  shadow-md  px-5  py-6 text-center"
      >
        <motion.div variants={containerV} className="grid grid-cols-2 gap-2">
          {/* Nhà trai */}
          <motion.div variants={itemV}>
            <h3
              className="font-semibold text-gray-800 text-[clamp(15px,3.6vw,18px)]"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              Nhà trai
            </h3>
            <p className="text-[13px] sm:text-sm text-gray-700">
              Ông Trần Viết Tỵ
            </p>
            <p className="text-[13px] sm:text-sm text-gray-700">
              Bà Nguyễn Thị Dung
            </p>
            <p className="text-[12px] sm:text-xs text-gray-600 mt-1">
              Quyết Thắng, Trường Sơn, Quảng Trị
            </p>

            <motion.img
              src="/images/1_doc.jpg"
              alt="Chú rể"
              className="mt-3 mx-auto w-35 h-35 rounded-full object-cover ring-2 ring-gray-200"
              whileHover={{ scale: 1.04 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
            />

            <p
              className="mt-2 text-[clamp(14px,4vw,17px)]"
              style={{ fontFamily: "Great Vibes, cursive", color: accentColor }}
            >
              Chú rể
            </p>
            <p
              className="text-[clamp(15px,4.6vw,19px)]"
              style={{ fontFamily: "Great Vibes, cursive" }}
            >
              Trần Viết Đức
            </p>
          </motion.div>

          {/* Nhà gái */}
          <motion.div variants={itemV}>
            <h3
              className="font-semibold text-gray-800 text-[clamp(15px,3.6vw,18px)]"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              Nhà gái
            </h3>
            <p className="text-[13px] sm:text-sm text-gray-700">
              Ông Đinh Văn Hạnh
            </p>
            <p className="text-[13px] sm:text-sm text-gray-700">
              Bà Phạm Thị Nõn
            </p>
            <p className="text-[12px] sm:text-xs text-gray-600 mt-1">
              Tân Bình, Chương Mỹ, TP.Hà Nội
            </p>

            <motion.img
              src="/images/1_doc.jpg"
              alt="Cô dâu"
              className="mt-3 mx-auto w-35 h-35 rounded-full object-cover ring-2 ring-gray-200"
              whileHover={{ scale: 1.04 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
            />

            <p
              className="mt-2 text-[clamp(14px,4vw,17px)]"
              style={{ fontFamily: "Great Vibes, cursive", color: accentColor }}
            >
              Cô dâu
            </p>
            <p
              className="text-[clamp(15px,4.6vw,19px)]"
              style={{ fontFamily: "Great Vibes, cursive" }}
            >
              Đinh Thị Ngọc Anh
            </p>
          </motion.div>
        </motion.div>

        {/* Dấu & */}
        <motion.span
          variants={itemV}
          className="absolute left-1/2 top-[52%] -translate-x-1/2 text-[42px]"
          style={{ fontFamily: "Great Vibes, cursive", color: accentColor }}
        >
          &
        </motion.span>

        {/* Dòng kết */}
        <motion.p
          variants={itemV}
          className="mt-6 text-xs sm:text-sm text-gray-700"
          style={{ fontFamily: "Be Vietnam Pro, sans-serif" }}
        >
          — Hân hoan chào đón quý khách đến chung vui —
        </motion.p>
      </motion.div>

      {/* === Countdown === */}
      <CountdownSection targetISO={weddingISO} title="" />
    </div>
  );
};
