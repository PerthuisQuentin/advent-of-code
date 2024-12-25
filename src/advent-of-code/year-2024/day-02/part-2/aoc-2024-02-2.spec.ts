import Path from 'path'

import { readTestFile } from 'tests/test-files'

import { Report } from '../part-1/aoc-2024-02-1'

import { getAllPossibleReports, getResponse, isReallySafe } from './aoc-2024-02-2'

describe('2024-02-2', () => {
  describe('Sub methods tests', () => {
    describe('getAllPossibleReports', () => {
      it('Should generate all alternative of the original report with a number removed.', () => {
        const report = [1, 2, 3, 4]

        expect(getAllPossibleReports(report)).toEqual([
          [2, 3, 4],
          [1, 3, 4],
          [1, 2, 4],
          [1, 2, 3],
        ])
      })
    })

    describe('isReallySafe', () => {
      it('Should return true.', () => {
        const report: Report = [7, 6, 4, 2, 1]

        expect(isReallySafe(report)).toBe(true)
      })

      it('Should return false.', () => {
        const report: Report = [1, 2, 7, 8, 9]

        expect(isReallySafe(report)).toBe(false)
      })

      it('Should return true.', () => {
        const report: Report = [8, 6, 4, 4, 1]

        expect(isReallySafe(report)).toBe(true)
      })
    })
  })

  describe('Test files', () => {
    it('Test-01', () => {
      const { input, output } = readTestFile(Path.join(__dirname, './test-01.txt'))

      expect(getResponse(input)).toEqual(output)
    })

    it('Test-final', () => {
      const { input, output } = readTestFile(Path.join(__dirname, './test-final.txt'))

      expect(getResponse(input)).toEqual(output)
    })
  })
})
