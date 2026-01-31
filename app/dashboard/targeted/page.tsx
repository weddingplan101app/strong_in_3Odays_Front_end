"use client"

import { VideoCard } from "@/components/video-card"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function TargetedPage() {
  const router = useRouter()

  const recommendedVideos = [
    {
      id: "belly1",
      title: "Core Crusher Routine",
      duration: "30",
      thumbnail: "/core-workout-exercises.jpg",
      difficulty: "Intermediate",
      rating: 4.7,
      instructor: "Sarah Johnson",
      categories: ["No Equipment", "Core"],
    },
    {
      id: "arms1",
      title: "Arm Toning Blast",
      duration: "30",
      thumbnail: "/arm-toning-workout.jpg",
      difficulty: "Beginner",
      rating: 4.5,
      instructor: "Mike Anderson",
      categories: ["Dumbbells", "Upper Body"],
    },
    {
      id: "glutes1",
      title: "Glute Activation",
      duration: "30",
      thumbnail: "/glute-workout.jpg",
      difficulty: "Intermediate",
      rating: 4.8,
      instructor: "Emma White",
      categories: ["No Equipment", "Lower Body"],
    },
    {
      id: "chest1",
      title: "Chest Builder Workout",
      duration: "30",
      thumbnail: "/chest-workout-pushups.jpg",
      difficulty: "Advanced",
      rating: 4.6,
      instructor: "David Lee",
      categories: ["No Equipment", "Upper Body"],
    },
    {
      id: "legs1",
      title: "Leg Power Circuit",
      duration: "30",
      thumbnail: "/leg-workout-squats.jpg",
      difficulty: "Intermediate",
      rating: 4.9,
      instructor: "Alex Brown",
      categories: ["No Equipment", "Lower Body"],
    },
    {
      id: "back1",
      title: "Back Strengthening Flow",
      duration: "30",
      thumbnail: "/back-strengthening-exercises.jpg",
      difficulty: "Beginner",
      rating: 4.4,
      instructor: "Rachel Green",
      categories: ["No Equipment", "Upper Body"],
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Targeted Workouts</h1>
        <p className="text-muted-foreground">Focus on specific muscle groups with these recommended videos</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {recommendedVideos.map((video) => (
          <Link key={video.id} href={`/dashboard/video/${video.id}`}>
            <VideoCard {...video} />
          </Link>
        ))}
      </div>
    </div>
  )
}
