"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check } from "lucide-react"
import { useEffect, useMemo } from "react"
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks"
import { useGetCurrentUserQuery } from "@/lib/redux/api/authApi"
import { updateUser } from "@/lib/redux/features/auth/authSlice"
import { formatDateTime } from "@/lib/utils"

export default function SubscriptionPage() {
  const plans = [
    {
      name: "Weekly",
      price: "₦500",
      period: "/week",
      features: ["Access all workouts", "Healthy recipes", "Progress tracking", "Mobile app access"],
      popular: false,
    },
    {
      name: "Monthly",
      price: "₦1,500",
      period: "/month",
      features: [
        "Access all workouts",
        "Healthy recipes",
        "Progress tracking",
        "Mobile app access",
        "Priority support",
      ],
      popular: true,
      savings: "Save 25%",
    },
    {
      name: "7-Day Trial",
      price: "Free",
      period: "",
      features: ["Access all workouts", "Limited recipes", "Basic tracking"],
      popular: false,
    },
  ]

  // Fetch latest user and keep store in sync
  const dispatch = useAppDispatch()
  const { user, token } = useAppSelector((state) => state.auth)
  const { data: fetchedUser } = useGetCurrentUserQuery(undefined, {
    skip: !token,
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  })

  useEffect(() => {
    if (fetchedUser) {
      dispatch(updateUser(fetchedUser))
    }
  }, [fetchedUser, dispatch])

  const displayUser = fetchedUser ?? user
  const currentPlanValue = displayUser?.subscriptionPlan // 'weekly' | 'monthly' | 'daily'
  const currentStatusValue = displayUser?.subscriptionStatus // 'active' | 'inactive' | 'expired'
  const subscriptionEndDate = displayUser?.subscriptionEndDate
  // const daysLeft = displayUser?.daysLeft

  const currentPlanName = useMemo(() => {
    if (!currentPlanValue) return undefined
    return currentPlanValue.charAt(0).toUpperCase() + currentPlanValue.slice(1)
  }, [currentPlanValue])

  const statusLabel = useMemo(() => {
    if (!currentStatusValue) return undefined
    return currentStatusValue.charAt(0).toUpperCase() + currentStatusValue.slice(1)
  }, [currentStatusValue])

  const currentPlanDetails = useMemo(() => {
    if (!currentPlanName) return undefined
    return plans.find((p) => p.name.toLowerCase() === currentPlanName.toLowerCase())
  }, [plans, currentPlanName])

  console.log('this is fetch user', fetchedUser)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Subscription</h1>
        <p className="text-muted-foreground">Manage your subscription and billing</p>
      </div>

      {/* Current Subscription */}
      <Card className="border-primary">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <CardTitle>Current Plan</CardTitle>
              <CardDescription>
                {currentPlanName ? `${currentPlanName} Subscription` : "No active subscription"}
              </CardDescription>
            </div>
            {statusLabel && <Badge>{statusLabel}</Badge>}
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {currentPlanDetails && (
              <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-0 text-sm">
                <span className="text-muted-foreground">Amount</span>
                <span className="font-medium text-foreground">
                  {currentPlanDetails.price}
                  {currentPlanDetails.period}
                </span>
              </div>
            )}
            {subscriptionEndDate && (
              <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-0 text-sm">
                <span className="text-muted-foreground">Ends</span>
                <span className="font-medium text-foreground">
                  {formatDateTime(subscriptionEndDate)}
                </span>
              </div>
            )}
            {/* {typeof daysLeft === 'number' && (
              <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-0 text-sm">
                <span className="text-muted-foreground">Days Left</span>
                <span className="font-medium text-foreground">{daysLeft}</span>
              </div>
            )} */}
          </div>
        </CardContent>
        <CardFooter className="pt-4">
          <Button variant="outline" className="w-full bg-transparent">
            Manage Billing
          </Button>
        </CardFooter>
      </Card>

      {/* Plans */}
      <div>
        <h2 className="text-xl font-bold mb-4 text-foreground">Available Plans</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => {
            const isCurrent = plan.name.toLowerCase() === (currentPlanName?.toLowerCase() ?? "")
            return (
              <Card key={plan.name} className={plan.popular || isCurrent ? "border-primary" : ""}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle>{plan.name}</CardTitle>
                      {plan.savings && (
                        <Badge variant="secondary" className="mt-2">
                          {plan.savings}
                        </Badge>
                      )}
                    </div>
                    {plan.popular && <Badge>Popular</Badge>}
                  </div>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                    <span className="text-muted-foreground">{plan.period}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm">
                        {/* Check icon retained for features */}
                        <span className="text-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" variant={plan.popular ? "default" : "outline"} disabled={isCurrent}>
                    {isCurrent ? "Current Plan" : "Select Plan"}
                  </Button>
                </CardFooter>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}
