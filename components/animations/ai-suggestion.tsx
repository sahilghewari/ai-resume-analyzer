"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Lightbulb } from "lucide-react"
import TypingAnimation from "./typing-animation"

interface AISuggestionProps {
  suggestion: string
  onApply: () => void
  onDismiss: () => void
}

export default function AISuggestion({ suggestion, onApply, onDismiss }: AISuggestionProps) {
  const [isVisible, setIsVisible] = useState(true)

  const handleApply = () => {
    setIsVisible(false)
    setTimeout(() => {
      onApply()
    }, 300)
  }

  const handleDismiss = () => {
    setIsVisible(false)
    setTimeout(() => {
      onDismiss()
    }, 300)
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="bg-gradient-to-r from-teal-50 to-cyan-50 border border-teal-200 rounded-lg p-4 mb-4"
        >
          <div className="flex items-start gap-3">
            <div className="mt-1">
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, 0, -5, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "loop",
                }}
              >
                <Lightbulb className="h-5 w-5 text-amber-500" />
              </motion.div>
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-medium text-teal-800 mb-1">AI Suggestion</h4>
              <div className="text-sm text-gray-700 mb-3">
                <TypingAnimation texts={[suggestion]} speed={20} />
              </div>
              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleApply}
                  className="text-xs px-3 py-1 bg-teal-600 text-white rounded-full hover:bg-teal-700 transition-colors"
                >
                  Apply Suggestion
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleDismiss}
                  className="text-xs px-3 py-1 bg-white text-gray-600 rounded-full border hover:bg-gray-50 transition-colors"
                >
                  Dismiss
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
