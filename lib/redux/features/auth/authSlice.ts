import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface User {
  id: string
  email: string
  name: string
  phone?: string
  role: "user" | "admin"
  subscriptionStatus?: "active" | "inactive" | "expired"
  subscriptionPlan?: "daily" | "weekly" | "monthly"
  avatar?: string
  subscriptionEndDate?: string | number | Date
  daysLeft?: number
  genderPreference?: string
  fitnessLevel?: string
  equipmentAvailable?: boolean
  timezone?: string
}

interface AuthState {
  user: User | null
  token: string | null
  refreshToken: string | null
  isAuthenticated: boolean
  sessionExpired: boolean
}

const initialState: AuthState = {
  user: null,
  token: null,
  refreshToken: null,
  isAuthenticated: false,
  sessionExpired: false,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ user: User; token: string; refreshToken?: string }>
    ) => {
      state.user = action.payload.user
      state.token = action.payload.token
      state.refreshToken = action.payload.refreshToken ?? state.refreshToken ?? null
      state.isAuthenticated = true
      state.sessionExpired = false
    },
    setTokens: (state, action: PayloadAction<{ token: string; refreshToken?: string }>) => {
      state.token = action.payload.token
      state.refreshToken = action.payload.refreshToken ?? state.refreshToken ?? null
      state.sessionExpired = false
    },
    logout: (state) => {
      state.user = null
      state.token = null
      state.refreshToken = null
      state.isAuthenticated = false
      state.sessionExpired = false
    },
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload }
      }
    },
    setSessionExpired: (state, action: PayloadAction<boolean>) => {
      state.sessionExpired = action.payload
    },
  },
})

export const { setCredentials, setTokens, logout, updateUser, setSessionExpired } = authSlice.actions
export default authSlice.reducer
