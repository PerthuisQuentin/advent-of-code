import { Cell2D, FixedGrid2D } from 'src/utils/fixed-grid-2d'
import { parseInputToGrid } from 'src/utils/input'

export const MAX_NEIGHBORS = 4

export enum CELL {
  PAPER = '@',
  EMPTY = '.',
  REMOVED = 'X',
}

export const countAdjacentPapers = (grid: FixedGrid2D<CELL>, cell: Cell2D<CELL>): number => {
  const neighbors = grid.getNeighborsAll(cell)
  const count = neighbors.reduce(
    (sum, neighbor) => (neighbor.value === CELL.PAPER ? sum + 1 : sum),
    0,
  )
  return count
}

export const countAccessiblePapers = (grid: FixedGrid2D<CELL>): number => {
  const allPaperCells = grid.getAllCellsOf(CELL.PAPER)
  const allAccessiblePaperCells = allPaperCells.filter(
    (cell) => countAdjacentPapers(grid, cell) < MAX_NEIGHBORS,
  )
  return allAccessiblePaperCells.length
}

export const getResponse = (input: string[]): string => {
  const grid = parseInputToGrid(input, (value) => value as CELL)

  return countAccessiblePapers(grid).toString()
}
