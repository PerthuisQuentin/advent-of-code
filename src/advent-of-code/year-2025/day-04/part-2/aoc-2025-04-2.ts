import { Cell2D, FixedGrid2D } from 'src/utils/fixed-grid-2d'
import { parseInputToGrid } from 'src/utils/input'

import { CELL, countAdjacentPapers, MAX_NEIGHBORS } from '../part-1/aoc-2025-04-1'

export const removeAccessiblePapers = (grid: FixedGrid2D<CELL>): number => {
  const allPaperCells = grid.getAllCellsOf(CELL.PAPER)
  let removedCount = 0

  allPaperCells.forEach((cell) => {
    const adjacentPapers = countAdjacentPapers(grid, cell)

    if (adjacentPapers < MAX_NEIGHBORS) {
      grid.setCell(new Cell2D({ x: cell.x, y: cell.y, value: CELL.REMOVED }))
      removedCount++
    }
  })

  return removedCount
}

export const getResponse = (input: string[]): string => {
  const grid = parseInputToGrid(input, (value) => value as CELL)

  let totalRemoved = 0
  let currentRemoved = removeAccessiblePapers(grid)

  while (currentRemoved > 0) {
    totalRemoved += currentRemoved
    currentRemoved = removeAccessiblePapers(grid)
  }

  return totalRemoved.toString()
}
