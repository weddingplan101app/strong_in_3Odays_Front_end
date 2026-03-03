import { apiSlice } from "./apiSlice"

export interface CreateProgramRequest {
  name: string
  description: string
  duration: number
  difficulty: "beginner" | "intermediate" | "advanced"
  genderTarget: "male" | "female" | "both"
  equipmentRequired: boolean
  status: "draft" | "published"
}

export interface Program {
  id: string
  slug: string
  name: string
  description: string
  duration: number
  difficulty: string
  genderTarget: string
  equipmentRequired?: boolean
  coverImageUrl?: string
  enrollmentCount?: number
  videoCount?: number
  status?: string
  data?: {
    slug: string
  }
}

export interface ProgramsResponse {
  success: boolean
  data: {
    programs: Program[]
  }
}

export interface SingleProgramResponse {
  success: boolean
  message?: string
  data: Program
}

export interface UploadVideoRequest {
  programSlug: string
  day: number
  formData: FormData
}

export const adminContentApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createProgram: builder.mutation<Program, CreateProgramRequest>({
      query: (body) => ({
        url: "/admin-content/programs",
        method: "POST",
        body,
      }),
      transformResponse: (response: SingleProgramResponse) => response.data,
      invalidatesTags: ["Program"],
    }),
    uploadVideo: builder.mutation<any, UploadVideoRequest>({
      query: ({ programSlug, day, formData }) => ({
        url: `/admin-content/upload/video/${programSlug}/day/${day}`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Program", "Video"],
    }),
    uploadCover: builder.mutation<any, { slug: string; formData: FormData }>({
      query: ({ slug, formData }) => ({
        url: `/admin-content/upload/cover/${slug}`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Program"],
    }),
    updateProgram: builder.mutation<Program, { slug: string; data: Partial<CreateProgramRequest> }>({
      query: (body) => ({
        url: `/admin-content/programs/${body.slug}`,
        method: "PUT",
        body : body.data,
      }),
      transformResponse: (response: SingleProgramResponse) => response.data,
      invalidatesTags: ["Program"],
    }),
    getPrograms: builder.query<Program[], void>({
      query: () => "/program",
      transformResponse: (response: ProgramsResponse) => response.data.programs,
      providesTags: ["Program"],
    }),
  }),
})

export const {
  useCreateProgramMutation,
  useUploadVideoMutation,
  useUploadCoverMutation,
  useUpdateProgramMutation,
  useGetProgramsQuery,
} = adminContentApi
