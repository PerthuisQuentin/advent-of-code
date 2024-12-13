import { split, sum } from 'src/utils/array'
import { isRound } from 'src/utils/math'

export type ClawMachine = {
  aX: number
  aY: number
  bX: number
  bY: number
  prizeX: number
  prizeY: number
}

const COORDINATES_REGEX = /X[+=](\d+), Y[+=](\d+)/

export const parseClawMachine = (input: string[]): ClawMachine => {
  const [, aX, aY] = COORDINATES_REGEX.exec(input[0]!)!
  const [, bX, bY] = COORDINATES_REGEX.exec(input[1]!)!
  const [, prizeX, prizeY] = COORDINATES_REGEX.exec(input[2]!)!

  return {
    aX: Number(aX),
    aY: Number(aY),
    bX: Number(bX),
    bY: Number(bY),
    prizeX: Number(prizeX),
    prizeY: Number(prizeY),
  }
}

export const parseClawMachines = (input: string[]): ClawMachine[] => {
  return split(input, '').map(parseClawMachine)
}

export type Equation = {
  a: number
  b: number
  r: number
}

export const solveLinearEquation = (
  equation1: Equation,
  equation2: Equation,
): { x: number; y: number } => {
  const y =
    (equation2.r * equation1.a - equation1.r * equation2.a) /
    (equation1.a * equation2.b - equation2.a * equation1.b)
  const x = (equation1.r - equation1.b * y) / equation1.a
  return { x, y }
}

export const getMinTokenForClawMachine = (clawMachine: ClawMachine): number | null => {
  const equation1: Equation = { a: clawMachine.aX, b: clawMachine.bX, r: clawMachine.prizeX }
  const equation2: Equation = { a: clawMachine.aY, b: clawMachine.bY, r: clawMachine.prizeY }
  const result = solveLinearEquation(equation1, equation2)

  if (!isRound(result.x) || !isRound(result.y)) return null

  return 3 * result.x + result.y
}

export const getResponse = (input: string[]): string => {
  const clawMachines = parseClawMachines(input)

  const tokens = clawMachines
    .map(getMinTokenForClawMachine)
    .filter((token): token is number => token !== null)

  return sum(tokens).toString()
}
