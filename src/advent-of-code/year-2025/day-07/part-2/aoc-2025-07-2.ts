import { FixedGrid2D } from 'src/utils/fixed-grid-2d'
import { parseInputToGrid } from 'src/utils/input'
import { Point2D } from 'src/utils/point-2d'

import { Cell } from '../part-1/aoc-2025-07-1'

export type Tachyon = {
  cell: Point2D
  count: number
}

export const setTachyon = (tachyons: Map<string, Tachyon>, cell: Point2D, count: number): void => {
  if (!tachyons.has(cell.hash)) {
    tachyons.set(cell.hash, { cell, count })
  } else {
    tachyons.get(cell.hash)!.count += count
  }
}

export const iterateTachyons = (
  grid: FixedGrid2D<Cell>,
  tachyons: Map<string, Tachyon>,
): Map<string, Tachyon> => {
  const nextTachyons = new Map<string, Tachyon>()

  tachyons.forEach((tachyon) => {
    const nextPoint = tachyon.cell.add(new Point2D({ x: 0, y: -1 }))
    if (nextPoint.y < 0) return

    const nextCell = grid.getCell(nextPoint)
    if (!nextCell) throw new Error(`No cell at ${nextPoint.toString()}`)

    if (nextCell.value === Cell.Empty) {
      setTachyon(nextTachyons, nextCell, tachyon.count)
      return
    }

    if (nextCell.value === Cell.Splitter) {
      const leftPoint = nextPoint.add(new Point2D({ x: -1, y: 0 }))
      const rightPoint = nextPoint.add(new Point2D({ x: 1, y: 0 }))
      const leftCell = grid.getCell(leftPoint)
      const rightCell = grid.getCell(rightPoint)
      if (!leftCell || !rightCell) throw new Error(`No cells to split at ${nextPoint.toString()}`)

      setTachyon(nextTachyons, leftCell, tachyon.count)
      setTachyon(nextTachyons, rightCell, tachyon.count)
    }
  })

  return nextTachyons
}

export const getResponse = (input: string[]): string => {
  const grid = parseInputToGrid<Cell>(input)
  const start = grid.getAllCellsOf(Cell.Start)[0]!

  let tachyons = new Map<string, Tachyon>([[start.hash, { cell: start, count: 1 }]])

  for (let i = start.y; i > 0; i--) {
    tachyons = iterateTachyons(grid, tachyons)
  }

  const total = Array.from(tachyons.values()).reduce((acc, tachyon) => acc + tachyon.count, 0)

  return total.toString()
}
