import { sum } from 'src/utils/array'

import { parseInput } from '../part-1/2024-01-1'

export const getOccurrences = (list: number[]): Map<number, number> => {
  return list.reduce((acc, value) => {
    acc.set(value, (acc.get(value) ?? 0) + 1)
    return acc
  }, new Map<number, number>())
}

export const getResponse = (input: string[]): string => {
  const { list1, list2 } = parseInput(input)

  const occurences = getOccurrences(list2)

  const scores: number[] = list1.map((value) => value * (occurences.get(value) ?? 0))

  return sum(scores).toString()
}
