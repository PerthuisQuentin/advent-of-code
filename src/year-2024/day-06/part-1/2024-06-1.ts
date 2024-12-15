import { Cell2D, FixedGrid2D } from 'src/utils/fixed-grid-2d'
import { parseInputToGrid } from 'src/utils/input'
import { Point2D } from 'src/utils/point-2d'

export enum CELL {
  GUARD = '^',
  OBSTACLE = '#',
  EMPTY = '.',
  CROSS = 'X',
}

export const DIRECTIONS = [
  new Point2D({ x: 0, y: 1 }),
  new Point2D({ x: 1, y: 0 }),
  new Point2D({ x: 0, y: -1 }),
  new Point2D({ x: -1, y: 0 }),
]

export const turnAtRight = (directionIndex: number): number => (directionIndex + 1) % 4

export const doStep = (
  grid: FixedGrid2D<string>,
  position: Point2D,
  directionIndex: number,
): { newPosition: Point2D; newDirectionIndex: number } => {
  const nextPosition = position.add(DIRECTIONS[directionIndex]!)
  const nextCell = grid.getCell(nextPosition)

  if (nextCell?.value === CELL.OBSTACLE) {
    const newDirectionIndex = turnAtRight(directionIndex)
    return { newPosition: position, newDirectionIndex: newDirectionIndex }
  }

  if (nextCell?.value === CELL.EMPTY || nextCell?.value === CELL.CROSS) {
    return { newPosition: nextPosition, newDirectionIndex: directionIndex }
  }

  if (!nextCell) {
    return { newPosition: nextPosition, newDirectionIndex: directionIndex }
  }

  throw new Error(`Unexpected cell value: ${nextCell.value}`)
}

export const runGuardPatrol = (grid: FixedGrid2D<string>): void => {
  let guardPosition = grid.getAllCellsOf(CELL.GUARD)?.[0]?.point
  if (!guardPosition) throw new Error('Guard not found')

  let directionIndex = 0

  while (guardPosition) {
    const { newPosition, newDirectionIndex } = doStep(grid, guardPosition, directionIndex)
    const newCell = grid.getCell(newPosition)

    if (directionIndex === newDirectionIndex) {
      if (newCell)
        grid.setCell(new Cell2D({ x: newPosition.x, y: newPosition.y, value: CELL.GUARD }))
      grid.setCell(new Cell2D({ x: guardPosition.x, y: guardPosition.y, value: CELL.CROSS }))
    }

    guardPosition = newCell
    directionIndex = newDirectionIndex
  }
}

export const getResponse = (input: string[]): string => {
  const grid = parseInputToGrid(input)
  runGuardPatrol(grid)

  return grid.getAllCellsOf(CELL.CROSS).length.toString()
}
