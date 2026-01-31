"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Home, Dumbbell, Target, BookOpen, CreditCard, BarChart3, Settings, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/logo"
import { useDispatch } from "react-redux"
import { logout } from "@/lib/redux/features/auth/authSlice"

export function DashboardSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const dispatch = useDispatch()

  const navItems = [
    { icon: Home, label: "Overview", href: "/dashboard" },
    { icon: Dumbbell, label: "Beginner", href: "/dashboard/beginner" },
    { icon: Target, label: "Equipment", href: "/dashboard/equipment" },
    { icon: BookOpen, label: "Recipes", href: "/dashboard/recipes" },
    { icon: CreditCard, label: "Subscription", href: "/dashboard/subscription" },
    { icon: BarChart3, label: "Analytics", href: "/dashboard/analytics" },
    { icon: Settings, label: "Settings", href: "/dashboard/settings" },
  ]

  return (
    <aside className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 bg-card border-r border-border">
      <div className="flex flex-col flex-1 overflow-y-auto">
        <div className="p-6 border-b border-border">
          <Logo size="md" href="/dashboard" />
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground",
                )}
              >
                <Icon className="w-5 h-5" />
                {item.label}
              </Link>
            )
          })}
        </nav>
        <div className="p-4 border-t border-border">
          {/* <Link href="/"> */}
            <Button
              onClick={() => {
                dispatch(logout())
                router.push("/auth/login")
              }}
            variant="ghost" className="w-full justify-start" size="sm">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          {/* </Link> */}
        </div>
      </div>
    </aside>
  )
}
