"use client"

import { StatCard } from "@/components/stat-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Video, Clock, Target } from "lucide-react"

export default function AdminAnalyticsPage() {
  const dailyPlays = [
    { day: "Mon", plays: 6234 },
    { day: "Tue", plays: 7123 },
    { day: "Wed", plays: 8456 },
    { day: "Thu", plays: 7891 },
    { day: "Fri", plays: 9234 },
    { day: "Sat", plays: 5678 },
    { day: "Sun", plays: 8234 },
  ]

  const maxPlays = Math.max(...dailyPlays.map((d) => d.plays))

  const categoryEngagement = [
    { name: "Beginner Program - Men", plays: 3456, percentage: 28 },
    { name: "Beginner Program - Women", plays: 3124, percentage: 25 },
    { name: "With Equipment", plays: 2891, percentage: 23 },
    { name: "Targeted Workouts", plays: 1987, percentage: 16 },
    { name: "Healthy Recipes", plays: 987, percentage: 8 },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Analytics</h1>
        <p className="text-muted-foreground">Platform-wide insights and metrics</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Daily Active Users" value="1,234" icon={Users} trend="+8% from yesterday" />
        <StatCard title="Total Video Plays" value="52,341" icon={Video} trend="+12% this week" />
        <StatCard title="Avg Watch Time" value="4.2m" subtitle="per session" icon={Clock} />
        <StatCard title="Completion Rate" value="76%" icon={Target} trend="+3% from last week" />
      </div>

      {/* Daily Plays Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Daily Video Plays</CardTitle>
          <CardDescription>Video plays over the last 7 days</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-end justify-between h-64 gap-2">
            {dailyPlays.map((data) => (
              <div key={data.day} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full flex flex-col justify-end h-full">
                  <div
                    className="w-full bg-primary rounded-t transition-all hover:bg-primary/80"
                    style={{ height: `${(data.plays / maxPlays) * 100}%` }}
                  />
                </div>
                <div className="text-center">
                  <p className="text-xs text-muted-foreground">{data.day}</p>
                  <p className="text-xs font-medium text-foreground">{data.plays.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Category Engagement */}
      <Card>
        <CardHeader>
          <CardTitle>Category Engagement</CardTitle>
          <CardDescription>Video plays by category</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {categoryEngagement.map((category) => (
              <div key={category.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">{category.name}</span>
                  <span className="text-sm text-muted-foreground">{category.plays.toLocaleString()} plays</span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-primary transition-all" style={{ width: `${category.percentage}%` }} />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
