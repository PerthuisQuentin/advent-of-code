import { Cell2D, FixedGrid2D } from './fixed-grid-2d'
import { Point2D } from './point-2d'

export const exploreByBreadthFirstSearch = <T>(
  grid: FixedGrid2D<T>,
  isWalkable: (cell: Cell2D<T>) => boolean,
  start: Point2D,
  end?: Point2D,
): Map<string, Cell2D<T>> => {
  const startCell = grid.getCell(start)
  if (!startCell) throw new Error('Start cell not found')

  const queue: Cell2D<T>[] = [startCell]
  const parentByHash = new Map<string, Cell2D<T>>()
  const distanceByHash = new Map<string, number>()
  distanceByHash.set(start.hash, 0)

  while (queue.length > 0) {
    const current = queue.shift()!

    if (end && current.point.isSame(end)) {
      break
    }

    for (const neighbor of grid.getNeighbors(current)) {
      if (!isWalkable(neighbor)) {
        continue
      }

      if (parentByHash.has(neighbor.hash)) {
        continue
      }

      parentByHash.set(neighbor.hash, current)
      distanceByHash.set(neighbor.hash, distanceByHash.get(current.hash)! + 1)
      queue.push(neighbor)
    }
  }

  return parentByHash
}

export const backtrace = (
  parentByHash: Map<string, Point2D>,
  start: Point2D,
  end: Point2D,
): Point2D[] | null => {
  const path: Point2D[] = []
  let current = end
  while (!current.isSame(start)) {
    path.push(current)
    const next = parentByHash.get(current.hash)
    if (!next) return null
    current = next
  }
  return path.reverse()
}

export const getAccessibleCells = <T>(
  grid: FixedGrid2D<T>,
  isWalkable: (cell: Cell2D<T>) => boolean,
  start: Point2D,
  maxDistance: number,
): Map<string, number> => {
  const startCell = grid.getCell(start)
  if (!startCell) throw new Error('Start cell not found')

  let queue: Cell2D<T>[] = [startCell]
  let nextQueue: Cell2D<T>[] = []
  const accessibleCells = new Map<string, number>()
  accessibleCells.set(start.hash, 0)

  for (let step = 0; step < maxDistance; step++) {
    for (const current of queue) {
      for (const neighbor of grid.getNeighbors(current)) {
        if (!isWalkable(neighbor)) {
          continue
        }

        if (accessibleCells.has(neighbor.hash)) {
          continue
        }

        accessibleCells.set(neighbor.hash, step + 1)
        nextQueue.push(neighbor)
      }
    }

    queue = nextQueue
    nextQueue = []
  }

  return accessibleCells
}
