import { Cell2D, FixedGrid2D } from 'src/utils/fixed-grid-2d'
import { parseInputToGrid } from 'src/utils/input'
import { Point2D } from 'src/utils/point-2d'

export enum CELL {
  GUARD = '^',
  OBSTACLE = '#',
  EMPTY = '.',
}

export const DIRECTIONS = [
  new Point2D({ x: 0, y: 1 }),
  new Point2D({ x: 1, y: 0 }),
  new Point2D({ x: 0, y: -1 }),
  new Point2D({ x: -1, y: 0 }),
]

export const turnAtRight = (directionIndex: number): number => (directionIndex + 1) % 4

export const doStep = (
  grid: FixedGrid2D<CELL>,
  position: Point2D,
  directionIndex: number,
): { newPosition: Point2D; newDirectionIndex: number } => {
  const nextPosition = position.add(DIRECTIONS[directionIndex]!)
  const nextCell = grid.getCell(nextPosition)

  if (nextCell?.value === CELL.OBSTACLE) {
    const newDirectionIndex = turnAtRight(directionIndex)
    const nextPosition = position.add(DIRECTIONS[newDirectionIndex]!)
    return { newPosition: grid.getCell(nextPosition)!.point, newDirectionIndex: newDirectionIndex }
  }

  if (nextCell?.value === CELL.EMPTY) {
    return { newPosition: nextPosition, newDirectionIndex: directionIndex }
  }

  return { newPosition: position, newDirectionIndex: directionIndex }
}

export const runGuardPatrol = (
  grid: FixedGrid2D<CELL>,
  startPosition: Point2D,
): Map<string, Point2D> => {
  let guardPosition = startPosition
  if (!guardPosition) throw new Error('Guard not found')

  const cells = new Map<string, Point2D>()
  cells.set(guardPosition.hash, guardPosition)
  let directionIndex = 0

  while (guardPosition) {
    const { newPosition, newDirectionIndex } = doStep(grid, guardPosition, directionIndex)
    if (guardPosition.isSame(newPosition)) break

    cells.set(newPosition.hash, newPosition)

    guardPosition = newPosition
    directionIndex = newDirectionIndex
  }

  return cells
}

export const getResponse = (input: string[]): string => {
  const grid = parseInputToGrid(input, (value) => value as CELL)

  const guardPosition = grid.getAllCellsOf(CELL.GUARD)[0]!.point
  grid.setCell(new Cell2D({ x: guardPosition.x, y: guardPosition.y, value: CELL.EMPTY }))

  const visitedCells = runGuardPatrol(grid, guardPosition)

  return visitedCells.size.toString()
}
