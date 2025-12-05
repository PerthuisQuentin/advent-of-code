import { Range } from 'src/utils/range'

import { parseInput } from '../part-1/aoc-2025-05-1'

export const mergeRanges = (ranges: Range[]): Range[] => {
  const newRanges: Range[] = ranges.map((r) => r.clone())

  let i = 0
  while (i < newRanges.length) {
    let rangeA = newRanges[i]!

    let j = i + 1
    while (j < newRanges.length) {
      const rangeB = newRanges[j]!
      const merged = rangeA.merge(rangeB)

      if (merged) {
        newRanges.splice(i, 1, merged)
        rangeA = merged
        newRanges.splice(j, 1)
        j = i + 1
      } else {
        j++
      }
    }

    i++
  }

  return newRanges
}

export const getResponse = (input: string[]): string => {
  const { ranges } = parseInput(input)

  const mergedRanges = mergeRanges(ranges)

  return mergedRanges.reduce((sum, current) => sum + current.size(), 0).toString()
}
