export const START_VALUE = 50
export const DIAL_SIZE = 100

export const parseInput = (input: string[]): number[] => {
  return input.map((line) => {
    const symbol = line[0]
    const value = parseInt(line.slice(1), 10)
    return symbol === 'L' ? -value : value
  })
}

export const getNextNumber = (current: number, offset: number): number => {
  const newValue = (current + offset) % DIAL_SIZE
  return Math.abs(newValue < 0 ? DIAL_SIZE + newValue : newValue)
}

export const countZeros = (numbers: number[]): number => {
  let value = START_VALUE
  let count = 0

  for (const num of numbers) {
    value = getNextNumber(value, num)
    if (value === 0) count++
  }

  return count
}

export const getResponse = (input: string[]): string => {
  return countZeros(parseInput(input)).toString()
}
