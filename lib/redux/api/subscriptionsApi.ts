import { apiSlice } from "./apiSlice"

interface Subscription {
  id: string
  userId: string
  plan: "daily" | "weekly" | "monthly"
  status: "active" | "inactive" | "expired"
  startDate: string
  endDate: string
  autoRenew: boolean
  paymentMethod: "mtn"
}

interface SubscriptionStats {
  totalSubscriptions: number
  activeSubscriptions: number
  revenue: number
  planBreakdown: {
    daily: number
    weekly: number
    monthly: number
  }
}

export const subscriptionsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserSubscription: builder.query<Subscription, void>({
      query: () => "/subscriptions/me",
      providesTags: ["Subscription"],
    }),
    getAllSubscriptions: builder.query<Subscription[], void>({
      query: () => "/subscriptions",
      providesTags: ["Subscription"],
    }),
    getSubscriptionStats: builder.query<SubscriptionStats, void>({
      query: () => "/subscriptions/stats",
      providesTags: ["Subscription"],
    }),
    cancelSubscription: builder.mutation<void, string>({
      query: (id) => ({
        url: `/subscriptions/${id}/cancel`,
        method: "POST",
      }),
      invalidatesTags: ["Subscription"],
    }),
    renewSubscription: builder.mutation<Subscription, string>({
      query: (id) => ({
        url: `/subscriptions/${id}/renew`,
        method: "POST",
      }),
      invalidatesTags: ["Subscription"],
    }),
  }),
})

export const {
  useGetUserSubscriptionQuery,
  useGetAllSubscriptionsQuery,
  useGetSubscriptionStatsQuery,
  useCancelSubscriptionMutation,
  useRenewSubscriptionMutation,
} = subscriptionsApi
