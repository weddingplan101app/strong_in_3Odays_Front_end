"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft, SkipForward, SkipBack } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import Link from "next/link"
import { use } from "react"
import { useRouter } from "next/navigation"

// Mock data
const videoData: Record<string, any> = {
  v1: { id: "v1", title: "Jumping Jacks Warmup", duration: "0:30", videoUrl: "/placeholder.svg?key=video1" },
  v2: { id: "v2", title: "Basic Squats", duration: "0:30", videoUrl: "/placeholder.svg?key=video2" },
  v3: { id: "v3", title: "Push-up Progression", duration: "0:30", videoUrl: "/placeholder.svg?key=video3" },
  v4: { id: "v4", title: "Plank Hold", duration: "0:30", videoUrl: "/placeholder.svg?key=video4" },
  v5: { id: "v5", title: "Lunges", duration: "0:30", videoUrl: "/placeholder.svg?key=video5" },
  v6: { id: "v6", title: "Mountain Climbers", duration: "0:30", videoUrl: "/placeholder.svg?key=video6" },
  v7: { id: "v7", title: "Burpees", duration: "0:30", videoUrl: "/placeholder.svg?key=video7" },
  v8: { id: "v8", title: "Cool Down Stretch", duration: "0:30", videoUrl: "/placeholder.svg?key=video8" },
}

const playlistVideos = ["v1", "v2", "v3", "v4", "v5", "v6", "v7", "v8"]

export default function VideoPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>
  searchParams: Promise<{ playlist?: string }>
}) {
  const { id } = use(params)
  const { playlist } = use(searchParams)
  const router = useRouter()
  const video = videoData[id] || videoData["v1"]

  const currentIndex = playlistVideos.indexOf(id)
  const hasNext = currentIndex < playlistVideos.length - 1
  const hasPrev = currentIndex > 0

  const handleNext = () => {
    if (hasNext) {
      const nextId = playlistVideos[currentIndex + 1]
      router.push(`/video/${nextId}?playlist=${playlist}`)
    }
  }

  const handlePrev = () => {
    if (hasPrev) {
      const prevId = playlistVideos[currentIndex - 1]
      router.push(`/video/${prevId}?playlist=${playlist}`)
    }
  }

  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* Header - overlay on video */}
      <header className="absolute top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/80 to-transparent">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href={playlist ? `/playlist/${playlist}` : "/category/beginner-men"}>
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <ThemeToggle />
        </div>
      </header>

      {/* Video Player */}
      <div className="flex-1 flex items-center justify-center bg-black">
        <div className="w-full max-w-6xl aspect-video bg-secondary/20 relative">
          {/* Placeholder for video - in production would be <video> element */}
          <div className="absolute inset-0 flex items-center justify-center">
            <video className="w-full h-full object-contain" controls autoPlay playsInline poster={video.videoUrl}>
              <source src={video.videoUrl} type="video/mp4" />
            </video>
          </div>
        </div>
      </div>

      {/* Controls & Info */}
      <div className="bg-black border-t border-white/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex-1 min-w-0">
              <h1 className="text-xl font-bold text-white mb-1 truncate">{video.title}</h1>
              <p className="text-sm text-white/60">
                Video {currentIndex + 1} of {playlistVideos.length}
              </p>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center gap-2 justify-center">
            <Button
              variant="outline"
              size="lg"
              onClick={handlePrev}
              disabled={!hasPrev}
              className="border-white/20 text-white hover:bg-white/10 bg-transparent"
            >
              <SkipBack className="w-5 h-5 mr-2" />
              Previous
            </Button>
            <Button
              variant="default"
              size="lg"
              onClick={handleNext}
              disabled={!hasNext}
              className="bg-primary text-primary-foreground"
            >
              Next
              <SkipForward className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
