import { Cell2D, FixedGrid2D } from 'src/utils/fixed-grid-2d'
import { parseInputToGrid } from 'src/utils/input'
import { Point2D } from 'src/utils/point-2d'

import { getAllAntennaCouples, getAllAntennasByType } from '../part-1/2024-08-1'

export const getAntiNodes = (
  grid: FixedGrid2D<string>,
  antenna1: Cell2D<string>,
  antenna2: Cell2D<string>,
): Point2D[] => {
  const vector = antenna1.subtract(antenna2)
  const result: Point2D[] = []

  let current = antenna1.clone()
  while (!grid.isOutsideBounds(current)) {
    result.push(current.clone())
    current = current.add(vector)
  }

  current = antenna2.clone()
  while (!grid.isOutsideBounds(current)) {
    result.push(current.clone())
    current = current.subtract(vector)
  }

  return result
}

export const countAntiNodes = (grid: FixedGrid2D<string>): number => {
  const antennasByType = getAllAntennasByType(grid)

  const antinodesSet = new Set<string>()

  antennasByType.forEach((antennas) => {
    if (antennas.length < 2) return

    const couples = getAllAntennaCouples(antennas)

    couples.forEach(([antenna1, antenna2]) => {
      const antinodes = getAntiNodes(grid, antenna1!, antenna2!)

      antinodes.forEach((antinode) => {
        if (!grid.isOutsideBounds(antinode)) antinodesSet.add(antinode.hash)
      })
    })
  })

  return antinodesSet.size
}

export const getResponse = (input: string[]): string => {
  const grid = parseInputToGrid(input)
  return countAntiNodes(grid).toString()
}
