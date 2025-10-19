"use client";

import { motion } from "framer-motion";
import React, { useMemo } from "react";

const ACCENT = "#7b2323"; // cùng tông nền của bạn (#752323 gần giống)

export default function InviteCalendarSection({
  dateISO = "2025-10-26T10:00:00+07:00",
  lunarNote = "(Nhằm ngày 6 tháng 9 năm Ất Tỵ)",
  photos = ["/images/p1.jpg", "/images/p2.jpg", "/images/p3.jpg"],
}: {
  dateISO?: string;
  lunarNote?: string;
  photos?: string[];
}) {
  const d = useMemo(() => new Date(dateISO), [dateISO]);
  const year = d.getFullYear();
  const month = d.getMonth(); // 0-11
  const day = d.getDate();

  // Tạo lưới lịch: MON-SUN
  const firstDay = new Date(year, month, 1);
  // map Sun=0 -> 6 ; Mon=1 -> 0 ...
  const lead = (firstDay.getDay() + 6) % 7;
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
    <section className="mx-auto max-w-xl px-4 mt-10 text-center">
      {/* --- Tiêu đề + 3 ảnh --- */}
      <motion.h3
        className="text-[clamp(22px,7vw,34px)] mb-3 text-white"
        style={{ fontFamily: "Great Vibes, cursive" }}
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
      >
        Trân Trọng Kính Mời
      </motion.h3>

      <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-8">
        {photos.slice(0, 3).map((src, i) => (
          <motion.img
            key={i}
            src={src}
            alt={`photo-${i + 1}`}
            className="w-full aspect-[3/4] object-cover rounded-md shadow"
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 * i }}
          />
        ))}
      </div>

      {/* --- Khối thông tin giờ giấc --- */}
      <div className="text-[#111] leading-relaxed">
        <p className="tracking-wide text-[13px] sm:text-[15px] text-white">
          THAM DỰ TIỆC MỪNG LỄ THÀNH HÔN
          <br /> CỦA CON CHÚNG TÔI
        </p>

        <p className="mt-3 text-[13px] sm:text-[15px] text-white">Vào lúc</p>

        <div className="mt-1 grid grid-cols-3 items-start">
          <div className="text-[18px] sm:text-[20px] font-light ">
            {d.toLocaleTimeString("vi-VN", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
          <div>
            <div className="text-[15px] sm:text-[16px] text-white">
              {weekday}
            </div>
            <div className="text-[28px] sm:text-[32px] font-semibold text-white">
              {day}
            </div>
            <div className="text-[15px] sm:text-[16px] text-white">
              Tháng {mm < 10 ? `0${mm}` : mm}
            </div>
          </div>
          <div className="text-[18px] sm:text-[20px] font-light">{year}</div>
        </div>

        <p className="mt-2 text-[12px] sm:text-[14px] italic text-gray-700">
          {lunarNote}
        </p>
      </div>

      {/* --- Lịch tháng --- */}
      <div className="mt-6 rounded-xl border border-gray-300 overflow-hidden">
        <div
          className="px-4 py-2 text-left text-white text-[16px] sm:text-[18px]"
          style={{ backgroundColor: ACCENT }}
        >
          {mm < 10 ? `0${mm}` : mm}.{year}
        </div>

        <div className="relative p-3 sm:p-4 bg-white">
          {/* Watermark năm */}
          <div className="pointer-events-none absolute text-white inset-0 flex items-center justify-center text-[80px] sm:text-[120px] font-semibold  select-none">
            {year}
          </div>

          {/* Header Mon-Sun */}
          <div className="grid grid-cols-7 gap-2 text-[10px] sm:text-xs font-medium text-gray-600 mb-2">
            {["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"].map((w) => (
              <div key={w} className="text-center">
                {w}
              </div>
            ))}
          </div>

          {/* Ngày */}
          <div className="grid grid-cols-7 gap-2 relative">
            {cells.map((num, idx) => {
              const isActive = num === day;
              return (
                <div
                  key={idx}
                  className="h-8 sm:h-9 flex items-center justify-center text-[12px] sm:text-[13px] relative"
                >
                  {num && (
                    <>
                      <span className="relative z-[1]">{num}</span>
                      {isActive && (
                        <>
                          {/* dấu tim/tem */}
                          {/* Dùng ảnh: /images/heart-stamp.png (kích thước ~48px nền trong suốt) */}
                          <img
                            src="/images/heart-stamp.png"
                            alt="mark"
                            className="absolute -right-2 -bottom-2 w-8 sm:w-10 opacity-90 select-none pointer-events-none"
                          />
                          {/* vòng tròn nhấn (fallback nếu chưa có ảnh tim) */}
                          <span
                            className="absolute inset-0 m-auto h-7 w-7 sm:h-8 sm:w-8 rounded-full border-2"
                            style={{ borderColor: ACCENT, opacity: 0.5 }}
                          />
                        </>
                      )}
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
