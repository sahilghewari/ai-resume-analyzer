"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface AnimatedInputProps {
  id: string
  label: string
  type?: string
  placeholder?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  required?: boolean
  className?: string
}

export default function AnimatedInput({
  id,
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  required = false,
  className = "",
}: AnimatedInputProps) {
  const [isFocused, setIsFocused] = useState(false)

  return (
    <div className={`space-y-2 ${className}`}>
      <Label htmlFor={id} className="block text-sm font-medium">
        {label}
      </Label>
      <motion.div
        initial={{ scale: 1 }}
        animate={{
          scale: isFocused ? 1.02 : 1,
          boxShadow: isFocused ? "0 0 0 2px rgba(80, 200, 190, 0.3), 0 0 10px rgba(80, 200, 190, 0.2)" : "none",
        }}
        transition={{ duration: 0.2 }}
        className="rounded-md"
      >
        <Input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="transition-all duration-200"
        />
      </motion.div>
    </div>
  )
}
