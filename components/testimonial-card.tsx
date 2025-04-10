"use client"

import { Card, CardContent } from "@/components/ui/card"
import { QuoteIcon } from "lucide-react"
import { motion } from "framer-motion"

interface TestimonialCardProps {
  quote: string
  author: string
  role: string
  image: string
}

export default function TestimonialCard({ quote, author, role, image }: TestimonialCardProps) {
  return (
    <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
      <Card className="transition-all duration-300 hover:shadow-lg h-full">
        <CardContent className="p-6 h-full flex flex-col">
          <QuoteIcon className="h-8 w-8 text-brand-200 dark:text-brand-800 mb-4" />
          <p className="text-foreground mb-6 flex-grow">{quote}</p>
          <div className="flex items-center">
            <div className="h-12 w-12 rounded-full overflow-hidden mr-4">
              <img src={image || "/placeholder.svg"} alt={author} className="h-full w-full object-cover" />
            </div>
            <div>
              <h4 className="font-semibold text-foreground">{author}</h4>
              <p className="text-sm text-muted-foreground">{role}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
