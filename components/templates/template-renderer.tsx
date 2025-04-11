import { ResumeData } from "@/lib/types"
import { motion, AnimatePresence } from "framer-motion"
import ModernTemplate from "./modern"
import ProfessionalTemplate from "./professional"
import CreativeTemplate from "./creative"
import MinimalTemplate from "./minimal"

export function TemplateRenderer({ template, data }: { template: string; data: ResumeData }) {
  const getTemplate = () => {
    switch (template) {
      case "modern":
        return <ModernTemplate data={data} />
      case "professional":
        return <ProfessionalTemplate data={data} />
      case "creative":
        return <CreativeTemplate data={data} />
      case "minimal":
        return <MinimalTemplate data={data} />
      default:
        return <ModernTemplate data={data} />
    }
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={template}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {getTemplate()}
      </motion.div>
    </AnimatePresence>
  )
}
