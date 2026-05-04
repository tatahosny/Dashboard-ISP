"use client"

import { useState } from "react"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { LineCard } from "@/components/dashboard/line-card"
import { LineDetailsModal } from "@/components/modals/line-details-modal"
import { PaymentModal } from "@/components/modals/payment-modal"
import { Button } from "@/components/ui/button"
import { mockLines, InternetLine } from "@/lib/mock-data"
import { Plus, Filter } from "lucide-react"
import { cn } from "@/lib/utils"

type FilterStatus = "all" | "active" | "near-limit" | "expired"

export default function LinesPage() {
  const [selectedLine, setSelectedLine] = useState<InternetLine | null>(null)
  const [showLineDetails, setShowLineDetails] = useState(false)
  const [showPayment, setShowPayment] = useState(false)
  const [filterStatus, setFilterStatus] = useState<FilterStatus>("all")

  const filteredLines =
    filterStatus === "all"
      ? mockLines
      : mockLines.filter((line) => line.status === filterStatus)

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

  const statusFilters: { id: FilterStatus; label: string }[] = [
    { id: "all", label: "All Lines" },
    { id: "active", label: "Active" },
    { id: "near-limit", label: "Near Limit" },
    { id: "expired", label: "Expired" },
  ]

  return (
    <DashboardShell>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Internet Lines</h1>
            <p className="text-muted-foreground">
              Manage all your internet lines and subscriptions
            </p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Add New Line
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          {statusFilters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setFilterStatus(filter.id)}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium transition-all",
                filterStatus === filter.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              )}
            >
              {filter.label}
              {filter.id !== "all" && (
                <span className="ml-1.5 text-xs">
                  ({mockLines.filter((l) => l.status === filter.id).length})
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-card border border-border rounded-lg p-4">
            <p className="text-sm text-muted-foreground">Total Lines</p>
            <p className="text-2xl font-bold text-foreground">{mockLines.length}</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <p className="text-sm text-muted-foreground">Active</p>
            <p className="text-2xl font-bold text-primary">
              {mockLines.filter((l) => l.status === "active").length}
            </p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <p className="text-sm text-muted-foreground">Near Limit</p>
            <p className="text-2xl font-bold text-warning-foreground">
              {mockLines.filter((l) => l.status === "near-limit").length}
            </p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <p className="text-sm text-muted-foreground">Expired</p>
            <p className="text-2xl font-bold text-destructive">
              {mockLines.filter((l) => l.status === "expired").length}
            </p>
          </div>
        </div>

        {/* Lines List */}
        <div className="grid gap-4">
          {filteredLines.map((line) => (
            <LineCard
              key={line.id}
              {...line}
              onViewDetails={() => handleViewDetails(line)}
              onRenew={() => handleRenew(line)}
              onRecharge={() => handleRecharge(line)}
            />
          ))}
        </div>

        {filteredLines.length === 0 && (
          <div className="py-12 text-center bg-card border border-border rounded-xl">
            <p className="text-muted-foreground">No lines found with the selected filter</p>
          </div>
        )}
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
