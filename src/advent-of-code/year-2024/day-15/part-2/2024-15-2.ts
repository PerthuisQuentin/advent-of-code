import { split, sum } from 'src/utils/array'
import { Cell2D, FixedGrid2D } from 'src/utils/fixed-grid-2d'
import { parseInputToGrid } from 'src/utils/input'
import { Point2D } from 'src/utils/point-2d'

import { Direction, DIRECTION_TO_POINT } from '../part-1/2024-15-1'

export enum Tile {
  EMPTY = '.',
  WALL = '#',
  BOX = 'O',
  BOX_L = '[',
  BOX_R = ']',
  ROBOT = '@',
}

export const parseInput = (
  input: string[],
): { grid: FixedGrid2D<Tile>; instructions: Direction[] } => {
  const [rawGrid, rawInstructions] = split(input, '')

  const expandedRawGrid = rawGrid!.map((row) =>
    row
      .split('')
      .map((char) => {
        switch (char) {
          case Tile.BOX:
            return [Tile.BOX_L, Tile.BOX_R]
          case Tile.WALL:
            return [Tile.WALL, Tile.WALL]
          case Tile.EMPTY:
            return [Tile.EMPTY, Tile.EMPTY]
          case Tile.ROBOT:
            return [Tile.ROBOT, Tile.EMPTY]
          default:
            throw new Error('Invalid character in grid')
        }
      })
      .flat()
      .join(''),
  )

  const grid = parseInputToGrid(expandedRawGrid, (char) => char as Tile)
  const instructions = rawInstructions
    ?.join('')
    .split('')
    .map((i) => i as Direction)
  return { grid, instructions: instructions! }
}

export const moveBoxHorizontally = (
  grid: FixedGrid2D<Tile>,
  boxL: Point2D,
  boxR: Point2D,
  direction: Direction.WEST | Direction.EAST,
): boolean => {
  const vector = DIRECTION_TO_POINT[direction]
  const nextPosition = direction === Direction.WEST ? boxL.add(vector) : boxR.add(vector)
  const nextCell = grid.getCell(nextPosition)
  if (!nextCell) throw new Error('Next cell is outside the grid')

  if (nextCell.value === Tile.WALL) return false

  const canMoveBox = nextCell.value === Tile.EMPTY || moveBox(grid, nextPosition, direction)
  if (!canMoveBox) return false

  grid.setCell(
    new Cell2D({ ...nextPosition, value: direction === Direction.WEST ? Tile.BOX_L : Tile.BOX_R }),
  )
  grid.setCell(
    new Cell2D({ ...boxL, value: direction === Direction.WEST ? Tile.BOX_R : Tile.EMPTY }),
  )
  grid.setCell(
    new Cell2D({ ...boxR, value: direction === Direction.WEST ? Tile.EMPTY : Tile.BOX_L }),
  )
  return true
}

export const moveBoxVertically = (
  grid: FixedGrid2D<Tile>,
  boxL: Point2D,
  boxR: Point2D,
  direction: Direction.NORTH | Direction.SOUTH,
  apply = false,
): boolean => {
  const vector = DIRECTION_TO_POINT[direction]
  const nextPositionL = boxL.add(vector)
  const nextPositionR = boxR.add(vector)
  const nextCellL = grid.getCell(nextPositionL)
  const nextCellR = grid.getCell(nextPositionR)
  if (!nextCellL || !nextCellR) throw new Error('Next cell is outside the grid')

  if (nextCellL.value === Tile.WALL || nextCellR.value === Tile.WALL) return false

  const canMoveBox =
    (nextCellL.value === Tile.EMPTY || moveBox(grid, nextPositionL, direction, false)) &&
    (nextCellR.value === Tile.EMPTY || moveBox(grid, nextPositionR, direction, false))
  if (!canMoveBox) return false

  if (!apply) return true

  if (nextCellL.value === Tile.BOX_L || nextCellL.value === Tile.BOX_R) {
    moveBox(grid, nextPositionL, direction, true)
  }

  const updatedNextCellR = grid.getCell(nextPositionR)!
  if (updatedNextCellR.value === Tile.BOX_L || updatedNextCellR.value === Tile.BOX_R) {
    moveBox(grid, nextPositionR, direction, true)
  }

  grid.setCell(new Cell2D({ ...nextPositionL, value: Tile.BOX_L }))
  grid.setCell(new Cell2D({ ...nextPositionR, value: Tile.BOX_R }))
  grid.setCell(new Cell2D({ ...boxL, value: Tile.EMPTY }))
  grid.setCell(new Cell2D({ ...boxR, value: Tile.EMPTY }))

  return true
}

export const moveBox = (
  grid: FixedGrid2D<Tile>,
  box: Point2D,
  direction: Direction,
  apply = true,
): boolean => {
  const boxCell = grid.getCell(box)
  if (!boxCell || (boxCell.value !== Tile.BOX_L && boxCell.value !== Tile.BOX_R)) {
    throw new Error('Invalid box cell')
  }

  const boxL =
    boxCell.value === Tile.BOX_L
      ? box
      : grid.getCell(new Point2D({ x: box.x - 1, y: box.y }))!.point

  const boxR =
    boxCell.value === Tile.BOX_R
      ? box
      : grid.getCell(new Point2D({ x: box.x + 1, y: box.y }))!.point

  if (direction === Direction.WEST || direction === Direction.EAST) {
    return moveBoxHorizontally(grid, boxL, boxR, direction)
  } else {
    return moveBoxVertically(grid, boxL, boxR, direction, apply)
  }
}

export const moveRobot = (
  grid: FixedGrid2D<Tile>,
  robot: Point2D,
  direction: Direction,
): Point2D => {
  const vector = DIRECTION_TO_POINT[direction]
  const nextPosition = robot.add(vector)
  const nextCell = grid.getCell(nextPosition)
  if (!nextCell) throw new Error('Next cell is outside the grid')

  if (nextCell.value === Tile.WALL) return robot
  if (nextCell.value === Tile.EMPTY) {
    grid.setCell(new Cell2D({ ...nextPosition, value: Tile.ROBOT }))
    grid.setCell(new Cell2D({ ...robot, value: Tile.EMPTY }))
    return nextPosition
  }

  const canMoveBox = moveBox(grid, nextPosition, direction)
  if (!canMoveBox) return robot

  grid.setCell(new Cell2D({ ...nextPosition, value: Tile.ROBOT }))
  grid.setCell(new Cell2D({ ...robot, value: Tile.EMPTY }))
  return nextPosition
}

export const run = (grid: FixedGrid2D<Tile>, instructions: Direction[]): void => {
  let robot = grid.getAllCellsOf(Tile.ROBOT)[0]!.point

  instructions.forEach((instruction) => {
    robot = moveRobot(grid, robot, instruction)
  })
}

export const getSumOfBoxCoordinates = (grid: FixedGrid2D<Tile>): number => {
  const boxes = grid.getAllCellsOf(Tile.BOX_L)
  return sum(boxes.map((box) => (grid.maxY - box.point.y) * 100 + box.point.x))
}

export const getResponse = (input: string[]): string => {
  const { grid, instructions } = parseInput(input)
  run(grid, instructions)
  return getSumOfBoxCoordinates(grid).toString()
}
