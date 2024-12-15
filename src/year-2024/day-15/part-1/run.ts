import Chalk from 'chalk'
import Path from 'path'

import { FixedGrid2D } from 'src/utils/fixed-grid-2d'
import { delay } from 'src/utils/promises'
import { readTestFile } from 'tests/test-files'

import { Direction, moveRobot, parseInput, Tile } from './2024-15-1'

const TILE_TO_COLOR: Record<Tile, Chalk.ChalkFunction> = {
  [Tile.EMPTY]: Chalk.dim,
  [Tile.WALL]: Chalk.white,
  [Tile.BOX]: Chalk.yellow,
  [Tile.ROBOT]: Chalk.blue,
}

const { input } = readTestFile(Path.join(__dirname, './test-01.txt'))

const { grid, instructions } = parseInput(input)

const colorGrid = (grid: FixedGrid2D<Tile>): string =>
  grid.toString((tile) => TILE_TO_COLOR[tile](tile))

const colorInstructions = (instructions: Direction[], iteration: number): string =>
  instructions
    .map((instruction, index) => (index === iteration ? Chalk.green(instruction) : instruction))
    .join('')

const display = (grid: FixedGrid2D<Tile>, iteration: number): void => {
  console.clear()
  console.log('Itération:', iteration)
  console.log(colorInstructions(instructions, iteration))
  console.log(colorGrid(grid))
}

const run = async (grid: FixedGrid2D<Tile>, instructions: Direction[]): Promise<void> => {
  let robot = grid.getAllCellsOf(Tile.ROBOT)[0]!.point

  for (let i = 0; i < instructions.length; i++) {
    robot = moveRobot(grid, robot, instructions[i]!)
    display(grid, i)
    await delay(100)
  }
}

run(grid, instructions)
