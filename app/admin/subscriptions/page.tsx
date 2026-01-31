"use client"

import { StatCard } from "@/components/stat-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { DollarSign, Users, TrendingUp, TrendingDown } from "lucide-react"

export default function SubscriptionsPage() {
  const plans = [
    { name: "Weekly", subscribers: 342, revenue: "₦171,000", growth: "+5%" },
    { name: "Monthly", subscribers: 1500, revenue: "₦2,250,000", growth: "+12%" },
    { name: "Trial", subscribers: 201, revenue: "₦0", growth: "-3%" },
  ]

  const recentTransactions = [
    { id: 1, user: "John Doe", plan: "Monthly", amount: "₦1,500", status: "Completed", date: "Jan 17, 2025" },
    { id: 2, user: "Jane Smith", plan: "Weekly", amount: "₦500", status: "Completed", date: "Jan 17, 2025" },
    { id: 3, user: "Mike Johnson", plan: "Monthly", amount: "₦1,500", status: "Failed", date: "Jan 17, 2025" },
    { id: 4, user: "Sarah Williams", plan: "Monthly", amount: "₦1,500", status: "Pending", date: "Jan 16, 2025" },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Subscriptions</h1>
        <p className="text-muted-foreground">Monitor revenue and subscription analytics</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Monthly Revenue" value="₦2.8M" icon={DollarSign} trend="+15% from last month" />
        <StatCard title="Active Subscribers" value="1,842" icon={Users} trend="+8% from last month" />
        <StatCard title="Churn Rate" value="3.2%" icon={TrendingDown} trend="-1.2% from last month" />
        <StatCard title="Renewals" value="94%" icon={TrendingUp} trend="+2% from last month" />
      </div>

      {/* Plan Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Plan Performance</CardTitle>
          <CardDescription>Breakdown by subscription plan</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Plan</TableHead>
                <TableHead>Subscribers</TableHead>
                <TableHead>Revenue</TableHead>
                <TableHead>Growth</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {plans.map((plan) => (
                <TableRow key={plan.name}>
                  <TableCell className="font-medium">{plan.name}</TableCell>
                  <TableCell>{plan.subscribers}</TableCell>
                  <TableCell>{plan.revenue}</TableCell>
                  <TableCell>
                    <span className={plan.growth.startsWith("+") ? "text-green-500" : "text-red-500"}>
                      {plan.growth}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Recent Transactions */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>Latest subscription payments</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentTransactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell className="font-medium">{transaction.user}</TableCell>
                  <TableCell>{transaction.plan}</TableCell>
                  <TableCell>{transaction.amount}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        transaction.status === "Completed"
                          ? "default"
                          : transaction.status === "Failed"
                            ? "destructive"
                            : "secondary"
                      }
                    >
                      {transaction.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{transaction.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
