import { findIndexByDichotomy } from 'src/utils/dichotomy'

import { getPathWithNthWalls, parseInput } from '../part-1/aoc-2024-18-1'

export const getResponse = (input: string[]): string => {
  const { grid, walls } = parseInput(input)

  const firstBlockedIndex = findIndexByDichotomy(walls, (_, index) => {
    return !getPathWithNthWalls(grid, walls, index)
  })

  const wall = walls[firstBlockedIndex - 1]!

  return `${wall.x},${wall.y}`
}
