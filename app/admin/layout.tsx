import type React from "react"
import { AdminSidebar } from "@/components/admin-sidebar"
import { AdminHeader } from "@/components/admin-header"
import { AdminMobileNav } from "@/components/admin-mobile-nav"
import { ProtectedRoute } from "@/components/auth/protected-route"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ProtectedRoute requiredRole="admin">
      <div className="min-h-screen bg-background">
        <AdminSidebar />
        <div className="md:pl-64">
          <AdminHeader />
          <main className="p-4 md:p-6 pb-20 md:pb-6">{children}</main>
        </div>
        <AdminMobileNav />
      </div>
    </ProtectedRoute>
  )
}
