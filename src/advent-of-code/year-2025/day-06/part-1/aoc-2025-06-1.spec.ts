import Path from 'path'

import { readTestFile } from 'tests/test-files'

import { computeProblem, getResponse, Operation, parseInput } from './aoc-2025-06-1'

describe('aoc-2025-06-1', () => {
  describe('Sub methods tests', () => {
    describe('parseInput', () => {
      it('Should parse input as a problem list', () => {
        const input = ['123 328  51 64', ' 45 64  387 23', '  6 98  215 314', '*   +   *   +  ']

        expect(parseInput(input)).toEqual([
          { values: [123, 45, 6], operation: '*' },
          { values: [328, 64, 98], operation: '+' },
          { values: [51, 387, 215], operation: '*' },
          { values: [64, 23, 314], operation: '+' },
        ])
      })
    })

    describe('computeProblem', () => {
      it('Should add values when operation is ADD', () => {
        const problem = { values: [328, 64, 98], operation: Operation.ADD }

        expect(computeProblem(problem)).toBe(490)
      })

      it('Should multiply values when operation is MULTIPLY', () => {
        const problem = { values: [123, 45, 6], operation: Operation.MULTIPLY }

        expect(computeProblem(problem)).toBe(33210)
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
