import { sum } from 'src/utils/array'
import { Cell2D, FixedGrid2D } from 'src/utils/fixed-grid-2d'
import { parseInputToGrid } from 'src/utils/input'

export const EMPTY = '.'
export type CellValue = number | typeof EMPTY

let memory: Map<string, Cell2D<CellValue>[]>

export const resetMemory = (): void => {
  memory = new Map()
}

export const getHighestPointsAccessibleFrom = (
  grid: FixedGrid2D<CellValue>,
  cell: Cell2D<CellValue>,
): Cell2D<CellValue>[] => {
  if (!cell || cell.value === EMPTY) return []
  if (cell.value === 9) return [cell]
  if (memory.has(cell.hash)) return memory.get(cell.hash)!

  const cellValue = cell.value as number

  const neighbors = grid
    .getNeighbors(cell)
    .filter((neighborCell) => cellValue + 1 === neighborCell?.value)

  if (neighbors.length === 0) {
    memory.set(cell.hash, [])
    return []
  }

  const result = neighbors.map((neighbor) => getHighestPointsAccessibleFrom(grid, neighbor)).flat()
  memory.set(cell.hash, result)
  return result
}

export const getResponse = (input: string[]): string => {
  const grid = parseInputToGrid<CellValue>(input, (cell) => (cell === '.' ? '.' : Number(cell)))
  resetMemory()

  const lowestPoints = grid.getAllCellsOf(0)

  const highestPointCounts = lowestPoints
    .map((cell) => getHighestPointsAccessibleFrom(grid, cell))
    .map((points) => {
      const set = new Set(points.map((cell) => cell.hash))
      return set.size
    })

  return sum(highestPointCounts).toString()
}
