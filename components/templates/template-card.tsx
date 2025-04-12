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
        "relative cursor-pointer transition-all hover:scale-105 w-full",
        "sm:max-w-[250px] md:max-w-[280px] lg:max-w-[300px]",
        isActive && "ring-2 ring-brand-500"
      )}
      onClick={onClick}
    >
      <CardContent className="p-2 sm:p-3 md:p-4">
        <div className="aspect-[3/5] relative rounded-lg overflow-hidden mb-2 sm:mb-3">
          <Image
            src={preview}
            alt={name}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 250px, (max-width: 1024px) 280px, 300px"
          />
        </div>
        <h3 className="font-medium text-sm sm:text-base">{name}</h3>
        {/* <p className="text-sm text-muted-foreground font-thin">{description}</p> */}
      </CardContent>
    </Card>
  )
}
