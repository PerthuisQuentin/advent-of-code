import { DIAL_SIZE, parseInput, START_VALUE } from '../part-1/aoc-2025-01-1'

type Counters = { zeros: number; value: number }

export const getNextNumber = ({ value, zeros }: Counters, offset: number): Counters => {
  const rawNewValue = value + offset
  const newValue = ((rawNewValue % DIAL_SIZE) + DIAL_SIZE) % DIAL_SIZE
  let zerosCount = zeros

  if (offset > 0) {
    const firstZero = DIAL_SIZE - value
    if (offset >= firstZero) {
      zerosCount += 1 + Math.floor((offset - firstZero) / DIAL_SIZE)
    }
  } else if (offset < 0) {
    const absOffset = Math.abs(offset)
    if (absOffset >= value && value > 0) {
      const firstZero = value
      zerosCount += 1 + Math.floor((absOffset - firstZero) / DIAL_SIZE)
    } else if (value === 0 && absOffset > 0) {
      zerosCount += Math.floor(absOffset / DIAL_SIZE)
    }
  }

  return { value: newValue, zeros: zerosCount }
}

export const countZeros = (numbers: number[]): number => {
  let counters: Counters = { value: START_VALUE, zeros: 0 }

  for (const num of numbers) {
    counters = getNextNumber(counters, num)
  }

  return counters.zeros
}

export const getResponse = (input: string[]): string => {
  return countZeros(parseInput(input)).toString()
}
