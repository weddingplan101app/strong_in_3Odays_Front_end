"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, X } from "lucide-react"

interface VideoUploadModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (data: any) => void
  editData?: any
}

export function VideoUploadModal({ open, onOpenChange, onSubmit, editData }: VideoUploadModalProps) {
  const [formData, setFormData] = useState({
    title: editData?.title || "",
    description: editData?.description || "",
    category: editData?.category || "",
    gender: editData?.gender || "",
    difficulty: editData?.difficulty || "",
    instructor: editData?.instructor || "",
    duration: editData?.duration || "",
    equipment: editData?.equipment || "",
    videoFile: null as File | null,
    thumbnail: null as File | null,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
    onOpenChange(false)
    // Reset form
    setFormData({
      title: "",
      description: "",
      category: "",
      gender: "",
      difficulty: "",
      instructor: "",
      duration: "",
      equipment: "",
      videoFile: null,
      thumbnail: null,
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{editData ? "Edit Video" : "Upload New Video"}</DialogTitle>
          <DialogDescription>
            {editData ? "Update video details and settings" : "Add a new workout video to the platform"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Video Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g., Push-up Progression"
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe the workout and what users will learn..."
              rows={3}
            />
          </div>

          {/* Category & Gender Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Beginner">Beginner</SelectItem>
                  <SelectItem value="Equipment">Equipment</SelectItem>
                  <SelectItem value="Core">Core</SelectItem>
                  <SelectItem value="Arms">Arms</SelectItem>
                  <SelectItem value="Legs">Legs</SelectItem>
                  <SelectItem value="Full Body">Full Body</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="gender">Gender *</Label>
              <Select value={formData.gender} onValueChange={(value) => setFormData({ ...formData, gender: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Men">Men</SelectItem>
                  <SelectItem value="Women">Women</SelectItem>
                  <SelectItem value="All">All</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Difficulty & Duration Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="difficulty">Difficulty *</Label>
              <Select
                value={formData.difficulty}
                onValueChange={(value) => setFormData({ ...formData, difficulty: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Beginner">Beginner</SelectItem>
                  <SelectItem value="Intermediate">Intermediate</SelectItem>
                  <SelectItem value="Advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration">Duration (seconds) *</Label>
              <Input
                id="duration"
                type="number"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                placeholder="30"
                required
              />
            </div>
          </div>

          {/* Instructor & Equipment Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="instructor">Instructor Name *</Label>
              <Input
                id="instructor"
                value={formData.instructor}
                onChange={(e) => setFormData({ ...formData, instructor: e.target.value })}
                placeholder="e.g., Mike Anderson"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="equipment">Equipment</Label>
              <Input
                id="equipment"
                value={formData.equipment}
                onChange={(e) => setFormData({ ...formData, equipment: e.target.value })}
                placeholder="e.g., Dumbbells, Yoga Mat"
              />
            </div>
          </div>

          {/* Video File Upload */}
          {!editData && (
            <div className="space-y-2">
              <Label htmlFor="video">Video File * (MP4, max 50MB)</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="video"
                  type="file"
                  accept="video/mp4,video/quicktime"
                  onChange={(e) => setFormData({ ...formData, videoFile: e.target.files?.[0] || null })}
                  className="flex-1"
                  required
                />
                {formData.videoFile && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => setFormData({ ...formData, videoFile: null })}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>
              {formData.videoFile && (
                <p className="text-sm text-muted-foreground">
                  {formData.videoFile.name} ({(formData.videoFile.size / 1024 / 1024).toFixed(2)} MB)
                </p>
              )}
            </div>
          )}

          {/* Thumbnail Upload */}
          <div className="space-y-2">
            <Label htmlFor="thumbnail">Thumbnail Image * (JPG, PNG, max 5MB)</Label>
            <div className="flex items-center gap-2">
              <Input
                id="thumbnail"
                type="file"
                accept="image/jpeg,image/png,image/jpg"
                onChange={(e) => setFormData({ ...formData, thumbnail: e.target.files?.[0] || null })}
                className="flex-1"
                required={!editData}
              />
              {formData.thumbnail && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => setFormData({ ...formData, thumbnail: null })}
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
            {formData.thumbnail && (
              <p className="text-sm text-muted-foreground">
                {formData.thumbnail.name} ({(formData.thumbnail.size / 1024 / 1024).toFixed(2)} MB)
              </p>
            )}
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">
              <Upload className="w-4 h-4 mr-2" />
              {editData ? "Update Video" : "Upload Video"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
