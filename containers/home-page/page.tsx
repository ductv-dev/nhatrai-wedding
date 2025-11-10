"use client";

import { PixelImage } from "@/components/ui/pixel-image";
import { motion, MotionConfig, useReducedMotion } from "framer-motion";
import CountdownSection from "./sections/CountdownSection";
import React, { useMemo } from "react";
import BackgroundMusic from "@/components/ui/music";
import data from "../../data.json";
export const HomePage = () => {
  const tt = data;
  const weddingISO = tt.thong_tin_nha_trai.thoi_gian;
  const prefersReduced = useReducedMotion();
  const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
  const ACCENT = "#7b2323";
  const accentColor = "#b14d4d";

  // ... phía trên giữ nguyên
  const albumImages = [
    "/images/2doc.jpg",
    "/images/1.jpg",
    "/images/5.jpg",
    "/images/4.jpg",
    "/images/2.jpg",
    "/images/3.jpg",
  ];

  const [lbOpen, setLbOpen] = React.useState(false);
  const [lbIndex, setLbIndex] = React.useState(0);

  React.useEffect(() => {
    if (!lbOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLbOpen(false);
      if (e.key === "ArrowRight")
        setLbIndex((p) => (p + 1) % albumImages.length);
      if (e.key === "ArrowLeft")
        setLbIndex((p) => (p - 1 + albumImages.length) % albumImages.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lbOpen, albumImages.length]);

  // Calendar data (gộp tại chỗ)
  const d = useMemo(() => new Date(weddingISO), [weddingISO]);
  const year = d.getFullYear();
  const month = d.getMonth();
  const day = d.getDate();
  const firstDay = new Date(year, month, 1);
  const lead = (firstDay.getDay() + 6) % 7; // Sun->6, Mon->0
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells = Array.from({ length: lead + daysInMonth }, (_, i) =>
    i < lead ? null : i - lead + 1
  );
  const weekday = [
    "Chủ Nhật",
    "Thứ Hai",
    "Thứ Ba",
    "Thứ Tư",
    "Thứ Năm",
    "Thứ Sáu",
    "Thứ Bảy",
  ][d.getDay()];
  const mm = month + 1;

  return (
    <MotionConfig
      transition={{ duration: prefersReduced ? 0 : 0.55, ease: EASE }}
    >
      <div className="mx-auto max-w-xl min-h-screen bg-[#752323]">
        {/* === Thiệp mời === */}
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.45 }}
          transition={{ delay: 0.0 }}
          className="relative mx-auto w-full p-4 text-center"
        >
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.45 }}
            transition={{ duration: 0.55, ease: EASE, delay: 0.02 }}
            className="mb-3 text-white text-[clamp(18px,3.6vw,22px)] tracking-[0.02em]"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            Save the date | {tt.thong_tin_nha_trai.ngay_to_chuc_eng}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.45 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.08 }}
            className="mt-2 text-white text-[clamp(32px,7vw,52px)] leading-[1.05]"
            style={{ fontFamily: "Great Vibes, cursive" }}
          >
            Viết Đức &amp; Ngọc Anh
          </motion.div>
        </motion.section>

        {/* === Ảnh cưới === */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.35 }}
          transition={{ delay: 0.05 }}
          className="relative max-w-xl mx-auto px-6"
        >
          <PixelImage
            src="/images/6doc.jpg"
            responsive
            aspectRatio={0.8}
            rounded={12}
          />
        </motion.div>

        {/* === Thông tin hai họ === */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.35 }}
          transition={{ type: "spring", stiffness: 160, damping: 26 }}
          className="relative mt-14 w-full bg-white/95 border border-white/70 shadow-md px-5 py-6 text-center"
        >
          <div className="grid grid-cols-2 gap-2">
            {/* Nhà trai */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.35 }}
              transition={{ duration: 0.55, ease: EASE, delay: 0.06 }}
            >
              <h3
                className="font-semibold text-gray-800 text-[clamp(16px,3.6vw,18px)] tracking-[0.01em]"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                Nhà trai
              </h3>
              <p
                className="text-[13px] sm:text-sm text-gray-700"
                style={{ fontFamily: "Be Vietnam Pro, sans-serif" }}
              >
                Ông {tt.thong_tin_nha_trai.ten_ba}
              </p>
              <p
                className="text-[13px] sm:text-sm text-gray-700"
                style={{ fontFamily: "Be Vietnam Pro, sans-serif" }}
              >
                Bà {tt.thong_tin_nha_trai.ten_me}
              </p>
              <p
                className="text-[12px] sm:text-xs text-gray-600 mt-1"
                style={{ fontFamily: "Be Vietnam Pro, sans-serif" }}
              >
                {tt.thong_tin_nha_trai.dia_chi.thon},{" "}
                {tt.thong_tin_nha_trai.dia_chi.huyen}
                <br />
                {tt.thong_tin_nha_trai.dia_chi.tinh}
              </p>

              <motion.img
                src="/images/main_nam.jpg"
                alt="Chú rể"
                className="mt-3 mx-auto w-36 h-36 rounded-full object-cover ring-2 ring-gray-200"
                whileHover={{ scale: 1.04 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
              />

              <p
                className="mt-2 text-[clamp(15px,4vw,18px)]"
                style={{
                  fontFamily: "Great Vibes, cursive",
                  color: accentColor,
                }}
              >
                Chú rể
              </p>
              <p
                className="text-[clamp(16px,4.6vw,20px)] leading-tight"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                Trần Viết Đức
              </p>
            </motion.div>

            {/* Nhà gái */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.35 }}
              transition={{ duration: 0.55, ease: EASE, delay: 0.12 }}
            >
              <h3
                className="font-semibold text-gray-800 text-[clamp(16px,3.6vw,18px)] tracking-[0.01em]"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                Nhà gái
              </h3>
              <p
                className="text-[13px] sm:text-sm text-gray-700"
                style={{ fontFamily: "Be Vietnam Pro, sans-serif" }}
              >
                Ông {tt.thong_tin_nha_gai.ten_ba}
              </p>
              <p
                className="text-[13px] sm:text-sm text-gray-700"
                style={{ fontFamily: "Be Vietnam Pro, sans-serif" }}
              >
                Bà {tt.thong_tin_nha_gai.ten_me}
              </p>
              <p
                className="text-[12px] sm:text-xs text-gray-600 mt-1"
                style={{ fontFamily: "Be Vietnam Pro, sans-serif" }}
              >
                {tt.thong_tin_nha_gai.dia_chi.thon},{" "}
                {tt.thong_tin_nha_gai.dia_chi.huyen}
                <br />
                {tt.thong_tin_nha_gai.dia_chi.tinh}
              </p>

              {/* eslint-disable-next-line @next/next/no-img-element */}
              <motion.img
                src="/images/main_nu.jpg"
                alt="Cô dâu"
                className="mt-3 mx-auto w-36 h-36 rounded-full object-cover ring-2 ring-gray-200"
                whileHover={{ scale: 1.04 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
              />

              <p
                className="mt-2 text-[clamp(15px,4vw,18px)]"
                style={{
                  fontFamily: "Great Vibes, cursive",
                  color: accentColor,
                }}
              >
                Cô dâu
              </p>
              <p
                className="text-[clamp(16px,4.6vw,20px)] leading-tight"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                Đinh Thị Ngọc Anh
              </p>
            </motion.div>
          </div>

          {/* Dấu & */}
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.35 }}
            transition={{ duration: 0.55, ease: EASE, delay: 0.18 }}
            className="absolute left-1/2 top-[52%] -translate-x-1/2 text-[42px]"
            style={{ fontFamily: "Great Vibes, cursive", color: accentColor }}
          >
            &
          </motion.span>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.35 }}
            transition={{ duration: 0.55, ease: EASE, delay: 0.22 }}
            className="mt-6 text-xs sm:text-sm text-gray-700"
            style={{ fontFamily: "Be Vietnam Pro, sans-serif" }}
          >
            — Hân hoan chào đón quý khách đến chung vui —
          </motion.p>
        </motion.div>

        {/* === Countdown === */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.35 }}
          transition={{ delay: 0.05 }}
        >
          <CountdownSection targetISO={weddingISO} title="" />
        </motion.div>

        {/* === Thiệp mời + Lịch tháng (GỘP) === */}
        <motion.section
          className="mx-auto max-w-xl px-4 mt-10 text-center"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.35 }}
          transition={{ delay: 0 }}
        >
          {/* Tiêu đề */}
          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.35 }}
            transition={{ duration: 0.55, ease: EASE, delay: 0.02 }}
            className="text-[clamp(24px,7vw,36px)] mb-3 text-white leading-[1.08]"
            style={{ fontFamily: "Great Vibes, cursive" }}
          >
            Trân Trọng Kính Mời
          </motion.h3>

          {/* 3 ảnh */}
          <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-8">
            {["/images/1_doc.jpg", "/images/3.jpg", "/images/1.jpg"].map(
              (src, i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <motion.img
                  key={i}
                  src={src}
                  alt={`photo-${i + 1}`}
                  className="w-full aspect-[3/4] object-cover rounded-md shadow"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.35 }}
                  transition={{
                    duration: 0.55,
                    ease: EASE,
                    delay: 0.06 + i * 0.08,
                  }}
                />
              )
            )}
          </div>

          {/* Khối giờ giấc */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.35 }}
            transition={{ delay: 0.08 }}
            className="text-[#fff] leading-relaxed"
          >
            <p
              className="tracking-wide text-[13px] sm:text-[15px]"
              style={{ fontFamily: "Be Vietnam Pro, sans-serif" }}
            >
              Thời gian trôi, tình yêu đong đầy <br /> Chúng mình trân trọng
              kính mời bạn đến dự lễ cưới <br /> Cùng chứng kiến lời thề nguyện
              và sẻ chia khoảnh khắc hạnh phúc. Sự hiện diện của bạn sẽ làm ngày
              đặc biệt này thêm rạng ngời
            </p>
            <hr className="w-20 mx-auto mt-1" />
            <p
              className="mt-3 text-[13px] sm:text-[15px]"
              style={{ fontFamily: "Be Vietnam Pro, sans-serif" }}
            >
              Tiệc cưới diễn ra vào lúc
            </p>

            <div className="mt-1 grid grid-cols-3 items-start">
              <div
                className="text-[18px] sm:text-[20px] font-light"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                {d.toLocaleTimeString("vi-VN", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
              <div>
                <div
                  className="text-[15px] sm:text-[16px]"
                  style={{ fontFamily: "Playfair Display, serif" }}
                >
                  {weekday}
                </div>
                <div
                  className="text-[28px] sm:text-[32px] font-semibold"
                  style={{ fontFamily: "Playfair Display, serif" }}
                >
                  {day}
                </div>
                <div
                  className="text-[15px] sm:text-[16px]"
                  style={{ fontFamily: "Playfair Display, serif" }}
                >
                  Tháng {mm < 10 ? `0${mm}` : mm}
                </div>
              </div>
              <div
                className="text-[18px] sm:text-[20px] font-light"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                {year}
              </div>
            </div>

            <p
              className="mt-2 text-[12px] sm:text-[14px] italic text-gray-300"
              style={{ fontFamily: "Be Vietnam Pro, sans-serif" }}
            >
              (Nhằm {tt.thong_tin_nha_trai.ngay_am})
            </p>
          </motion.div>

          {/* Lịch tháng */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.35 }}
            transition={{ delay: 0.1 }}
            className="mt-6 rounded-xl border border-gray-300 overflow-hidden"
          >
            <div
              className="px-4 py-2 text-left text-white text-[16px] sm:text-[18px]"
              style={{
                backgroundColor: ACCENT,
                fontFamily: "Playfair Display, serif",
              }}
            >
              {mm < 10 ? `0${mm}` : mm}.{year}
            </div>

            <div className="relative p-3 sm:p-4 bg-white">
              {/* Watermark năm */}
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center text-[80px] sm:text-[120px] font-semibold text-gray-200/40 select-none">
                {year}
              </div>

              {/* Header Mon-Sun */}
              <div className="grid grid-cols-7 gap-2 text-[10px] sm:text-xs font-medium text-gray-600 mb-2">
                {["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"].map(
                  (w, i) => (
                    <motion.div
                      key={w}
                      initial={{ opacity: 0, y: 8 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: false, amount: 0.35 }}
                      transition={{
                        duration: 0.45,
                        ease: EASE,
                        delay: 0.04 + i * 0.05,
                      }}
                      className="text-center"
                      style={{ fontFamily: "Be Vietnam Pro, sans-serif" }}
                    >
                      {w}
                    </motion.div>
                  )
                )}
              </div>

              {/* Ngày */}
              <div className="grid grid-cols-7 gap-2 relative">
                {cells.map((num, idx) => {
                  const isActive = num === day;
                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 8 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: false, amount: 0.25 }}
                      transition={{
                        duration: 0.45,
                        ease: EASE,
                        delay: 0.06 + idx * 0.01,
                      }}
                      className="h-8 sm:h-9 flex items-center justify-center text-[12px] sm:text-[13px] relative"
                      style={{ fontFamily: "Be Vietnam Pro, sans-serif" }}
                    >
                      {num && (
                        <>
                          <span className="relative z-[1]">{num}</span>
                          {isActive && (
                            <>
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src="/images/hanlove.png"
                                alt="mark"
                                className="absolute  w-8 sm:w-10 opacity-90 select-none pointer-events-none"
                              />
                              <span
                                className="absolute inset-0 m-auto h-9 w-9 rounded-full border-2"
                                style={{ borderColor: ACCENT, opacity: 0.5 }}
                              />
                            </>
                          )}
                        </>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </motion.section>

        {/* === Địa điểm (map) === */}
        <motion.section
          id="map"
          className="w-full py-6"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.35 }}
          transition={{ delay: 0.06 }}
        >
          {/* Nền trắng sữa nổi bật trên nền đỏ */}
          <div className=" bg-white/95 border border-white/70 shadow-lg  text-center">
            {/* Tiêu đề */}
            <h1
              className="text-[clamp(20px,4vw,26px)] my-2 tracking-wide"
              style={{
                fontFamily: "Playfair Display, serif",
                color: "#7b2323",
              }}
            >
              Địa điểm tổ chức
            </h1>

            {/* Tên địa điểm */}
            <p
              className="text-[15px] sm:text-[16px] font-medium"
              style={{
                fontFamily: "Be Vietnam Pro, sans-serif",
                color: "#b14d4d",
              }}
            >
              {tt.thong_tin_nha_trai.dia_diem.ten}
            </p>
            <p
              className="text-[13px] sm:text-[14px] mb-4"
              style={{
                fontFamily: "Be Vietnam Pro, sans-serif",
                color: "#5a1a1a",
              }}
            >
              {tt.thong_tin_nha_trai.dia_diem.dia_chi_chi_tiet}
            </p>

            {/* Đường ngăn trang trí */}
            <div className="mx-auto mb-5 h-px w-24 bg-[#b14d4d]/50 rounded-full" />

            {/* Khung bản đồ bo góc mềm */}
            <div className="overflow-hidden m-4 rounded-xl border border-gray-200 shadow-inner">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3625.653851129591!2d106.61828307486743!3d17.307418405104666!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3140ab0071e46743%3A0xfe5a06761b8ed340!2zTmjDoCB2xINuIGjDs2EgdGjDtG4gcXV54bq_dCB0aOG6r25n!5e1!3m2!1svi!2s!4v1760901116472!5m2!1svi!2s"
                width="600"
                height="450"
                style={{
                  border: 0,
                  width: "100%",
                  height: "380px",
                  borderRadius: "12px",
                }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Bản đồ địa điểm tổ chức"
              />
            </div>
          </div>
        </motion.section>

        {/* === ALBUM ẢNH === */}
        <motion.section
          className="mx-auto max-w-xl px-4 py-6"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.35 }}
        >
          <div className="rounded-2xl bg-white/95 border border-white/70 shadow-lg p-5 text-center">
            <h2
              className="text-[clamp(20px,4vw,26px)] tracking-wide"
              style={{
                fontFamily: "Playfair Display, serif",
                color: "#7b2323",
              }}
            >
              Album Ảnh
            </h2>
            <p
              className="mt-1 text-[13px] text-gray-700"
              style={{ fontFamily: "Be Vietnam Pro, sans-serif" }}
            >
              Những khoảnh khắc yêu thương của Đức &amp; Ngọc Anh
            </p>

            {/* Lưới ảnh */}
            <div className="mt-5 grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
              {albumImages.map((src, i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <motion.img
                  key={src}
                  src={src}
                  alt={`album-${i + 1}`}
                  className="w-full aspect-[3/4] object-cover rounded-xl shadow-sm cursor-zoom-in"
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.2 }}
                  transition={{
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1],
                    delay: i * 0.04,
                  }}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => {
                    setLbIndex(i);
                    setLbOpen(true);
                  }}
                  loading="lazy"
                />
              ))}
            </div>
          </div>

          {/* LIGHTBOX */}
          {lbOpen && (
            <motion.div
              className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={() => setLbOpen(false)}
            >
              <motion.div
                className="relative max-w-[90vw] max-h-[85vh] rounded-2xl overflow-hidden shadow-2xl"
                initial={{ scale: 0.96, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={albumImages[lbIndex]}
                  alt={`lightbox-${lbIndex + 1}`}
                  className="block max-h-[85vh] max-w-[90vw] object-contain bg-white"
                />

                {/* Nút đóng */}
                <button
                  onClick={() => setLbOpen(false)}
                  className="absolute top-3 right-3 rounded-full bg-black/60 text-white px-3 py-1 text-sm"
                  style={{ fontFamily: "Be Vietnam Pro, sans-serif" }}
                >
                  Đóng
                </button>

                {/* Điều hướng trái/phải */}
                <button
                  onClick={() =>
                    setLbIndex(
                      (p) => (p - 1 + albumImages.length) % albumImages.length
                    )
                  }
                  className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/60 text-white px-3 py-2"
                  aria-label="Ảnh trước"
                >
                  ‹
                </button>
                <button
                  onClick={() =>
                    setLbIndex((p) => (p + 1) % albumImages.length)
                  }
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/60 text-white px-3 py-2"
                  aria-label="Ảnh sau"
                >
                  ›
                </button>

                {/* Chỉ số */}
                <div
                  className="absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-black/60 text-white px-3 py-1 text-xs"
                  style={{ fontFamily: "Be Vietnam Pro, sans-serif" }}
                >
                  {lbIndex + 1} / {albumImages.length}
                </div>
              </motion.div>
            </motion.div>
          )}
        </motion.section>

        {/* === QR (TO & ĐẸP) === */}
        <motion.div
          className="px-4"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.35 }}
          transition={{ delay: 0.06 }}
        >
          <div className="rounded-2xl bg-white/95 border border-white/70 p-6 shadow-lg text-center">
            {/* Thẻ chứa QR */}
            <div className="">
              {/* Ảnh QR */}
              <img
                src={tt.thong_tin_nha_trai.link_qr}
                alt="VietQR"
                width={260}
                height={260}
                className="mx-auto block rounded-lg ring-1 ring-gray-200"
                loading="lazy"
              />

              {/* Tên & thông tin tài khoản */}
              <div className="mt-3">
                <p
                  className="text-[16px] font-semibold tracking-wide"
                  style={{
                    fontFamily: "Playfair Display, serif",
                    color: "#7b2323",
                  }}
                >
                  {tt.thong_tin_nha_trai.ten}
                </p>
                <p
                  className="text-[14px] text-gray-700"
                  style={{ fontFamily: "Be Vietnam Pro, sans-serif" }}
                >
                  STK:{" "}
                  <span className="font-medium text-[#b14d4d]">
                    {tt.thong_tin_nha_trai.stk}
                  </span>{" "}
                  | {tt.thong_tin_nha_trai.ten_ngan_hang}
                </p>
              </div>

              {/* Đường line trang trí nhỏ */}
              <div className="mx-auto mt-4 h-px w-24 bg-[#b14d4d]/50 rounded-full" />
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.45 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.08 }}
          className="mt-2 text-white text-center py-6 text-[clamp(32px,7vw,52px)] leading-[1.05]"
          style={{ fontFamily: "Great Vibes, cursive" }}
        >
          Thank you!
        </motion.div>
        <footer>
          <div className="text-center text-gray-500 text-xs py-4">
            Design by Viết Đức &amp; Ngọc Anh © 2025
          </div>
        </footer>
      </div>

      <BackgroundMusic src="/sounds/nhac.mp3" autoPlay={true} />
    </MotionConfig>
  );
};
