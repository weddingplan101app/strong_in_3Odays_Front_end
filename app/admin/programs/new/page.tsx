"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Loader2, Upload, ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useCreateProgramMutation, useUploadCoverMutation } from "@/lib/redux/api/adminContentApi"
import { useToast } from "@/hooks/use-toast"

export default function NewProgramPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [createProgram, { isLoading: isCreating }] = useCreateProgramMutation()
  const [uploadCover, { isLoading: isUploadingCover }] = useUploadCoverMutation()

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    duration: 30,
    difficulty: "beginner" as const,
    genderTarget: "male" as const,
    equipmentRequired: false,
    status: "draft" as const,
  })

  const [coverFile, setCoverFile] = useState<File | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!coverFile) {
      toast({
        title: "Missing Cover Photo",
        description: "Please upload a cover photo for the program",
        variant: "destructive",
      })
      return
    }

    try {
      // Step 1: Create Program
      const program = await createProgram(formData).unwrap()
      console.log("Created Program:", program)
      
      // Step 2: Upload Cover Photo
      const coverFormData = new FormData()
      coverFormData.append("cover", coverFile)
      
      const slug = program.slug || program.data?.slug
      
      if (!slug) {
        throw new Error("Program slug not found")
      }

      await uploadCover({ 
        slug, 
        formData: coverFormData 
      }).unwrap()

      toast({
        title: "Success",
        description: "Program created and cover photo uploaded successfully",
      })
      router.push("/admin/programs")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create program or upload cover photo",
        variant: "destructive",
      })
    }
  }

  const isLoading = isCreating || isUploadingCover

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Button variant="ghost" onClick={() => router.back()} className="gap-2">
        <ArrowLeft className="w-4 h-4" />
        Back
      </Button>

      <div>
        <h1 className="text-3xl font-bold text-foreground">Create New Program</h1>
        <p className="text-muted-foreground">Define the details for your new workout program</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Program Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Program Name</Label>
              <Input
                id="name"
                placeholder="e.g. 30 Day Abs Challenge for Men"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe what this program is about..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Cover Photo</Label>
              <div 
                className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors ${coverFile ? 'border-primary bg-primary/5' : 'border-muted-foreground/25 hover:border-primary/50'}`}
                onClick={() => document.getElementById('cover-input')?.click()}
              >
                {coverFile ? (
                  <>
                    <ImageIcon className="w-8 h-8 text-primary" />
                    <span className="text-sm font-medium text-center line-clamp-1">{coverFile.name}</span>
                    <Button type="button" variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); setCoverFile(null); }}>Remove</Button>
                  </>
                ) : (
                  <>
                    <Upload className="w-8 h-8 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Click to upload cover photo</span>
                    <span className="text-xs text-muted-foreground">JPG, PNG up to 5MB</span>
                  </>
                )}
                <input
                  id="cover-input"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => setCoverFile(e.target.files?.[0] || null)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="duration">Duration (Days)</Label>
                <Input
                  id="duration"
                  type="number"
                  min={1}
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="difficulty">Difficulty</Label>
                <Select
                  value={formData.difficulty}
                  onValueChange={(value: any) => setFormData({ ...formData, difficulty: value })}
                >
                  <SelectTrigger id="difficulty">
                    <SelectValue placeholder="Select difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginners</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="gender">Gender Target</Label>
                <Select
                  value={formData.genderTarget}
                  onValueChange={(value: any) => setFormData({ ...formData, genderTarget: value })}
                >
                  <SelectTrigger id="gender">
                    <SelectValue placeholder="Select gender target" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="both">Both</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value: any) => setFormData({ ...formData, status: value })}
                >
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="space-y-0.5">
                <Label htmlFor="equipment">Equipment Required</Label>
                <p className="text-sm text-muted-foreground">Does this program require any equipment?</p>
              </div>
              <Switch
                id="equipment"
                checked={formData.equipmentRequired}
                onCheckedChange={(checked) => setFormData({ ...formData, equipmentRequired: checked })}
              />
            </div>

            <div className="pt-4">
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                Create Program
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
