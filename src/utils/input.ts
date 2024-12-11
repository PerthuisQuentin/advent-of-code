import { FixedGrid2D } from './fixed-grid-2d'

export const parseInputToGrid = <T = string>(
  input: string[],
  transform: (cell: string) => T = (cell) => cell as T,
): FixedGrid2D<T> => {
  const arrayGrid = input.map((row) => row.split('').map(transform))
  return new FixedGrid2D<T>(arrayGrid)
}
