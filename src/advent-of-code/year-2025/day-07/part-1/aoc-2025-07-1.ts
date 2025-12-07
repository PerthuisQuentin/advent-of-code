import { FixedGrid2D } from 'src/utils/fixed-grid-2d'
import { parseInputToGrid } from 'src/utils/input'
import { Point2D } from 'src/utils/point-2d'

export enum Cell {
  Empty = '.',
  Splitter = '^',
  Start = 'S',
}

export const setTachyon = (tachyons: Map<string, Point2D>, cell: Point2D): void => {
  if (!tachyons.has(cell.hash)) tachyons.set(cell.hash, cell)
}

export const iterateTachyons = (
  grid: FixedGrid2D<Cell>,
  tachyons: Map<string, Point2D>,
): { nextTachyons: Map<string, Point2D>; splitCount: number } => {
  const nextTachyons = new Map<string, Point2D>()
  let splitCount = 0

  tachyons.forEach((value) => {
    const nextPoint = value.add(new Point2D({ x: 0, y: -1 }))
    if (nextPoint.y < 0) return

    const nextCell = grid.getCell(nextPoint)
    if (!nextCell) throw new Error(`No cell at ${nextPoint.toString()}`)

    if (nextCell.value === Cell.Empty) {
      setTachyon(nextTachyons, nextCell)
      return
    }

    if (nextCell.value === Cell.Splitter) {
      splitCount++
      const leftPoint = nextPoint.add(new Point2D({ x: -1, y: 0 }))
      const rightPoint = nextPoint.add(new Point2D({ x: 1, y: 0 }))
      const leftCell = grid.getCell(leftPoint)
      const rightCell = grid.getCell(rightPoint)
      if (!leftCell || !rightCell) throw new Error(`No cells to split at ${nextPoint.toString()}`)

      setTachyon(nextTachyons, leftCell)
      setTachyon(nextTachyons, rightCell)
    }
  })

  return { nextTachyons, splitCount }
}

export const getResponse = (input: string[]): string => {
  const grid = parseInputToGrid<Cell>(input)
  const start = grid.getAllCellsOf(Cell.Start)[0]!

  let tachyons = new Map<string, Point2D>([[start.hash, start]])
  let totalSplitCount = 0

  for (let i = start.y; i > 0; i--) {
    const { nextTachyons, splitCount } = iterateTachyons(grid, tachyons)
    tachyons = nextTachyons
    totalSplitCount += splitCount
  }

  return totalSplitCount.toString()
}
