import { apiSlice } from "./apiSlice"

interface Video {
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

interface VideoFilters {
  category?: string
  gender?: "men" | "women"
  difficulty?: "beginner" | "intermediate" | "advanced"
  search?: string
  page?: number
  limit?: number
}

interface VideoResponse {
  videos: Video[]
  total: number
  page: number
  totalPages: number
}

export const videosApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getVideos: builder.query<VideoResponse, VideoFilters>({
      query: (filters) => ({
        url: "/videos",
        params: filters,
      }),
      providesTags: ["Video"],
    }),
    getVideoById: builder.query<Video, string>({
      query: (id) => `/videos/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Video", id }],
    }),
    createVideo: builder.mutation<Video, FormData>({
      query: (formData) => ({
        url: "/videos",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Video"],
    }),
    updateVideo: builder.mutation<Video, { id: string; data: FormData }>({
      query: ({ id, data }) => ({
        url: `/videos/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: "Video", id }, "Video"],
    }),
    deleteVideo: builder.mutation<void, string>({
      query: (id) => ({
        url: `/videos/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Video"],
    }),
    incrementVideoView: builder.mutation<void, string>({
      query: (id) => ({
        url: `/videos/${id}/view`,
        method: "POST",
      }),
    }),
  }),
})

export const {
  useGetVideosQuery,
  useGetVideoByIdQuery,
  useCreateVideoMutation,
  useUpdateVideoMutation,
  useDeleteVideoMutation,
  useIncrementVideoViewMutation,
} = videosApi
