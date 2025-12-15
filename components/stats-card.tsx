import { Card } from "@/components/ui/card"

interface StatsCardProps {
  label: string
  value: number
  description: string
}

export function StatsCard({ label, value, description }: StatsCardProps) {
  return (
    <Card className="p-5">
      <div className="space-y-2">
        <p className="text-sm font-medium text-muted-foreground">{label}</p>
        <p className="text-3xl font-bold text-foreground">{value.toLocaleString()}</p>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
    </Card>
  )
}
