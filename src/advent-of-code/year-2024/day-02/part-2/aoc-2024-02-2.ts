import { count } from 'src/utils/array'

import { isSafe, parseInput, Report } from '../part-1/aoc-2024-02-1'

export const getAllPossibleReports = (report: Report): Report[] => {
  const reports: Report[] = []
  for (let i = 0; i < report.length; i++) {
    const newReport = [...report]
    newReport.splice(i, 1)
    reports.push(newReport)
  }
  return reports
}

export const isReallySafe = (report: Report): boolean => {
  return getAllPossibleReports(report).some(isSafe)
}

export const getResponse = (input: string[]): string => {
  const reports = parseInput(input)
  return count(reports, isReallySafe).toString()
}
