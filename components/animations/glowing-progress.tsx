"use client"

import { motion } from "framer-motion"

interface GlowingProgressProps {
  value: number
  className?: string
}

export default function GlowingProgress({ value, className = "" }: GlowingProgressProps) {
  return (
    <div className={`relative h-2 bg-gray-200 rounded-full overflow-hidden ${className}`}>
      <motion.div
        className="absolute top-0 left-0 h-full bg-gradient-to-r from-teal-400 to-cyan-400 rounded-full"
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-0 left-0 h-full bg-white opacity-30 rounded-full"
        initial={{ x: "-100%" }}
        animate={{ x: "100%" }}
        transition={{
          duration: 1.5,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "loop",
          ease: "linear",
        }}
        style={{ width: "50%" }}
      />
    </div>
  )
}
