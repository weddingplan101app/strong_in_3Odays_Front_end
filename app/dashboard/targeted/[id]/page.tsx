"use client"

import { use, useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { useGetTargetedWorkoutByIdQuery } from "@/lib/redux/api/programsApi"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, ArrowLeft } from "lucide-react"
import ReactPlayer from "react-player"

function DashboardTargetedClient({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const { data, isLoading, isError } = useGetTargetedWorkoutByIdQuery(id)
  const [activeIdx, setActiveIdx] = useState(0)

  const clips = useMemo(() => data?.clips ?? [], [data])
  const activeClip = clips[activeIdx]

  useEffect(() => {
    // Reset to first clip when data changes
    setActiveIdx(0)
  }, [data?.id])

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto space-y-6 pb-8 p-4">
        <div className="h-96 bg-muted rounded-lg animate-pulse" />
      </div>
    )
  }

  if (isError || !data) {
    return (
      <div className="max-w-7xl mx-auto space-y-6 pb-8 p-4">
        <p className="text-destructive">Failed to load targeted workout.</p>
        <p className="text-xs text-muted-foreground">Make sure API_BASE_URL is set correctly and the workout exists.</p>
      </div>
    )
  }

  const handlePrevClip = () => {
    setActiveIdx((i) => Math.max(0, i - 1))
  }
  const handleNextClip = () => {
    setActiveIdx((i) => Math.min(clips.length - 1, i + 1))
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-8 p-4">
      {/* Back */}
      <Link href="/dashboard/targeted">
        <Button variant="ghost" size="sm">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
      </Link>

      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-2xl lg:text-3xl font-bold text-foreground">{data.title}</h1>
        <div className="flex items-center gap-3 text-sm text-muted-foreground flex-wrap">
          {data.difficulty && <span className="capitalize bg-muted px-2 py-1 rounded">{data.difficulty}</span>}
          {data.durationFormatted && <span>⏱️ {data.durationFormatted}</span>}
          {typeof data.caloriesBurned === "number" && <span>🔥 {data.caloriesBurned} cal</span>}
        </div>
        {Array.isArray(data.focusAreas) && data.focusAreas.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-2">
            {data.focusAreas.map((fa) => (
              <Badge key={fa} variant="outline" className="capitalize">{fa}</Badge>
            ))}
          </div>
        )}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Player */}
        <div className="lg:col-span-2 space-y-4">
          <Card className="overflow-hidden border-0 shadow-lg">
            <div className="relative aspect-video bg-black">
              {/* Use ReactPlayer as in the main video page */}
              {activeClip?.videoUrl ? (
                <div className="w-full h-full">
                  <ReactPlayer
                    src={activeClip.videoUrl}
                    controls
                    width="100%"
                    height="100%"
                    playing={true}
                    pip={true}
                    loop={false}
                    light={activeClip?.thumbnailUrl || data.thumbnailUrl}
                    onError={(error) => console.log("[v0] Player error:", error)}
                    onEnded={() => {
                      if (activeIdx < clips.length - 1) handleNextClip()
                    }}
                  />
                </div>
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-muted">
                  <p className="text-muted-foreground text-sm">Clip video unavailable</p>
                </div>
              )}
            </div>
          </Card>

          {/* Clip info */}
          {activeClip && (
            <div className="space-y-2">
              <h2 className="text-lg font-semibold text-foreground">{activeClip.title}</h2>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>⏱️ {Math.round(activeClip.duration)}s</span>
                {activeClip.caloriesBurned ? <span>🔥 {activeClip.caloriesBurned} cal</span> : null}
                {activeClip.exercise ? <span className="capitalize">{activeClip.exercise}</span> : null}
              </div>
              {(activeClip.instructions || activeClip.tips) && (
                <div className="text-sm text-muted-foreground">
                  {activeClip.instructions && <p>Instructions: {activeClip.instructions}</p>}
                  {activeClip.tips && <p>Tips: {activeClip.tips}</p>}
                </div>
              )}
            </div>
          )}

          {/* Clip navigation */}
          <div className="flex justify-between items-center pt-4">
            <Button variant="outline" onClick={handlePrevClip} disabled={activeIdx === 0} className="flex items-center gap-2">
              <ChevronLeft className="w-4 h-4" />
              Previous
            </Button>
            <div className="text-sm text-muted-foreground">Clip {activeIdx + 1} of {clips.length}</div>
            <Button onClick={handleNextClip} disabled={activeIdx >= clips.length - 1} className="flex items-center gap-2">
              Next
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Playlist */}
        <Card className="p-4">
          <h3 className="text-lg font-semibold mb-3">Workout Clips</h3>
          <div className="flex flex-col divide-y">
            {clips.map((clip, idx) => (
              <button
                key={clip.id ?? idx}
                onClick={() => setActiveIdx(idx)}
                className={`text-left py-3 px-2 hover:bg-muted rounded ${idx === activeIdx ? "bg-muted" : ""}`}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium text-foreground">{clip.title}</div>
                    <div className="text-xs text-muted-foreground">{clip.exercise}</div>
                  </div>
                  <div className="text-xs text-muted-foreground">{Math.round(clip.duration)}s</div>
                </div>
              </button>
            ))}
          </div>
        </Card>
      </div>

      {/* Description */}
      {data.description && (
        <div className="pt-4 space-y-2">
          <h2 className="text-lg font-semibold text-foreground">About this workout</h2>
          <p className="text-muted-foreground leading-relaxed">{data.description}</p>
        </div>
      )}
    </div>
  )
}

export default async function DashboardTargetedPage({ params }: { params: Promise<{ id: string }> }) {
  return <DashboardTargetedClient params={params} />
}