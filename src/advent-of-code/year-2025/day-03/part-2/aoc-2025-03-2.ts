import { getSumOfMaxVoltages } from '../part-1/aoc-2025-03-1'

export const ACTIVABLE_BATTERIES = 12

export const getResponse = (input: string[]): string => {
  return getSumOfMaxVoltages(input, ACTIVABLE_BATTERIES).toString()
}
