"use client"

import { Play, Clock } from "lucide-react"
import { Card } from "@/components/ui/card"

interface PlaylistItemProps {
  title: string
  videoCount: number
  duration: string
  thumbnail: string
  onClick?: () => void
}

export function PlaylistItem({ title, videoCount, duration, thumbnail, onClick }: PlaylistItemProps) {
  return (
    <Card
      className="group flex gap-4 p-4 hover:bg-accent/10 transition-colors cursor-pointer border-border/50"
      onClick={onClick}
    >
      <div className="relative w-32 h-20 flex-shrink-0 rounded overflow-hidden bg-secondary">
        <img
          src={thumbnail || "/placeholder.svg"}
          alt={title}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <Play className="w-8 h-8 text-white fill-white" />
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-foreground mb-1 line-clamp-1">{title}</h3>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span>{videoCount} videos</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {duration}
          </span>
        </div>
      </div>
    </Card>
  )
}
