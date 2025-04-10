"use client"

import type { ReactNode } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"

interface FeatureCardProps {
  icon: ReactNode
  title: string
  description: string
}

export default function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <Card className="transition-all duration-300 hover:shadow-lg h-full">
      <CardContent className="p-6 text-center h-full flex flex-col">
        <motion.div
          className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-brand-50 dark:bg-brand-900/30"
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          {icon}
        </motion.div>
        <h3 className="mb-2 text-xl font-semibold text-foreground">{title}</h3>
        <p className="text-muted-foreground flex-grow">{description}</p>
      </CardContent>
    </Card>
  )
}
