import Path from 'path'

import { readTestFile } from 'tests/test-files'

import { getResponse, isSafe, mapToDifferencesReport, parseInput, Report } from './aoc-2024-02-1'

describe('2024-02-1', () => {
  describe('Sub methods tests', () => {
    describe('parseInput', () => {
      it('Should parse input into reports.', () => {
        const input = [
          '3 6 7 9 11 8',
          '21 24 25 26 29 30 32 32',
          '29 32 33 34 35 37 38 42',
          '54 55 57 58 60 61 63 70',
          '59 61 60 63 65 68 71',
          '43 44 45 44 46 44',
        ]

        expect(parseInput(input)).toEqual([
          [3, 6, 7, 9, 11, 8],
          [21, 24, 25, 26, 29, 30, 32, 32],
          [29, 32, 33, 34, 35, 37, 38, 42],
          [54, 55, 57, 58, 60, 61, 63, 70],
          [59, 61, 60, 63, 65, 68, 71],
          [43, 44, 45, 44, 46, 44],
        ])
      })
    })

    describe('mapToDifferencesReport', () => {
      it('Should transform the report into a list of differences between numbers.', () => {
        const report: Report = [3, 6, 7, 9, 11, 8]

        expect(mapToDifferencesReport(report)).toEqual([3, 1, 2, 2, -3])
      })

      it('Should transform the report into a list of differences between numbers.', () => {
        const report: Report = [1, 3, 2, 4, 5]

        expect(mapToDifferencesReport(report)).toEqual([2, -1, 2, 1])
      })

      it('Should return an error when there is only one element.', () => {
        const report: Report = [3]

        expect(() => mapToDifferencesReport(report)).toThrowError('Report has only one element.')
      })

      it('Should return an error when the report is empty.', () => {
        const report: Report = []

        expect(() => mapToDifferencesReport(report)).toThrowError('Report is empty.')
      })
    })

    describe('isSafe', () => {
      it('Should return true.', () => {
        const report: Report = [7, 6, 4, 2, 1]

        expect(isSafe(report)).toBe(true)
      })

      it('Should return false.', () => {
        const report: Report = [1, 2, 7, 8, 9]

        expect(isSafe(report)).toBe(false)
      })

      it('Should return false.', () => {
        const report: Report = [1, 3, 2, 4, 5]

        expect(isSafe(report)).toBe(false)
      })

      it('Should return true.', () => {
        const report: Report = [1, 3, 6, 7, 9]

        expect(isSafe(report)).toBe(true)
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
