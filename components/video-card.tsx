"use client"

import Link from "next/link"
import { Star, User } from "lucide-react"
import { Card } from "@/components/ui/card"

interface VideoCardProps {
  title: string
  duration: string
  thumbnail: string
  difficulty?: string
  rating?: number
  instructor?: string
  categories?: string[]
  onClick?: () => void
  href?: string
}

export function VideoCard({
  title,
  duration,
  thumbnail,
  difficulty = "Intermediate",
  rating = 4.5,
  instructor = "Mike Anderson",
  categories = [],
  onClick,
  href,
}: VideoCardProps) {
  const card = (
    <Card
      className="group relative overflow-hidden bg-card hover:shadow-lg transition-all cursor-pointer border-border/50"
      onClick={onClick}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-orange-400 to-pink-500">
        <img
          src={thumbnail || "/placeholder.svg"}
          alt={title}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
        />
        {/* Difficulty badge at top left */}
        <div className="absolute top-3 left-3">
          <span className="bg-white text-black text-xs font-medium px-3 py-1 rounded-full">{difficulty}</span>
        </div>
      </div>

      <div className="p-4 space-y-3">
        {/* Title and Rating */}
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-foreground line-clamp-2 flex-1">{title}</h3>
          {/* <div className="flex items-center gap-1 text-sm font-medium shrink-0">
            <span className="text-foreground">{rating}</span>
            <Star className="w-4 h-4 text-primary fill-primary" />
          </div> */}
        </div>

        {/* Instructor and Duration */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <User className="w-4 h-4" />
          <span>{instructor}</span>
          <span>•</span>
          <span>{duration} mins</span>
        </div>

        {/* Category Tags */}
        {categories.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {categories.map((category, index) => (
              <span key={index} className="px-2.5 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                {category}
              </span>
            ))}
          </div>
        )}
      </div>
    </Card>
  )

  // If href provided, wrap the card in Link so the whole card navigates to the route.
  if (href) {
    return (
      <Link href={href} className="block">
        {card}
      </Link>
    )
  }

  return card
}
