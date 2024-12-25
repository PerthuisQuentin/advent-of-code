import { sum } from 'src/utils/array'
import { Cell2D, FixedGrid2D } from 'src/utils/fixed-grid-2d'
import { parseInputToGrid } from 'src/utils/input'

import { findRegions, Region } from '../part-1/2024-12-1'

export const countCornersAt = (grid: FixedGrid2D<string>, cell: Cell2D<string>): number => {
  return 0
}

export const getRegionCorners = (grid: FixedGrid2D<string>, region: Region): number => {
  console.log(region, grid)
  return 0
}

export const getRegionFencesPrice = (grid: FixedGrid2D<string>, region: Region): number => {
  const area = region.length
  const perimeter = getRegionCorners(grid, region)
  return area * perimeter
}

export const getResponse = (input: string[]): string => {
  const grid = parseInputToGrid(input)
  const regions = findRegions(grid)
  const fencesPrices = regions.map((region) => getRegionFencesPrice(grid, region))
  return sum(fencesPrices).toString()
}
