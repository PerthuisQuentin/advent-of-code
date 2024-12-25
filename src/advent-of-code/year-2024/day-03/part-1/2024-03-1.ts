export type Multiply = {
  a: number
  b: number
}

export const MULTIPLY_REGEX = /mul\((\d+),(\d+)\)/g

export const parseInput = (input: string[]): Multiply[] => {
  const operations = input.map((line) => {
    const matches = Array.from(line.matchAll(MULTIPLY_REGEX)).map((match) => ({
      a: Number(match[1]),
      b: Number(match[2]),
    }))

    return matches
  })

  return operations.flat()
}

export const runOperations = (operations: Multiply[]): number => {
  return operations.reduce((acc, { a, b }) => acc + a * b, 0)
}

export const getResponse = (input: string[]): string => {
  const operations = parseInput(input)
  const result = runOperations(operations)
  return result.toString()
}
