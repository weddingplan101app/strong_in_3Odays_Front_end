"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function ProgramsPage() {
  const programs = [
    {
      id: "beginner-men",
      title: "Beginner Program - Men",
      description: "30-day program for men starting their fitness journey",
      progress: 40,
      daysCompleted: 12,
      totalDays: 30,
      status: "in-progress",
      thumbnail: "/placeholder.svg?key=prog1",
    },
    {
      id: "equipment-men",
      title: "With Equipment - Men",
      description: "Build strength with dumbbell workouts",
      progress: 0,
      daysCompleted: 0,
      totalDays: 30,
      status: "not-started",
      thumbnail: "/placeholder.svg?key=prog2",
    },
    {
      id: "beginner-women",
      title: "Beginner Program - Women",
      description: "30-day program for women starting their fitness journey",
      progress: 100,
      daysCompleted: 30,
      totalDays: 30,
      status: "completed",
      thumbnail: "/placeholder.svg?key=prog3",
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">My Programs</h1>
        <p className="text-muted-foreground">Track your fitness programs and progress</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {programs.map((program) => (
          <Card key={program.id}>
            <div className="relative h-48 overflow-hidden rounded-t-lg">
              <img
                src={program.thumbnail || "/placeholder.svg"}
                alt={program.title}
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute top-4 right-4">
                {program.status === "completed" && (
                  <Badge className="bg-green-500 text-white">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Completed
                  </Badge>
                )}
                {program.status === "in-progress" && (
                  <Badge className="bg-primary text-primary-foreground">In Progress</Badge>
                )}
              </div>
            </div>
            <CardHeader>
              <CardTitle>{program.title}</CardTitle>
              <CardDescription>{program.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Progress</span>
                    <span className="text-sm font-medium text-foreground">
                      {program.daysCompleted}/{program.totalDays} days
                    </span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div className="h-full bg-primary transition-all" style={{ width: `${program.progress}%` }} />
                  </div>
                </div>
                <Link href={`/category/${program.id}`}>
                  <Button className="w-full">
                    <Play className="w-4 h-4 mr-2 fill-current" />
                    {program.status === "not-started"
                      ? "Start Program"
                      : program.status === "completed"
                        ? "Restart Program"
                        : "Continue"}
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
