import { BlinkingStones, parseInput } from '../part-1/aoc-2024-11-1'

const BLINKS = 75

export const getResponse = (input: string[]): string => {
  const stones = parseInput(input[0]!)
  const blinkingStones = new BlinkingStones(stones)

  for (let i = 0; i < BLINKS; i++) {
    blinkingStones.blink()
  }

  return blinkingStones.count().toString()
}
