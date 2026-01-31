"use client"

import { Menu, Bell, Target, CreditCard, BarChart3, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { useGetCurrentUserQuery } from "@/lib/redux/api/authApi"
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks"
import { updateUser, logout } from "@/lib/redux/features/auth/authSlice"
import { useEffect, useMemo } from "react"
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogAction } from "@/components/ui/alert-dialog"

// Helper: generate a deterministic HSL color from a string seed
function getAvatarColor(seed: string, s = 65, l = 45) {
  let hash = 0
  for (let i = 0; i < seed.length; i++) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash)
  }
  const hue = Math.abs(hash) % 360
  return `hsl(${hue}, ${s}%, ${l}%)`
}

export function DashboardHeader() {
  const pathname = usePathname()
  const router = useRouter()
  const dispatch = useAppDispatch()
  const authUser = useAppSelector((state) => state.auth.user)
  const token = useAppSelector((state) => state.auth.token)
  const sessionExpired = useAppSelector((state) => state.auth.sessionExpired)
  const { data: fetchedUser } = useGetCurrentUserQuery(undefined, { skip: !token })

  useEffect(() => {
    if (fetchedUser) {
      dispatch(updateUser(fetchedUser))
    }
  }, [fetchedUser, dispatch])

  const displayUser = fetchedUser ?? authUser

  const initials = useMemo(() => {
    const nameOrEmail = displayUser?.name || displayUser?.email || ""
    const parts = nameOrEmail.trim().split(/\s+/)
    if (parts.length === 0) return "U"
    const letters = parts.slice(0, 2).map((p) => p[0]?.toUpperCase()).join("")
    return letters || "U"
  }, [displayUser])

  // Compute avatar background color based on user identity
  const avatarBg = useMemo(() => {
    const seed = displayUser?.id || displayUser?.email || displayUser?.name || "guest"
    return getAvatarColor(seed)
  }, [displayUser])

  // Only use user's uploaded avatar if present; otherwise show initials fallback
  const userAvatarUrl = useMemo(() => {
    const url = displayUser?.avatar?.trim()
    return url && url.length > 0 ? url : undefined
  }, [displayUser])

  // console.log('this is initials', initials)

  const menuItems = [
    { icon: Target, label: "Targeted Workouts", href: "/dashboard/targeted" },
    { icon: CreditCard, label: "Subscription", href: "/dashboard/subscription" },
    { icon: BarChart3, label: "Analytics", href: "/dashboard/analytics" },
    { icon: Settings, label: "Settings", href: "/dashboard/settings" },
  ]

  return (
    <>
      <header className="sticky top-0 z-40 bg-background border-b border-border">
        <div className="flex items-center justify-between h-16 px-4 md:px-6">
          <div className="flex items-center gap-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[280px] sm:w-[320px]">
                <div className="flex flex-col gap-4 mt-8">
                  <div className="flex items-center gap-3 px-2 mb-4">
                    <Avatar className="w-12 h-12">
                      {userAvatarUrl && <AvatarImage src={userAvatarUrl} />}
                      <AvatarFallback style={{ backgroundColor: avatarBg, color: "#fff" }}>{initials}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-foreground">{displayUser?.name ?? "Guest"}</p>
                      <p className="text-sm text-muted-foreground">{displayUser?.subscriptionStatus ? (displayUser.subscriptionStatus === "active" ? (displayUser.subscriptionPlan ? `${displayUser.subscriptionPlan[0].toUpperCase()}${displayUser.subscriptionPlan.slice(1)} Plan` : "Active Member") : `${displayUser.subscriptionStatus[0].toUpperCase()}${displayUser.subscriptionStatus.slice(1)}`) : "Member"}</p>
                    </div>
                  </div>
                  <nav className="flex flex-col gap-1">
                    {menuItems.map((item) => {
                      const Icon = item.icon
                      const isActive = pathname === item.href

                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          className={cn(
                            "flex items-center gap-3 px-3 py-3 rounded-lg transition-colors",
                            isActive
                              ? "bg-primary text-primary-foreground"
                              : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                          )}
                        >
                          <Icon className="w-5 h-5" />
                          <span className="font-medium">{item.label}</span>
                        </Link>
                      )
                    })}
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
            <h1 className="text-lg font-semibold text-foreground">Dashboard</h1>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button variant="ghost" size="icon">
              <Bell className="w-5 h-5" />
            </Button>
            <Avatar className="w-8 h-8 hidden md:flex">
              {userAvatarUrl && <AvatarImage src={userAvatarUrl} />}
              <AvatarFallback style={{ backgroundColor: avatarBg, color: "#fff" }}>{initials}</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      {/* Session expired modal */}
      <AlertDialog open={sessionExpired}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Session expired</AlertDialogTitle>
            <AlertDialogDescription>
              Your session has expired. Please login again to continue.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction
              onClick={() => {
                dispatch(logout())
                router.push("/auth/login")
              }}
            >
              Go to Login
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
