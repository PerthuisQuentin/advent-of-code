import Path from 'path'

import { readTestFile } from 'tests/test-files'

import {
  getOperatorSequences,
  getResponse,
  isEquationPossible,
  operateSequence,
  Operator,
} from './aoc-2024-07-2'

describe('2024-07-2', () => {
  describe('Sub methods tests', () => {
    describe('getOperatorSequences', () => {
      it('Should return operator sequences for length 1', () => {
        expect(getOperatorSequences(1)).toEqual([
          [Operator.ADD],
          [Operator.MULTIPLY],
          [Operator.CONCAT],
        ])
      })

      it('Should return operator sequences for length 2', () => {
        expect(getOperatorSequences(2)).toEqual([
          [Operator.ADD, Operator.ADD],
          [Operator.ADD, Operator.MULTIPLY],
          [Operator.ADD, Operator.CONCAT],
          [Operator.MULTIPLY, Operator.ADD],
          [Operator.MULTIPLY, Operator.MULTIPLY],
          [Operator.MULTIPLY, Operator.CONCAT],
          [Operator.CONCAT, Operator.ADD],
          [Operator.CONCAT, Operator.MULTIPLY],
          [Operator.CONCAT, Operator.CONCAT],
        ])
      })

      it('Should return 27 operator sequences for length 3', () => {
        expect(getOperatorSequences(3).length).toBe(27)
      })

      it('Should return 81 operator sequences for length 4', () => {
        expect(getOperatorSequences(4).length).toBe(81)
      })
    })

    describe('operateSequence', () => {
      it('Should return 7290 for 6 * 8 || 6 * 15', () => {
        expect(
          operateSequence([6, 8, 6, 15], [Operator.MULTIPLY, Operator.CONCAT, Operator.MULTIPLY]),
        ).toBe(7290)
      })

      it('Should return 192 for 17 || 8 + 14', () => {
        expect(operateSequence([17, 8, 14], [Operator.CONCAT, Operator.ADD])).toBe(192)
      })
    })

    describe('isEquationPossible', () => {
      it('Should return true for 7290: 6 8 6 15', () => {
        expect(
          isEquationPossible({
            result: 7290,
            numbers: [6, 8, 6, 15],
          }),
        ).toBe(true)
      })

      it('Should return false for 161011: 16 10 13', () => {
        expect(
          isEquationPossible({
            result: 161011,
            numbers: [16, 10, 13],
          }),
        ).toBe(false)
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
