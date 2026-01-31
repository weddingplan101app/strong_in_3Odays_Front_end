import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import type { RootState } from "../store"
import { setSessionExpired, logout } from "../features/auth/authSlice"

// Base API configuration with RTK Query
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: async (args, api, extraOptions) => {
    const rawBaseQuery = fetchBaseQuery({
      baseUrl: process.env.NEXT_PUBLIC_API_URL || "/api",
      prepareHeaders: (headers, { getState }) => {
        // Get token from auth state
        const token = (getState() as RootState).auth.token

        if (token) {
          headers.set("authorization", `Bearer ${token}`)
        }

        return headers
      },
    })

    const result = await rawBaseQuery(args, api, extraOptions)

    // Intercept token expiry errors and flag session as expired
    if (result.error) {
      const data = result.error.data as { code?: string; message?: string } | undefined
      const status = result.error.status as number | string | undefined

      const tokenExpired = data?.code === "TOKEN_EXPIRED" || data?.message?.toLowerCase()?.includes("token expired")

      if (tokenExpired || status === 401) {
        // Mark session expired and clear token
        api.dispatch(setSessionExpired(true))
      }
    }

    return result
  },
  tagTypes: ["User", "Video", "Category", "Recipe", "Subscription", "Analytics", "Program"],
  endpoints: () => ({}),
})
