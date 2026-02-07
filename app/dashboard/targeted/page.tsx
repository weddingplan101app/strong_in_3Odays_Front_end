"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { VideoCard } from "@/components/video-card"
import Link from "next/link"
import { useState, useMemo } from "react"
import { useGetTargetedProgramsByGenderQuery } from "@/lib/redux/api/programsApi"

export default function TargetedPage() {
  const { data: menData, isLoading: loadingMen, error: menError } = useGetTargetedProgramsByGenderQuery("male")
  const { data: womenData, isLoading: loadingWomen, error: womenError } = useGetTargetedProgramsByGenderQuery("female")

  const menPrograms = (menData ?? []) as any[]
  const womenPrograms = (womenData ?? []) as any[]

  console.log('this is men data', menData)

  

  const [activeTab, setActiveTab] = useState<"men" | "women">("men")
  const [searchMode, setSearchMode] = useState<"focus" | "category">("focus")
  const [searchTerm, setSearchTerm] = useState("")

  const filterPrograms = (list: any[]) => {
    const q = searchTerm.trim().toLowerCase()
    if (!q) return list
    if (searchMode === "focus") {
      return list.filter((p) => Array.isArray(p?.focusAreas) && p.focusAreas.some((f: any) => String(f).toLowerCase().includes(q)))
    } else {
      return list.filter(
        (p) =>
          (p?.category && String(p.category).toLowerCase().includes(q)) ||
          (Array.isArray(p?.tags) && p.tags.some((t: any) => String(t).toLowerCase().includes(q)))
      )
    }
  }

  const filteredMen = useMemo(() => filterPrograms(menPrograms), [menPrograms, searchMode, searchTerm])
  const filteredWomen = useMemo(() => filterPrograms(womenPrograms), [womenPrograms, searchMode, searchTerm])

  const activeList = activeTab === "men" ? menPrograms : womenPrograms
  const focusAreas = useMemo(() => {
    const items = new Set<string>()
    activeList.forEach((p: any) => {
      if (Array.isArray(p?.focusAreas)) {
        p.focusAreas.forEach((f: any) => items.add(String(f)))
      }
    })
    return Array.from(items)
  }, [activeList])

  const categories = useMemo(() => {
    const items = new Set<string>()
    activeList.forEach((p: any) => {
      if (p?.category) items.add(String(p.category))
    })
    return Array.from(items)
  }, [activeList])

  return (
    <div className="space-y-6 pb-20 md:pb-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">{menData?.title || "Targeted Workouts"}</h1>
        <p className="text-muted-foreground">{menData?.description || "3-5 min routines categorized by body goals"}</p>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-end">
        <div className="flex-1">
          <Input
            placeholder={searchMode === "focus" ? "Search by focus area (e.g. chest, arms, glutes)" : "Search by category (e.g. strength, fat loss)"}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="w-full sm:w-56">
          <Select value={searchMode} onValueChange={(val) => setSearchMode(val as any)}>
            <SelectTrigger>
              <SelectValue placeholder="Search Mode" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="focus">Focus Area</SelectItem>
              <SelectItem value="category">Category</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Quick filter chips */}
      <div className="flex flex-wrap gap-2">
        {searchMode === "focus" && focusAreas.slice(0, 10).map((fa) => (
          <Badge key={fa} variant="outline" className="cursor-pointer" onClick={() => setSearchTerm(fa)}>
            {fa}
          </Badge>
        ))}
        {searchMode === "category" && categories.slice(0, 10).map((cat) => (
          <Badge key={cat} variant="outline" className="cursor-pointer" onClick={() => setSearchTerm(cat)}>
            {cat}
          </Badge>
        ))}
      </div>

      <Tabs defaultValue="men" className="w-full" onValueChange={(v) => setActiveTab(v as any)}>
        <TabsList className="grid w-full sm:w-auto sm:inline-grid grid-cols-2 mb-6">
          <TabsTrigger value="men">Men</TabsTrigger>
          <TabsTrigger value="women">Women</TabsTrigger>
        </TabsList>

        <TabsContent value="men" className="mt-0">
          {loadingMen ? (
            <p className="text-muted-foreground">Loading targeted workouts for men...</p>
          ) : menError ? (
            <p className="text-destructive">Failed to load men targeted workouts</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredMen.map((program: any) => {
                const title = program?.name ?? program?.title
                const duration = (program?.totalDuration ?? program?.duration ?? 0).toString()
                const thumbnail = program?.coverImageUrl ?? program?.thumbnailUrl ?? "/placeholder.svg"
                const difficulty = program?.difficulty
                const instructor = "30 Days Admin"
                const cats = [program?.category || (Array.isArray(program?.focusAreas) ? program.focusAreas[0] : "Targeted")].filter(Boolean)
                const href = `/dashboard/targeted/${program?.slug || program?.id}`
                return (
                  <Link key={program?.id ?? title} href={href}>
                    <VideoCard title={title} duration={duration} thumbnail={thumbnail} difficulty={difficulty} instructor={instructor} categories={cats} />
                  </Link>
                )
              })}
            </div>
          )}
        </TabsContent>

        <TabsContent value="women" className="mt-0">
          {loadingWomen ? (
            <p className="text-muted-foreground">Loading targeted workouts for women...</p>
          ) : womenError ? (
            <p className="text-destructive">Failed to load women targeted workouts</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredWomen.map((program: any) => {
                const title = program?.name ?? program?.title
                const duration = (program?.totalDuration ?? program?.duration ?? 0).toString()
                const thumbnail = program?.coverImageUrl ?? program?.thumbnailUrl ?? "/placeholder.svg"
                const difficulty = program?.difficulty
                const instructor = "30 Days Admin"
                const cats = [program?.category || (Array.isArray(program?.focusAreas) ? program.focusAreas[0] : "Targeted")].filter(Boolean)
                const href = `/dashboard/targeted/${program?.slug || program?.id}`
                return (
                  <Link key={program?.id ?? title} href={href}>
                    <VideoCard title={title} duration={duration} thumbnail={thumbnail} difficulty={difficulty} instructor={instructor} categories={cats} />
                  </Link>
                )
              })}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
