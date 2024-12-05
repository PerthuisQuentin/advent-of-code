import { sum } from 'src/utils/array'
import { FixedGrid2D } from 'src/utils/fixed-grid-2d'
import { Point2D } from 'src/utils/point-2d'

const parseGrid = (input: string[]): FixedGrid2D<string> => {
  const arrayGrid = input.map((row) => row.split(''))
  return new FixedGrid2D<string>(arrayGrid)
}

const DIRECTIONS = [
  new Point2D({ x: 0, y: 1 }),
  new Point2D({ x: 1, y: 0 }),
  new Point2D({ x: 0, y: -1 }),
  new Point2D({ x: -1, y: 0 }),
  new Point2D({ x: 1, y: 1 }),
  new Point2D({ x: 1, y: -1 }),
  new Point2D({ x: -1, y: 1 }),
  new Point2D({ x: -1, y: -1 }),
]

export const countXmasWordsFromAPoint = (grid: FixedGrid2D<string>, point: Point2D): number => {
  let count = 0

  for (const direction of DIRECTIONS) {
    if (grid.getCell(point)?.value !== 'X') continue
    if (grid.getCell(point.add(direction))?.value !== 'M') continue
    if (grid.getCell(point.add(direction.multiply(2)))?.value !== 'A') continue
    if (grid.getCell(point.add(direction.multiply(3)))?.value !== 'S') continue
    count++
  }

  return count
}

export const getResponse = (input: string[]): string => {
  const grid = parseGrid(input)
  const xCells = grid.getAllCellsOf('X')
  const xmasCount = sum(xCells.map((cell) => countXmasWordsFromAPoint(grid, cell)))

  return xmasCount.toString()
}
