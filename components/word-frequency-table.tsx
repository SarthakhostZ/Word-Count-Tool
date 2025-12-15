import { Card } from "@/components/ui/card"
import { BarChart2 } from "lucide-react"

interface WordFrequencyTableProps {
  wordFrequency: Array<{ word: string; count: number }>
}

export function WordFrequencyTable({ wordFrequency }: WordFrequencyTableProps) {
  if (wordFrequency.length === 0) {
    return (
      <Card className="p-6">
        <h2 className="text-xl font-semibold text-card-foreground mb-4 flex items-center gap-2">
          <BarChart2 className="w-5 h-5" />
          Word Frequency
        </h2>
        <p className="text-muted-foreground text-center py-8">Start typing to see word frequency analysis</p>
      </Card>
    )
  }

  const maxCount = Math.max(...wordFrequency.map((item) => item.count))

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold text-card-foreground mb-4 flex items-center gap-2">
        <BarChart2 className="w-5 h-5" />
        Word Frequency
      </h2>
      <div className="space-y-3 max-h-[500px] overflow-y-auto">
        {wordFrequency.map((item, index) => (
          <div key={index} className="space-y-1">
            <div className="flex items-center justify-between text-sm">
              <span className="font-mono font-medium text-foreground">{item.word}</span>
              <span className="text-muted-foreground">{item.count}x</span>
            </div>
            <div className="h-2 bg-secondary rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-300"
                style={{ width: `${(item.count / maxCount) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
