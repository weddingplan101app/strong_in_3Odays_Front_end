"use client"

import { Card } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"

interface CategoryTileProps {
  title: string
  subtitle?: string
  image: string
  onClick?: () => void
}

export function CategoryTile({ title, subtitle, image, onClick }: CategoryTileProps) {
  return (
    <Card className="group relative overflow-hidden h-48 cursor-pointer border-border/50 bg-card" onClick={onClick}>
      <div className="absolute inset-0">
        <img
          src={image || "/placeholder.svg"}
          alt={title}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      </div>
      <div className="relative h-full p-6 flex flex-col justify-end">
        <h3 className="text-xl font-bold text-white mb-1 text-balance">{title}</h3>
        {subtitle && <p className="text-sm text-white/80">{subtitle}</p>}
        <ArrowRight className="w-5 h-5 text-primary mt-2 group-hover:translate-x-1 transition-transform" />
      </div>
    </Card>
  )
}
