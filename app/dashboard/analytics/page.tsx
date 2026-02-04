"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { StatCard } from "@/components/stat-card"
import { Calendar, Flame, Target, TrendingUp } from "lucide-react"
import { Line, LineChart, Bar, BarChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { useGetAnalyticsDashboardQuery } from "@/lib/redux/api/analyticsApi"

export default function AnalyticsPage() {
  const { data, isLoading, isError } = useGetAnalyticsDashboardQuery()

  const analytics = data?.data?.analytics
  const thisWeek = analytics?.thisWeek

  const weeklyData = analytics?.weeklyActivity ?? thisWeek?.weeklyActivity ?? []
  const monthlyProgressData = analytics?.monthlyProgress ?? []
  const categoryData = analytics?.workoutCategories ?? []
  const mostWatchedVideos = analytics?.mostWatchedVideos ?? []

  const maxMinutes = Math.max(0, ...weeklyData.map((d) => d.minutes ?? 0))

  return (
    <div className="space-y-6 pb-20 md:pb-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Analytics</h1>
        <p className="text-muted-foreground">Track your workout progress and achievements</p>
      </div>

      {/* Loading / Error States */}
      {isError && (
        <div className="text-sm text-destructive">Failed to load analytics. Please try again.</div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="This Week"
          value={thisWeek?.minutesTrained ?? 0}
          subtitle="minutes trained"
          icon={Calendar}
          trend={thisWeek?.changeFromLastWeek ?? undefined}
        />
        <StatCard
          title="Current Streak"
          value={thisWeek?.currentStreak ?? 0}
          subtitle="days in a row"
          icon={Flame}
        />
        <StatCard
          title="Completion Rate"
          value={thisWeek?.completionRate ?? "0%"}
          subtitle="of planned workouts"
          icon={Target}
        />
        <StatCard
          title="Avg Per Day"
          value={thisWeek?.avgPerDay ?? 0}
          subtitle="minutes"
          icon={TrendingUp}
        />
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
                    {item.workouts} workouts ({item.percentage}%)
                  </span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{ width: `${item.percentage}%`, backgroundColor: item.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Most Watched */}
      <Card>
        <CardHeader>
          <CardTitle>Most Watched Videos</CardTitle>
          <CardDescription>Your top workout videos</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mostWatchedVideos.map((video) => (
              <div key={`${video.rank}-${video.title}`} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 gap-2">
                <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                  <span className="text-base sm:text-lg font-bold text-muted-foreground flex-shrink-0">#{video.rank}</span>
                  <div className="min-w-0">
                    <p className="font-medium text-foreground text-sm sm:text-base truncate">{video.title}</p>
                    <p className="text-xs text-muted-foreground">{video.category}</p>
                  </div>
                </div>
                <span className="text-xs sm:text-sm font-medium text-primary flex-shrink-0">{video.views}x</span>
              </div>
            ))}
            {isLoading && mostWatchedVideos.length === 0 && (
              <div className="text-sm text-muted-foreground">Loading analytics...</div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
