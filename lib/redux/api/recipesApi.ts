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

export const recipesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getRecipes: builder.query<Recipe[], RecipeFilters>({
      query: (filters) => ({
        url: "/recipes",
        params: filters,
      }),
      providesTags: ["Recipe"],
    }),
    getRecipeById: builder.query<Recipe, string>({
      query: (id) => `/recipes/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Recipe", id }],
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
  useCreateRecipeMutation,
  useUpdateRecipeMutation,
  useDeleteRecipeMutation,
} = recipesApi
