"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, Loader2, Upload, X, Film, Image as ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useUploadVideoMutation } from "@/lib/redux/api/adminContentApi"
import { useToast } from "@/hooks/use-toast"
import { Badge } from "@/components/ui/badge"

export default function UploadVideoPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const programSlug = params.slug as string
  const [uploadVideo, { isLoading }] = useUploadVideoMutation()

  const [day, setDay] = useState(1)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [caloriesBurned, setCaloriesBurned] = useState("")
  const [muscleGroups, setMuscleGroups] = useState<string[]>([])
  const [newMuscleGroup, setNewMuscleGroup] = useState("")
  const [videoFile, setVideoFile] = useState<File | null>(null)
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null)

  const handleAddMuscleGroup = () => {
    if (newMuscleGroup && !muscleGroups.includes(newMuscleGroup)) {
      setMuscleGroups([...muscleGroups, newMuscleGroup])
      setNewMuscleGroup("")
    }
  }

  const handleRemoveMuscleGroup = (group: string) => {
    setMuscleGroups(muscleGroups.filter((g) => g !== group))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!videoFile || !thumbnailFile) {
      toast({
        title: "Missing Files",
        description: "Please select both a video and a thumbnail",
        variant: "destructive",
      })
      return
    }

    const formData = new FormData()
    formData.append("video", videoFile)
    formData.append("thumbnail", thumbnailFile)
    formData.append("title", title)
    formData.append("description", description)
    formData.append("caloriesBurned", caloriesBurned)
    formData.append("muscleGroups", JSON.stringify(muscleGroups))

    try {
      await uploadVideo({ programSlug, day, formData }).unwrap()
      toast({
        title: "Success",
        description: `Video for Day ${day} uploaded successfully`,
      })
      router.push("/admin/programs")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to upload video",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <Button variant="ghost" onClick={() => router.back()} className="gap-2">
        <ArrowLeft className="w-4 h-4" />
        Back
      </Button>

      <div>
        <h1 className="text-3xl font-bold text-foreground">Upload Workout Video</h1>
        <p className="text-muted-foreground">Adding video to program: <span className="text-primary font-semibold">{programSlug}</span></p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Video Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="day">Program Day</Label>
                <Input
                  id="day"
                  type="number"
                  min={1}
                  value={day}
                  onChange={(e) => setDay(parseInt(e.target.value))}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="title">Video Title</Label>
                <Input
                  id="title"
                  placeholder="e.g. Day 1: Core Foundation"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="What will users do in this video?"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="calories">Calories Burned (Estimated)</Label>
                <Input
                  id="calories"
                  type="number"
                  placeholder="e.g. 150"
                  value={caloriesBurned}
                  onChange={(e) => setCaloriesBurned(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Muscle Groups</Label>
                <div className="flex gap-2">
                  <Input
                    placeholder="e.g. Abs"
                    value={newMuscleGroup}
                    onChange={(e) => setNewMuscleGroup(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), handleAddMuscleGroup())}
                  />
                  <Button type="button" variant="secondary" onClick={handleAddMuscleGroup}>
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {muscleGroups.map((group) => (
                    <Badge key={group} variant="secondary" className="gap-1">
                      {group}
                      <X
                        className="w-3 h-3 cursor-pointer hover:text-destructive"
                        onClick={() => handleRemoveMuscleGroup(group)}
                      />
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Workout Video</Label>
                <div 
                  className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors ${videoFile ? 'border-primary bg-primary/5' : 'border-muted-foreground/25 hover:border-primary/50'}`}
                  onClick={() => document.getElementById('video-input')?.click()}
                >
                  {videoFile ? (
                    <>
                      <Film className="w-8 h-8 text-primary" />
                      <span className="text-sm font-medium text-center line-clamp-1">{videoFile.name}</span>
                      <Button type="button" variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); setVideoFile(null); }}>Remove</Button>
                    </>
                  ) : (
                    <>
                      <Upload className="w-8 h-8 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Click to upload video</span>
                      <span className="text-xs text-muted-foreground">MP4, MOV up to 500MB</span>
                    </>
                  )}
                  <input
                    id="video-input"
                    type="file"
                    accept="video/*"
                    className="hidden"
                    onChange={(e) => setVideoFile(e.target.files?.[0] || null)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Thumbnail Image</Label>
                <div 
                  className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors ${thumbnailFile ? 'border-primary bg-primary/5' : 'border-muted-foreground/25 hover:border-primary/50'}`}
                  onClick={() => document.getElementById('thumb-input')?.click()}
                >
                  {thumbnailFile ? (
                    <>
                      <ImageIcon className="w-8 h-8 text-primary" />
                      <span className="text-sm font-medium text-center line-clamp-1">{thumbnailFile.name}</span>
                      <Button type="button" variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); setThumbnailFile(null); }}>Remove</Button>
                    </>
                  ) : (
                    <>
                      <Upload className="w-8 h-8 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Click to upload thumbnail</span>
                      <span className="text-xs text-muted-foreground">JPG, PNG up to 5MB</span>
                    </>
                  )}
                  <input
                    id="thumb-input"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => setThumbnailFile(e.target.files?.[0] || null)}
                  />
                </div>
              </div>
            </div>

            <div className="pt-4 border-t">
              <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                {isLoading ? "Uploading..." : "Upload Video"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
