import Path from 'path'

import { readTestFile } from 'tests/test-files'

import { getResponse, parseInput } from './aoc-2025-06-2'

describe('aoc-2025-06-2', () => {
  describe('Sub methods tests', () => {
    describe('parseInput', () => {
      it('Should parse input as a problem list', () => {
        const input = ['123 328  51 64', ' 45 64  387 23', '  6 98  215 314', '*   +   *   +  ']

        expect(parseInput(input)).toEqual([
          { values: [4, 431, 623], operation: '+' },
          { values: [175, 581, 32], operation: '*' },
          { values: [8, 248, 369], operation: '+' },
          { values: [356, 24, 1], operation: '*' },
        ])
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
