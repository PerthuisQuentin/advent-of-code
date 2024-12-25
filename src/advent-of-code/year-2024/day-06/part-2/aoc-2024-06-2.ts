import { Cell2D, FixedGrid2D } from 'src/utils/fixed-grid-2d'
import { parseInputToGrid } from 'src/utils/input'
import { Point2D } from 'src/utils/point-2d'

import { CELL, doStep } from '../part-1/aoc-2024-06-1'

export const hasLoop = (grid: FixedGrid2D<CELL>, startPosition: Point2D): boolean => {
  let tortoisePosition = startPosition
  let harePosition = startPosition

  let tortoiseDirection = 0
  let hareDirection = 0

  while (harePosition && tortoisePosition) {
    const tortoiseResult = doStep(grid, tortoisePosition, tortoiseDirection)

    const tempHareResult = doStep(grid, harePosition, hareDirection)
    const hareResult = doStep(grid, tempHareResult.newPosition, tempHareResult.newDirectionIndex)

    if (tortoisePosition.isSame(hareResult.newPosition)) return true

    if (tortoisePosition.isSame(tortoiseResult.newPosition)) break
    if (harePosition.isSame(hareResult.newPosition)) break

    tortoisePosition = tortoiseResult.newPosition
    tortoiseDirection = tortoiseResult.newDirectionIndex

    harePosition = hareResult.newPosition
    hareDirection = hareResult.newDirectionIndex
  }

  return false
}

export const getResponse = (input: string[]): string => {
  const grid = parseInputToGrid(input, (value) => value as CELL)

  const guardPosition = grid.getAllCellsOf(CELL.GUARD)[0]!.point
  grid.setCell(new Cell2D({ x: guardPosition.x, y: guardPosition.y, value: CELL.EMPTY }))

  let possibleLoops = 0

  grid.forEach((cell) => {
    if (cell.isSame(guardPosition)) return
    if (cell.value !== CELL.EMPTY) return
    const gridCopy = grid.clone()
    gridCopy.setCell(new Cell2D({ x: cell.x, y: cell.y, value: CELL.OBSTACLE }))
    if (hasLoop(gridCopy, guardPosition)) possibleLoops++
  })

  return possibleLoops.toString()
}
