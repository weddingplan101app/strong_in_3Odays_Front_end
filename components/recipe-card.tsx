"use client"

import Image from "next/image"
import { Clock, Flame, Star, Users } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface RecipeCardProps {
  id: string
  title: string
  image: string
  difficulty: string
  prepTime: string
  calories: number
  rating: number
  servings: number
  onClick: () => void
}

export function RecipeCard({
  title,
  image,
  difficulty,
  prepTime,
  calories,
  rating,
  servings,
  onClick,
}: RecipeCardProps) {
  return (
    <div
      onClick={onClick}
      className="group cursor-pointer overflow-hidden rounded-2xl bg-gradient-to-br from-orange-400 via-orange-500 to-red-500 shadow-lg transition-all hover:scale-[1.02] hover:shadow-xl"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

        {/* Difficulty Badge */}
        <div className="absolute left-3 top-3">
          <Badge className="bg-white text-black hover:bg-white">{difficulty}</Badge>
        </div>

        {/* Rating */}
        <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-black/40 px-2 py-1 backdrop-blur-sm">
          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
          <span className="text-xs font-semibold text-white">{rating}</span>
        </div>

        {/* Title at bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-lg font-bold text-white text-balance">{title}</h3>

          {/* Meta Info */}
          <div className="mt-2 flex items-center gap-3 text-xs text-white/90">
            <div className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              <span>{prepTime}</span>
            </div>
            <div className="flex items-center gap-1">
              <Flame className="h-3.5 w-3.5" />
              <span>{calories} cal</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-3.5 w-3.5" />
              <span>{servings} servings</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
