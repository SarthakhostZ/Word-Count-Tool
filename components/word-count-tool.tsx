"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Upload, FileText, BarChart3 } from "lucide-react"
import { StatsCard } from "@/components/stats-card"
import { WordFrequencyTable } from "@/components/word-frequency-table"
import { analyzeText } from "@/lib/text-analyzer"

export function WordCountTool() {
  const [text, setText] = useState("")
  const [stats, setStats] = useState({
    words: 0,
    charactersWithSpaces: 0,
    charactersWithoutSpaces: 0,
    lines: 0,
    wordFrequency: [] as Array<{ word: string; count: number }>,
  })
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const results = analyzeText(text)
    setStats(results)
  }, [text])

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && file.type === "text/plain") {
      const reader = new FileReader()
      reader.onload = (e) => {
        const content = e.target?.result as string
        setText(content)
      }
      reader.readAsText(file)
    }
  }

  const handleClear = () => {
    setText("")
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <header className="mb-8 text-center">
        <div className="flex items-center justify-center gap-3 mb-3">
          <div className="p-2 bg-primary text-primary-foreground rounded-lg">
            <FileText className="w-6 h-6" />
          </div>
          <h1 className="text-4xl font-bold text-foreground">Word Count Tool</h1>
        </div>
        <p className="text-muted-foreground text-lg">
          Analyze your text with detailed statistics and word frequency analysis
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-card-foreground flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Text Input
              </h2>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => fileInputRef.current?.click()} className="gap-2">
                  <Upload className="w-4 h-4" />
                  Upload .txt
                </Button>
                <Button variant="outline" size="sm" onClick={handleClear} disabled={!text}>
                  Clear
                </Button>
              </div>
              <input ref={fileInputRef} type="file" accept=".txt" onChange={handleFileUpload} className="hidden" />
            </div>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type or paste your text here, or upload a .txt file..."
              className="w-full min-h-[400px] p-4 bg-accent text-accent-foreground rounded-lg border-2 border-input focus:border-ring focus:outline-none resize-none font-mono text-sm leading-relaxed"
            />
          </Card>

          <WordFrequencyTable wordFrequency={stats.wordFrequency} />
        </div>

        <div className="space-y-4">
          <div className="sticky top-6 space-y-4">
            <h2 className="text-xl font-semibold text-foreground">Statistics</h2>

            <StatsCard label="Words" value={stats.words} description="Total word count" />

            <StatsCard
              label="Characters (with spaces)"
              value={stats.charactersWithSpaces}
              description="Including whitespace"
            />

            <StatsCard
              label="Characters (no spaces)"
              value={stats.charactersWithoutSpaces}
              description="Excluding whitespace"
            />

            <StatsCard label="Lines" value={stats.lines} description="Total line count" />

            <Card className="p-4 bg-muted">
              <p className="text-sm text-muted-foreground leading-relaxed">
                This tool performs case-insensitive word counting and ignores punctuation for accurate analysis.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
