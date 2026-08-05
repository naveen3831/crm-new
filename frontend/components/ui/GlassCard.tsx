"use client";

import * as React from "react";
import { motion } from "framer-motion";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  animate?: boolean;
  delay?: number;
}

export default function GlassCard({
  children,
  className = "",
  animate = true,
  delay = 0,
}: GlassCardProps) {
  if (!animate) {
    return (
      <div className={`glass-card motion-enhanced-surface rounded-2xl p-6 ${className}`}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay, ease: [0.215, 0.61, 0.355, 1] }}
      whileHover={{ y: -5, scale: 1.006 }}
      whileTap={{ scale: 0.995 }}
      className={`glass-card motion-enhanced-surface rounded-2xl p-6 ${className}`}
    >
      {children}
    </motion.div>
  );
}

