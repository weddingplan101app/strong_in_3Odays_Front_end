import { apiSlice } from "./apiSlice"

interface User {
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

interface UpdateUserRequest {
  name?: string
  email?: string
  phone?: string
  avatar?: string
}

// Dashboard Overview Types
interface DashboardUser {
  id?: string
  name?: string
  greeting?: string
  dailyStreak?: number
  totalWorkouts?: number
  totalMinutes?: number
}

interface StatItem {
  current?: number
  total?: number
  change?: number
  label?: string
  description?: string
  trend?: string
  encouragement?: string
}

interface Stats {
  daysCompleted?: StatItem
  minutesTrained?: StatItem
  videosWatched?: StatItem
  currentStreak?: StatItem
}

interface ProgramProgress {
  completed?: number
  total?: number
  percentage?: number
  currentDay?: number
  description?: string
  status?: string
}

interface CurrentProgram {
  id?: string
  name?: string
  slug?: string
  coverImageUrl?: string
  formattedTitle?: string
  progress?: ProgramProgress
}

interface ContinueWatchingVideo {
  id: string
  day: number
  title: string
  description?: string
  duration?: number
  durationFormatted?: string
  videoUrl?: string | null
  thumbnailUrl?: string | null
  program?: { id?: string; name?: string; slug?: string }
}

interface ContinueWatching {
  message?: string
  completed?: boolean
  video?: ContinueWatchingVideo
  progress?: { currentDay?: number; message?: string }
}

interface RecommendedWorkout {
  id: string
  title: string
  rating?: number
  instructor?: string
  duration?: number
  durationFormatted?: string
  difficulty?: string
  equipment?: string
  thumbnailKey?: string
  category?: string
  muscleGroups?: string[]
  thumbnailUrl?: string
  recommended?: boolean
}

interface DashboardOverviewData {
  user?: DashboardUser
  stats?: Stats
  currentProgram?: CurrentProgram
  continueWatching?: ContinueWatching
  recommendedWorkouts?: RecommendedWorkout[]
  weeklyProgress?: unknown
  subscription?: unknown
  achievements?: unknown
}

export const usersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<User[], void>({
      query: () => "/users",
      providesTags: ["User"],
    }),
    getUserById: builder.query<User, string>({
      query: (id) => `/users/${id}`,
      providesTags: (_result, _error, id) => [{ type: "User", id }],
    }),
    updateUser: builder.mutation<User, { id: string; data: UpdateUserRequest }>({
      query: ({ id, data }) => ({
        url: `/users/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: "User", id }, "User"],
    }),
    deleteUser: builder.mutation<void, string>({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
    updateUserRole: builder.mutation<User, { id: string; role: "user" | "admin" }>({
      query: ({ id, role }) => ({
        url: `/users/${id}/role`,
        method: "PUT",
        body: { role },
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: "User", id }, "User"],
    }),
    // Dashboard overview
    getDashboardOverview: builder.query<DashboardOverviewData, void>({
      query: () => "/user/dashboard/overview",
      providesTags: ["User"],
      transformResponse: (response: any) => {
        // Support { success, data } or direct data
        return response?.data ?? response
      },
    }),
  }),
})

export const {
  useGetUsersQuery,
  useGetUserByIdQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useUpdateUserRoleMutation,
  useGetDashboardOverviewQuery,
} = usersApi
