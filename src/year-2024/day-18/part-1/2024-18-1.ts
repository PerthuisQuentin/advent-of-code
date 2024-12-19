import { Cell2D, FixedGrid2D } from 'src/utils/fixed-grid-2d'
import { backtrace, breadthFirstSearch } from 'src/utils/pathfinding'
import { Point2D } from 'src/utils/point-2d'

export enum Tile {
  Empty = '.',
  Wall = '#',
  Path = '@',
}

export const parseInput = (
  input: string[],
): { grid: FixedGrid2D<Tile>; amount: number; walls: Point2D[] } => {
  const size = Number(input[0]) + 1
  const amount = Number(input[1])
  const grid = new FixedGrid2D<Tile>(new Point2D({ x: size, y: size }), Tile.Empty)
  const walls: Point2D[] = input.slice(2).map((line) => {
    const [x, y] = line.split(',').map(Number)
    return new Point2D({ x: x!, y: y! })
  })
  return { grid, amount, walls }
}

export const addWallsToGrid = (grid: FixedGrid2D<Tile>, walls: Point2D[]): void => {
  walls.forEach((wall) =>
    grid.setCell(new Cell2D({ x: wall.x, y: grid.maxY - wall.y, value: Tile.Wall })),
  )
}

export const getPathWithNthWalls = (
  grid: FixedGrid2D<Tile>,
  walls: Point2D[],
  wallAmount: number,
): Point2D[] | null => {
  const gridCopy = grid.clone()

  addWallsToGrid(gridCopy, walls.slice(0, wallAmount))

  const parentByHash = breadthFirstSearch(
    gridCopy,
    (cell) => cell.value === Tile.Empty,
    new Point2D({ x: 0, y: gridCopy.maxY }),
    new Point2D({ x: gridCopy.maxX, y: 0 }),
  )

  const path = backtrace(
    parentByHash,
    new Point2D({ x: 0, y: gridCopy.maxY }),
    new Point2D({ x: gridCopy.maxX, y: 0 }),
  )

  return path
}

export const getResponse = (input: string[]): string => {
  const { grid, amount, walls } = parseInput(input)

  const path = getPathWithNthWalls(grid, walls, amount)

  if (!path) throw new Error('No path found')

  path.forEach((point) => grid.setCell(new Cell2D({ x: point.x, y: point.y, value: Tile.Path })))

  return path.length.toString()
}
