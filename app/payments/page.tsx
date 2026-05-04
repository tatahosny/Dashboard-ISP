"use client"

import { useState } from "react"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { StatsCard } from "@/components/dashboard/stats-card"
import { Button } from "@/components/ui/button"
import { mockPayments, Payment } from "@/lib/mock-data"
import { cn } from "@/lib/utils"
import {
  DollarSign,
  TrendingUp,
  Clock,
  CheckCircle,
  Plus,
  Download,
  Filter,
} from "lucide-react"

type FilterStatus = "all" | "paid" | "pending" | "failed"

const paymentStatusConfig = {
  paid: {
    label: "Paid",
    className: "bg-primary/10 text-primary",
    icon: CheckCircle,
  },
  pending: {
    label: "Pending",
    className: "bg-warning/10 text-warning-foreground",
    icon: Clock,
  },
  failed: {
    label: "Failed",
    className: "bg-destructive/10 text-destructive",
    icon: Clock,
  },
}

const methodLabels = {
  cash: "Cash",
  instapay: "Instapay",
  "vodafone-cash": "Vodafone Cash",
  "credit-card": "Credit Card",
}

export default function PaymentsPage() {
  const [filterStatus, setFilterStatus] = useState<FilterStatus>("all")
  const [payments] = useState<Payment[]>([
    ...mockPayments,
    {
      id: "5",
      clientName: "Hassan Ahmed",
      amount: 450,
      date: "2024-02-05",
      method: "instapay",
      status: "paid",
    },
    {
      id: "6",
      clientName: "Nour Mohamed",
      amount: 350,
      date: "2024-02-06",
      method: "credit-card",
      status: "pending",
    },
    {
      id: "7",
      clientName: "Youssef Ali",
      amount: 150,
      date: "2024-02-07",
      method: "cash",
      status: "paid",
    },
  ])

  const filteredPayments =
    filterStatus === "all"
      ? payments
      : payments.filter((p) => p.status === filterStatus)

  const totalRevenue = payments
    .filter((p) => p.status === "paid")
    .reduce((acc, p) => acc + p.amount, 0)
  const pendingAmount = payments
    .filter((p) => p.status === "pending")
    .reduce((acc, p) => acc + p.amount, 0)

  const statusFilters: { id: FilterStatus; label: string }[] = [
    { id: "all", label: "All" },
    { id: "paid", label: "Paid" },
    { id: "pending", label: "Pending" },
    { id: "failed", label: "Failed" },
  ]

  return (
    <DashboardShell>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Payments</h1>
            <p className="text-muted-foreground">Track and manage all payment transactions</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Record Payment
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            title="Total Revenue"
            value={`EGP ${totalRevenue.toLocaleString()}`}
            description="This month"
            icon={DollarSign}
            trend={{ value: 18, isPositive: true }}
          />
          <StatsCard
            title="Pending"
            value={`EGP ${pendingAmount.toLocaleString()}`}
            description="Awaiting payment"
            icon={Clock}
          />
          <StatsCard
            title="Transactions"
            value={payments.length}
            description="Total this month"
            icon={TrendingUp}
            trend={{ value: 12, isPositive: true }}
          />
          <StatsCard
            title="Success Rate"
            value="94%"
            description="Payment completion"
            icon={CheckCircle}
            progress={94}
          />
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
            </button>
          ))}
        </div>

        {/* Payments Table */}
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">
                    Client
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">
                    Amount
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">
                    Method
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">
                    Date
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredPayments.map((payment) => {
                  const StatusIcon = paymentStatusConfig[payment.status].icon
                  return (
                    <tr
                      key={payment.id}
                      className="border-t border-border hover:bg-muted/30 transition-colors"
                    >
                      <td className="py-4 px-6">
                        <p className="font-medium text-foreground">{payment.clientName}</p>
                      </td>
                      <td className="py-4 px-6">
                        <p className="font-semibold text-foreground">EGP {payment.amount}</p>
                      </td>
                      <td className="py-4 px-6 text-muted-foreground">
                        {methodLabels[payment.method]}
                      </td>
                      <td className="py-4 px-6 text-muted-foreground">{payment.date}</td>
                      <td className="py-4 px-6">
                        <span
                          className={cn(
                            "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium",
                            paymentStatusConfig[payment.status].className
                          )}
                        >
                          <StatusIcon className="h-3 w-3" />
                          {paymentStatusConfig[payment.status].label}
                        </span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          {filteredPayments.length === 0 && (
            <div className="py-12 text-center">
              <p className="text-muted-foreground">No payments found</p>
            </div>
          )}
        </div>
      </div>
    </DashboardShell>
  )
}
