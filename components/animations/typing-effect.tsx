"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

interface TypingEffectProps {
  text: string
  delay?: number
  speed?: number
  className?: string
  onComplete?: () => void
}

export default function TypingEffect({ text, delay = 0, speed = 50, className = "", onComplete }: TypingEffectProps) {
  const [displayText, setDisplayText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    let timeout: NodeJS.Timeout

    if (delay > 0 && currentIndex === 0) {
      timeout = setTimeout(() => {
        if (currentIndex < text.length) {
          setDisplayText((prev) => prev + text[currentIndex])
          setCurrentIndex((prev) => prev + 1)
        }
      }, delay)
    } else if (currentIndex < text.length) {
      timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex])
        setCurrentIndex((prev) => prev + 1)
      }, speed)
    } else if (currentIndex === text.length && !isComplete) {
      setIsComplete(true)
      if (onComplete) onComplete()
    }

    return () => clearTimeout(timeout)
  }, [currentIndex, delay, isComplete, onComplete, speed, text])

  return (
    <div className={`inline-block ${className}`}>
      <motion.span className="inline-block">{displayText}</motion.span>
      {currentIndex < text.length && (
        <motion.span
          className="inline-block w-1.5 h-4 bg-brand-500 ml-0.5"
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY }}
        />
      )}
    </div>
  )
}
