"use client"
 
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { VideoCard } from "@/components/video-card"
import Link from "next/link"
import { useGetEquipmentProgramsByGenderQuery } from "@/lib/redux/api/programsApi"
 
export default function EquipmentPage() {
  const { data: menData, isLoading: loadingMen, error: menError } = useGetEquipmentProgramsByGenderQuery("male")
  const { data: womenData, isLoading: loadingWomen, error: womenError } = useGetEquipmentProgramsByGenderQuery("female")
 
  const menPrograms = menData?.programs.men?.programs ?? []
  const womenPrograms = womenData?.programs.women?.programs ?? []
 
  return (
    <div className="space-y-6 pb-20 md:pb-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">{menData?.title || "Equipment Programs"}</h1>
        <p className="text-muted-foreground">{menData?.description || "Build strength with dumbbell and equipment-based workouts"}</p>
      </div>
 
      <Tabs defaultValue="men" className="w-full">
        <TabsList className="grid w-full sm:w-auto sm:inline-grid grid-cols-2 mb-6">
          <TabsTrigger value="men">Men</TabsTrigger>
          <TabsTrigger value="women">Women</TabsTrigger>
        </TabsList>
 
        <TabsContent value="men" className="mt-0">
          {loadingMen ? (
            <p className="text-muted-foreground">Loading men programs...</p>
          ) : menError ? (
            <p className="text-destructive">Failed to load men programs</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {menPrograms.map((program:any) => (
                <Link key={program.id} href={`/dashboard/video/${program.slug || program.id}?day=${program.day}`}>
                  <VideoCard
                    title={program.name}
                    duration={( program.duration?.toString() ?? "0")}
                    thumbnail={program.coverImageUrl || "/placeholder.svg"}
                    difficulty={program.difficulty}
                    instructor="30 Days Admin"
                    categories={[program.equipmentRequired ? "Equipment" : "No Equipment"]}
                  />
                </Link>
              ))}
            </div>
          )}
        </TabsContent>
 
        <TabsContent value="women" className="mt-0">
          {loadingWomen ? (
            <p className="text-muted-foreground">Loading women programs...</p>
          ) : womenError ? (
            <p className="text-destructive">Failed to load women programs</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {womenPrograms.map((program:any) => (
                <Link key={program.id} href={`/dashboard/video/${program.slug || program.id}?day=${program.day}`}>
                  <VideoCard
                    title={program.name}
                    duration={(program.totalDuration?.toString() ?? program.duration?.toString() ?? "0")}
                    thumbnail={program.coverImageUrl || "/placeholder.svg"}
                    difficulty={program.difficulty}
                    instructor="30 Days Admin"
                    categories={[program.equipmentRequired ? "Equipment" : "No Equipment"]}
                  />
                </Link>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
