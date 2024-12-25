export const parseInput = (input: string[]): { patterns: string[]; designs: string[] } => {
  const patterns: string[] = input[0]!.split(', ')
  const designs: string[] = input.slice(2)
  return { patterns, designs }
}

export const countAllCombinations = (
  design: string,
  patterns: string[],
  memory: Map<string, number>,
): number => {
  if (design.length === 0) return 1
  if (memory.has(design)) return memory.get(design)!

  const possiblePatterns = patterns.filter((pattern) => design.startsWith(pattern))

  const combinationCounts = possiblePatterns.reduce(
    (total, pattern) =>
      total + countAllCombinations(design.slice(pattern.length), patterns, memory),
    0,
  )

  memory.set(design, combinationCounts)
  return combinationCounts
}

export const getResponse = (input: string[]): string => {
  const { patterns, designs } = parseInput(input)
  const memory = new Map<string, number>()

  const possibleDesigns = designs.filter((design) => countAllCombinations(design, patterns, memory))

  return possibleDesigns.length.toString()
}
