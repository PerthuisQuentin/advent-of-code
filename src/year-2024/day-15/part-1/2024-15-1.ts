import { split, sum } from 'src/utils/array'
import { Cell2D, FixedGrid2D } from 'src/utils/fixed-grid-2d'
import { parseInputToGrid } from 'src/utils/input'
import { Point2D } from 'src/utils/point-2d'

export enum Tile {
  EMPTY = '.',
  WALL = '#',
  BOX = 'O',
  ROBOT = '@',
}

export enum Direction {
  NORTH = '^',
  EAST = '>',
  SOUTH = 'v',
  WEST = '<',
}

export const DIRECTION_TO_POINT: Record<Direction, Point2D> = {
  [Direction.NORTH]: new Point2D({ x: 0, y: 1 }),
  [Direction.EAST]: new Point2D({ x: 1, y: 0 }),
  [Direction.SOUTH]: new Point2D({ x: 0, y: -1 }),
  [Direction.WEST]: new Point2D({ x: -1, y: 0 }),
}

export const parseInput = (
  input: string[],
): { grid: FixedGrid2D<Tile>; instructions: Direction[] } => {
  const [rawGrid, rawInstructions] = split(input, '')
  const grid = parseInputToGrid(rawGrid!, (char) => char as Tile)
  const instructions = rawInstructions
    ?.join('')
    .split('')
    .map((i) => i as Direction)
  return { grid, instructions: instructions! }
}

export const moveBox = (grid: FixedGrid2D<Tile>, box: Point2D, direction: Direction): boolean => {
  const vector = DIRECTION_TO_POINT[direction]
  const nextPosition = box.add(vector)
  const nextCell = grid.getCell(nextPosition)
  if (!nextCell) throw new Error('Next cell is outside the grid')

  if (nextCell.value === Tile.WALL) return false

  const canMoveBox = nextCell.value === Tile.EMPTY || moveBox(grid, nextPosition, direction)
  if (!canMoveBox) return false

  grid.setCell(new Cell2D({ ...nextPosition, value: Tile.BOX }))
  grid.setCell(new Cell2D({ ...box, value: Tile.EMPTY }))
  return true
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

  const canMoveBox = nextCell.value === Tile.EMPTY || moveBox(grid, nextPosition, direction)
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
  const boxes = grid.getAllCellsOf(Tile.BOX)
  return sum(boxes.map((box) => (grid.maxY - box.point.y) * 100 + box.point.x))
}

export const getResponse = (input: string[]): string => {
  const { grid, instructions } = parseInput(input)
  run(grid, instructions)
  return getSumOfBoxCoordinates(grid).toString()
}
