// Central type definitions for the application

export interface User {
  id: string
  name: string
  email: string
  phone?: string
  role: "user" | "admin"
  subscriptionStatus?: "active" | "inactive" | "expired"
  subscriptionPlan?: "daily" | "weekly" | "monthly"
  avatar?: string
  createdAt: string
}

export interface Video {
  id: string
  title: string
  description: string
  thumbnail: string
  videoUrl: string
  duration: number
  category: string
  gender: "men" | "women"
  difficulty: "beginner" | "intermediate" | "advanced"
  instructor: string
  views: number
  rating: number
  equipment?: string
  createdAt: string
}

export interface Category {
  id: string
  name: string
  description: string
  thumbnail: string
  videoCount: number
  type: "beginner" | "equipment" | "targeted"
}

export interface Recipe {
  id: string
  title: string
  description: string
  image: string
  prepTime: number
  difficulty: "easy" | "medium" | "hard"
  rating: number
  calories: number
  servings: number
  protein: number
  carbs: number
  fat: number
  ingredients: string[]
  instructions: string[]
  mealType: "breakfast" | "lunch" | "dinner" | "snack"
}

export interface Subscription {
  id: string
  userId: string
  plan: "daily" | "weekly" | "monthly"
  status: "active" | "inactive" | "expired"
  startDate: string
  endDate: string
  autoRenew: boolean
  paymentMethod: "mtn"
}

export interface ApiError {
  message: string
  statusCode: number
  errors?: Record<string, string[]>
}
