"use client";

import React from "react";
import { motion, type HTMLMotionProps } from "framer-motion";

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export default function Button({
  variant = "primary",
  size = "md",
  children,
  className = "",
  ...props
}: ButtonProps) {
  const baseStyle =
    "motion-enhanced-surface inline-flex items-center justify-center font-heading font-semibold rounded-xl transition-all duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-[#FF5349]/50 disabled:opacity-50 disabled:cursor-not-allowed";

  const sizeStyles = {
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
  };

  const variantStyles = {
    primary:
      "bg-[#FF5349] text-white hover:brightness-110 shadow-lg shadow-[#FF5349]/20 active:brightness-95",
    secondary:
      "bg-white text-[#071E34] border border-rose-200 hover:bg-rose-50",
    outline:
      "border border-rose-600/40 text-rose-700 bg-transparent hover:bg-rose-50",
    ghost:
      "text-[#071E34] bg-transparent hover:bg-rose-50 hover:text-rose-700",
  };

  return (
    <motion.button
      whileHover={{ y: -2, scale: 1.025 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseStyle} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
}

