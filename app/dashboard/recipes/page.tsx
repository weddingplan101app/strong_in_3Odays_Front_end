"use client"

import { useMemo, useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RecipeCard } from "@/components/recipe-card"
import { RecipeModal } from "@/components/recipe-modal"
import { useGetNutritionRecipesByCategoryQuery } from "@/lib/redux/api/recipesApi"

// App-wide Recipe interface expected by RecipeModal and RecipeCard
interface Recipe {
  id: string
  title: string
  image: string
  difficulty: string
  prepTime: string
  cookTime: string
  totalTime: string
  calories: number
  rating: number
  servings: number
  description: string
  ingredients: string[]
  instructions: string[]
  nutrition: {
    protein: string
    carbs: string
    fats: string
    fiber: string
  }
}

// API response type (for local mapping only)
interface NutritionRecipe {
  id: string
  title: string
  description: string
  imageUrl: string
  calories: number
  prepTime: string
  category: string
  difficulty: string
  nutritionFacts: {
    protein: number | null
    carbs: number | null
    fat: number | null
    fiber: number | null
  }
  servings: number
}

function sanitizeImageUrl(url: string | null | undefined): string {
  if (!url) return "/placeholder.svg"
  // Remove backticks and whitespace if present in the payload
  return String(url).replace(/`/g, "").trim() || "/placeholder.svg"
}

function toGramString(n: number | null | undefined): string {
  if (n === null || n === undefined) return "-"
  // Display grams for consistency
  return `${n}`
}

function mapNutritionRecipe(item: NutritionRecipe): Recipe {
  return {
    id: item.id,
    title: item.title,
    image: sanitizeImageUrl(item.imageUrl),
    difficulty: item.difficulty ?? "",
    prepTime: item.prepTime ?? "-",
    // Not provided by API, set reasonable fallbacks
    cookTime: "-",
    totalTime: item.prepTime ?? "-",
    calories: item.calories ?? 0,
    // Rating not provided by API – use a neutral default for UI consistency
    rating: 4.5,
    servings: item.servings ?? 1,
    description: item.description ?? "",
    ingredients: [],
    instructions: [],
    nutrition: {
      protein: toGramString(item.nutritionFacts?.protein),
      carbs: toGramString(item.nutritionFacts?.carbs),
      fats: toGramString(item.nutritionFacts?.fat),
      fiber: toGramString(item.nutritionFacts?.fiber),
    },
  }
}

export default function RecipesPage() {
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null)
  const [modalOpen, setModalOpen] = useState(false)

  // Fetch recipes for each meal category
  const { data: breakfastData, isLoading: breakfastLoading } = useGetNutritionRecipesByCategoryQuery("breakfast")
  const { data: lunchData, isLoading: lunchLoading } = useGetNutritionRecipesByCategoryQuery("lunch")
  const { data: dinnerData, isLoading: dinnerLoading } = useGetNutritionRecipesByCategoryQuery("dinner")

  // Map API data to UI Recipe type
  const apiBreakfastRecipes: Recipe[] = useMemo(
    () => (breakfastData ?? []).map(mapNutritionRecipe),
    [breakfastData]
  )
  const apiLunchRecipes: Recipe[] = useMemo(() => (lunchData ?? []).map(mapNutritionRecipe), [lunchData])
  const apiDinnerRecipes: Recipe[] = useMemo(() => (dinnerData ?? []).map(mapNutritionRecipe), [dinnerData])

  const handleRecipeClick = (recipe: Recipe) => {
    setSelectedRecipe(recipe)
    setModalOpen(true)
  }

  return (
    <div className="space-y-6 pb-20 md:pb-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Healthy Recipes</h1>
        <p className="text-muted-foreground">Quick Nigerian recipes for your fitness journey</p>
      </div>

      <Tabs defaultValue="breakfast" className="w-full">
        <TabsList className="w-full sm:w-auto sm:inline-flex justify-start">
          <TabsTrigger value="breakfast">Breakfast</TabsTrigger>
          <TabsTrigger value="lunch">Lunch</TabsTrigger>
          <TabsTrigger value="dinner">Dinner</TabsTrigger>
        </TabsList>

        {/* Breakfast Tab */}
        <TabsContent value="breakfast" className="mt-6">
          {breakfastLoading && <p className="text-sm text-muted-foreground mb-4">Loading recipes...</p>}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {apiBreakfastRecipes.length ? (
              apiBreakfastRecipes.map((recipe) => (
                <RecipeCard key={recipe.id} {...recipe} onClick={() => handleRecipeClick(recipe)} />
              ))
            ) : (
              <p className="text-sm text-muted-foreground">No breakfast recipes found.</p>
            )}
          </div>
        </TabsContent>

        {/* Lunch Tab */}
        <TabsContent value="lunch" className="mt-6">
          {lunchLoading && <p className="text-sm text-muted-foreground mb-4">Loading recipes...</p>}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {apiLunchRecipes.length ? (
              apiLunchRecipes.map((recipe) => (
                <RecipeCard key={recipe.id} {...recipe} onClick={() => handleRecipeClick(recipe)} />
              ))
            ) : (
              <p className="text-sm text-muted-foreground">No lunch recipes found.</p>
            )}
          </div>
        </TabsContent>

        {/* Dinner Tab */}
        <TabsContent value="dinner" className="mt-6">
          {dinnerLoading && <p className="text-sm text-muted-foreground mb-4">Loading recipes...</p>}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {apiDinnerRecipes.length ? (
              apiDinnerRecipes.map((recipe) => (
                <RecipeCard key={recipe.id} {...recipe} onClick={() => handleRecipeClick(recipe)} />
              ))
            ) : (
              <p className="text-sm text-muted-foreground">No dinner recipes found.</p>
            )}
          </div>
        </TabsContent>
      </Tabs>

      <RecipeModal recipe={selectedRecipe} open={modalOpen} onOpenChange={setModalOpen} />
    </div>
  )
}
