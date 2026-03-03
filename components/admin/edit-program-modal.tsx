"use client"

import { useEffect, useState } from "react"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useUpdateProgramMutation, Program } from "@/lib/redux/api/adminContentApi"
import { useToast } from "@/hooks/use-toast"

interface EditProgramModalProps {
  program: Program | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function EditProgramModal({ program, open, onOpenChange }: EditProgramModalProps) {
  const { toast } = useToast()
  const [updateProgram, { isLoading }] = useUpdateProgramMutation()

  console.log(program)

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    duration: 30,
    difficulty: "beginners" as "beginners" | "intermediate" | "advanced",
    genderTarget: "male" as "male" | "female" | "both",
    equipmentRequired: false,
    status: "draft" as "draft" | "published",
    slug :  "",
  })

  useEffect(() => {
    if (program) {
      setFormData({
        name: program.name,
        description: program.description,
        duration: program.duration,
        difficulty: (program.difficulty as any) === "beginner" ? "beginners" : (program.difficulty as any),
        genderTarget: program.genderTarget as any,
        equipmentRequired: program.equipmentRequired || false,
        status: (program.status as any) || "draft",
        slug : program.slug || program.data?.slug || "",
      })
    }
  }, [program])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!program) return

    const slug = program.slug || program.data?.slug

    if (!slug) {
      toast({
        title: "Error",
        description: "Program slug not found",
        variant: "destructive",
      })
      return
    }

    try {
      await updateProgram({
        slug,
        data: formData,
      }).unwrap()

      toast({
        title: "Success",
        description: "Program updated successfully",
      })
      onOpenChange(false)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update program",
        variant: "destructive",
      })
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Edit Program</DialogTitle>
          <DialogDescription>
            Update the details for "{program?.name}"
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="edit-name">Program Name</Label>
            <Input
              id="edit-name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-description">Description</Label>
            <Textarea
              id="edit-description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="edit-duration">Duration (Days)</Label>
              <Input
                id="edit-duration"
                type="number"
                min={1}
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-difficulty">Difficulty</Label>
              <Select
                value={formData.difficulty}
                onValueChange={(value: any) => setFormData({ ...formData, difficulty: value })}
              >
                <SelectTrigger id="edit-difficulty">
                  <SelectValue placeholder="Select difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginners">Beginners</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="edit-gender">Gender Target</Label>
              <Select
                value={formData.genderTarget}
                onValueChange={(value: any) => setFormData({ ...formData, genderTarget: value })}
              >
                <SelectTrigger id="edit-gender">
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
              <Label htmlFor="edit-status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value: any) => setFormData({ ...formData, status: value })}
              >
                <SelectTrigger id="edit-status">
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
              <Label htmlFor="edit-equipment">Equipment Required</Label>
              <p className="text-sm text-muted-foreground text-xs">Does this program require any equipment?</p>
            </div>
            <Switch
              id="edit-equipment"
              checked={formData.equipmentRequired}
              onCheckedChange={(checked) => setFormData({ ...formData, equipmentRequired: checked })}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Save Changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
