import { apiSlice } from "./apiSlice"

interface LoginRequest {
  email: string
  password: string
}

interface AdminLoginRequest {
  email: string
  password: string
  username: string
}

interface LoginResponse {
  user: {
    id: string
    email: string
    name: string
    phone?: string
    role: "user" | "admin" | "super_admin"
    permissions?: string[]
    subscriptionStatus?: "active" | "inactive" | "expired"
    subscriptionPlan?: "daily" | "weekly" | "monthly"
    avatar?: string
    subscriptionEndDate?: string
    daysLeft?: number
    genderPreference?: string
    fitnessLevel?: string
    equipmentAvailable?: boolean
    timezone?: string
  }
  token: string
  refreshToken?: string
  requiresPasswordChange?: boolean
  permissions?: string[]
}

interface RegisterRequest {
  name: string
  email: string
  phone: string
  password: string
}

interface VerifySubscriptionRequest {
  code: string
  phone: string
}

interface PhoneLoginRequest {
  phone: string
}

interface UpdateProfileRequest {
  name?: string
  email?: string
  genderPreference?: string
  fitnessLevel?: string
  equipmentAvailable?: boolean
  timezone?: string
}

export const authApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    adminLogin: builder.mutation<LoginResponse, AdminLoginRequest>({
      query: (credentials) => ({
        url: "/admin/login",
        method: "POST",
        body: credentials,
      }),
      // Map backend response and attach admin role by default
      transformResponse: (response: any) => {
        const admin = response?.data?.admin
        const token = response?.data?.token
        const permissions = response?.data?.permissions
        const requiresPasswordChange = response?.data?.requiresPasswordChange

        return {
          user: {
            ...admin,
            role: admin?.role || "admin",
            name: admin?.name || admin?.username,
          },
          token,
          permissions,
          requiresPasswordChange,
        }
      },
    }),
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: "/auth/admin/login",
        method: "POST",
        body: credentials,
      }),
      // Map backend response and attach admin role by default
      transformResponse: (response: any) => {
        const user = response?.data?.user ?? response?.user
        const token = response?.data?.token ?? response?.token
        const refreshToken = response?.data?.refreshToken ?? response?.refreshToken
        return { user: { ...user, role: "admin" }, token, refreshToken }
      },
    }),
    loginWithPhone: builder.mutation<LoginResponse, PhoneLoginRequest>({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
      // Map backend response and attach user role by default
      transformResponse: (response: any) => {
        const user = response?.data?.user ?? response?.user
        const token = response?.data?.token ?? response?.token
        const refreshToken = response?.data?.refreshToken ?? response?.refreshToken
        return { user: { ...user, role: "user" }, token, refreshToken }
      },
    }),
    register: builder.mutation<LoginResponse, RegisterRequest>({
      query: (userData) => ({
        url: "/auth/register",
        method: "POST",
        body: userData,
      }),
      transformResponse: (response: any) => {
        const user = response?.data?.user ?? response?.user
        const token = response?.data?.token ?? response?.token
        const refreshToken = response?.data?.refreshToken ?? response?.refreshToken
        return { user, token, refreshToken }
      },
    }),
    verifySubscription: builder.mutation<LoginResponse, VerifySubscriptionRequest>({
      query: (data) => ({
        url: "/auth/verify-subscription",
        method: "POST",
        body: data,
      }),
      transformResponse: (response: any) => {
        const user = response?.data?.user ?? response?.user
        const token = response?.data?.token ?? response?.token
        const refreshToken = response?.data?.refreshToken ?? response?.refreshToken
        return { user, token, refreshToken }
      },
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
    }),
    getCurrentUser: builder.query<LoginResponse["user"], void>({
      query: () => "/auth/profile",
      providesTags: ["User"],
      transformResponse: (response: any) => {
        // Support multiple response shapes:
        // 1) { success, data: { ...userFields } }
        // 2) { data: { user: { ... } } }
        // 3) { user: { ... } }
        // 4) { ...userFields }
        const payload = response?.data ?? response
        const baseUser = payload?.user ?? payload
        const subscription = baseUser?.subscription

        // Derive subscription status and plan from various possible fields
        const derivedStatus =
          baseUser?.subscriptionStatus ??
          (subscription?.isActive === true
            ? "active"
            : subscription?.isActive === false
            ? "inactive"
            : undefined) ??
          subscription?.status

        const derivedPlan =
          baseUser?.subscriptionPlan ?? subscription?.planType ?? subscription?.plan

        const derivedEndDate = baseUser?.subscriptionEndDate ?? subscription?.endDate
        const derivedDaysLeft =
          baseUser?.daysLeft ??
          subscription?.daysLeft ??
          (derivedEndDate
            ? Math.max(
                0,
                Math.ceil((new Date(derivedEndDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
              )
            : undefined)

        return {
          id: baseUser?.id ?? baseUser?._id ?? "",
          email: baseUser?.email ?? "",
          name: baseUser?.name ?? baseUser?.fullName ?? baseUser?.username ?? "",
          phone: baseUser?.phone ?? baseUser?.phoneNumber ?? baseUser?.phoneFormatted,
          role: (baseUser?.role === "admin" ? "admin" : "user") as "admin" | "user",
          subscriptionStatus: derivedStatus,
          subscriptionPlan: derivedPlan,
          avatar: baseUser?.avatar ?? baseUser?.avatarUrl ?? baseUser?.profileImage,
          subscriptionEndDate: derivedEndDate,
          daysLeft: derivedDaysLeft,
          genderPreference: baseUser?.genderPreference,
          fitnessLevel: baseUser?.fitnessLevel,
          equipmentAvailable: baseUser?.equipmentAvailable,
          timezone: baseUser?.timezone,
        }
      },
    }),

    updateProfile: builder.mutation<LoginResponse["user"], UpdateProfileRequest>({
      query: (data) => ({
        url: "/auth/profile",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["User"],
      transformResponse: (response: any) => {
        const payload = response?.data ?? response
        const baseUser = payload?.user ?? payload
        const subscription = baseUser?.subscription

        const derivedStatus =
          baseUser?.subscriptionStatus ??
          (subscription?.isActive === true
            ? "active"
            : subscription?.isActive === false
            ? "inactive"
            : undefined) ??
          subscription?.status

        const derivedPlan =
          baseUser?.subscriptionPlan ?? subscription?.planType ?? subscription?.plan

        const derivedEndDate = baseUser?.subscriptionEndDate ?? subscription?.endDate
        const derivedDaysLeft =
          baseUser?.daysLeft ??
          subscription?.daysLeft ??
          (derivedEndDate
            ? Math.max(
                0,
                Math.ceil((new Date(derivedEndDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
              )
            : undefined)

        return {
          id: baseUser?.id ?? baseUser?._id ?? "",
          email: baseUser?.email ?? "",
          name: baseUser?.name ?? baseUser?.fullName ?? baseUser?.username ?? "",
          phone: baseUser?.phone ?? baseUser?.phoneNumber ?? baseUser?.phoneFormatted,
          role: (baseUser?.role === "admin" ? "admin" : "user") as "admin" | "user",
          subscriptionStatus: derivedStatus,
          subscriptionPlan: derivedPlan,
          avatar: baseUser?.avatar ?? baseUser?.avatarUrl ?? baseUser?.profileImage,
          subscriptionEndDate: derivedEndDate,
          daysLeft: derivedDaysLeft,
          genderPreference: baseUser?.genderPreference,
          fitnessLevel: baseUser?.fitnessLevel,
          equipmentAvailable: baseUser?.equipmentAvailable,
          timezone: baseUser?.timezone,
        }
      },
    }),
  }),
})

export const {
  useAdminLoginMutation,
  useLoginMutation,
  useLoginWithPhoneMutation,
  useRegisterMutation,
  useVerifySubscriptionMutation,
  useLogoutMutation,
  useGetCurrentUserQuery,
  useUpdateProfileMutation,
} = authApi
