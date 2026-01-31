"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, GripVertical, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { CategoryModal } from "@/components/admin/category-modal"
import { DeleteConfirmModal } from "@/components/admin/delete-confirm-modal"
import { useToast } from "@/hooks/use-toast"

export default function CategoriesPage() {
  const { toast } = useToast()
  const [createModalOpen, setCreateModalOpen] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<any>(null)

  const [categories, setCategories] = useState([
    {
      id: 1,
      name: "Beginner Program - Men",
      playlists: 30,
      videos: 240,
      status: "Active",
      description: "30-day beginner program for men",
      icon: "💪",
    },
    {
      id: 2,
      name: "Beginner Program - Women",
      playlists: 30,
      videos: 240,
      status: "Active",
      description: "30-day beginner program for women",
      icon: "🏃‍♀️",
    },
    {
      id: 3,
      name: "With Equipment - Men",
      playlists: 30,
      videos: 300,
      status: "Active",
      description: "Workouts with gym equipment",
      icon: "🏋️",
    },
    {
      id: 4,
      name: "With Equipment - Women",
      playlists: 30,
      videos: 300,
      status: "Active",
      description: "Workouts with gym equipment",
      icon: "🏋️‍♀️",
    },
    {
      id: 5,
      name: "Belly Fat Burn",
      playlists: 8,
      videos: 64,
      status: "Active",
      description: "Target belly fat",
      icon: "🔥",
    },
    {
      id: 6,
      name: "Arm Toning",
      playlists: 6,
      videos: 48,
      status: "Active",
      description: "Tone your arms",
      icon: "💪",
    },
    {
      id: 7,
      name: "Healthy Recipes",
      playlists: 12,
      videos: 96,
      status: "Active",
      description: "Nutrition and recipes",
      icon: "🥗",
    },
  ])

  const handleCreate = (data: any) => {
    const newCategory = {
      id: categories.length + 1,
      ...data,
      playlists: 0,
      videos: 0,
    }
    setCategories([...categories, newCategory])
    toast({
      title: "Category created",
      description: `${data.name} has been added.`,
    })
  }

  const handleEdit = (data: any) => {
    setCategories(categories.map((c) => (c.id === selectedCategory.id ? { ...c, ...data } : c)))
    toast({
      title: "Category updated",
      description: `${data.name} has been updated.`,
    })
  }

  const handleDelete = () => {
    setCategories(categories.filter((c) => c.id !== selectedCategory.id))
    setDeleteModalOpen(false)
    toast({
      title: "Category deleted",
      description: "The category has been removed.",
      variant: "destructive",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Categories</h1>
          <p className="text-muted-foreground">Organize workout programs</p>
        </div>
        <Button onClick={() => setCreateModalOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          New Category
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Categories</CardTitle>
          <CardDescription>Drag to reorder categories</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {categories.map((category) => (
              <div
                key={category.id}
                className="flex items-center gap-3 p-4 rounded-lg border border-border bg-card hover:bg-accent/50 transition-colors"
              >
                <GripVertical className="w-5 h-5 text-muted-foreground cursor-grab" />
                <div className="flex-1">
                  <h3 className="font-medium text-foreground">{category.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {category.playlists} playlists • {category.videos} videos
                  </p>
                </div>
                <Badge>{category.status}</Badge>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() => {
                        setSelectedCategory(category)
                        setEditModalOpen(true)
                      }}
                    >
                      Edit Category
                    </DropdownMenuItem>
                    <DropdownMenuItem>Manage Playlists</DropdownMenuItem>
                    <DropdownMenuItem>View Analytics</DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-destructive"
                      onClick={() => {
                        setSelectedCategory(category)
                        setDeleteModalOpen(true)
                      }}
                    >
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <CategoryModal open={createModalOpen} onOpenChange={setCreateModalOpen} onSubmit={handleCreate} />
      <CategoryModal
        open={editModalOpen}
        onOpenChange={setEditModalOpen}
        onSubmit={handleEdit}
        editData={selectedCategory}
      />
      <DeleteConfirmModal
        open={deleteModalOpen}
        onOpenChange={setDeleteModalOpen}
        onConfirm={handleDelete}
        title="Delete Category"
        description={`Are you sure you want to delete "${selectedCategory?.name}"? This will not delete the videos within it.`}
      />
    </div>
  )
}
