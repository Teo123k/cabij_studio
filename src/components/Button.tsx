"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "secondary" | "ghost";
  size?: "default" | "lg";
  onClick?: () => void;
  type?: "button" | "submit";
  className?: string;
  id?: string;
  disabled?: boolean;
}

const variantClasses: Record<string, string> = {
  primary:
    "bg-[#c4704b] text-[#f5f0e8] border border-[#c4704b] hover:bg-[#b05a38] hover:border-[#b05a38]",
  secondary:
    "bg-transparent text-[#f5f0e8] border border-[rgba(245,240,232,0.3)] hover:border-[rgba(245,240,232,0.6)] hover:bg-[rgba(245,240,232,0.05)]",
  ghost:
    "bg-transparent text-[#f5f0e8] hover:text-[#c4704b] border-none underline underline-offset-4",
};

const sizeClasses: Record<string, string> = {
  default: "px-6 py-3 text-[0.8125rem]",
  lg: "px-8 py-4 text-[0.9375rem]",
};

export function Button({
  children,
  href,
  variant = "primary",
  size = "default",
  onClick,
  type = "button",
  className = "",
  id,
  disabled = false,
}: ButtonProps) {
  const base = `inline-flex items-center justify-center font-sans font-medium tracking-[0.08em] uppercase transition-all duration-500 disabled:cursor-not-allowed disabled:opacity-60 ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  if (href) {
    return (
      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        <Link href={href} className={base} id={id} onClick={onClick}>
          {children}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={base}
      onClick={onClick}
      type={type}
      id={id}
      disabled={disabled}
    >
      {children}
    </motion.button>
  );
}
