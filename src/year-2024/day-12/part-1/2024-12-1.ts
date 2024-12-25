import { sum } from 'src/utils/array'
import { Cell2D, FixedGrid2D } from 'src/utils/fixed-grid-2d'
import { parseInputToGrid } from 'src/utils/input'

export type Region = Cell2D<string>[]

export const getCompleteRegion = (
  grid: FixedGrid2D<string>,
  cell: Cell2D<string>,
  seen: Set<string>,
): Region => {
  const region: Region = [cell]
  const toVisit = [cell]

  while (toVisit.length) {
    const current = toVisit.pop()!

    for (const neighbor of grid.getNeighbors(current)) {
      if (seen.has(neighbor.hash)) continue

      if (neighbor.value === current.value) {
        seen.add(neighbor.hash)
        region.push(neighbor)
        toVisit.push(neighbor)
      }
    }
  }

  return region
}

export const findRegions = (grid: FixedGrid2D<string>): Region[] => {
  const seen = new Set<string>()
  const regions: Region[] = []

  grid.forEach((cell) => {
    if (seen.has(cell.hash)) return
    seen.add(cell.hash)

    const region = getCompleteRegion(grid, cell, seen)
    regions.push(region)
  })

  return regions
}

export const getRegionPerimeter = (grid: FixedGrid2D<string>, region: Region): number => {
  let perimeter = 0

  region.forEach((cell) => {
    const neighbors = grid.getNeighbors(cell).filter((neighbor) => neighbor.value === cell.value)
    perimeter += 4 - neighbors.length
  })

  return perimeter
}

export const getRegionFencesPrice = (grid: FixedGrid2D<string>, region: Region): number => {
  const area = region.length
  const perimeter = getRegionPerimeter(grid, region)
  return area * perimeter
}

export const getResponse = (input: string[]): string => {
  const grid = parseInputToGrid(input)
  const regions = findRegions(grid)
  const fencesPrices = regions.map((region) => getRegionFencesPrice(grid, region))
  return sum(fencesPrices).toString()
}
