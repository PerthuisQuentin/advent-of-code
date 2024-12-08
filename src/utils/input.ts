import { FixedGrid2D } from './fixed-grid-2d'

export const parseInputToGrid = (input: string[]): FixedGrid2D<string> => {
  const arrayGrid = input.map((row) => row.split(''))
  return new FixedGrid2D<string>(arrayGrid)
}
