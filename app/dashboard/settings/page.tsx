"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useState, useEffect, useMemo } from "react"
import { useAppSelector, useAppDispatch } from "@/lib/redux/hooks"
import { useUpdateProfileMutation } from "@/lib/redux/api/authApi"
import { updateUser } from "@/lib/redux/features/auth/authSlice"
import { useToast } from "@/hooks/use-toast"

// Helper: generate a deterministic HSL color from a string seed
function getAvatarColor(seed: string, s = 65, l = 45) {
  let hash = 0
  for (let i = 0; i < seed.length; i++) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash)
  }
  const hue = Math.abs(hash) % 360
  return `hsl(${hue}, ${s}%, ${l}%)`
}

export default function SettingsPage() {
  const authUser = useAppSelector((state:any) => state.auth.user)
  const dispatch = useAppDispatch()
  const { toast } = useToast()
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation()
  const [profile, setProfile] = useState({
    name: authUser?.name ?? "",
    email: authUser?.email ?? "",
    genderPreference: authUser?.genderPreference ?? "other",
    fitnessLevel: authUser?.fitnessLevel ?? "",
    equipmentAvailable: authUser?.equipmentAvailable ?? false,
    timezone: authUser?.timezone ?? "",
  })

  useEffect(() => {
    setProfile((prev) => ({
      ...prev,
      name: authUser?.name ?? prev.name,
      email: authUser?.email ?? prev.email,
      genderPreference: authUser?.genderPreference ?? prev.genderPreference,
      fitnessLevel: authUser?.fitnessLevel ?? prev.fitnessLevel,
      equipmentAvailable: authUser?.equipmentAvailable ?? prev.equipmentAvailable,
      timezone: authUser?.timezone ?? prev.timezone,
    }))
  }, [authUser])

  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    workoutReminders: true,
  })

  // Initials should reflect current profile name/email while editing
  const initials = useMemo(() => {
    const nameOrEmail = profile.name || profile.email || ""
    const parts = nameOrEmail.trim().split(/\s+/)
    if (parts.length === 0) return "U"
    const letters = parts.slice(0, 2).map((p) => p[0]?.toUpperCase()).join("")
    return letters || "U"
  }, [profile.name, profile.email])

  // Background color should be deterministic per user
  const avatarBg = useMemo(() => {
    const seed = authUser?.id || authUser?.email || authUser?.name || "guest"
    return getAvatarColor(seed)
  }, [authUser])

  // Only use user's uploaded avatar if present; otherwise show initials fallback
  const userAvatarUrl = useMemo(() => {
    const url = authUser?.avatar?.trim()
    return url && url.length > 0 ? url : undefined
  }, [authUser])

  const handleSave = async () => {
    try {
      const payload = {
        name: profile.name,
        email: profile.email,
        genderPreference: profile.genderPreference,
        fitnessLevel: profile.fitnessLevel,
        equipmentAvailable: profile.equipmentAvailable,
        timezone: profile.timezone,
      }
      const updatedUser = await updateProfile(payload).unwrap()
      dispatch(updateUser(updatedUser))
      toast({ title: "Profile updated", description: "Your settings have been saved." })
    } catch (error: any) {
      toast({
        title: "Update failed",
        description: error?.data?.message || "Unable to update your profile.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Settings</h1>
        <p className="text-muted-foreground">Manage your account and preferences</p>
      </div>

      {/* Profile Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
          <CardDescription>Update your personal details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-4">
            <Avatar className="w-20 h-20">
              {userAvatarUrl && <AvatarImage src={userAvatarUrl} />}
              <AvatarFallback style={{ backgroundColor: avatarBg, color: "#fff" }}>{initials}</AvatarFallback>
            </Avatar>
            <Button variant="outline" size="sm">
              Change Photo
            </Button>
          </div>
          <div className="grid gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
              />
            </div>
            <div className="space-y-4 w-full">
              <Label htmlFor="genderPreference">Gender Preference</Label>
              <Select
              
                value={profile.genderPreference}
                onValueChange={(value) => setProfile({ ...profile, genderPreference: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="fitnessLevel">Fitness Level</Label>
              <Select
                value={profile.fitnessLevel}
                onValueChange={(value) => setProfile({ ...profile, fitnessLevel: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="timezone">Timezone</Label>
              <Input
                id="timezone"
                placeholder="e.g., Africa/Lagos"
                value={profile.timezone}
                onChange={(e) => setProfile({ ...profile, timezone: e.target.value })}
              />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Equipment Available</Label>
              <p className="text-sm text-muted-foreground">Do you have workout equipment available?</p>
            </div>
            <Switch
              checked={profile.equipmentAvailable}
              onCheckedChange={(checked) => setProfile({ ...profile, equipmentAvailable: checked })}
            />
          </div>
          <Button onClick={handleSave} disabled={isUpdating}>{isUpdating ? "Saving..." : "Save Changes"}</Button>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card>
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
          <CardDescription>Manage how you receive updates</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Email Notifications</Label>
              <p className="text-sm text-muted-foreground">Receive updates via email</p>
            </div>
            <Switch
              checked={notifications.email}
              onCheckedChange={(checked) => setNotifications({ ...notifications, email: checked })}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Push Notifications</Label>
              <p className="text-sm text-muted-foreground">Receive push notifications</p>
            </div>
            <Switch
              checked={notifications.push}
              onCheckedChange={(checked) => setNotifications({ ...notifications, push: checked })}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Workout Reminders</Label>
              <p className="text-sm text-muted-foreground">Daily reminders to stay active</p>
            </div>
            <Switch
              checked={notifications.workoutReminders}
              onCheckedChange={(checked) => setNotifications({ ...notifications, workoutReminders: checked })}
            />
          </div>
        </CardContent>
      </Card>

      {/* Password */}
      <Card>
        <CardHeader>
          <CardTitle>Password</CardTitle>
          <CardDescription>Change your password</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="current-password">Current Password</Label>
            <Input id="current-password" type="password" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="new-password">New Password</Label>
            <Input id="new-password" type="password" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm-password">Confirm New Password</Label>
            <Input id="confirm-password" type="password" />
          </div>
          <Button>Update Password</Button>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border-destructive">
        <CardHeader>
          <CardTitle className="text-destructive">Danger Zone</CardTitle>
          <CardDescription>Irreversible actions</CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="destructive" className="w-full sm:w-auto">
            Delete Account
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
