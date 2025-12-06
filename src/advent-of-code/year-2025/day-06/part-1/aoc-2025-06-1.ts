export enum Operation {
  ADD = '+',
  MULTIPLY = '*',
}

export type Problem = {
  values: number[]
  operation: Operation
}

export const parseInput = (input: string[]): Problem[] => {
  const linesAsArrays = input.map((line) => line.trim().replaceAll(/\s+/g, '/').trim().split('/'))

  const problems: Problem[] = []

  for (let i = 0; i < linesAsArrays[0]!.length; i++) {
    const operation = linesAsArrays[linesAsArrays.length - 1]![i]! as Operation
    const values = linesAsArrays.slice(0, -1).map((line) => parseInt(line[i]!, 10))
    problems.push({ values, operation })
  }

  return problems
}

export const computeProblem = (problem: Problem): number => {
  switch (problem.operation) {
    case Operation.ADD:
      return problem.values.reduce((acc, val) => acc + val, 0)
    case Operation.MULTIPLY:
      return problem.values.reduce((acc, val) => acc * val, 1)
    default:
      throw new Error(`Unknown operation: ${problem.operation}`)
  }
}

export const sumProblems = (problems: Problem[]): number => {
  return problems.reduce((sum, problem) => sum + computeProblem(problem), 0)
}

export const getResponse = (input: string[]): string => {
  const problems = parseInput(input)

  return sumProblems(problems).toString()
}
