"use client"

import { VideoCard } from "@/components/video-card"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import Link from "next/link"

// Mock data - would come from database
const categoryData: Record<string, any> = {
  "beginner-men": {
    title: "Beginner Program - Men",
    description: "30-day program designed for men starting their fitness journey",
    videos: [
      {
        id: "bm1",
        title: "Full Body Warm-up",
        duration: "30",
        thumbnail: "/man-doing-warmup-exercises.jpg",
        difficulty: "Beginner",
        rating: 4.8,
        instructor: "Mike Anderson",
        categories: ["No Equipment", "Full Body"],
      },
      {
        id: "bm2",
        title: "Lower Body Basics",
        duration: "30",
        thumbnail: "/man-doing-lower-body-exercises.jpg",
        difficulty: "Beginner",
        rating: 4.7,
        instructor: "Mike Anderson",
        categories: ["No Equipment", "Lower Body"],
      },
      {
        id: "bm3",
        title: "Upper Body Strength",
        duration: "30",
        thumbnail: "/man-doing-upper-body-exercises.jpg",
        difficulty: "Beginner",
        rating: 4.6,
        instructor: "Mike Anderson",
        categories: ["No Equipment", "Upper Body"],
      },
      {
        id: "bm4",
        title: "Core Fundamentals",
        duration: "30",
        thumbnail: "/man-doing-core-exercises.jpg",
        difficulty: "Beginner",
        rating: 4.9,
        instructor: "Mike Anderson",
        categories: ["No Equipment", "Core"],
      },
      {
        id: "bm5",
        title: "Cardio Basics",
        duration: "30",
        thumbnail: "/man-doing-cardio-exercises.jpg",
        difficulty: "Beginner",
        rating: 4.5,
        instructor: "Mike Anderson",
        categories: ["No Equipment", "Cardio"],
      },
    ],
  },
  "beginner-women": {
    title: "Beginner Program - Women",
    description: "30-day program designed for women starting their fitness journey",
    videos: [
      {
        id: "bw1",
        title: "Total Body Warmup",
        duration: "30",
        thumbnail: "/woman-doing-warmup-exercises.jpg",
        difficulty: "Beginner",
        rating: 4.8,
        instructor: "Sarah Johnson",
        categories: ["No Equipment", "Full Body"],
      },
      {
        id: "bw2",
        title: "Glute Activation",
        duration: "30",
        thumbnail: "/woman-doing-glute-exercises.jpg",
        difficulty: "Beginner",
        rating: 4.7,
        instructor: "Sarah Johnson",
        categories: ["No Equipment", "Glutes"],
      },
      {
        id: "bw3",
        title: "Arm Toning",
        duration: "30",
        thumbnail: "/woman-doing-arm-exercises.jpg",
        difficulty: "Beginner",
        rating: 4.6,
        instructor: "Sarah Johnson",
        categories: ["No Equipment", "Arms"],
      },
    ],
  },
  "equipment-men": {
    title: "With Equipment - Men",
    description: "Dumbbell-focused workouts to build strength and muscle",
    videos: [
      {
        id: "em1",
        title: "Chest & Triceps Builder",
        duration: "30",
        thumbnail: "/man-doing-chest-triceps-exercises.jpg",
        difficulty: "Intermediate",
        rating: 4.9,
        instructor: "John Smith",
        categories: ["Equipment", "Chest", "Triceps"],
      },
      {
        id: "em2",
        title: "Back & Biceps Power",
        duration: "30",
        thumbnail: "/man-doing-back-biceps-exercises.jpg",
        difficulty: "Intermediate",
        rating: 4.8,
        instructor: "John Smith",
        categories: ["Equipment", "Back", "Biceps"],
      },
    ],
  },
  belly: {
    title: "Belly Fat Burn",
    description: "Targeted exercises to strengthen your core and reduce belly fat",
    videos: [
      {
        id: "belly1",
        title: "Core Crusher Routine",
        duration: "30",
        thumbnail: "/man-doing-core-crusher-exercises.jpg",
        difficulty: "Intermediate",
        rating: 4.7,
        instructor: "Jane Doe",
        categories: ["No Equipment", "Core"],
      },
      {
        id: "belly2",
        title: "Ab Sculptor Workout",
        duration: "30",
        thumbnail: "/man-doing-ab-sculptor-exercises.jpg",
        difficulty: "Intermediate",
        rating: 4.6,
        instructor: "Jane Doe",
        categories: ["No Equipment", "Abs"],
      },
    ],
  },
  recipes: {
    title: "Healthy Recipes",
    description: "Quick and nutritious Nigerian recipes",
    videos: [
      {
        id: "r1",
        title: "Protein-Packed Breakfast Ideas",
        duration: "30",
        thumbnail: "/breakfast-ideas.jpg",
        difficulty: "Beginner",
        rating: 4.5,
        instructor: "Chef Yemi",
        categories: ["Recipes", "Breakfast"],
      },
      {
        id: "r2",
        title: "Healthy Nigerian Lunch Options",
        duration: "30",
        thumbnail: "/lunch-options.jpg",
        difficulty: "Beginner",
        rating: 4.4,
        instructor: "Chef Yemi",
        categories: ["Recipes", "Lunch"],
      },
    ],
  },
}

export default async function CategoryPage({ params }: { params: { id: string } }) {
  const { id } = params
  const category = categoryData[id] || categoryData["beginner-men"]

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/dashboard/targeted">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-lg font-bold text-foreground">{category.title}</h1>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </header>

      {/* Hero Banner */}
      <div className="relative h-64 overflow-hidden">
        <img src="/placeholder.svg?key=cathero" alt={category.title} className="object-cover w-full h-full" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-black/60 to-black/30" />
        <div className="absolute bottom-0 left-0 right-0 p-6 container mx-auto">
          <h1 className="text-3xl font-bold text-white mb-2">{category.title}</h1>
          <p className="text-white/90 text-sm max-w-2xl">{category.description}</p>
        </div>
      </div>

      {/* Videos Grid */}
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-xl font-bold mb-6 text-foreground">{category.videos.length} Workout Videos</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {category.videos.map((video) => (
            <Link key={video.id} href={`/dashboard/video/${video.id}`}>
              <VideoCard {...video} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
