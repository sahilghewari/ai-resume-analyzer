"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

interface GlowingProgressRingProps {
  value: number
  size?: number
  strokeWidth?: number
  className?: string
}

export default function GlowingProgressRing({
  value,
  size = 120,
  strokeWidth = 8,
  className = "",
}: GlowingProgressRingProps) {
  const [progress, setProgress] = useState(0)
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const strokeDashoffset = circumference - (progress / 100) * circumference

  useEffect(() => {
    // Animate progress value
    const timer = setTimeout(() => {
      setProgress(value)
    }, 100)
    return () => clearTimeout(timer)
  }, [value])

  return (
    <div className={`relative ${className}`}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-gray-200 dark:text-gray-700 transition-colors"
        />

        {/* Progress circle with gradient */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="url(#progressGradient)"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1, ease: "easeOut" }}
          strokeLinecap="round"
          className="filter drop-shadow-[0_0_8px_rgba(14,165,233,0.7)]"
        />

        {/* Gradient definition */}
        <defs>
          <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0ea5e9" />
            <stop offset="100%" stopColor="#22d3ee" />
          </linearGradient>
        </defs>
      </svg>

      {/* Percentage text in the middle */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.span
          className="text-2xl font-bold text-brand-600 dark:text-brand-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {Math.round(progress)}%
        </motion.span>
      </div>

      {/* Glowing effect */}
      <motion.div
        className="absolute inset-0 rounded-full opacity-20 blur-md"
        style={{
          background: `radial-gradient(circle, rgba(14,165,233,0.7) 0%, rgba(14,165,233,0) 70%)`,
        }}
        animate={{
          opacity: [0.1, 0.3, 0.1],
        }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />
    </div>
  )
}
