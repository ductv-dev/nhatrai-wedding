"use client";

import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";

// ===================== Types =====================
export type Grid = { rows: number; cols: number };

const DEFAULT_GRIDS: Record<string, Grid> = {
  "6x4": { rows: 4, cols: 6 },
  "8x8": { rows: 8, cols: 8 },
  "8x3": { rows: 3, cols: 8 },
  "4x6": { rows: 6, cols: 4 },
  "3x8": { rows: 8, cols: 3 },
};

export type PredefinedGridKey = keyof typeof DEFAULT_GRIDS;

interface PixelImageProps {
  src: string;
  grid?: PredefinedGridKey;
  customGrid?: Grid;
  grayscaleAnimation?: boolean;
  pixelFadeInDuration?: number; // ms
  maxAnimationDelay?: number; // ms
  colorRevealDelay?: number; // ms

  /**
   * === NEW controls for size/responsiveness ===
   * Cách 1: đặt kích thước tuyệt đối bằng `size`, `width`, `height` (px, rem, %...).
   * Cách 2: responsive full width bằng `responsive` + `aspectRatio`.
   */
  size?: number | string; // vd: 480 | "28rem"
  width?: number | string; // ưu tiên hơn size
  height?: number | string; // ưu tiên hơn size
  responsive?: boolean; // true => w-full, giữ theo aspectRatio
  aspectRatio?: number; // vd: 1 (vuông), 16/9, 3/4...
  rounded?: number | string; // vd: 24 | "2rem"
  containerClassName?: string;
}

export const PixelImage = ({
  src,
  grid = "6x4",
  grayscaleAnimation = true,
  pixelFadeInDuration = 1000,
  maxAnimationDelay = 1200,
  colorRevealDelay = 1300,
  customGrid,
  size,
  width,
  height,
  responsive = false,
  aspectRatio = 1, // mặc định vuông
  rounded = "2rem",
  containerClassName,
}: PixelImageProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showColor, setShowColor] = useState(false);

  const MIN_GRID = 1;
  const MAX_GRID = 16;

  const { rows, cols } = useMemo(() => {
    const isValidGrid = (grid?: Grid) => {
      if (!grid) return false;
      const { rows, cols } = grid;
      return (
        Number.isInteger(rows) &&
        Number.isInteger(cols) &&
        rows >= MIN_GRID &&
        cols >= MIN_GRID &&
        rows <= MAX_GRID &&
        cols <= MAX_GRID
      );
    };

    return isValidGrid(customGrid) ? customGrid! : DEFAULT_GRIDS[grid];
  }, [customGrid, grid]);

  useEffect(() => {
    setIsVisible(true);
    const colorTimeout = setTimeout(() => setShowColor(true), colorRevealDelay);
    return () => clearTimeout(colorTimeout);
  }, [colorRevealDelay]);

  const pieces = useMemo(() => {
    const total = rows * cols;
    return Array.from({ length: total }, (_, index) => {
      const row = Math.floor(index / cols);
      const col = index % cols;

      const clipPath = `polygon(
        ${col * (100 / cols)}% ${row * (100 / rows)}%,
        ${(col + 1) * (100 / cols)}% ${row * (100 / rows)}%,
        ${(col + 1) * (100 / cols)}% ${(row + 1) * (100 / rows)}%,
        ${col * (100 / cols)}% ${(row + 1) * (100 / rows)}%
      )`;

      const delay = Math.random() * maxAnimationDelay;
      return { clipPath, delay };
    });
  }, [rows, cols, maxAnimationDelay]);

  // ===================== Size styles =====================
  const containerStyle: React.CSSProperties = {};

  if (responsive) {
    containerStyle.width = "100%"; // full width của wrapper (vd: max-w-xl)
    // Sử dụng CSS aspect-ratio để giữ tỷ lệ khi responsive
    // (được hỗ trợ rộng rãi; nếu cần fallback có thể thêm padding-top trick)
    // Lưu ý: khi responsive=true, height trực tiếp sẽ bị bỏ qua để ưu tiên aspect ratio
    (containerStyle as any)["aspectRatio"] = aspectRatio;
  } else {
    // Kích thước tuyệt đối
    if (width || height || size) {
      if (width)
        containerStyle.width = typeof width === "number" ? `${width}px` : width;
      if (height)
        containerStyle.height =
          typeof height === "number" ? `${height}px` : height;
      if (!width && size)
        containerStyle.width = typeof size === "number" ? `${size}px` : size;
      if (!height && size)
        containerStyle.height = typeof size === "number" ? `${size}px` : size;
    } else {
      // Fallback: giống trước đây (72 -> md:96)
      containerStyle.width = undefined; // dùng class tailwind default
      containerStyle.height = undefined;
    }
  }

  const imgStyle: React.CSSProperties = {
    borderRadius: typeof rounded === "number" ? `${rounded}px` : rounded,
  };

  return (
    <div
      className={cn(
        // Fallback size khi không truyền props size/width/height/responsive
        "relative select-none",
        !responsive &&
          !width &&
          !height &&
          !size &&
          "h-72 w-72 md:h-96 md:w-96",
        containerClassName
      )}
      style={containerStyle}
    >
      {pieces.map((piece, index) => (
        <div
          key={index}
          className={cn(
            "absolute inset-0 transition-all ease-out",
            isVisible ? "opacity-100" : "opacity-0"
          )}
          style={{
            clipPath: piece.clipPath,
            transitionDelay: `${piece.delay}ms`,
            transitionDuration: `${pixelFadeInDuration}ms`,
          }}
        >
          <img
            src={src}
            alt={`Pixel image piece ${index + 1}`}
            className={cn(
              "h-full w-full object-cover", // đảm bảo mảnh ảnh fill container
              grayscaleAnimation && (showColor ? "grayscale-0" : "grayscale")
            )}
            style={{
              ...imgStyle,
              transition: grayscaleAnimation
                ? `filter ${pixelFadeInDuration}ms cubic-bezier(0.4, 0, 0.2, 1)`
                : "none",
            }}
            draggable={false}
          />
        </div>
      ))}
    </div>
  );
};

// ===================== Usage examples =====================
/*
// 1) Responsive full-width trong khung max-w-xl (vuông)
<div className="max-w-xl mx-auto">
  <PixelImage src="/images/photo.jpg" responsive aspectRatio={1} />
</div>

// 2) Responsive 3:4 (dọc), bo góc 32px
<PixelImage src="/images/photo.jpg" responsive aspectRatio={3/4} rounded={32} />

// 3) Kích thước tuyệt đối 480x640
<PixelImage src="/images/photo.jpg" width={480} height={640} />

// 4) Chỉ set size vuông 520px
<PixelImage src="/images/photo.jpg" size={520} />

// 5) Lưới custom 10x10, animation nhanh hơn
<PixelImage src="/images/photo.jpg" customGrid={{rows:10, cols:10}} pixelFadeInDuration={600} maxAnimationDelay={400} />
*/
