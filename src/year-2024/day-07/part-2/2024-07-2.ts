import { sum } from 'src/utils/array'

import { Equation, parseInput } from '../part-1/2024-07-1'

export enum Operator {
  ADD = '+',
  MULTIPLY = '*',
  CONCAT = '||',
}

const sequencesMap: Map<number, Operator[][]> = new Map()

export const getOperatorSequences = (operatorAmount: number): Operator[][] => {
  if (sequencesMap.has(operatorAmount)) return sequencesMap.get(operatorAmount)!

  if (operatorAmount === 1) return [[Operator.ADD], [Operator.MULTIPLY], [Operator.CONCAT]]

  const sequences: Operator[][] = []
  const innerSequences = getOperatorSequences(operatorAmount - 1)

  innerSequences.forEach((sequence) => {
    sequences.push([...sequence, Operator.ADD])
    sequences.push([...sequence, Operator.MULTIPLY])
    sequences.push([...sequence, Operator.CONCAT])
  })

  sequencesMap.set(operatorAmount, sequences)
  return sequences
}

export const operateSequence = (numbers: number[], sequence: Operator[]): number => {
  let result = numbers[0]!

  for (let i = 1; i < numbers.length; i++) {
    const operator = sequence[i - 1]
    if (operator === Operator.ADD) {
      result += numbers[i]!
    } else if (operator === Operator.MULTIPLY) {
      result *= numbers[i]!
    } else {
      result = Number(result.toString() + numbers[i]!.toString())
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
