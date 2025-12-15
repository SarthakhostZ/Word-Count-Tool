export interface TextStats {
  words: number
  charactersWithSpaces: number
  charactersWithoutSpaces: number
  lines: number
  wordFrequency: Array<{ word: string; count: number }>
}

export function analyzeText(text: string): TextStats {
  if (!text.trim()) {
    return {
      words: 0,
      charactersWithSpaces: 0,
      charactersWithoutSpaces: 0,
      lines: 0,
      wordFrequency: [],
    }
  }

  // Character counts
  const charactersWithSpaces = text.length
  const charactersWithoutSpaces = text.replace(/\s/g, "").length

  // Line count
  const lines = text.split("\n").length

  // Word processing: remove punctuation and convert to lowercase
  const cleanedText = text
    .toLowerCase()
    .replace(/[^\w\s]/g, " ") // Replace punctuation with spaces
    .replace(/\s+/g, " ") // Normalize multiple spaces
    .trim()

  // Word count
  const wordsArray = cleanedText ? cleanedText.split(" ") : []
  const words = wordsArray.length

  // Word frequency using HashMap equivalent (JavaScript object)
  const frequencyMap: Record<string, number> = {}

  wordsArray.forEach((word) => {
    if (word) {
      frequencyMap[word] = (frequencyMap[word] || 0) + 1
    }
  })

  // Convert to array and sort by frequency (descending)
  const wordFrequency = Object.entries(frequencyMap)
    .map(([word, count]) => ({ word, count }))
    .sort((a, b) => b.count - a.count)

  return {
    words,
    charactersWithSpaces,
    charactersWithoutSpaces,
    lines,
    wordFrequency,
  }
}
