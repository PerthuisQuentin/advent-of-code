import { backtrace, exploreByBreadthFirstSearch } from 'src/utils/pathfinding'

import { getCheats, parseInput, Tile } from '../part-1/2024-20-1'

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

  const cheats = getCheats(grid, path, 20)

  const atleast100GainCheats = cheats.filter((cheat) => cheat.distanceGain >= 100)

  return atleast100GainCheats.length.toString()
}
