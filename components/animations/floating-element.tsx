"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"

interface FloatingElementProps {
  children: ReactNode
  delay?: number
  duration?: number
  className?: string
}

export default function FloatingElement({ children, delay = 0, duration = 3, className = "" }: FloatingElementProps) {
  return (
    <motion.div
      className={className}
      initial={{ y: 0 }}
      animate={{ y: [0, -10, 0] }}
      transition={{
        duration,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "loop",
        ease: "easeInOut",
        delay,
      }}
    >
      {children}
    </motion.div>
  )
}
