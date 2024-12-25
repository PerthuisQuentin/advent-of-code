import { Cell2D, FixedGrid2D } from 'src/utils/fixed-grid-2d'
import { parseInputToGrid } from 'src/utils/input'
import { Point2D } from 'src/utils/point-2d'

const EMPTY = '.'

export const getAllAntennasByType = (grid: FixedGrid2D<string>): Map<string, Cell2D<string>[]> => {
  const antennasByType = new Map<string, Cell2D<string>[]>()

  grid.forEach((cell) => {
    if (cell.value === EMPTY) return

    if (!antennasByType.has(cell.value)) antennasByType.set(cell.value, [])

    antennasByType.get(cell.value)!.push(cell)
  })

  return antennasByType
}

export const getAntiNodes = (
  antenna1: Cell2D<string>,
  antenna2: Cell2D<string>,
): { antinode1: Point2D; antinode2: Point2D } => {
  const antinode1 = antenna1.getMirroredPoint(antenna2)
  const antinode2 = antenna2.getMirroredPoint(antenna1)

  return { antinode1, antinode2 }
}

export const getAllAntennaCouples = (antennas: Cell2D<string>[]): Cell2D<string>[][] => {
  const couples: Cell2D<string>[][] = []

  for (let i = 0; i < antennas.length; i++) {
    for (let j = i + 1; j < antennas.length; j++) {
      couples.push([antennas[i]!, antennas[j]!])
    }
  }

  return couples
}

export const countAntiNodes = (grid: FixedGrid2D<string>): number => {
  const antennasByType = getAllAntennasByType(grid)

  const antinodes = new Set<string>()

  antennasByType.forEach((antennas) => {
    if (antennas.length < 2) return

    const couples = getAllAntennaCouples(antennas)

    couples.forEach(([antenna1, antenna2]) => {
      const { antinode1, antinode2 } = getAntiNodes(antenna1!, antenna2!)

      if (!grid.isOutsideBounds(antinode1)) antinodes.add(antinode1.hash)
      if (!grid.isOutsideBounds(antinode2)) antinodes.add(antinode2.hash)
    })
  })

  return antinodes.size
}

export const getResponse = (input: string[]): string => {
  const grid = parseInputToGrid(input)
  return countAntiNodes(grid).toString()
}
