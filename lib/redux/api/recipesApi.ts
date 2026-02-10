import { apiSlice } from "./apiSlice"

interface Recipe {
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

interface RecipeFilters {
  mealType?: "breakfast" | "lunch" | "dinner" | "snack"
  difficulty?: "easy" | "medium" | "hard"
  search?: string
}

// New: Nutrition Recipes per category (breakfast/lunch/dinner)
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

export const recipesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getRecipes: builder.query<Recipe[], RecipeFilters>({
      query: (filters) => ({
        url: "/nutrition/recipes",
        params: filters,
      }),
      providesTags: ["Recipe"],
    }),
    getRecipeById: builder.query<Recipe, string>({
      query: (id) => `/recipes/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Recipe", id }],
    }),
    // New endpoint: fetch nutrition recipes by category
    getNutritionRecipesByCategory: builder.query<NutritionRecipe[], "breakfast" | "lunch" | "dinner">({
      query: (category) => ({ url: `/nutrition/category/${category}` }),
      transformResponse: (response: { success: boolean; message?: string; data: NutritionRecipe[] } | NutritionRecipe[]) =>
        (response as any)?.data ?? (response as NutritionRecipe[]),
      providesTags: ["Recipe"],
    }),
    createRecipe: builder.mutation<Recipe, Partial<Recipe>>({
      query: (data) => ({
        url: "/recipes",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Recipe"],
    }),
    updateRecipe: builder.mutation<Recipe, { id: string; data: Partial<Recipe> }>({
      query: ({ id, data }) => ({
        url: `/recipes/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: "Recipe", id }, "Recipe"],
    }),
    deleteRecipe: builder.mutation<void, string>({
      query: (id) => ({
        url: `/recipes/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Recipe"],
    }),
  }),
})

export const {
  useGetRecipesQuery,
  useGetRecipeByIdQuery,
  useGetNutritionRecipesByCategoryQuery,
  useCreateRecipeMutation,
  useUpdateRecipeMutation,
  useDeleteRecipeMutation,
} = recipesApi
