import { getRangeInvalidIds, hasRepeatingPattern, parseInput } from '../part-1/aoc-2025-02-1'

export const isInvalidId = (id: string): boolean => {
  for (let length = 1; length <= id.length / 2; length++) {
    if (hasRepeatingPattern(id, length)) return true
  }
  return false
}

export const getResponse = (input: string[]): string => {
  const ranges = parseInput(input[0]!)

  const invalidIds = ranges.flatMap((range) => getRangeInvalidIds(range, isInvalidId))

  return invalidIds.reduce((sum, id) => sum + id, 0).toString()
}
