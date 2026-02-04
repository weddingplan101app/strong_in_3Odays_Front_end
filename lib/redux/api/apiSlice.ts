import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import type { RootState } from "../store"
import { setSessionExpired, setTokens } from "../features/auth/authSlice"

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

    let result = await rawBaseQuery(args, api, extraOptions)

    // Intercept token expiry errors and attempt refresh
    if (result.error) {
      const data = result.error.data as { code?: string; message?: string } | undefined
      const status = result.error.status as number | string | undefined

      const tokenExpired = data?.code === "TOKEN_EXPIRED" || data?.message?.toLowerCase()?.includes("token expired")

      if (tokenExpired || status === 401) {
        const state = api.getState() as RootState
        const currentRefreshToken = state.auth.refreshToken

        if (currentRefreshToken) {
          const refreshResult = await rawBaseQuery(
            {
              url: "/auth/refresh-token",
              method: "POST",
              body: { refreshToken: currentRefreshToken },
            },
            api,
            extraOptions
          )

          if (refreshResult.data) {
            const payload: any = refreshResult.data
            const newAccessToken = payload?.data?.accessToken ?? payload?.accessToken
            const newRefreshToken = payload?.data?.refreshToken ?? payload?.refreshToken

            if (newAccessToken) {
              api.dispatch(setTokens({ token: newAccessToken, refreshToken: newRefreshToken }))
              // Retry the original request with the new token
              result = await rawBaseQuery(args, api, extraOptions)
              return result
            }
          }
        }

        // If refresh failed or no refresh token, mark session as expired
        api.dispatch(setSessionExpired(true))
      }
    }

    return result
  },
  tagTypes: ["User", "Video", "Category", "Recipe", "Subscription", "Analytics", "Program"],
  endpoints: () => ({}),
})
