import { LineStatus } from "@/components/dashboard/line-card"

export interface InternetLine {
  id: string
  name: string
  lineNumber: string
  provider: string
  providerLogo?: string
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
}

export interface Client {
  id: string
  name: string
  phone: string
  nationalId: string
  serviceType: "home" | "sim" | "business"
  status: "active" | "inactive" | "pending"
  address: {
    city: string
    area: string
    street: string
  }
  createdAt: string
}

export interface Payment {
  id: string
  clientName: string
  amount: number
  date: string
  method: "cash" | "instapay" | "vodafone-cash" | "credit-card"
  status: "paid" | "pending" | "failed"
}

export interface Device {
  id: string
  name: string
  ipAddress: string
  speed: string
  connectedDevices: number
  status: "online" | "offline"
}

export const mockLines: InternetLine[] = [
  {
    id: "1",
    name: "Home Office Line",
    lineNumber: "010-1234-5678",
    provider: "WE",
    packageName: "Super 100",
    renewalDate: "2024-02-15",
    daysRemaining: 12,
    balance: 350,
    status: "active",
    usage: { total: 100, used: 65, remaining: 35 },
  },
  {
    id: "2",
    name: "Branch Cairo",
    lineNumber: "011-8765-4321",
    provider: "Orange",
    packageName: "Business Pro",
    renewalDate: "2024-02-08",
    daysRemaining: 5,
    balance: 150,
    status: "near-limit",
    usage: { total: 200, used: 185, remaining: 15 },
  },
  {
    id: "3",
    name: "Warehouse Line",
    lineNumber: "012-5555-9999",
    provider: "Etisalat",
    packageName: "Basic 50",
    renewalDate: "2024-01-28",
    daysRemaining: 0,
    balance: 0,
    status: "expired",
    usage: { total: 50, used: 50, remaining: 0 },
  },
  {
    id: "4",
    name: "Downtown Store",
    lineNumber: "010-7777-3333",
    provider: "Vodafone",
    packageName: "Ultra 150",
    renewalDate: "2024-02-20",
    daysRemaining: 17,
    balance: 520,
    status: "active",
    usage: { total: 150, used: 45, remaining: 105 },
  },
]

export const mockClients: Client[] = [
  {
    id: "1",
    name: "Ahmed Mohamed",
    phone: "010-1234-5678",
    nationalId: "29001011234567",
    serviceType: "home",
    status: "active",
    address: { city: "Cairo", area: "Maadi", street: "Street 9" },
    createdAt: "2023-06-15",
  },
  {
    id: "2",
    name: "Sara Ibrahim",
    phone: "011-9876-5432",
    nationalId: "29505052345678",
    serviceType: "business",
    status: "active",
    address: { city: "Alexandria", area: "Smouha", street: "Main Road" },
    createdAt: "2023-08-22",
  },
  {
    id: "3",
    name: "Mohamed Ali",
    phone: "012-5555-1111",
    nationalId: "28808083456789",
    serviceType: "sim",
    status: "pending",
    address: { city: "Giza", area: "6th October", street: "Central Axis" },
    createdAt: "2024-01-10",
  },
  {
    id: "4",
    name: "Fatma Hassan",
    phone: "010-3333-7777",
    nationalId: "29203034567890",
    serviceType: "home",
    status: "inactive",
    address: { city: "Cairo", area: "Nasr City", street: "Abbas El-Akkad" },
    createdAt: "2023-04-05",
  },
]

export const mockPayments: Payment[] = [
  {
    id: "1",
    clientName: "Ahmed Mohamed",
    amount: 350,
    date: "2024-02-01",
    method: "instapay",
    status: "paid",
  },
  {
    id: "2",
    clientName: "Sara Ibrahim",
    amount: 520,
    date: "2024-02-02",
    method: "credit-card",
    status: "paid",
  },
  {
    id: "3",
    clientName: "Mohamed Ali",
    amount: 150,
    date: "2024-02-03",
    method: "vodafone-cash",
    status: "pending",
  },
  {
    id: "4",
    clientName: "Fatma Hassan",
    amount: 200,
    date: "2024-02-04",
    method: "cash",
    status: "paid",
  },
]

export const mockDevices: Device[] = [
  {
    id: "1",
    name: "Main Router - Home",
    ipAddress: "192.168.1.1",
    speed: "100 Mbps",
    connectedDevices: 8,
    status: "online",
  },
  {
    id: "2",
    name: "Office Router",
    ipAddress: "192.168.2.1",
    speed: "200 Mbps",
    connectedDevices: 15,
    status: "online",
  },
  {
    id: "3",
    name: "Warehouse Router",
    ipAddress: "192.168.3.1",
    speed: "50 Mbps",
    connectedDevices: 0,
    status: "offline",
  },
]

export const monthlyUsageData = [
  { day: "1", usage: 2.5 },
  { day: "2", usage: 3.2 },
  { day: "3", usage: 2.8 },
  { day: "4", usage: 4.1 },
  { day: "5", usage: 3.5 },
  { day: "6", usage: 5.2 },
  { day: "7", usage: 4.8 },
  { day: "8", usage: 3.9 },
  { day: "9", usage: 4.2 },
  { day: "10", usage: 3.1 },
  { day: "11", usage: 2.9 },
  { day: "12", usage: 4.5 },
  { day: "13", usage: 5.1 },
  { day: "14", usage: 4.3 },
  { day: "15", usage: 3.7 },
  { day: "16", usage: 4.0 },
  { day: "17", usage: 3.4 },
  { day: "18", usage: 2.6 },
  { day: "19", usage: 3.8 },
  { day: "20", usage: 4.4 },
  { day: "21", usage: 5.0 },
  { day: "22", usage: 4.6 },
  { day: "23", usage: 3.3 },
  { day: "24", usage: 2.7 },
  { day: "25", usage: 3.6 },
  { day: "26", usage: 4.2 },
  { day: "27", usage: 3.9 },
  { day: "28", usage: 4.1 },
  { day: "29", usage: 3.5 },
  { day: "30", usage: 4.8 },
]

export const usageBreakdown = [
  { category: "Streaming", value: 45, color: "var(--chart-1)" },
  { category: "Social Media", value: 25, color: "var(--chart-2)" },
  { category: "Downloads", value: 15, color: "var(--chart-3)" },
  { category: "Browsing", value: 15, color: "var(--chart-5)" },
]
