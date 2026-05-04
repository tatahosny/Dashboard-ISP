"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { InternetLine, monthlyUsageData, usageBreakdown, mockPayments } from "@/lib/mock-data"
import { cn } from "@/lib/utils"
import { RefreshCw, CreditCard, MapPin } from "lucide-react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

interface LineDetailsModalProps {
  open: boolean
  onClose: () => void
  line: InternetLine | null
  onRecharge: () => void
}

const statusConfig = {
  active: {
    label: "Active",
    className: "bg-primary/10 text-primary border-primary/20",
  },
  expired: {
    label: "Expired",
    className: "bg-destructive/10 text-destructive border-destructive/20",
  },
  "near-limit": {
    label: "Near Limit",
    className: "bg-warning/10 text-warning-foreground border-warning/20",
  },
}

export function LineDetailsModal({
  open,
  onClose,
  line,
  onRecharge,
}: LineDetailsModalProps) {
  if (!line) return null

  const usagePercentage = (line.usage.used / line.usage.total) * 100
  const statusInfo = statusConfig[line.status]
  const linePayments = mockPayments.slice(0, 3)

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            {line.name}
            <span
              className={cn(
                "px-2.5 py-1 rounded-full text-xs font-medium border",
                statusInfo.className
              )}
            >
              {statusInfo.label}
            </span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Usage Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-muted/50 rounded-lg p-4 text-center">
              <p className="text-sm text-muted-foreground">Total Package</p>
              <p className="text-2xl font-bold text-foreground">{line.usage.total} GB</p>
            </div>
            <div className="bg-primary/10 rounded-lg p-4 text-center">
              <p className="text-sm text-muted-foreground">Used</p>
              <p className="text-2xl font-bold text-primary">{line.usage.used} GB</p>
            </div>
            <div className="bg-muted/50 rounded-lg p-4 text-center">
              <p className="text-sm text-muted-foreground">Remaining</p>
              <p className="text-2xl font-bold text-foreground">{line.usage.remaining} GB</p>
            </div>
          </div>

          {/* Usage Chart */}
          <div className="bg-card border border-border rounded-lg p-4">
            <h3 className="font-semibold mb-4">Daily Usage (GB)</h3>
            <div className="h-64">
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

          {/* Usage Categories */}
          <div className="bg-card border border-border rounded-lg p-4">
            <h3 className="font-semibold mb-4">Usage Categories</h3>
            <div className="space-y-3">
              {usageBreakdown.map((item) => (
                <div key={item.category}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-foreground">{item.category}</span>
                    <span className="text-sm font-medium text-muted-foreground">
                      {item.value}%
                    </span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${item.value}%`,
                        backgroundColor: item.color,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Payment History */}
          <div className="bg-card border border-border rounded-lg p-4">
            <h3 className="font-semibold mb-4">Payment History</h3>
            <div className="space-y-2">
              {linePayments.map((payment) => (
                <div
                  key={payment.id}
                  className="flex items-center justify-between py-2 border-b border-border last:border-0"
                >
                  <div>
                    <p className="font-medium text-foreground">EGP {payment.amount}</p>
                    <p className="text-sm text-muted-foreground">{payment.date}</p>
                  </div>
                  <span
                    className={cn(
                      "px-2 py-1 rounded-full text-xs font-medium",
                      payment.status === "paid"
                        ? "bg-primary/10 text-primary"
                        : "bg-warning/10 text-warning-foreground"
                    )}
                  >
                    {payment.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Location Map Placeholder */}
          <div className="bg-card border border-border rounded-lg p-4">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Client Location
            </h3>
            <div className="h-48 bg-muted rounded-lg flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <MapPin className="h-8 w-8 mx-auto mb-2" />
                <p>Map view placeholder</p>
                <p className="text-sm">Cairo, Egypt</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3">
            <Button className="gap-2" onClick={onRecharge}>
              <CreditCard className="h-4 w-4" />
              Recharge Now
            </Button>
            <Button variant="outline" className="gap-2" onClick={onRecharge}>
              <RefreshCw className="h-4 w-4" />
              Renew Package
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
