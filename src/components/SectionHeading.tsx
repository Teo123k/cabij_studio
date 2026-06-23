"use client";

import { motion } from "framer-motion";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  light?: boolean;
}

export function SectionHeading({
  title,
  subtitle,
  align = "left",
  light = false,
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={false}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`mb-12 md:mb-16 ${align === "center" ? "text-center" : ""}`}
    >
      <div
        className={`editorial-divider mb-6 ${align === "center" ? "mx-auto" : ""}`}
      />
      <h2
        className={`text-display-md font-serif ${
          light ? "text-[#1a1a1a]" : "text-[#f5f0e8]"
        }`}
        style={{ textWrap: "balance" } as React.CSSProperties}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-4 max-w-2xl text-body-lg ${
            light ? "text-[#666666]" : "text-[#e8dece]"
          } ${align === "center" ? "mx-auto" : ""}`}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
