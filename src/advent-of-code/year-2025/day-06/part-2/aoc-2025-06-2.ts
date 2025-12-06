import { Operation, Problem, sumProblems } from '../part-1/aoc-2025-06-1'

export const parseInput = (input: string[]): Problem[] => {
  let problemColumns: string[] = []
  const rawProblems: string[][] = []

  for (let i = input[0]!.length; i >= 0; i--) {
    const columnChars: string[] = []
    for (let y = 0; y < input.length; y++) {
      const char = input[y]![i] ?? ''
      columnChars.push(char)
    }

    const column = columnChars.join('').replaceAll(/\s+/g, '').trim()

    if (column === '') {
      if (problemColumns.length !== 0) rawProblems.push(problemColumns)
      problemColumns = []
    } else {
      problemColumns.push(column)
    }
  }

  rawProblems.push(problemColumns)

  const problems: Problem[] = []

  for (const rawProblem of rawProblems) {
    const operation = rawProblem[rawProblem.length - 1]!.slice(-1) as Operation
    rawProblem[rawProblem.length - 1]! = rawProblem[rawProblem.length - 1]!.slice(0, -1)

    problems.push({
      values: rawProblem.map((str) => parseInt(str, 10)),
      operation,
    })
  }

  return problems
}

export const getResponse = (input: string[]): string => {
  const problems = parseInput(input)

  return sumProblems(problems).toString()
}
