import React from 'react'
import { LucideIcon } from 'lucide-react'

interface StatCardProps {
  label: string
  value: number | string
  icon: LucideIcon
  color?: 'blue' | 'gold' | 'green' | 'red'
}

export default function StatCard({
  label,
  value,
  icon: Icon,
  color = 'blue',
}: StatCardProps) {
  const colorStyles = {
    blue: 'bg-[#E0E7FF] text-[#133A63]',
    gold: 'bg-yellow-100 text-[#B88424]',
    green: 'bg-green-100 text-green-700',
    red: 'bg-red-100 text-red-700',
  }

  return (
    <div className="stat-card">
      <div className="flex items-start justify-between">
        <div>
          <p className="stat-label">{label}</p>
          <p className="stat-value">{value}</p>
        </div>
        <div className={`p-4 rounded-xl ${colorStyles[color]}`}>
          <Icon className="w-8 h-8" />
        </div>
      </div>
    </div>
  )
}
