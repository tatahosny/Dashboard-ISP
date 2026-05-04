"use client"

import { useState } from "react"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  User,
  Bell,
  Shield,
  Palette,
  Building,
  CreditCard,
  Save,
  Loader2,
} from "lucide-react"
import Image from "next/image"

type SettingsTab = "profile" | "notifications" | "security" | "appearance" | "company" | "billing"

const tabs: { id: SettingsTab; label: string; icon: React.ElementType }[] = [
  { id: "profile", label: "Profile", icon: User },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security", icon: Shield },
  { id: "appearance", label: "Appearance", icon: Palette },
  { id: "company", label: "Company", icon: Building },
  { id: "billing", label: "Billing", icon: CreditCard },
]

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>("profile")
  const [isSaving, setIsSaving] = useState(false)
  const [profileData, setProfileData] = useState({
    name: "Admin User",
    email: "admin@tabarak.com",
    phone: "010-1234-5678",
    role: "Administrator",
  })
  const [notificationSettings, setNotificationSettings] = useState({
    emailAlerts: true,
    smsAlerts: false,
    lineExpiry: true,
    paymentReminders: true,
    usageAlerts: true,
  })

  const handleSave = async () => {
    setIsSaving(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsSaving(false)
  }

  return (
    <DashboardShell>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground">Manage your account and preferences</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar Tabs */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-card border border-border rounded-xl p-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all",
                    activeTab === tab.id
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground hover:bg-muted"
                  )}
                >
                  <tab.icon className="h-5 w-5" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 bg-card border border-border rounded-xl p-6">
            {activeTab === "profile" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-semibold text-foreground mb-1">Profile Settings</h2>
                  <p className="text-sm text-muted-foreground">
                    Update your personal information
                  </p>
                </div>

                {/* Avatar */}
                <div className="flex items-center gap-4">
                  <div className="h-20 w-20 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-2xl font-bold">
                    A
                  </div>
                  <div>
                    <Button variant="outline" size="sm">
                      Change Avatar
                    </Button>
                    <p className="text-xs text-muted-foreground mt-1">
                      JPG, PNG or GIF. Max 2MB.
                    </p>
                  </div>
                </div>

                {/* Form */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={profileData.name}
                      onChange={(e) =>
                        setProfileData({ ...profileData, name: e.target.value })
                      }
                      className="w-full px-3 py-2.5 bg-muted rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">
                      Email
                    </label>
                    <input
                      type="email"
                      value={profileData.email}
                      onChange={(e) =>
                        setProfileData({ ...profileData, email: e.target.value })
                      }
                      className="w-full px-3 py-2.5 bg-muted rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={profileData.phone}
                      onChange={(e) =>
                        setProfileData({ ...profileData, phone: e.target.value })
                      }
                      className="w-full px-3 py-2.5 bg-muted rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">
                      Role
                    </label>
                    <input
                      type="text"
                      value={profileData.role}
                      disabled
                      className="w-full px-3 py-2.5 bg-muted/50 rounded-lg text-muted-foreground"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === "notifications" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-semibold text-foreground mb-1">
                    Notification Settings
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Configure how you receive notifications
                  </p>
                </div>

                <div className="space-y-4">
                  {Object.entries({
                    emailAlerts: "Email Alerts",
                    smsAlerts: "SMS Alerts",
                    lineExpiry: "Line Expiry Reminders",
                    paymentReminders: "Payment Reminders",
                    usageAlerts: "Usage Threshold Alerts",
                  }).map(([key, label]) => (
                    <div
                      key={key}
                      className="flex items-center justify-between py-3 border-b border-border last:border-0"
                    >
                      <span className="font-medium text-foreground">{label}</span>
                      <button
                        onClick={() =>
                          setNotificationSettings({
                            ...notificationSettings,
                            [key]:
                              !notificationSettings[key as keyof typeof notificationSettings],
                          })
                        }
                        className={cn(
                          "relative h-6 w-11 rounded-full transition-colors",
                          notificationSettings[key as keyof typeof notificationSettings]
                            ? "bg-primary"
                            : "bg-muted"
                        )}
                      >
                        <span
                          className={cn(
                            "absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform shadow-sm",
                            notificationSettings[key as keyof typeof notificationSettings]
                              ? "translate-x-5"
                              : "translate-x-0.5"
                          )}
                        />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "security" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-semibold text-foreground mb-1">Security Settings</h2>
                  <p className="text-sm text-muted-foreground">Manage your account security</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">
                      Current Password
                    </label>
                    <input
                      type="password"
                      className="w-full px-3 py-2.5 bg-muted rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                      placeholder="Enter current password"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">
                      New Password
                    </label>
                    <input
                      type="password"
                      className="w-full px-3 py-2.5 bg-muted rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                      placeholder="Enter new password"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      className="w-full px-3 py-2.5 bg-muted rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                      placeholder="Confirm new password"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <h3 className="font-medium text-foreground mb-3">Two-Factor Authentication</h3>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">
                      Add an extra layer of security to your account
                    </p>
                    <Button variant="outline">Enable 2FA</Button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "appearance" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-semibold text-foreground mb-1">Appearance</h2>
                  <p className="text-sm text-muted-foreground">Customize the look and feel</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-3">
                      Theme
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {["Light", "Dark", "System"].map((theme) => (
                        <button
                          key={theme}
                          className={cn(
                            "py-3 px-4 rounded-lg border-2 transition-all text-sm font-medium",
                            theme === "Light"
                              ? "border-primary bg-primary/5 text-primary"
                              : "border-border hover:border-primary/50 text-foreground"
                          )}
                        >
                          {theme}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-3">
                      Language
                    </label>
                    <select className="w-full px-3 py-2.5 bg-muted rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20">
                      <option>English</option>
                      <option>Arabic</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "company" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-semibold text-foreground mb-1">Company Settings</h2>
                  <p className="text-sm text-muted-foreground">Manage your company information</p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="h-20 w-20 rounded-xl overflow-hidden bg-white border border-border">
                    <Image
                      src="/images/logo.jpeg"
                      alt="Company Logo"
                      width={80}
                      height={80}
                      className="object-contain p-2"
                    />
                  </div>
                  <div>
                    <Button variant="outline" size="sm">
                      Change Logo
                    </Button>
                    <p className="text-xs text-muted-foreground mt-1">
                      Recommended: 200x200px
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">
                      Company Name
                    </label>
                    <input
                      type="text"
                      defaultValue="Tabarak Internet Services"
                      className="w-full px-3 py-2.5 bg-muted rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">
                      Business Email
                    </label>
                    <input
                      type="email"
                      defaultValue="info@tabarak.com"
                      className="w-full px-3 py-2.5 bg-muted rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-foreground mb-1.5">
                      Address
                    </label>
                    <input
                      type="text"
                      defaultValue="Cairo, Egypt"
                      className="w-full px-3 py-2.5 bg-muted rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === "billing" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-semibold text-foreground mb-1">Billing Settings</h2>
                  <p className="text-sm text-muted-foreground">
                    Manage your billing and subscription
                  </p>
                </div>

                <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-foreground">Business Plan</p>
                      <p className="text-sm text-muted-foreground">
                        Unlimited lines, advanced analytics
                      </p>
                    </div>
                    <span className="text-primary font-bold">EGP 999/mo</span>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium text-foreground mb-3">Payment Method</h3>
                  <div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
                    <CreditCard className="h-8 w-8 text-muted-foreground" />
                    <div>
                      <p className="font-medium text-foreground">**** **** **** 4242</p>
                      <p className="text-sm text-muted-foreground">Expires 12/25</p>
                    </div>
                    <Button variant="outline" size="sm" className="ml-auto">
                      Update
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Save Button */}
            <div className="flex justify-end pt-6 mt-6 border-t border-border">
              <Button onClick={handleSave} disabled={isSaving} className="gap-2">
                {isSaving ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    Save Changes
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  )
}
