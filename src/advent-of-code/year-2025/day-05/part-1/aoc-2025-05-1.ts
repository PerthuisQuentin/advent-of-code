import { parseTwoPartsInput } from 'src/utils/input'
import { Range } from 'src/utils/range'

export const parseInput = (input: string[]): { ranges: Range[]; ids: number[] } => {
  const { part1, part2 } = parseTwoPartsInput(input)

  const ranges = part1.map((line) => {
    const [startStr, endStr] = line.split('-')
    const start = parseInt(startStr!, 10)
    const end = parseInt(endStr!, 10)
    return new Range(start, end)
  })

  const ids = part2.map((line) => parseInt(line, 10))

  return { ranges, ids }
}

export const isIdInRanges = (id: number, ranges: Range[]): boolean => {
  return ranges.some((range) => range.has(id))
}

export const countIdsInRanges = (ids: number[], ranges: Range[]): number => {
  return ids.reduce((count, id) => (isIdInRanges(id, ranges) ? count + 1 : count), 0)
}

export const getResponse = (input: string[]): string => {
  const { ranges, ids } = parseInput(input)

  return countIdsInRanges(ids, ranges).toString()
}
