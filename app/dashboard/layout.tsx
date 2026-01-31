import type React from "react"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { MobileNav } from "@/components/mobile-nav"
import { ProtectedRoute } from "@/components/auth/protected-route"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ProtectedRoute requiredRole="user">
      <div className="min-h-screen bg-background">
        <DashboardSidebar />
        <div className="md:pl-64">
          <DashboardHeader />
          <main className="p-4 md:p-6 pb-20 md:pb-6">{children}</main>
        </div>
        <MobileNav />
      </div>
    </ProtectedRoute>
  )
}
