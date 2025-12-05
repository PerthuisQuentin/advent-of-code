import { FixedGrid2D } from './fixed-grid-2d'

export const parseInputToGrid = <T = string>(
  input: string[],
  transform: (cell: string) => T = (cell) => cell as T,
): FixedGrid2D<T> => {
  const arrayGrid = input.map((row) => row.split('').map(transform))
  return new FixedGrid2D<T>(arrayGrid)
}

export const parseTwoPartsInput = (input: string[]): { part1: string[]; part2: string[] } => {
  const index = input.indexOf('')
  const part1 = input.slice(0, index)
  const part2 = input.slice(index + 1)
  return { part1, part2 }
}
