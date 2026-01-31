"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import Link from "next/link"
import { useState } from "react"
import { ArrowLeft, Check, Smartphone } from "lucide-react"

const subscriptionPlans = [
  {
    id: "daily",
    name: "Daily Pass",
    price: "₦50",
    duration: "day",
    description: "Perfect for trying out our workouts",
    features: ["Access all workouts", "All beginner & equipment programs", "Healthy recipes", "1 day access"],
    smsCode: "S30D",
  },
  {
    id: "weekly",
    name: "Weekly Pass",
    price: "₦300",
    duration: "week",
    description: "Great for building consistency",
    features: [
      "Access all workouts",
      "All beginner & equipment programs",
      "Healthy recipes",
      "Progress tracking",
      "7 days access",
    ],
    smsCode: "S30W",
    popular: true,
  },
  {
    id: "monthly",
    name: "Monthly Pass",
    price: "₦1,000",
    duration: "month",
    description: "Best value for serious fitness goals",
    features: [
      "Access all workouts",
      "All beginner & equipment programs",
      "Healthy recipes",
      "Progress tracking",
      "Workout analytics",
      "30 days access",
    ],
    smsCode: "S30M",
  },
]

export default function RegisterPage() {
  const [selectedPlan, setSelectedPlan] = useState<(typeof subscriptionPlans)[0] | null>(null)
  const [showModal, setShowModal] = useState(false)

  const handleSelectPlan = (plan: (typeof subscriptionPlans)[0]) => {
    setSelectedPlan(plan)
    setShowModal(true)
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 py-12">
      <div className="w-full max-w-5xl">
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" size="sm" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Choose Your Plan</h1>
            <p className="text-muted-foreground">Select a subscription plan and activate via MTN SMS</p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {subscriptionPlans.map((plan) => (
            <Card key={plan.id} className={`relative ${plan.popular ? "border-primary shadow-lg scale-105" : ""}`}>
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                  <span className="text-muted-foreground">/{plan.duration}</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  onClick={() => handleSelectPlan(plan)}
                  className="w-full"
                  variant={plan.popular ? "default" : "outline"}
                >
                  Select Plan
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            Already subscribed?{" "}
            <Link href="/auth/login" className="text-primary hover:underline font-medium">
              Sign in here
            </Link>
          </p>
        </div>
      </div>

      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Smartphone className="w-5 h-5 text-primary" />
              Activate Your Subscription
            </DialogTitle>
            <DialogDescription>Follow these steps to activate your {selectedPlan?.name}</DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="bg-muted p-6 rounded-lg space-y-3">
              <p className="text-sm text-muted-foreground">Send the following SMS from your MTN number:</p>
              <div className="bg-background p-4 rounded border-2 border-primary">
                <p className="text-center text-2xl font-bold text-primary">{selectedPlan?.smsCode}</p>
                <p className="text-center text-sm text-muted-foreground mt-1">to</p>
                <p className="text-center text-3xl font-bold text-foreground">8014</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <span className="text-primary font-semibold">1</span>
                </div>
                <div>
                  <p className="font-medium text-foreground">Open Messages App</p>
                  <p className="text-sm text-muted-foreground">Use your default SMS app</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <span className="text-primary font-semibold">2</span>
                </div>
                <div>
                  <p className="font-medium text-foreground">Type {selectedPlan?.smsCode}</p>
                  <p className="text-sm text-muted-foreground">Send to 8014</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <span className="text-primary font-semibold">3</span>
                </div>
                <div>
                  <p className="font-medium text-foreground">Confirm Payment</p>
                  <p className="text-sm text-muted-foreground">You'll receive {selectedPlan?.price} charge</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <span className="text-primary font-semibold">4</span>
                </div>
                <div>
                  <p className="font-medium text-foreground">Get Access Code</p>
                  <p className="text-sm text-muted-foreground">Use it to login and start training</p>
                </div>
              </div>
            </div>

            <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4">
              <p className="text-sm text-amber-900 dark:text-amber-200 font-medium">
                Note: Standard SMS rates apply. You must use an MTN number to subscribe.
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Button onClick={() => setShowModal(false)} className="w-full">
              Got it, I'll send the SMS
            </Button>
            <Button variant="ghost" onClick={() => setShowModal(false)} className="w-full">
              Choose Different Plan
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
