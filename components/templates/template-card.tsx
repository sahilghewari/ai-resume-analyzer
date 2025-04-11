import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface TemplateCardProps {
  id: string
  name: string
  description: string
  preview: string
  accent: string
  isActive: boolean
  onClick: () => void
}

export function TemplateCard({
  id,
  name,
  description,
  preview,
  accent,
  isActive,
  onClick,
}: TemplateCardProps) {
  return (
    <Card
      className={cn(
        "relative cursor-pointer transition-all hover:scale-105",
        isActive && "ring-2 ring-brand-500"
      )}
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="aspect-[3/4] relative rounded-lg overflow-hidden mb-3">
          <Image
            src={preview}
            alt={name}
            fill
            className="object-cover"
          />
        </div>
        <h3 className="font-medium text-lg">{name}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}
