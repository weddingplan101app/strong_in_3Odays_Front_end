import { apiSlice } from "./apiSlice"

interface UserAnalytics {
  totalWorkouts: number
  totalMinutes: number
  totalCalories: number
  currentStreak: number
  weeklyData: Array<{
    day: string
    minutes: number
    calories: number
  }>
  monthlyProgress: Array<{
    month: string
    workouts: number
    minutes: number
  }>
  categoryBreakdown: Array<{
    category: string
    count: number
    percentage: number
  }>
}

interface AdminAnalytics {
  totalUsers: number
  totalVideos: number
  totalRevenue: number
  activeSubscriptions: number
  userGrowth: Array<{
    month: string
    users: number
  }>
  popularVideos: Array<{
    id: string
    title: string
    views: number
  }>
  revenueByPlan: {
    daily: number
    weekly: number
    monthly: number
  }
}

interface WeeklyActivityItem {
  day: string
  minutes: number
  calories: number
}

interface MonthlyProgressItem {
  week: string
  minutes: number
  workouts: number
}

interface WorkoutCategoryItem {
  category: string
  workouts: number
  percentage: number
  color: string
}

interface MostWatchedVideoItem {
  rank: number
  title: string
  category: string
  views: number
  color: string
}

interface AnalyticsDashboardData {
  analytics: {
    thisWeek: {
      minutesTrained: number
      changeFromLastWeek: string
      currentStreak: number
      completionRate: string
      avgPerDay: number
      weeklyActivity: WeeklyActivityItem[]
    }
    weeklyActivity: WeeklyActivityItem[]
    monthlyProgress: MonthlyProgressItem[]
    workoutCategories: WorkoutCategoryItem[]
    mostWatchedVideos: MostWatchedVideoItem[]
  }
  constants: {
    categories: string[]
    colors: Record<string, string>
  }
}

interface AnalyticsDashboardResponse {
  success: boolean
  data: AnalyticsDashboardData
}

export const analyticsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserAnalytics: builder.query<UserAnalytics, void>({
      query: () => "/analytics/user",
      providesTags: ["Analytics"],
    }),
    getAdminAnalytics: builder.query<AdminAnalytics, void>({
      query: () => "/analytics/admin",
      providesTags: ["Analytics"],
    }),
    logWorkout: builder.mutation<void, { videoId: string; duration: number; calories: number }>({
      query: (data) => ({
        url: "/analytics/workout",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Analytics"],
    }),
    getAnalyticsDashboard: builder.query<AnalyticsDashboardResponse, void>({
      query: () => "/analytics/dashboard",
      providesTags: ["Analytics"],
    }),
  }),
})

export const { useGetUserAnalyticsQuery, useGetAdminAnalyticsQuery, useLogWorkoutMutation, useGetAnalyticsDashboardQuery } = analyticsApi
