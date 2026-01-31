"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, MoreHorizontal, UserPlus } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { UserModal } from "@/components/admin/user-modal"
import { useToast } from "@/hooks/use-toast"

export default function UsersPage() {
  const { toast } = useToast()
  const [createModalOpen, setCreateModalOpen] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<any>(null)

  const [users, setUsers] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      status: "Active",
      subscription: "Monthly",
      joined: "Jan 10, 2025",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      status: "Active",
      subscription: "Weekly",
      joined: "Jan 12, 2025",
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike@example.com",
      status: "Trial",
      subscription: "Trial",
      joined: "Jan 15, 2025",
    },
    {
      id: 4,
      name: "Sarah Williams",
      email: "sarah@example.com",
      status: "Active",
      subscription: "Monthly",
      joined: "Jan 8, 2025",
    },
    {
      id: 5,
      name: "David Brown",
      email: "david@example.com",
      status: "Suspended",
      subscription: "None",
      joined: "Dec 20, 2024",
    },
  ])

  const handleCreate = (data: any) => {
    const newUser = {
      id: users.length + 1,
      ...data,
      joined: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    }
    setUsers([...users, newUser])
    toast({
      title: "User created",
      description: `${data.name} has been added to the platform.`,
    })
  }

  const handleEdit = (data: any) => {
    setUsers(users.map((u) => (u.id === selectedUser.id ? { ...u, ...data } : u)))
    toast({
      title: "User updated",
      description: `${data.name}'s information has been updated.`,
    })
  }

  const handleToggleSuspend = (user: any) => {
    const newStatus = user.status === "Suspended" ? "Active" : "Suspended"
    setUsers(users.map((u) => (u.id === user.id ? { ...u, status: newStatus } : u)))
    toast({
      title: newStatus === "Suspended" ? "User suspended" : "User activated",
      description: `${user.name} is now ${newStatus.toLowerCase()}.`,
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Users</h1>
          <p className="text-muted-foreground">Manage platform users</p>
        </div>
        <Button onClick={() => setCreateModalOpen(true)}>
          <UserPlus className="w-4 h-4 mr-2" />
          Add User
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Users</CardTitle>
          <CardDescription>
            <div className="flex items-center gap-2 mt-2">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Search users..." className="pl-9" />
              </div>
            </div>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Subscription</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        user.status === "Active" ? "default" : user.status === "Trial" ? "secondary" : "destructive"
                      }
                    >
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{user.subscription}</TableCell>
                  <TableCell>{user.joined}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            setSelectedUser(user)
                            setEditModalOpen(true)
                          }}
                        >
                          Edit User
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive" onClick={() => handleToggleSuspend(user)}>
                          {user.status === "Suspended" ? "Activate" : "Suspend"}
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

      <UserModal open={createModalOpen} onOpenChange={setCreateModalOpen} onSubmit={handleCreate} />
      <UserModal open={editModalOpen} onOpenChange={setEditModalOpen} onSubmit={handleEdit} editData={selectedUser} />
    </div>
  )
}
