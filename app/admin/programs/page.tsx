"use client"

import { useState } from "react"
import Link from "next/link"
import { Plus, Search, MoreHorizontal, Video } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useGetProgramsQuery, Program } from "@/lib/redux/api/adminContentApi"
import { EditProgramModal } from "@/components/admin/edit-program-modal"

export default function AdminProgramsPage() {
  const { data: programs, isLoading } = useGetProgramsQuery()
  const [searchQuery, setSearchQuery] = useState("")
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null)

  const handleEdit = (program: Program) => {
    setSelectedProgram(program)
    setEditModalOpen(true)
  }

  const filteredPrograms = programs?.filter((p) => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Programs</h1>
          <p className="text-muted-foreground">Manage your workout programs</p>
        </div>
        <Link href="/admin/programs/new">
          <Button className="w-full sm:w-auto">
            <Plus className="w-4 h-4 mr-2" />
            Create Program
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search programs..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center py-8">Loading programs...</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Difficulty</TableHead>
                  <TableHead>Gender</TableHead>
                  <TableHead>Videos</TableHead>
                  <TableHead>Enrolled</TableHead>
                  <TableHead>Equipment</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPrograms?.map((program) => (
                  <TableRow key={program.id}>
                    <TableCell className="font-medium">{program.name}</TableCell>
                    <TableCell>{program.duration} Days</TableCell>
                    <TableCell className="capitalize">{program.difficulty}</TableCell>
                    <TableCell className="capitalize">{program.genderTarget}</TableCell>
                    <TableCell>{program.videoCount || 0}</TableCell>
                    <TableCell>{program.enrollmentCount?.toLocaleString() || 0}</TableCell>
                    <TableCell>
                      <Badge variant={program.equipmentRequired === true ? "default" : "secondary"}>
                        {program.equipmentRequired ? "With Equipment" : "No Equipment"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <Link href={`/admin/programs/${program.slug || program.data?.slug}/upload`}>
                            <DropdownMenuItem>
                              <Video className="w-4 h-4 mr-2" />
                              Upload Video
                            </DropdownMenuItem>
                          </Link>
                          <DropdownMenuItem onClick={() => handleEdit(program)}>Edit Program</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
                {!filteredPrograms?.length && (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                      No programs found. Create one to get started.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <EditProgramModal
        program={selectedProgram}
        open={editModalOpen}
        onOpenChange={setEditModalOpen}
      />
    </div>
  )
}
