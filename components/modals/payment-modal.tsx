"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { InternetLine } from "@/lib/mock-data"
import { cn } from "@/lib/utils"
import { Check, Loader2, Banknote, Smartphone, CreditCard, Building } from "lucide-react"

interface PaymentModalProps {
  open: boolean
  onClose: () => void
  line: InternetLine | null
}

const paymentMethods = [
  { id: "cash", name: "Cash", icon: Banknote },
  { id: "instapay", name: "Instapay", icon: Building },
  { id: "vodafone-cash", name: "Vodafone Cash", icon: Smartphone },
  { id: "credit-card", name: "Credit Card", icon: CreditCard },
]

const packages = [
  { id: "basic", name: "Basic 50GB", price: 150 },
  { id: "standard", name: "Standard 100GB", price: 250 },
  { id: "super", name: "Super 150GB", price: 350 },
  { id: "ultra", name: "Ultra 200GB", price: 450 },
]

export function PaymentModal({ open, onClose, line }: PaymentModalProps) {
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null)
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null)
  const [customAmount, setCustomAmount] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  const handlePayment = async () => {
    setIsProcessing(true)
    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsProcessing(false)
    setIsComplete(true)
    
    // Reset and close after showing success
    setTimeout(() => {
      setIsComplete(false)
      setSelectedMethod(null)
      setSelectedPackage(null)
      setCustomAmount("")
      onClose()
    }, 2000)
  }

  const getAmount = () => {
    if (customAmount) return parseInt(customAmount) || 0
    if (selectedPackage) {
      return packages.find((p) => p.id === selectedPackage)?.price || 0
    }
    return 0
  }

  if (!line) return null

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Payment / Recharge</DialogTitle>
        </DialogHeader>

        {isComplete ? (
          <div className="py-12 text-center">
            <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">Payment Successful!</h3>
            <p className="text-muted-foreground">
              Your payment of EGP {getAmount()} has been processed.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Line Info */}
            <div className="bg-muted/50 rounded-lg p-4">
              <p className="text-sm text-muted-foreground">Recharging line</p>
              <p className="font-semibold text-foreground">{line.name}</p>
              <p className="text-sm text-muted-foreground">{line.lineNumber}</p>
            </div>

            {/* Payment Methods */}
            <div>
              <h4 className="font-medium mb-3 text-foreground">Payment Method</h4>
              <div className="grid grid-cols-2 gap-3">
                {paymentMethods.map((method) => (
                  <button
                    key={method.id}
                    onClick={() => setSelectedMethod(method.id)}
                    className={cn(
                      "flex items-center gap-3 p-4 rounded-lg border-2 transition-all",
                      selectedMethod === method.id
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    )}
                  >
                    <method.icon className="h-5 w-5 text-muted-foreground" />
                    <span className="font-medium text-foreground">{method.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Package Selection */}
            <div>
              <h4 className="font-medium mb-3 text-foreground">Select Package</h4>
              <div className="grid grid-cols-2 gap-3">
                {packages.map((pkg) => (
                  <button
                    key={pkg.id}
                    onClick={() => {
                      setSelectedPackage(pkg.id)
                      setCustomAmount("")
                    }}
                    className={cn(
                      "p-4 rounded-lg border-2 transition-all text-left",
                      selectedPackage === pkg.id
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    )}
                  >
                    <p className="font-medium text-foreground">{pkg.name}</p>
                    <p className="text-primary font-bold">EGP {pkg.price}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Amount */}
            <div>
              <h4 className="font-medium mb-3 text-foreground">Or Enter Custom Amount</h4>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  EGP
                </span>
                <input
                  type="number"
                  value={customAmount}
                  onChange={(e) => {
                    setCustomAmount(e.target.value)
                    setSelectedPackage(null)
                  }}
                  placeholder="0"
                  className="w-full pl-14 pr-4 py-3 bg-muted rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>

            {/* Total */}
            <div className="bg-muted/50 rounded-lg p-4 flex items-center justify-between">
              <span className="text-muted-foreground">Total Amount</span>
              <span className="text-2xl font-bold text-primary">EGP {getAmount()}</span>
            </div>

            {/* Confirm Button */}
            <Button
              className="w-full"
              size="lg"
              disabled={!selectedMethod || getAmount() === 0 || isProcessing}
              onClick={handlePayment}
            >
              {isProcessing ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                "Confirm Payment"
              )}
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
