"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Client } from "@/lib/mock-data"
import { cn } from "@/lib/utils"
import { MapPin, Loader2 } from "lucide-react"

interface AddClientModalProps {
  open: boolean
  onClose: () => void
  onAdd: (client: Omit<Client, "id" | "createdAt">) => void
}

const serviceTypes = [
  { id: "home", label: "Home Internet" },
  { id: "sim", label: "SIM Card" },
  { id: "business", label: "Business Line" },
]

const packages = [
  { id: "basic-50", name: "Basic 50GB" },
  { id: "standard-100", name: "Standard 100GB" },
  { id: "super-150", name: "Super 150GB" },
  { id: "ultra-200", name: "Ultra 200GB" },
  { id: "business-300", name: "Business 300GB" },
]

const lineTypes = [
  { id: "fiber", label: "Fiber Optic" },
  { id: "adsl", label: "ADSL" },
  { id: "4g", label: "4G LTE" },
  { id: "5g", label: "5G" },
]

export function AddClientModal({ open, onClose, onAdd }: AddClientModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    nationalId: "",
    phone: "",
    city: "",
    area: "",
    street: "",
    serviceType: "home" as "home" | "sim" | "business",
    package: "",
    lineType: "",
    notes: "",
    latitude: "",
    longitude: "",
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleAutoDetectLocation = () => {
    // Simulate auto-detect with Cairo coordinates
    setFormData({
      ...formData,
      latitude: "30.0444",
      longitude: "31.2357",
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const newClient: Omit<Client, "id" | "createdAt"> = {
      name: formData.name,
      nationalId: formData.nationalId,
      phone: formData.phone,
      serviceType: formData.serviceType,
      status: "pending",
      address: {
        city: formData.city,
        area: formData.area,
        street: formData.street,
      },
    }

    onAdd(newClient)
    setIsSubmitting(false)
    setFormData({
      name: "",
      nationalId: "",
      phone: "",
      city: "",
      area: "",
      street: "",
      serviceType: "home",
      package: "",
      lineType: "",
      notes: "",
      latitude: "",
      longitude: "",
    })
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Client</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <div className="space-y-4">
            <h4 className="font-medium text-foreground">Personal Information</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2.5 bg-muted rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="Enter full name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  National ID *
                </label>
                <input
                  type="text"
                  name="nationalId"
                  value={formData.nationalId}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2.5 bg-muted rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="14-digit national ID"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2.5 bg-muted rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="010-XXXX-XXXX"
                />
              </div>
            </div>
          </div>

          {/* Address */}
          <div className="space-y-4">
            <h4 className="font-medium text-foreground">Address</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  City *
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2.5 bg-muted rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="Cairo"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  Area *
                </label>
                <input
                  type="text"
                  name="area"
                  value={formData.area}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2.5 bg-muted rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="Maadi"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  Street *
                </label>
                <input
                  type="text"
                  name="street"
                  value={formData.street}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2.5 bg-muted rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="Street 9"
                />
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-foreground">Location</h4>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleAutoDetectLocation}
                className="gap-2"
              >
                <MapPin className="h-4 w-4" />
                Auto-detect
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  Latitude
                </label>
                <input
                  type="text"
                  name="latitude"
                  value={formData.latitude}
                  onChange={handleChange}
                  className="w-full px-3 py-2.5 bg-muted rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="30.0444"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  Longitude
                </label>
                <input
                  type="text"
                  name="longitude"
                  value={formData.longitude}
                  onChange={handleChange}
                  className="w-full px-3 py-2.5 bg-muted rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="31.2357"
                />
              </div>
            </div>
            {/* Map Placeholder */}
            <div className="h-32 bg-muted rounded-lg flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <MapPin className="h-6 w-6 mx-auto mb-1" />
                <p className="text-sm">Map picker placeholder</p>
              </div>
            </div>
          </div>

          {/* Service Selection */}
          <div className="space-y-4">
            <h4 className="font-medium text-foreground">Service Selection</h4>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Service Type *
              </label>
              <div className="grid grid-cols-3 gap-3">
                {serviceTypes.map((type) => (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() =>
                      setFormData({
                        ...formData,
                        serviceType: type.id as "home" | "sim" | "business",
                      })
                    }
                    className={cn(
                      "py-3 px-4 rounded-lg border-2 transition-all text-sm font-medium",
                      formData.serviceType === type.id
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-border hover:border-primary/50 text-foreground"
                    )}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  Package
                </label>
                <select
                  name="package"
                  value={formData.package}
                  onChange={handleChange}
                  className="w-full px-3 py-2.5 bg-muted rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  <option value="">Select package</option>
                  {packages.map((pkg) => (
                    <option key={pkg.id} value={pkg.id}>
                      {pkg.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  Line Type
                </label>
                <select
                  name="lineType"
                  value={formData.lineType}
                  onChange={handleChange}
                  className="w-full px-3 py-2.5 bg-muted rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  <option value="">Select line type</option>
                  {lineTypes.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Notes</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows={3}
              className="w-full px-3 py-2.5 bg-muted rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
              placeholder="Additional notes..."
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end gap-3 pt-4 border-t border-border">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Adding...
                </>
              ) : (
                "Add Client"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
