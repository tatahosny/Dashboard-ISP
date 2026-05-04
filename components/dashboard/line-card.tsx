"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Eye, RefreshCw, CreditCard, Wifi } from "lucide-react"

export type LineStatus = "active" | "expired" | "near-limit"

interface LineCardProps {
  id: string
  name: string
  lineNumber: string
  provider: string
  packageName: string
  renewalDate: string
  daysRemaining: number
  balance: number
  status: LineStatus
  usage: {
    total: number
    used: number
    remaining: number
  }
  onViewDetails?: () => void
  onRenew?: () => void
  onRecharge?: () => void
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

export function LineCard({
  name,
  lineNumber,
  provider,
  packageName,
  renewalDate,
  daysRemaining,
  balance,
  status,
  usage,
  onViewDetails,
  onRenew,
  onRecharge,
}: LineCardProps) {
  const usagePercentage = (usage.used / usage.total) * 100
  const statusInfo = statusConfig[status]

  return (
    <div className="bg-card rounded-xl border border-border p-5 hover:shadow-lg transition-all duration-300">
      <div className="flex flex-col lg:flex-row lg:items-center gap-4">
        {/* Left Section - Line Info */}
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-10 w-10 rounded-lg bg-secondary/10 flex items-center justify-center">
              <Wifi className="h-5 w-5 text-secondary" />
            </div>
            <div>
              <h3 className="font-semibold text-card-foreground">{name}</h3>
              <p className="text-sm text-muted-foreground">{lineNumber}</p>
            </div>
            <span
              className={cn(
                "px-2.5 py-1 rounded-full text-xs font-medium border",
                statusInfo.className
              )}
            >
              {statusInfo.label}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Provider</p>
              <p className="font-medium text-card-foreground">{provider}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Package</p>
              <p className="font-medium text-card-foreground">{packageName}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Renewal</p>
              <p className="font-medium text-card-foreground">{renewalDate}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Days Left</p>
              <p
                className={cn(
                  "font-medium",
                  daysRemaining <= 3 ? "text-destructive" : "text-card-foreground"
                )}
              >
                {daysRemaining} days
              </p>
            </div>
          </div>

          <div className="mt-3 flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Balance:</span>
            <span className="font-semibold text-primary">EGP {balance}</span>
          </div>
        </div>

        {/* Right Section - Usage Chart & Actions */}
        <div className="flex flex-col sm:flex-row lg:flex-col items-center gap-4 lg:w-48">
          {/* Circular Progress */}
          <div className="relative h-24 w-24">
            <svg className="h-24 w-24 -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="currentColor"
                strokeWidth="12"
                className="text-muted"
              />
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="currentColor"
                strokeWidth="12"
                strokeDasharray={`${usagePercentage * 2.51} 251`}
                strokeLinecap="round"
                className={cn(
                  usagePercentage > 90
                    ? "text-destructive"
                    : usagePercentage > 70
                    ? "text-warning"
                    : "text-primary"
                )}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-lg font-bold">{Math.round(usagePercentage)}%</span>
              <span className="text-xs text-muted-foreground">Used</span>
            </div>
          </div>

          <div className="text-center lg:text-left text-sm">
            <p className="text-muted-foreground">
              {usage.used} / {usage.total} GB
            </p>
            <p className="text-primary font-medium">{usage.remaining} GB left</p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-border">
        <Button variant="outline" size="sm" className="gap-2" onClick={onViewDetails}>
          <Eye className="h-4 w-4" />
          View Details
        </Button>
        <Button variant="outline" size="sm" className="gap-2" onClick={onRenew}>
          <RefreshCw className="h-4 w-4" />
          Renew Package
        </Button>
        <Button size="sm" className="gap-2" onClick={onRecharge}>
          <CreditCard className="h-4 w-4" />
          Recharge
        </Button>
      </div>
    </div>
  )
}
