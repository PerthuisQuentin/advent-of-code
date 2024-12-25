import { sum } from 'src/utils/array'

export enum Operator {
  ADD = '+',
  MULTIPLY = '*',
}

export type Equation = {
  result: number
  numbers: number[]
}

export const parseInput = (input: string[]): Equation[] => {
  return input.map((line) => {
    const [left, right] = line.split(': ')

    return {
      result: Number(left),
      numbers: right!.split(' ').map(Number),
    }
  })
}

const sequencesMap: Map<number, Operator[][]> = new Map()

export const getOperatorSequences = (operatorAmount: number): Operator[][] => {
  if (sequencesMap.has(operatorAmount)) return sequencesMap.get(operatorAmount)!

  if (operatorAmount === 1) return [[Operator.ADD], [Operator.MULTIPLY]]

  const sequences: Operator[][] = []
  const innerSequences = getOperatorSequences(operatorAmount - 1)

  innerSequences.forEach((sequence) => {
    sequences.push([...sequence, Operator.ADD])
    sequences.push([...sequence, Operator.MULTIPLY])
  })

  sequencesMap.set(operatorAmount, sequences)
  return sequences
}

export const operateSequence = (numbers: number[], sequence: Operator[]): number => {
  let result = numbers[0]!

  for (let i = 1; i < numbers.length; i++) {
    if (sequence[i - 1] === Operator.ADD) {
      result += numbers[i]!
    } else {
      result *= numbers[i]!
    }
  }

  return result
}

export const isEquationPossible = (equation: Equation): boolean => {
  const sequences = getOperatorSequences(equation.numbers.length - 1)
  return sequences.some(
    (sequence) => operateSequence(equation.numbers, sequence) === equation.result,
  )
}

export const getResponse = (input: string[]): string => {
  const equations = parseInput(input)
  const possibleEquations = equations.filter(isEquationPossible)

  return sum(possibleEquations.map((equation) => equation.result)).toString()
}
