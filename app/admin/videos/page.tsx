"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Upload, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { VideoUploadModal } from "@/components/admin/video-upload-modal"
import { DeleteConfirmModal } from "@/components/admin/delete-confirm-modal"
import { useToast } from "@/hooks/use-toast"

export default function VideosPage() {
  const { toast } = useToast()
  const [uploadModalOpen, setUploadModalOpen] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [selectedVideo, setSelectedVideo] = useState<any>(null)

  const [videos, setVideos] = useState([
    {
      id: 1,
      title: "Push-up Progression",
      category: "Beginner Men",
      duration: "0:30",
      views: 1234,
      status: "Published",
      description: "Learn proper push-up form",
      gender: "Men",
      difficulty: "Beginner",
      instructor: "Mike Anderson",
      equipment: "None",
    },
    {
      id: 2,
      title: "Basic Squats",
      category: "Beginner Women",
      duration: "0:30",
      views: 1098,
      status: "Published",
      description: "Master the squat",
      gender: "Women",
      difficulty: "Beginner",
      instructor: "Sarah Johnson",
      equipment: "None",
    },
    {
      id: 3,
      title: "Plank Hold",
      category: "Core",
      duration: "0:30",
      views: 987,
      status: "Published",
      description: "Core strengthening",
      gender: "All",
      difficulty: "Intermediate",
      instructor: "Emma Davis",
      equipment: "Yoga Mat",
    },
    {
      id: 4,
      title: "Dumbbell Curls",
      category: "With Equipment",
      duration: "0:30",
      views: 756,
      status: "Draft",
      description: "Arm workout",
      gender: "Men",
      difficulty: "Intermediate",
      instructor: "John Smith",
      equipment: "Dumbbells",
    },
    {
      id: 5,
      title: "Lunges",
      category: "Lower Body",
      duration: "0:30",
      views: 892,
      status: "Published",
      description: "Leg strengthening",
      gender: "Women",
      difficulty: "Beginner",
      instructor: "Lisa Brown",
      equipment: "None",
    },
  ])

  const handleUpload = (data: any) => {
    const newVideo = {
      id: videos.length + 1,
      title: data.title,
      category: `${data.category} ${data.gender}`,
      duration: `0:${data.duration}`,
      views: 0,
      status: "Published",
      ...data,
    }
    setVideos([newVideo, ...videos])
    toast({
      title: "Video uploaded successfully",
      description: `${data.title} has been added to the platform.`,
    })
  }

  const handleEdit = (data: any) => {
    setVideos(videos.map((v) => (v.id === selectedVideo.id ? { ...v, ...data } : v)))
    toast({
      title: "Video updated",
      description: `${data.title} has been updated.`,
    })
  }

  const handleDelete = () => {
    setVideos(videos.filter((v) => v.id !== selectedVideo.id))
    setDeleteModalOpen(false)
    toast({
      title: "Video deleted",
      description: "The video has been removed from the platform.",
      variant: "destructive",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Videos</h1>
          <p className="text-muted-foreground">Manage workout videos</p>
        </div>
        <Button onClick={() => setUploadModalOpen(true)}>
          <Upload className="w-4 h-4 mr-2" />
          Upload Video
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Videos</CardTitle>
          <CardDescription>
            <div className="flex items-center gap-2 mt-2">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Search videos..." className="pl-9" />
              </div>
            </div>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Views</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {videos.map((video) => (
                <TableRow key={video.id}>
                  <TableCell className="font-medium">{video.title}</TableCell>
                  <TableCell>{video.category}</TableCell>
                  <TableCell>{video.duration}</TableCell>
                  <TableCell>{video.views.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge variant={video.status === "Published" ? "default" : "secondary"}>{video.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => {
                            setSelectedVideo(video)
                            setEditModalOpen(true)
                          }}
                        >
                          Edit Video
                        </DropdownMenuItem>
                        <DropdownMenuItem>View Analytics</DropdownMenuItem>
                        <DropdownMenuItem>Duplicate</DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-destructive"
                          onClick={() => {
                            setSelectedVideo(video)
                            setDeleteModalOpen(true)
                          }}
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <VideoUploadModal open={uploadModalOpen} onOpenChange={setUploadModalOpen} onSubmit={handleUpload} />
      <VideoUploadModal
        open={editModalOpen}
        onOpenChange={setEditModalOpen}
        onSubmit={handleEdit}
        editData={selectedVideo}
      />
      <DeleteConfirmModal
        open={deleteModalOpen}
        onOpenChange={setDeleteModalOpen}
        onConfirm={handleDelete}
        title="Delete Video"
        description={`Are you sure you want to delete "${selectedVideo?.title}"? This action cannot be undone.`}
      />
    </div>
  )
}
