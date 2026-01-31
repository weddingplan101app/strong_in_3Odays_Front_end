"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Clock, Flame, Users, Star, CheckCircle2 } from "lucide-react"
import Image from "next/image"
import { ScrollArea } from "@/components/ui/scroll-area"

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

interface RecipeModalProps {
  recipe: Recipe | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function RecipeModal({ recipe, open, onOpenChange }: RecipeModalProps) {
  if (!recipe) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0 gap-0">
        <ScrollArea className="max-h-[90vh]">
          {/* Hero Image */}
          <div className="relative aspect-video w-full overflow-hidden">
            <Image src={recipe.image || "/placeholder.svg"} alt={recipe.title} fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

            {/* Difficulty Badge */}
            <div className="absolute left-4 top-4">
              <Badge className="bg-white text-black hover:bg-white">{recipe.difficulty}</Badge>
            </div>

            {/* Rating */}
            <div className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-black/40 px-3 py-1.5 backdrop-blur-sm">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-semibold text-white">{recipe.rating}</span>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            <DialogHeader>
              <DialogTitle className="text-3xl font-bold">{recipe.title}</DialogTitle>
              <DialogDescription className="text-base mt-2">{recipe.description}</DialogDescription>
            </DialogHeader>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="flex items-center gap-2 rounded-lg border border-border bg-muted/50 p-3">
                <Clock className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">Total Time</p>
                  <p className="font-semibold">{recipe.totalTime}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 rounded-lg border border-border bg-muted/50 p-3">
                <Flame className="h-5 w-5 text-orange-500" />
                <div>
                  <p className="text-xs text-muted-foreground">Calories</p>
                  <p className="font-semibold">{recipe.calories}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 rounded-lg border border-border bg-muted/50 p-3">
                <Users className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">Servings</p>
                  <p className="font-semibold">{recipe.servings}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 rounded-lg border border-border bg-muted/50 p-3">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <div>
                  <p className="text-xs text-muted-foreground">Difficulty</p>
                  <p className="font-semibold">{recipe.difficulty}</p>
                </div>
              </div>
            </div>

            <Separator />

            {/* Nutrition Info */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Nutrition per Serving</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="rounded-lg border border-border p-3 text-center">
                  <p className="text-2xl font-bold text-primary">{recipe.nutrition.protein}</p>
                  <p className="text-xs text-muted-foreground mt-1">Protein</p>
                </div>
                <div className="rounded-lg border border-border p-3 text-center">
                  <p className="text-2xl font-bold text-primary">{recipe.nutrition.carbs}</p>
                  <p className="text-xs text-muted-foreground mt-1">Carbs</p>
                </div>
                <div className="rounded-lg border border-border p-3 text-center">
                  <p className="text-2xl font-bold text-primary">{recipe.nutrition.fats}</p>
                  <p className="text-xs text-muted-foreground mt-1">Fats</p>
                </div>
                <div className="rounded-lg border border-border p-3 text-center">
                  <p className="text-2xl font-bold text-primary">{recipe.nutrition.fiber}</p>
                  <p className="text-xs text-muted-foreground mt-1">Fiber</p>
                </div>
              </div>
            </div>

            <Separator />

            {/* Ingredients */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Ingredients</h3>
              <ul className="space-y-2">
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{ingredient}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Separator />

            {/* Instructions */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Instructions</h3>
              <ol className="space-y-4">
                {recipe.instructions.map((instruction, index) => (
                  <li key={index} className="flex gap-3">
                    <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                      {index + 1}
                    </span>
                    <p className="text-sm leading-relaxed pt-1">{instruction}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
