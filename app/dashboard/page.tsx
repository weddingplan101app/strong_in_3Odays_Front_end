"use client"

import { StatCard } from "@/components/stat-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { VideoCard } from "@/components/video-card"
import { RecipeCard } from "@/components/recipe-card"
import { Trophy, Clock, Video, Calendar, Play } from "lucide-react"
import Link from "next/link"
import { useState, useMemo, useEffect } from "react"
import { RecipeModal } from "@/components/recipe-modal"
import { useAppSelector, useAppDispatch } from "@/lib/redux/hooks"
import { useGetCurrentUserQuery } from "@/lib/redux/api/authApi"
import { updateUser } from "@/lib/redux/features/auth/authSlice"
import { useGetDashboardOverviewQuery } from "@/lib/redux/api/usersApi"

export default function DashboardPage() {
  const continueWatching = [
    {
      id: "bm3",
      title: "Push-up Progression",
      duration: "35",
      thumbnail: "/man-doing-push-ups.jpg",
      difficulty: "Intermediate",
      rating: 4.8,
      instructor: "Mike Anderson",
      categories: ["No Equipment"],
    },
    {
      id: "bm5",
      title: "Squat Basics",
      duration: "30",
      thumbnail: "/man-doing-squats.jpg",
      difficulty: "Beginner",
      rating: 4.5,
      instructor: "Mike Anderson",
      categories: ["No Equipment"],
    },
    {
      id: "bw2",
      title: "Core Strength",
      duration: "25",
      thumbnail: "/woman-doing-plank.jpg",
      difficulty: "Intermediate",
      rating: 4.7,
      instructor: "Sarah Johnson",
      categories: ["Yoga Mat"],
    },
  ]

  const recommendedRecipes = [
    {
      id: "r1",
      title: "Protein Pancakes",
      image: "/protein-pancakes-with-banana-and-honey.jpg",
      difficulty: "Easy",
      prepTime: "15 mins",
      calories: 320,
      rating: 4.8,
      servings: 2,
      description:
        "Fluffy protein-packed pancakes made with banana and topped with honey. Perfect post-workout breakfast!",
      nutrition: { protein: 28, carbs: 42, fats: 8, fiber: 4 },
      ingredients: [
        "2 scoops vanilla protein powder",
        "1 ripe banana, mashed",
        "2 eggs",
        "1/4 cup oat flour",
        "1 tsp baking powder",
        "Honey for topping",
      ],
      instructions: [
        "Mix protein powder, mashed banana, and eggs in a bowl",
        "Add oat flour and baking powder, mix until smooth",
        "Heat a non-stick pan over medium heat",
        "Pour batter to form pancakes, cook 2-3 minutes per side",
        "Serve hot with honey drizzle",
      ],
    },
    {
      id: "r4",
      title: "Healthy Jollof Rice",
      image: "/healthy-nigerian-jollof-rice-with-vegetables.jpg",
      difficulty: "Medium",
      prepTime: "45 mins",
      calories: 380,
      rating: 4.9,
      servings: 4,
      description: "A healthier take on the classic Nigerian favorite, packed with vegetables and lean protein.",
      nutrition: { protein: 18, carbs: 52, fats: 12, fiber: 6 },
      ingredients: [
        "2 cups brown rice",
        "400g tomato sauce",
        "2 bell peppers, diced",
        "1 onion, chopped",
        "Mixed vegetables (carrots, peas)",
        "Chicken or turkey pieces",
        "Spices (curry, thyme, bay leaves)",
      ],
      instructions: [
        "Blend tomatoes, peppers, and onions into a smooth paste",
        "Season and cook chicken pieces until done, set aside",
        "Fry tomato paste until oil rises to the top",
        "Add brown rice and stock, bring to a boil",
        "Reduce heat, add vegetables and chicken, cover and simmer for 30 minutes",
      ],
    },
    {
      id: "r5",
      title: "Grilled Chicken Salad",
      image: "/grilled-chicken-salad.png",
      difficulty: "Easy",
      prepTime: "20 mins",
      calories: 290,
      rating: 4.6,
      servings: 2,
      description: "Fresh garden salad with perfectly grilled chicken breast, packed with nutrients and flavor.",
      nutrition: { protein: 32, carbs: 18, fats: 10, fiber: 5 },
      ingredients: [
        "200g chicken breast",
        "Mixed greens (lettuce, spinach, arugula)",
        "Cherry tomatoes",
        "Cucumber, sliced",
        "Red onion, thinly sliced",
        "Olive oil and lemon dressing",
      ],
      instructions: [
        "Season chicken breast with salt, pepper, and herbs",
        "Grill chicken for 6-7 minutes per side until cooked through",
        "Wash and prepare all vegetables",
        "Arrange greens on a plate, add vegetables",
        "Slice grilled chicken and place on top",
        "Drizzle with olive oil and lemon dressing",
      ],
    },
  ]

  const [selectedRecipe, setSelectedRecipe] = useState<(typeof recommendedRecipes)[0] | null>(null)

  const dispatch = useAppDispatch()
  const { user, token } = useAppSelector((state) => state.auth)
  const { data: fetchedUser } = useGetCurrentUserQuery(undefined, {
    skip: !token,
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  })

  const { data: overview, isLoading: overviewLoading, isError: overviewError } = useGetDashboardOverviewQuery()

  useEffect(() => {
    if (fetchedUser) {
      dispatch(updateUser(fetchedUser))
    }
  }, [fetchedUser, dispatch])

  const displayUser = fetchedUser ?? user
  const displayName = useMemo(() => {
    return overview?.user?.greeting || displayUser?.name || displayUser?.email || "User"
  }, [displayUser, overview?.user?.greeting])

  // Helper to format duration minutes from seconds or formatted string
  const toMinutes = (seconds?: number, formatted?: string) => {
    if (typeof seconds === "number" && !Number.isNaN(seconds)) {
      return Math.max(1, Math.round(seconds / 60)).toString()
    }
    if (formatted && typeof formatted === "string") {
      const m = formatted.split(":")[0]
      return m || ""
    }
    return ""
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">{typeof displayName === "string" && displayName.startsWith("Good") ? displayName : `Welcome back, ${displayName}!`}</h1>
        <p className="text-muted-foreground">Here's your fitness progress</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title={overview?.stats?.daysCompleted?.label || "Days Completed"}
          value={overview?.stats?.daysCompleted?.current ?? 0}
          subtitle={overview?.stats?.daysCompleted?.description || (overview?.stats?.daysCompleted?.total ? `of ${overview.stats.daysCompleted.total} days` : undefined)}
          icon={Calendar}
          trend={overview?.stats?.daysCompleted?.change ? `+${overview.stats.daysCompleted.change} ${overview.stats.daysCompleted.trend || "this week"}` : undefined}
        />
        <StatCard
          title={overview?.stats?.minutesTrained?.label || "Minutes Trained"}
          value={overview?.stats?.minutesTrained?.current ?? 0}
          subtitle={overview?.stats?.minutesTrained?.description || "this month"}
          icon={Clock}
          trend={overview?.stats?.minutesTrained?.change ? `+${overview.stats.minutesTrained.change} ${overview.stats.minutesTrained.trend || "from last week"}` : undefined}
        />
        <StatCard
          title={overview?.stats?.videosWatched?.label || "Videos Watched"}
          value={overview?.stats?.videosWatched?.current ?? 0}
          subtitle={overview?.stats?.videosWatched?.description || "total videos"}
          icon={Video}
        />
        <StatCard
          title={overview?.stats?.currentStreak?.label || "Current Streak"}
          value={overview?.stats?.currentStreak?.current ?? 0}
          subtitle={overview?.stats?.currentStreak?.description || "days in a row"}
          icon={Trophy}
          trend={overview?.stats?.currentStreak?.encouragement}
        />
      </div>

      {/* Current Program */}
      <Card>
        <CardHeader>
          <CardTitle>{overview?.currentProgram?.name || "Current Program"}</CardTitle>
          <CardDescription className="text-sm">
            {overview?.currentProgram?.progress?.description || overview?.currentProgram?.formattedTitle || "Your active program"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex-1">
              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                <div className="h-full bg-primary" style={{ width: `${overview?.currentProgram?.progress?.percentage ?? 0}%` }} />
              </div>
              <p className="text-sm text-muted-foreground mt-2">{(overview?.currentProgram?.progress?.percentage ?? 0)}% complete</p>
            </div>
            {overview?.currentProgram?.slug && (
              <Link href={`/dashboard/video/${overview.currentProgram.slug}?day=${overview?.currentProgram?.progress?.currentDay ?? 1}`} className="block">
                <Button className="w-full">
                  <Play className="w-4 h-4 mr-2 fill-current" />
                  {overview?.continueWatching?.message || `Continue Day ${overview?.currentProgram?.progress?.currentDay ?? 1}`}
                </Button>
              </Link>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Continue Watching */}
      <div>
        <h2 className="text-xl font-bold mb-4 text-foreground">Continue Watching</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {overview?.continueWatching?.video ? (
            <VideoCard
              title={overview.continueWatching.video.title}
              duration={toMinutes(overview.continueWatching.video.duration, overview.continueWatching.video.durationFormatted)}
              thumbnail={overview.continueWatching.video.thumbnailUrl || "/placeholder.svg"}
              difficulty={undefined}
              rating={undefined}
              instructor={undefined}
              categories={[]}
              href={`/dashboard/video/${overview.continueWatching.video.program?.slug ?? overview.currentProgram?.slug ?? ""}?day=${overview.continueWatching.video.day}`}
            />
          ) : (
            // Fallback empty state
            <Card className="p-6">
              <p className="text-muted-foreground">No active video. Start your next workout from your program.</p>
            </Card>
          )}
        </div>
      </div>

      {/* Recommended Workouts */}
      {overview?.recommendedWorkouts && overview.recommendedWorkouts.length > 0 && (
        <div>
          <h2 className="text-xl font-bold mb-4 text-foreground">Recommended Workouts</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {overview.recommendedWorkouts.map((w) => (
              <VideoCard
                key={w.id}
                title={w.title}
                duration={toMinutes(w.duration, w.durationFormatted)}
                thumbnail={w.thumbnailUrl || "/placeholder.svg"}
                difficulty={w.difficulty}
                rating={w.rating}
                instructor={w.instructor}
                categories={w.muscleGroups || (w.category ? [w.category] : [])}
              />
            ))}
          </div>
        </div>
      )}

      {/* Fuel Your Fitness */}
      <div>
        <h2 className="text-xl font-bold mb-4 text-foreground">Fuel Your Fitness</h2>
        <p className="text-sm text-muted-foreground mb-4">Healthy recipes to complement your workout routine</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {recommendedRecipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              id={recipe.id}
              title={recipe.title}
              image={recipe.image}
              difficulty={recipe.difficulty}
              prepTime={recipe.prepTime}
              calories={recipe.calories}
              rating={recipe.rating}
              servings={recipe.servings}
              onClick={() => setSelectedRecipe(recipe)}
            />
          ))}
        </div>
      </div>

      {/* Recipe Modal */}
      {selectedRecipe && (
        <RecipeModal
          recipe={{
            title: selectedRecipe.title,
            image: selectedRecipe.image,
            difficulty: selectedRecipe.difficulty,
            prepTime: selectedRecipe.prepTime,
            calories: selectedRecipe.calories,
            rating: selectedRecipe.rating,
            servings: selectedRecipe.servings,
            description: selectedRecipe.description,
            nutrition: selectedRecipe.nutrition,
            ingredients: selectedRecipe.ingredients,
            instructions: selectedRecipe.instructions,
          }}
          open={!!selectedRecipe}
          onOpenChange={(open) => !open && setSelectedRecipe(null)}
        />
      )}
    </div>
  )
}
