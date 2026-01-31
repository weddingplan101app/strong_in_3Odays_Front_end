"use client"

import { cn } from "@/lib/utils"

import { StatCard } from "@/components/stat-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, DollarSign, Video, TrendingUp, Smartphone, Monitor } from "lucide-react"

export default function AdminPage() {
  const recentUsers = [
    { name: "John Doe", email: "john@example.com", status: "Active", joined: "2 days ago" },
    { name: "Jane Smith", email: "jane@example.com", status: "Active", joined: "3 days ago" },
    { name: "Mike Johnson", email: "mike@example.com", status: "Trial", joined: "5 days ago" },
  ]

  const topVideos = [
    { title: "Push-up Progression", views: 1234, category: "Beginner Men" },
    { title: "Basic Squats", views: 1098, category: "Beginner Women" },
    { title: "Plank Hold", views: 987, category: "Core" },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Admin Dashboard</h1>
        <p className="text-muted-foreground">Overview of your platform</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Users" value="2,543" icon={Users} trend="+12% from last month" />
        <StatCard title="Active Subscribers" value="1,842" icon={DollarSign} trend="+8% from last month" />
        <StatCard title="Video Plays Today" value="8,234" icon={Video} trend="+23% from yesterday" />
        <StatCard title="Retention Rate" value="89%" icon={TrendingUp} trend="+3% from last month" />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Device Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Device Breakdown</CardTitle>
            <CardDescription>User access by device type</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Smartphone className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Mobile</span>
                  </div>
                  <span className="text-sm font-bold">68%</span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-[68%]" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Monitor className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Desktop</span>
                  </div>
                  <span className="text-sm font-bold">32%</span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-chart-2 w-[32%]" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Revenue */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Revenue</CardTitle>
            <CardDescription>Subscription revenue this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-4xl font-bold text-foreground">₦2.8M</div>
              <p className="text-sm text-muted-foreground">
                <span className="text-primary font-medium">+15%</span> from last month
              </p>
              <div className="pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Target</span>
                  <span className="font-medium">₦3.0M</span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-[93%]" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tables Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Users */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Users</CardTitle>
            <CardDescription>Latest sign-ups</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentUsers.map((user) => (
                <div key={user.email} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <div>
                    <p className="font-medium text-sm text-foreground">{user.name}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                  </div>
                  <div className="text-right">
                    <span
                      className={cn(
                        "text-xs px-2 py-1 rounded-full",
                        user.status === "Active"
                          ? "bg-green-500/10 text-green-500"
                          : "bg-yellow-500/10 text-yellow-500",
                      )}
                    >
                      {user.status}
                    </span>
                    <p className="text-xs text-muted-foreground mt-1">{user.joined}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Videos */}
        <Card>
          <CardHeader>
            <CardTitle>Top Videos</CardTitle>
            <CardDescription>Most watched this week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topVideos.map((video, index) => (
                <div key={video.title} className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                  <span className="text-lg font-bold text-muted-foreground">#{index + 1}</span>
                  <div className="flex-1">
                    <p className="font-medium text-sm text-foreground">{video.title}</p>
                    <p className="text-xs text-muted-foreground">{video.category}</p>
                  </div>
                  <span className="text-sm font-bold text-primary">{video.views}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
