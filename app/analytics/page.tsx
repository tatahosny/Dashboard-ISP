"use client"

import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { StatsCard } from "@/components/dashboard/stats-card"
import { cn } from "@/lib/utils"
import { Wifi, Activity, Router, Gauge, Plus, RefreshCw, CreditCard, UserPlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  mockLines,
  mockDevices,
  mockPayments,
  monthlyUsageData,
  usageBreakdown,
} from "@/lib/mock-data"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"

const statusConfig = {
  active: {
    label: "Active",
    className: "bg-primary/10 text-primary",
  },
  expired: {
    label: "Expired",
    className: "bg-destructive/10 text-destructive",
  },
  "near-limit": {
    label: "Near Limit",
    className: "bg-warning/10 text-warning-foreground",
  },
}

const paymentStatusConfig = {
  paid: {
    label: "Paid",
    className: "bg-primary/10 text-primary",
  },
  pending: {
    label: "Pending",
    className: "bg-warning/10 text-warning-foreground",
  },
  failed: {
    label: "Failed",
    className: "bg-destructive/10 text-destructive",
  },
}

export default function AnalyticsPage() {
  const totalLines = mockLines.length
  const totalUsage = mockLines.reduce((acc, l) => acc + l.usage.used, 0)
  const connectedDevices = mockDevices.reduce((acc, d) => acc + d.connectedDevices, 0)
  const avgSpeed = "125 Mbps"

  return (
    <DashboardShell>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">Analytics</h1>
          <p className="text-muted-foreground">Monitor usage and performance metrics</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            title="Total Lines"
            value={totalLines}
            description="Internet lines"
            icon={Wifi}
            trend={{ value: 8, isPositive: true }}
          />
          <StatsCard
            title="Total Usage"
            value={`${totalUsage} GB`}
            description="This month"
            icon={Activity}
            trend={{ value: 12, isPositive: false }}
          />
          <StatsCard
            title="Connected Devices"
            value={connectedDevices}
            description="Across all lines"
            icon={Router}
          />
          <StatsCard
            title="Average Speed"
            value={avgSpeed}
            description="Download speed"
            icon={Gauge}
            trend={{ value: 5, isPositive: true }}
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Line Chart - Monthly Usage */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="font-semibold mb-4 text-foreground">Monthly Usage (GB)</h3>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyUsageData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="day" stroke="var(--muted-foreground)" fontSize={12} />
                  <YAxis stroke="var(--muted-foreground)" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--card)",
                      border: "1px solid var(--border)",
                      borderRadius: "8px",
                    }}
                    labelStyle={{ color: "var(--foreground)" }}
                  />
                  <Line
                    type="monotone"
                    dataKey="usage"
                    stroke="var(--primary)"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Pie Chart - Usage Breakdown */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="font-semibold mb-4 text-foreground">Usage Breakdown</h3>
            <div className="h-72 flex items-center">
              <ResponsiveContainer width="50%" height="100%">
                <PieChart>
                  <Pie
                    data={usageBreakdown}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {usageBreakdown.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--card)",
                      border: "1px solid var(--border)",
                      borderRadius: "8px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex-1 space-y-3">
                {usageBreakdown.map((item) => (
                  <div key={item.category} className="flex items-center gap-3">
                    <div
                      className="h-3 w-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm text-foreground">{item.category}</span>
                    <span className="text-sm font-medium text-muted-foreground ml-auto">
                      {item.value}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Tables Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Internet Lines Table */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="font-semibold mb-4 text-foreground">Internet Lines</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 text-sm font-medium text-muted-foreground">
                      Provider
                    </th>
                    <th className="text-left py-3 text-sm font-medium text-muted-foreground">
                      Line
                    </th>
                    <th className="text-left py-3 text-sm font-medium text-muted-foreground">
                      Used
                    </th>
                    <th className="text-left py-3 text-sm font-medium text-muted-foreground">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {mockLines.map((line) => (
                    <tr key={line.id} className="border-b border-border last:border-0">
                      <td className="py-3">
                        <span className="font-medium text-foreground">{line.provider}</span>
                      </td>
                      <td className="py-3 text-sm text-muted-foreground">{line.lineNumber}</td>
                      <td className="py-3 text-sm text-foreground">
                        {line.usage.used}/{line.usage.total} GB
                      </td>
                      <td className="py-3">
                        <span
                          className={cn(
                            "px-2 py-1 rounded-full text-xs font-medium",
                            statusConfig[line.status].className
                          )}
                        >
                          {statusConfig[line.status].label}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Devices Table */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="font-semibold mb-4 text-foreground">Routers & Devices</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 text-sm font-medium text-muted-foreground">
                      Device
                    </th>
                    <th className="text-left py-3 text-sm font-medium text-muted-foreground">
                      IP
                    </th>
                    <th className="text-left py-3 text-sm font-medium text-muted-foreground">
                      Speed
                    </th>
                    <th className="text-left py-3 text-sm font-medium text-muted-foreground">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {mockDevices.map((device) => (
                    <tr key={device.id} className="border-b border-border last:border-0">
                      <td className="py-3">
                        <div>
                          <span className="font-medium text-foreground">{device.name}</span>
                          <p className="text-xs text-muted-foreground">
                            {device.connectedDevices} devices
                          </p>
                        </div>
                      </td>
                      <td className="py-3 text-sm font-mono text-muted-foreground">
                        {device.ipAddress}
                      </td>
                      <td className="py-3 text-sm text-foreground">{device.speed}</td>
                      <td className="py-3">
                        <span
                          className={cn(
                            "px-2 py-1 rounded-full text-xs font-medium",
                            device.status === "online"
                              ? "bg-primary/10 text-primary"
                              : "bg-destructive/10 text-destructive"
                          )}
                        >
                          {device.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Recent Payments & Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Payments */}
          <div className="lg:col-span-2 bg-card border border-border rounded-xl p-6">
            <h3 className="font-semibold mb-4 text-foreground">Recent Payments</h3>
            <div className="space-y-3">
              {mockPayments.map((payment) => (
                <div
                  key={payment.id}
                  className="flex items-center justify-between py-3 border-b border-border last:border-0"
                >
                  <div>
                    <p className="font-medium text-foreground">{payment.clientName}</p>
                    <p className="text-sm text-muted-foreground">
                      {payment.method} - {payment.date}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-semibold text-foreground">EGP {payment.amount}</span>
                    <span
                      className={cn(
                        "px-2 py-1 rounded-full text-xs font-medium",
                        paymentStatusConfig[payment.status].className
                      )}
                    >
                      {paymentStatusConfig[payment.status].label}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="font-semibold mb-4 text-foreground">Quick Actions</h3>
            <div className="space-y-3">
              <Button className="w-full justify-start gap-3" variant="outline">
                <RefreshCw className="h-4 w-4" />
                Renew Package
              </Button>
              <Button className="w-full justify-start gap-3" variant="outline">
                <CreditCard className="h-4 w-4" />
                Recharge
              </Button>
              <Button className="w-full justify-start gap-3" variant="outline">
                <UserPlus className="h-4 w-4" />
                Add Client
              </Button>
              <Button className="w-full justify-start gap-3" variant="outline">
                <Plus className="h-4 w-4" />
                Add Line
              </Button>
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  )
}
