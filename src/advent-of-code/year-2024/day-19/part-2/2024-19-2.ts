import { sum } from 'src/utils/array'

import { countAllCombinations, parseInput } from '../part-1/2024-19-1'

export const getResponse = (input: string[]): string => {
  const { patterns, designs } = parseInput(input)
  const memory = new Map<string, number>()

  const possibleDesigns = designs.map((design) => countAllCombinations(design, patterns, memory))

  return sum(possibleDesigns).toString()
}
