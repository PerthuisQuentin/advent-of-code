import { Cell2D, FixedGrid2D } from './fixed-grid-2d'
import { Point2D } from './point-2d'

export const breadthFirstSearch = <T>(
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
