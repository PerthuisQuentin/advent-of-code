import { count } from 'src/utils/array'

export type Report = number[]

export const parseInput = (input: string[]): Report[] => {
  return input.map((line) => line.split(' ').map(Number))
}

export const mapToDifferencesReport = (report: Report): Report => {
  if (report.length === 0) throw new Error('Report is empty.')
  if (report.length === 1) throw new Error('Report has only one element.')

  const differences = []

  for (let i = 1; i < report.length; i++) {
    const difference = report[i]! - report[i - 1]!
    differences.push(difference)
  }

  return differences
}

export const isSafe = (report: Report): boolean => {
  const differences = mapToDifferencesReport(report)

  // Increasing by 1 or 3
  if (differences.every((difference) => 1 <= difference && difference <= 3)) return true

  // Descreasing by 1 or 3
  if (differences.every((difference) => -3 <= difference && difference <= -1)) return true

  return false
}

export const getResponse = (input: string[]): string => {
  const reports = parseInput(input)
  return count(reports, isSafe).toString()
}
