"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { StatCard } from "@/components/stat-card"
import { Calendar, Flame, Target, TrendingUp } from "lucide-react"
import { Line, LineChart, Bar, BarChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

export default function AnalyticsPage() {
  const weeklyData = [
    { day: "Mon", minutes: 25, calories: 180 },
    { day: "Tue", minutes: 18, calories: 130 },
    { day: "Wed", minutes: 32, calories: 220 },
    { day: "Thu", minutes: 22, calories: 160 },
    { day: "Fri", minutes: 28, calories: 195 },
    { day: "Sat", minutes: 15, calories: 105 },
    { day: "Sun", minutes: 30, calories: 210 },
  ]

  const monthlyProgressData = [
    { week: "Week 1", workouts: 4, minutes: 85 },
    { week: "Week 2", workouts: 5, minutes: 110 },
    { week: "Week 3", workouts: 6, minutes: 135 },
    { week: "Week 4", workouts: 7, minutes: 170 },
  ]

  const categoryData = [
    { category: "Upper Body", count: 15, percentage: 25 },
    { category: "Lower Body", count: 18, percentage: 30 },
    { category: "Core", count: 12, percentage: 20 },
    { category: "Cardio", count: 10, percentage: 17 },
    { category: "Full Body", count: 5, percentage: 8 },
  ]

  const maxMinutes = Math.max(...weeklyData.map((d) => d.minutes))

  return (
    <div className="space-y-6 pb-20 md:pb-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Analytics</h1>
        <p className="text-muted-foreground">Track your workout progress and achievements</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="This Week"
          value="170"
          subtitle="minutes trained"
          icon={Calendar}
          trend="+22% from last week"
        />
        <StatCard title="Current Streak" value="12" subtitle="days in a row" icon={Flame} />
        <StatCard title="Completion Rate" value="92%" subtitle="of planned workouts" icon={Target} />
        <StatCard title="Avg Per Day" value="24" subtitle="minutes" icon={TrendingUp} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Weekly Activity</CardTitle>
          <CardDescription>Minutes trained and calories burned each day this week</CardDescription>
        </CardHeader>
        <CardContent className="px-2 sm:px-6">
          <ChartContainer
            config={{
              minutes: {
                label: "Minutes",
                color: "hsl(var(--primary))",
              },
              calories: {
                label: "Calories",
                color: "hsl(var(--muted-foreground))",
              },
            }}
            className="h-[200px] sm:h-[300px] w-full"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={10} tickMargin={5} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={10} width={30} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "10px" }} iconSize={10} />
                <Bar
                  dataKey="minutes"
                  fill="var(--color-minutes)"
                  radius={[4, 4, 0, 0]}
                  name="Minutes"
                  className="fill-white dark:fill-white"
                />
                <Bar
                  dataKey="calories"
                  fill="var(--color-calories)"
                  radius={[4, 4, 0, 0]}
                  name="Calories"
                  className="fill-gray-300 dark:fill-gray-300"
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Monthly Progress</CardTitle>
          <CardDescription>Your workout frequency and total minutes over the past month</CardDescription>
        </CardHeader>
        <CardContent className="px-2 sm:px-6">
          <ChartContainer
            config={{
              workouts: {
                label: "Workouts",
                color: "hsl(var(--primary))",
              },
              minutes: {
                label: "Minutes",
                color: "hsl(var(--chart-3))",
              },
            }}
            className="h-[200px] sm:h-[300px] w-full"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyProgressData} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="week" stroke="hsl(var(--muted-foreground))" fontSize={10} tickMargin={5} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={10} width={30} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "10px" }} iconSize={10} />
                <Line
                  type="monotone"
                  dataKey="workouts"
                  stroke="var(--color-workouts)"
                  strokeWidth={2}
                  dot={{ r: 3 }}
                  name="Workouts"
                />
                <Line
                  type="monotone"
                  dataKey="minutes"
                  stroke="var(--color-minutes)"
                  strokeWidth={2}
                  dot={{ r: 3 }}
                  name="Minutes"
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Workout Categories</CardTitle>
          <CardDescription>Distribution of your workouts by category this month</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {categoryData.map((item) => (
              <div key={item.category} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">{item.category}</span>
                  <span className="text-sm text-muted-foreground">
                    {item.count} workouts ({item.percentage}%)
                  </span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Weekly Activity Chart */}
      {/* Commented out the original weekly activity chart */}
      {/* <Card>
        <CardHeader>
          <CardTitle>Weekly Activity</CardTitle>
          <CardDescription>Minutes trained each day this week</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-end justify-between h-48 sm:h-64 gap-1 sm:gap-2">
            {weeklyData.map((data) => (
              <div key={data.day} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full flex flex-col justify-end h-full">
                  <div
                    className="w-full bg-primary rounded-t transition-all hover:bg-primary/80"
                    style={{ height: `${(data.minutes / maxMinutes) * 100}%` }}
                  />
                </div>
                <div className="text-center">
                  <p className="text-[10px] sm:text-xs text-muted-foreground">{data.day}</p>
                  <p className="text-[10px] sm:text-xs font-medium text-foreground">{data.minutes}m</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card> */}

      {/* Most Watched */}
      <Card>
        <CardHeader>
          <CardTitle>Most Watched Videos</CardTitle>
          <CardDescription>Your top 5 workout videos this month</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { title: "Push-up Progression", count: 12, category: "Upper Body" },
              { title: "Basic Squats", count: 10, category: "Lower Body" },
              { title: "Plank Hold", count: 9, category: "Core" },
              { title: "Mountain Climbers", count: 8, category: "Cardio" },
              { title: "Lunges", count: 7, category: "Lower Body" },
            ].map((video, index) => (
              <div key={video.title} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 gap-2">
                <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                  <span className="text-base sm:text-lg font-bold text-muted-foreground flex-shrink-0">
                    #{index + 1}
                  </span>
                  <div className="min-w-0">
                    <p className="font-medium text-foreground text-sm sm:text-base truncate">{video.title}</p>
                    <p className="text-xs text-muted-foreground">{video.category}</p>
                  </div>
                </div>
                <span className="text-xs sm:text-sm font-medium text-primary flex-shrink-0">{video.count}x</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
