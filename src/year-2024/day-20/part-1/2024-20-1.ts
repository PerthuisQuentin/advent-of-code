import { Cell2D, FixedGrid2D } from 'src/utils/fixed-grid-2d'
import { parseInputToGrid } from 'src/utils/input'
import { backtrace, exploreByBreadthFirstSearch, getAccessibleCells } from 'src/utils/pathfinding'
import { Point2D } from 'src/utils/point-2d'

export enum Tile {
  Empty = '.',
  Wall = '#',
  Start = 'S',
  End = 'E',
}

export type Cheat = {
  start: Point2D
  end: Point2D
  distanceGain: number
}

export const parseInput = (
  input: string[],
): { grid: FixedGrid2D<Tile>; start: Point2D; end: Point2D } => {
  const grid = parseInputToGrid(input, (value) => value as Tile)
  const start = grid.find((cell) => cell.value === Tile.Start)!.point
  const end = grid.find((cell) => cell.value === Tile.End)!.point
  grid.setCell(new Cell2D({ ...start, value: Tile.Empty }))
  grid.setCell(new Cell2D({ ...end, value: Tile.Empty }))
  return { grid, start, end }
}

export const getCheatsOnPoint = (
  grid: FixedGrid2D<Tile>,
  point: Point2D,
  pathDistanceFromStart: Map<string, number>,
  cheatTime: number,
): Cheat[] => {
  const accessibleCellsWithoutCheats = getAccessibleCells(
    grid,
    (cell) => cell.value === Tile.Empty,
    point,
    cheatTime,
  )

  const accessibleCellsWithCheat = getAccessibleCells(
    grid,
    (cell) => cell.value === Tile.Empty || cell.value === Tile.Wall,
    point,
    cheatTime,
  )

  const cheats: Cheat[] = []

  Array.from(accessibleCellsWithCheat.keys()).forEach((cellHash) => {
    if (accessibleCellsWithoutCheats.has(cellHash)) return
    if (!pathDistanceFromStart.has(cellHash)) return

    const distanceGain =
      pathDistanceFromStart.get(cellHash)! -
      pathDistanceFromStart.get(point.hash)! -
      Point2D.fromHash(cellHash).getManhattanDistance(point)

    if (distanceGain < 1) return

    cheats.push({
      start: point,
      end: Point2D.fromHash(cellHash),
      distanceGain,
    })
  })

  return cheats
}

export const getCheats = (grid: FixedGrid2D<Tile>, path: Point2D[], cheatTime: number): Cheat[] => {
  const cheats: Cheat[] = []

  const pathDistanceFromStart = new Map<string, number>()
  path?.forEach((point, index) => pathDistanceFromStart.set(point.hash, index))

  path.forEach((point) => {
    cheats.push(...getCheatsOnPoint(grid, point, pathDistanceFromStart, cheatTime))
  })

  return cheats
}

export const getResponse = (input: string[]): string => {
  const { grid, start, end } = parseInput(input)

  const parentByHash = exploreByBreadthFirstSearch(
    grid,
    (cell) => cell.value === Tile.Empty,
    start,
    end,
  )

  const path = backtrace(parentByHash, start, end)
  if (!path) throw new Error('No path found')
  path.unshift(start)

  const cheats = getCheats(grid, path, 2)

  const atleast100GainCheats = cheats.filter((cheat) => cheat.distanceGain >= 100)

  return atleast100GainCheats.length.toString()
}
