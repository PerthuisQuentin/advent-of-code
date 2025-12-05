import Path from 'path'

import { Range } from 'src/utils/range'
import { readTestFile } from 'tests/test-files'

import { getResponse, parseInput } from './aoc-2025-05-1'

describe('aoc-2025-05-1', () => {
  describe('Sub methods tests', () => {
    describe('parseInput', () => {
      it('Should parse input into ranges and ids', () => {
        const input = ['3-5', '10-14', '16-20', '12-18', '', '1', '5', '8', '11', '17', '32']

        expect(parseInput(input)).toEqual({
          ranges: [new Range(3, 5), new Range(10, 14), new Range(16, 20), new Range(12, 18)],
          ids: [1, 5, 8, 11, 17, 32],
        })
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
