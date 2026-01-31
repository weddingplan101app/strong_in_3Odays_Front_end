"use client"

import { VideoPlayer } from "@/components/video-player"
import { Button } from "@/components/ui/button"
import { ArrowLeft, SkipForward, SkipBack } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import Link from "next/link"
import { use } from "react"
import { useRouter } from "next/navigation"
import { useGetWorkoutByProgramAndDayQuery } from "@/lib/redux/api/programsApi"

export default function PlaylistPage({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<{ day?: string }> }) {
  const { id } = use(params)
  const { day } = use(searchParams)
  const router = useRouter()
  const dayNum = Number(day) || 1

  const { data, isLoading, isError } = useGetWorkoutByProgramAndDayQuery({ programSlug: id, day: dayNum })

  const video = data?.video
  const navigation = data?.navigation

  const handleNext = () => {
    if (navigation?.hasNext && navigation.next) {
      router.push(`/playlist/${id}?day=${navigation.next.day}`)
    }
  }

  const handlePrev = () => {
    if (navigation?.hasPrevious && navigation.previous) {
      router.push(`/playlist/${id}?day=${navigation.previous.day}`)
    }
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/dashboard">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {isLoading && <p className="text-center">Loading workout...</p>}
        {isError && <p className="text-center text-destructive">Failed to load workout. Try again.</p>}

        {video && (
          <>
            <div className="mb-6">
              <h1 className="text-2xl font-bold mb-2 text-foreground">{video.title}</h1>
              <p className="text-muted-foreground mb-4">{video.description}</p>
              <div className="w-full max-w-4xl mx-auto">
                <VideoPlayer src={video.videoUrl ?? ""} poster={video.thumbnailUrl ?? undefined} autoPlay />
              </div>
            </div>

            <div className="flex items-center gap-2 justify-center">
              <Button variant="outline" size="lg" onClick={handlePrev} disabled={!navigation?.hasPrevious} className="border-border">
                <SkipBack className="w-5 h-5 mr-2" />
                Previous
              </Button>

              <Button variant="default" size="lg" onClick={handleNext} disabled={!navigation?.hasNext} className="bg-primary text-primary-foreground">
                Next
                <SkipForward className="w-5 h-5 ml-2" />
              </Button>
            </div>

            {/* Next video preview */}
            {navigation?.next && (
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                <div className="flex items-center gap-4">
                  {navigation.next.thumbnailUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={navigation.next.thumbnailUrl} alt={navigation.next.title} className="w-36 h-20 object-cover rounded" />
                  ) : (
                    <div className="w-36 h-20 bg-secondary rounded" />
                  )}
                  <div>
                    <div className="text-sm text-muted-foreground">Up next</div>
                    <div className="font-semibold">{navigation.next.title}</div>
                    <div className="text-sm text-muted-foreground mt-1">{navigation.next.durationFormatted}</div>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Difficulty: {navigation.next.difficulty}</p>
                  <p className="text-sm text-muted-foreground">Views: {navigation.next.views}</p>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
