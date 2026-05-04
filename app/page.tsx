"use client"

import { useState } from "react"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { StatsCard } from "@/components/dashboard/stats-card"
import { LineCard } from "@/components/dashboard/line-card"
import { LineDetailsModal } from "@/components/modals/line-details-modal"
import { PaymentModal } from "@/components/modals/payment-modal"
import { Users, Wifi, Activity, DollarSign } from "lucide-react"
import { mockLines, InternetLine } from "@/lib/mock-data"

export default function DashboardPage() {
  const [selectedLine, setSelectedLine] = useState<InternetLine | null>(null)
  const [showLineDetails, setShowLineDetails] = useState(false)
  const [showPayment, setShowPayment] = useState(false)

  const handleViewDetails = (line: InternetLine) => {
    setSelectedLine(line)
    setShowLineDetails(true)
  }

  const handleRecharge = (line: InternetLine) => {
    setSelectedLine(line)
    setShowPayment(true)
  }

  const handleRenew = (line: InternetLine) => {
    setSelectedLine(line)
    setShowPayment(true)
  }

  const totalClients = 248
  const activeLines = mockLines.filter((l) => l.status === "active").length
  const totalUsage = mockLines.reduce((acc, l) => acc + l.usage.used, 0)
  const totalRevenue = 45850

  return (
    <DashboardShell>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back to Tabarak Internet Services</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            title="Total Clients"
            value={totalClients}
            description="Registered clients"
            icon={Users}
            trend={{ value: 12, isPositive: true }}
            progress={75}
          />
          <StatsCard
            title="Active Lines"
            value={activeLines}
            description={`of ${mockLines.length} total lines`}
            icon={Wifi}
            trend={{ value: 5, isPositive: true }}
            progress={(activeLines / mockLines.length) * 100}
          />
          <StatsCard
            title="Total Usage"
            value={`${totalUsage} GB`}
            description="This month"
            icon={Activity}
            trend={{ value: 8, isPositive: false }}
            progress={65}
          />
          <StatsCard
            title="Revenue"
            value={`EGP ${totalRevenue.toLocaleString()}`}
            description="This month"
            icon={DollarSign}
            trend={{ value: 15, isPositive: true }}
            progress={82}
          />
        </div>

        {/* Internet Lines Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-foreground">Internet Lines</h2>
            <span className="text-sm text-muted-foreground">
              {mockLines.length} lines total
            </span>
          </div>
          <div className="grid gap-4">
            {mockLines.map((line) => (
              <LineCard
                key={line.id}
                {...line}
                onViewDetails={() => handleViewDetails(line)}
                onRenew={() => handleRenew(line)}
                onRecharge={() => handleRecharge(line)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Modals */}
      <LineDetailsModal
        open={showLineDetails}
        onClose={() => setShowLineDetails(false)}
        line={selectedLine}
        onRecharge={() => {
          setShowLineDetails(false)
          setShowPayment(true)
        }}
      />

      <PaymentModal
        open={showPayment}
        onClose={() => setShowPayment(false)}
        line={selectedLine}
      />
    </DashboardShell>
  )
}
