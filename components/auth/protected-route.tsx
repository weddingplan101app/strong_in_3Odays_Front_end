"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAppSelector } from "@/lib/redux/hooks"

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredRole?: "user" | "admin" | "super_admin"
}

export function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const router = useRouter()
  const { isAuthenticated, user } = useAppSelector((state) => state.auth)

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth/login")
      return
    }

    if (requiredRole) {
      const isSuperAdmin = user?.role === "super_admin"
      const isAdmin = user?.role === "admin" || isSuperAdmin

      if (requiredRole === "admin" && !isAdmin) {
        router.push("/dashboard")
      } else if (requiredRole === "super_admin" && !isSuperAdmin) {
        router.push("/admin")
      } else if (requiredRole === "user" && user?.role !== "user" && !isAdmin) {
        router.push("/auth/login")
      }
    }
  }, [isAuthenticated, user, requiredRole, router])

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (requiredRole) {
    const isSuperAdmin = user?.role === "super_admin"
    const isAdmin = user?.role === "admin" || isSuperAdmin

    if (requiredRole === "admin" && !isAdmin) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <p className="text-destructive text-lg mb-2">Access Denied</p>
            <p className="text-muted-foreground">You do not have permission to access this page.</p>
          </div>
        </div>
      )
    }

    if (requiredRole === "super_admin" && !isSuperAdmin) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <p className="text-destructive text-lg mb-2">Access Denied</p>
            <p className="text-muted-foreground">This page requires super admin privileges.</p>
          </div>
        </div>
      )
    }
  }

  return <>{children}</>
}
