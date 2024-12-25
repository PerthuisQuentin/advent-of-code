import Chalk from 'chalk'
import Path from 'path'

import { Cell2D, FixedGrid2D } from 'src/utils/fixed-grid-2d'
import { delay } from 'src/utils/promises'
import { readTestFile } from 'tests/test-files'

import { moveRobots, parseInput, Robot } from '../part-1/aoc-2024-14-1'

const { input } = readTestFile(Path.join(__dirname, './test-final.txt'))

const { size, robots } = parseInput(input)

const showRobots = (robots: Robot[]): void => {
  const grid = new FixedGrid2D<string>(size, '.')
  robots.forEach((robot) => {
    grid.setCell(new Cell2D({ x: robot.position.x, y: robot.position.y, value: 'X' }))
  })
  console.log(
    grid
      .toString()
      .replaceAll('X', Chalk.green('X'))
      .replaceAll('.', Chalk.dim('.'))
      .split('\n')
      .reverse()
      .join('\n'),
  )
}

export const run = async (
  startIteration: number,
  stepByIteration: number,
  maxIreation: number,
  delayValue: number = 200,
): Promise<void> => {
  const startAt = startIteration
  let robotsMoved = moveRobots(size, robots, startAt)
  let i = startAt

  while (i <= maxIreation) {
    showRobots(robotsMoved)
    console.log(`Iteration ${i}`)
    robotsMoved = moveRobots(size, robotsMoved, stepByIteration)
    i += stepByIteration
    await delay(delayValue)
  }
}

// Robots seems to regroup every 101 iterations from the 86th iteration
// run(86, 101, 100000, 200)

// Found it !
showRobots(moveRobots(size, robots, 6752))

// tsx ./src/year-2024/day-14/part-2/2024-14-2.ts
