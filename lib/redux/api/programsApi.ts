import { apiSlice } from "./apiSlice"

export type GenderParam = "male" | "female"

export interface ProgramVideo {
  id: string
  day: number
  title: string
  description: string
  duration: number
  durationFormatted: string
  thumbnailUrl: string
  views: number
  difficulty: "beginner" | "intermediate" | "advanced"
  caloriesBurned?: number
  muscleGroups?: string[]
  isWelcomeVideo?: boolean
}

export interface ProgramItem {
  id: string
  slug: string
  name: string
  description: string
  duration: number
  difficulty: "beginner" | "intermediate" | "advanced"
  genderTarget: "male" | "female" | "both"
  equipmentRequired: boolean
  coverImageUrl: string
  enrollmentCount: number
  workoutVideos: ProgramVideo[]
  totalDuration: number
  videoCount: number
}

export interface ProgramSection {
  title: string
  description: string
  programs: ProgramItem[]
}

export interface ProgramsResponseData {
  category: string
  title: string
  description: string
  programs: {
    men: ProgramSection | null
    women: ProgramSection | null
    both: ProgramSection | null
  }
}

export interface NavigationVideo {
  id: string
  day: number
  title: string
  description: string
  duration: number
  durationFormatted: string
  thumbnailUrl: string | null
  views: number
  difficulty: "beginner" | "intermediate" | "advanced"
  caloriesBurned?: number
  muscleGroups?: string[]
  streamingUrl?: string | null
  streamingManifestKey?: string | null
  hasAdaptiveStreaming?: boolean
  isWelcomeVideo?: boolean
}

export interface WorkoutVideo extends ProgramVideo {
  videoUrl?: string | null
  hasAdaptiveStreaming?: boolean
  streamingManifestKey?: string | null
  videoKey?: string
  thumbnailKey?: string
  expiresIn?: number
}

export interface WorkoutResponseData {
  video: WorkoutVideo
  navigation: {
    previous: NavigationVideo | null
    next: NavigationVideo | null
    currentDay: number
    hasPrevious: boolean
    hasNext: boolean
  }
}

interface ApiResponse<T> {
  success: boolean
  data: T
}

export const programsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBeginnerProgramsByGender: builder.query<ProgramsResponseData, GenderParam>({
      query: (gender) => ({
        url: "/program/category/beginner",
        params: { gender },
      }),
      transformResponse: (response: ApiResponse<ProgramsResponseData>) => response.data,
      providesTags: ["Program"],
    }),
    getEquipmentProgramsByGender: builder.query<ProgramsResponseData, GenderParam>({
      query: (gender) => ({
        url: "/program/category/equipment",
        params: { gender },
      }),
      transformResponse: (response: ApiResponse<ProgramsResponseData>) => response.data,
      providesTags: ["Program"],
    }),
    // New: Targeted programs by gender
    getTargetedProgramsByGender: builder.query<ProgramsResponseData, GenderParam>({
      query: (gender) => ({
        url: `/targeted/gender/${gender}`,
      }),
      // Support either { success, data } or direct data
      transformResponse: (response: any) => response?.data ?? response,
      providesTags: ["Program"],
    }),
    // Fetch a targeted workout by id
    getTargetedWorkoutById: builder.query<TargetedWorkout, string>({
      query: (id) => ({ url: `/targeted/${id}` }),
      transformResponse: (response: ApiEnvelope<TargetedWorkout> | TargetedWorkout) =>
        (response as any)?.data ?? (response as TargetedWorkout),
      providesTags: (_result, _error, id) => [{ type: "Program", id }],
    }),
    getWorkoutByProgramAndDay: builder.query<WorkoutResponseData, { programSlug: string; day: number }>({
      query: ({ programSlug, day }) => ({
        url: `/program/${programSlug}/workout/${day}`,
      }),
      transformResponse: (response: ApiResponse<WorkoutResponseData>) => response.data,
      providesTags: ["Program"],
    }),
    // Start watching a program/day
    startProgram: builder.mutation<void, { programSlug: string; day: number | string }>({
      query: ({ programSlug, day }) => ({
        url: `/program/${programSlug}/start`,
        method: "POST",
        body: { day: String(day) },
      }),
    }),
    // Complete watching a program/day
    completeProgram: builder.mutation<void, { programSlug: string; day: number | string; timeSpent: number | string }>({
      query: ({ programSlug, day, timeSpent }) => ({
        url: `/program/${programSlug}/complete`,
        method: "POST",
        body: { day: String(day), timeSpent: String(timeSpent) },
      }),
    }),
  }),
})

export const {
  useGetBeginnerProgramsByGenderQuery,
  useGetEquipmentProgramsByGenderQuery,
  // New hook export
  useGetTargetedProgramsByGenderQuery,
  useGetTargetedWorkoutByIdQuery,
  useGetWorkoutByProgramAndDayQuery,
  useStartProgramMutation,
  useCompleteProgramMutation,
} = programsApi

export interface TargetedClip {
  id: string
  clipOrder: number
  title: string
  exercise: string
  duration: number
  videoKey?: string
  thumbnailUrl?: string | null
  instructions?: string
  tips?: string
  caloriesBurned?: number
  videoUrl?: string
}

export interface TargetedWorkout {
  id: string
  title: string
  description?: string
  totalDuration?: number
  durationFormatted?: string
  bodyPart?: string
  genderTarget?: "male" | "female" | "both"
  category?: string
  difficulty?: "beginner" | "intermediate" | "advanced"
  caloriesBurned?: number
  clipCount?: number
  thumbnailUrl?: string
  equipmentRequired?: boolean
  focusAreas?: string[]
  tags?: string[]
  viewCount?: number
  rating?: number
  sortOrder?: number
  workoutType?: string
  clips: TargetedClip[]
}

interface ApiEnvelope<T> {
  success: boolean
  data: T
}