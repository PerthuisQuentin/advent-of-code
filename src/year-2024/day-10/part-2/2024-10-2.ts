import { sum } from 'src/utils/array'
import { parseInputToGrid } from 'src/utils/input'

import { CellValue, getHighestPointsAccessibleFrom, resetMemory } from '../part-1/2024-10-1'

export const getResponse = (input: string[]): string => {
  const grid = parseInputToGrid<CellValue>(input, (cell) => (cell === '.' ? '.' : Number(cell)))
  resetMemory()

  const lowestPoints = grid.getAllCellsOf(0)

  const highestPointCounts = lowestPoints
    .map((cell) => getHighestPointsAccessibleFrom(grid, cell))
    .map((points) => points.length)

  return sum(highestPointCounts).toString()
}
