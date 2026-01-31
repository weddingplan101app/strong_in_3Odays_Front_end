"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Eye, Heart, ChevronRight, ChevronLeft } from "lucide-react"
import Link from "next/link"
import { use, useState } from "react"
import { useRouter } from "next/navigation"
import ReactPlayer from "react-player"
import { useGetWorkoutByProgramAndDayQuery, useStartProgramMutation, useCompleteProgramMutation } from "@/lib/redux/api/programsApi"

function DashboardVideoClient({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<{ day?: string }> })  {
  const [liked, setLiked] = useState(false)

  const { id } = use(params)
  const { day } = use(searchParams)
  const router = useRouter()
  const dayNum = Number(day) || 1

  const { data, isLoading, isError } = useGetWorkoutByProgramAndDayQuery({ programSlug: id, day: dayNum })
  const [startProgram] = useStartProgramMutation()
  const [completeProgram] = useCompleteProgramMutation()
  const [hasStarted, setHasStarted] = useState(false)
  const [timeSpentSec, setTimeSpentSec] = useState(0)

  // Get video data from API response
  const video = data?.video
  const navigation = data?.navigation

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto space-y-6 pb-8 p-4">
        <div className="h-96 bg-muted rounded-lg animate-pulse" />
      </div>
    )
  }

  if (isError) {
    console.log("[v0] Error occurred:", id)
    return (
      <div className="max-w-7xl mx-auto space-y-6 pb-8 p-4">
        <p className="text-destructive">Error loading video. Please try again.</p>
        <p className="text-xs text-muted-foreground">Make sure API_BASE_URL is set correctly.</p>
      </div>
    )
  }

  if (!video) {
    console.log("[v0] No video data received")
    return (
      <div className="max-w-7xl mx-auto space-y-6 pb-8 p-4">
        <p className="text-destructive">No video data available.</p>
        <p className="text-xs text-muted-foreground">API Response: {JSON.stringify(data)}</p>
      </div>
    )
  }

  const handleNext = () => {
    if (navigation?.hasNext && navigation?.next) {
      router.push(`/dashboard/video/${id}?day=${navigation.next.day}`)
    }
  }

  const handlePrevious = () => {
    if (navigation?.hasPrevious && navigation?.previous) {
      router.push(`/dashboard/video/${id}?day=${navigation.previous.day}`)
    }
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-8 p-4">
      {/* Back button */}
      <Link href="/dashboard/beginner">
        <Button variant="ghost" size="sm">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
      </Link>

      <div className="grid lg:grid-cols-1 gap-6">
        {/* Video Player Section */}
        <div className="space-y-4">
          {/* Large Video Player */}
          <Card className="overflow-hidden border-0 shadow-lg">
            <div className="relative aspect-video bg-black">
              {video?.videoUrl ? (
                <div className="w-full h-full">
                  <ReactPlayer
                    src={video.videoUrl}
                    controls
                    width="100%"
                    height="100%"
                    playing={true}
                    pip={true}
                    loop = {false}
                    light={video.thumbnailUrl}
                    onError={(error) => console.log("[v0] Player error:", error)}
                    onPlay={async () => {
                      if (!hasStarted) {
                        try {
                          await startProgram({ programSlug: id, day: dayNum })
                        } catch (e) {
                          console.log("[v0] startProgram error:", e)
                        } finally {
                          setHasStarted(true)
                        }
                      }
                    }}
                    onProgress={(state: any) => {
                      if (typeof state?.playedSeconds === "number") {
                        setTimeSpentSec((prev) => Math.max(prev, Math.round(state.playedSeconds)))
                      }
                    }}
                    onEnded={async () => {
                      try {
                        await completeProgram({ programSlug: id, day: dayNum, timeSpent: timeSpentSec || Math.round(video.duration ?? 0) })
                      } catch (e) {
                        console.log("[v0] completeProgram error:", e)
                      }
                    }}
                  />
                </div>
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-muted to-muted-foreground flex-col gap-4">
                  {video?.thumbnailUrl && (
                    <img 
                      src={video.thumbnailUrl || "/placeholder.svg"} 
                      alt={video.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                  {!video?.videoUrl && (
                    <p className="text-white text-sm">Video URL not available</p>
                  )}
                </div>
              )}
            </div>
          </Card>

          {/* Video Info */}
          <div className="space-y-3">
            <div>
              <div className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full mb-2">
                Day {video.day}
              </div>
              <h1 className="text-2xl lg:text-3xl font-bold text-foreground">{video.title}</h1>
            </div>

            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="capitalize bg-muted px-2 py-1 rounded">{video.difficulty}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>⏱️ {video.durationFormatted}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>🔥 {video.caloriesBurned} cal</span>
              </div>
            </div>

            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4" />
                <span>{video.views} views</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setLiked(!liked)}
                className="h-auto p-0 hover:bg-transparent flex items-center gap-2"
              >
                <Heart className={`w-5 h-5 ${liked ? "fill-primary text-primary" : ""}`} />
                <span>{video.views + (liked ? 1 : 0)}</span>
              </Button>
            </div>

            {/* Muscle Groups */}
            {video.muscleGroups && video.muscleGroups.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {video.muscleGroups.map((group: string, index: number) => (
                  <span key={index} className="px-3 py-1 bg-secondary text-secondary-foreground text-xs rounded-full capitalize">
                    {group}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Description */}
          <div className="pt-4 space-y-2">
            <h2 className="text-lg font-semibold text-foreground">About this workout</h2>
            <p className="text-muted-foreground leading-relaxed">{video.description}</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center pt-8 border-t">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={!navigation?.hasPrevious}
          className="flex items-center gap-2 bg-transparent"
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </Button>

        <div className="text-sm text-muted-foreground">
          Day {navigation?.currentDay} of your program
        </div>

        <Button
          onClick={handleNext}
          disabled={!navigation?.hasNext}
          className="flex items-center gap-2"
        >
          Next
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>

      {/* Next Video Preview */}
      {navigation?.hasNext && navigation?.next && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Next Workout</h3>
          <div className="flex gap-4 items-start">
            <div className="w-32 h-20 rounded overflow-hidden flex-shrink-0 bg-muted">
              {navigation.next.thumbnailUrl && (
                <img
                  src={navigation.next.thumbnailUrl || "/placeholder.svg"}
                  alt={navigation.next.title}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-foreground">{navigation.next.title}</h4>
              <p className="text-sm text-muted-foreground mt-1">{navigation.next.description}</p>
              <div className="flex gap-4 mt-3 text-xs text-muted-foreground">
                <span className="capitalize">{navigation.next.difficulty}</span>
                <span>⏱️ {navigation.next.durationFormatted}</span>
                <span>🔥 {navigation.next.caloriesBurned} cal</span>
              </div>
              <Button
                size="sm"
                className="mt-3"
                onClick={handleNext}
              >
                Start Next Workout
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  )
}

export default async function DashboardVideoPage({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<{ day?: string }> }) {
  return <DashboardVideoClient params={params} searchParams={searchParams} />
}
