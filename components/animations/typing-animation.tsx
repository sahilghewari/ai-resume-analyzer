"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

interface TypingAnimationProps {
  texts: string[]
  speed?: number
  className?: string
}

export default function TypingAnimation({ texts, speed = 50, className = "" }: TypingAnimationProps) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [currentText, setCurrentText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(
      () => {
        const fullText = texts[currentTextIndex]

        if (!isDeleting) {
          setCurrentText(fullText.substring(0, currentText.length + 1))

          if (currentText === fullText) {
            setIsDeleting(true)
            clearTimeout(timeout)
            setTimeout(() => {
              setIsDeleting(true)
            }, 1000)
          }
        } else {
          setCurrentText(fullText.substring(0, currentText.length - 1))

          if (currentText === "") {
            setIsDeleting(false)
            setCurrentTextIndex((currentTextIndex + 1) % texts.length)
          }
        }
      },
      isDeleting ? speed / 2 : speed,
    )

    return () => clearTimeout(timeout)
  }, [currentText, currentTextIndex, isDeleting, speed, texts])

  return (
    <div className={className}>
      <motion.span key={currentText} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="inline-block">
        {currentText}
      </motion.span>
      <motion.span
        animate={{
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: 0.8,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "loop",
        }}
        className="inline-block w-0.5 h-5 bg-teal-500 ml-1 align-middle"
      />
    </div>
  )
}
