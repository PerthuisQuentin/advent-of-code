import Chalk from 'chalk'
import Path from 'path'

import { FixedGrid2D } from 'src/utils/fixed-grid-2d'
import { delay } from 'src/utils/promises'
import { readTestFile } from 'tests/test-files'

import { Direction } from '../part-1/aoc-2024-15-1'

import { moveRobot, parseInput, Tile } from './aoc-2024-15-2'

const TILE_TO_COLOR: Record<Tile, Chalk.ChalkFunction> = {
  [Tile.EMPTY]: Chalk.dim,
  [Tile.WALL]: Chalk.white,
  [Tile.BOX]: Chalk.yellow,
  [Tile.BOX_L]: Chalk.yellow,
  [Tile.BOX_R]: Chalk.yellow,
  [Tile.ROBOT]: Chalk.blue,
}

const { input } = readTestFile(Path.join(__dirname, './test-02.txt'))

const { grid, instructions } = parseInput(input)

const colorGrid = (grid: FixedGrid2D<Tile>): string =>
  grid.toString((tile) => TILE_TO_COLOR[tile](tile))

const colorAndPadInstructions = (instructions: Direction[], iteration: number): string =>
  instructions
    .map((instruction, index) => (index === iteration ? Chalk.green(instruction) : instruction))
    .join('')
    .slice(Math.max(0, iteration - 5), Math.min(iteration + 15, instructions.length))

const display = (grid: FixedGrid2D<Tile>, iteration: number): void => {
  console.clear()
  console.log('Itération:', iteration)
  console.log(colorAndPadInstructions(instructions, iteration))
  console.log(colorGrid(grid))
}

const run = async (grid: FixedGrid2D<Tile>, instructions: Direction[]): Promise<void> => {
  let robot = grid.getAllCellsOf(Tile.ROBOT)[0]!.point

  for (let i = 0; i < instructions.length; i++) {
    robot = moveRobot(grid, robot, instructions[i]!)
    display(grid, i)
    await delay(50)
  }
}

run(grid, instructions)
