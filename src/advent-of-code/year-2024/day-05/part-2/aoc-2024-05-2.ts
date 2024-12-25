import { sum } from 'src/utils/array'

import { getCoupleOrderHashMap, getMiddleValue, parseInput, sortUpdate } from '../part-1/aoc-2024-05-1'

export const getResponse = (input: string[]): string => {
  const { coupleOrders, updates } = parseInput(input)
  const coupleOrderHashMap = getCoupleOrderHashMap(coupleOrders)

  const sortedUpdate = updates.map((update) => sortUpdate(update, coupleOrderHashMap))
  const invalidUpdates = sortedUpdate.filter(
    (sortedUpdate, index) => updates[index]!.join(',') !== sortedUpdate.join(','),
  )

  const result = sum(invalidUpdates.map((update) => getMiddleValue(update)))

  return result.toString()
}
