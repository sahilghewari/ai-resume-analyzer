"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface TemplateSwitcherProps {
  templates: {
    id: string
    name: string
    image: string
  }[]
  activeTemplate: string
  onSelect: (templateId: string) => void
}

export default function TemplateSwitcher({ templates, activeTemplate, onSelect }: TemplateSwitcherProps) {
  const [direction, setDirection] = useState(0)

  const handleSelect = (templateId: string) => {
    const currentIndex = templates.findIndex((t) => t.id === activeTemplate)
    const newIndex = templates.findIndex((t) => t.id === templateId)
    setDirection(newIndex > currentIndex ? 1 : -1)
    onSelect(templateId)
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {templates.map((template) => (
          <div
            key={template.id}
            className={`border rounded-lg p-2 cursor-pointer transition-all duration-300 ${
              activeTemplate === template.id
                ? "border-teal-500 ring-2 ring-teal-500 ring-opacity-50"
                : "hover:border-teal-500"
            }`}
            onClick={() => handleSelect(template.id)}
          >
            <div className="relative aspect-[3/4] overflow-hidden rounded">
              <img
                src={template.image || "/placeholder.svg"}
                alt={template.name}
                className="w-full h-full object-cover"
              />
              {activeTemplate === template.id && (
                <motion.div
                  className="absolute inset-0 bg-teal-500 bg-opacity-20 flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="bg-white rounded-full p-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-teal-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </motion.div>
              )}
            </div>
            <p className="text-center mt-2 text-sm font-medium">{template.name}</p>
          </div>
        ))}
      </div>

      <div className="relative bg-white rounded-lg shadow-xl overflow-hidden aspect-[8.5/11]">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={activeTemplate}
            custom={direction}
            initial={{
              x: direction * 300,
              opacity: 0,
              rotateY: direction * 45,
            }}
            animate={{
              x: 0,
              opacity: 1,
              rotateY: 0,
              transition: {
                type: "spring",
                stiffness: 300,
                damping: 30,
              },
            }}
            exit={{
              x: direction * -300,
              opacity: 0,
              rotateY: direction * -45,
              transition: { duration: 0.2 },
            }}
            className="absolute inset-0"
            style={{ transformStyle: "preserve-3d" }}
          >
            <img
              src={templates.find((t) => t.id === activeTemplate)?.image || ""}
              alt="Template Preview"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
