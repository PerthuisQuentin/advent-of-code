import { count } from 'src/utils/array'
import { FixedGrid2D } from 'src/utils/fixed-grid-2d'
import { Point2D } from 'src/utils/point-2d'

export const parseGrid = (input: string[]): FixedGrid2D<string> => {
  const arrayGrid = input.map((row) => row.split(''))
  return new FixedGrid2D<string>(arrayGrid)
}

const TOP_LEFT = new Point2D({ x: -1, y: 1 })
const TOP_RIGHT = new Point2D({ x: 1, y: 1 })
const BOTTOM_LEFT = new Point2D({ x: -1, y: -1 })
const BOTTOM_RIGHT = new Point2D({ x: 1, y: -1 })

export const isXmasCross = (grid: FixedGrid2D<string>, point: Point2D): boolean => {
  if (grid.getCell(point)?.value !== 'A') return false

  const topLeft = grid.getCell(point.add(TOP_LEFT))?.value ?? ''
  const topRight = grid.getCell(point.add(TOP_RIGHT))?.value ?? ''
  const bottomLeft = grid.getCell(point.add(BOTTOM_LEFT))?.value ?? ''
  const bottomRight = grid.getCell(point.add(BOTTOM_RIGHT))?.value ?? ''

  const topLeftToBottomRight = topLeft + bottomRight
  const topRightToBottomLeft = topRight + bottomLeft

  return (
    (topLeftToBottomRight === 'MS' || topLeftToBottomRight === 'SM') &&
    (topRightToBottomLeft === 'MS' || topRightToBottomLeft === 'SM')
  )
}

export const getResponse = (input: string[]): string => {
  const grid = parseGrid(input)
  const aCells = grid.getAllCellsOf('A')
  const xmasCount = count(aCells, (cell) => isXmasCross(grid, cell))

  return xmasCount.toString()
}
