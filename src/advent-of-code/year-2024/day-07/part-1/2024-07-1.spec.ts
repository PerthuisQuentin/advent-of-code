import Path from 'path'

import { readTestFile } from 'tests/test-files'

import {
  getOperatorSequences,
  getResponse,
  isEquationPossible,
  operateSequence,
  Operator,
  parseInput,
} from './2024-07-1'

describe('2024-07-1', () => {
  describe('Sub methods tests', () => {
    describe('parseInput', () => {
      it('Should parse input into equations', () => {
        const input = ['7290: 6 8 6 15', '192: 17 8 14', '190: 10 19']

        expect(parseInput(input)).toEqual([
          {
            result: 7290,
            numbers: [6, 8, 6, 15],
          },
          {
            result: 192,
            numbers: [17, 8, 14],
          },
          {
            result: 190,
            numbers: [10, 19],
          },
        ])
      })
    })

    describe('getOperatorSequences', () => {
      it('Should return operator sequences for length 1', () => {
        expect(getOperatorSequences(1)).toEqual([[Operator.ADD], [Operator.MULTIPLY]])
      })

      it('Should return operator sequences for length 2', () => {
        expect(getOperatorSequences(2)).toEqual([
          [Operator.ADD, Operator.ADD],
          [Operator.ADD, Operator.MULTIPLY],
          [Operator.MULTIPLY, Operator.ADD],
          [Operator.MULTIPLY, Operator.MULTIPLY],
        ])
      })

      it('Should return operator sequences for length 3', () => {
        expect(getOperatorSequences(3)).toEqual([
          [Operator.ADD, Operator.ADD, Operator.ADD],
          [Operator.ADD, Operator.ADD, Operator.MULTIPLY],
          [Operator.ADD, Operator.MULTIPLY, Operator.ADD],
          [Operator.ADD, Operator.MULTIPLY, Operator.MULTIPLY],
          [Operator.MULTIPLY, Operator.ADD, Operator.ADD],
          [Operator.MULTIPLY, Operator.ADD, Operator.MULTIPLY],
          [Operator.MULTIPLY, Operator.MULTIPLY, Operator.ADD],
          [Operator.MULTIPLY, Operator.MULTIPLY, Operator.MULTIPLY],
        ])
      })

      it('Should return 16 operator sequences for length 4', () => {
        expect(getOperatorSequences(4).length).toBe(16)
      })

      it('Should return 32 operator sequences for length 5', () => {
        expect(getOperatorSequences(5).length).toBe(32)
      })
    })

    describe('operateSequence', () => {
      it('Should return 190 for 10 * 19', () => {
        expect(operateSequence([10, 19], [Operator.MULTIPLY])).toBe(190)
      })

      it('Should return 3267 for 81 + 40 * 27', () => {
        expect(operateSequence([81, 40, 27], [Operator.ADD, Operator.MULTIPLY])).toBe(3267)
      })

      it('Should return 21 for 9 + 12', () => {
        expect(operateSequence([9, 12], [Operator.ADD])).toBe(21)
      })

      it('Should return 292 for 11 + 6 * 16 + 20', () => {
        expect(
          operateSequence([11, 6, 16, 20], [Operator.ADD, Operator.MULTIPLY, Operator.ADD]),
        ).toBe(292)
      })
    })

    describe('isEquationPossible', () => {
      it('Should return true for 190: 10 19', () => {
        expect(
          isEquationPossible({
            result: 190,
            numbers: [10, 19],
          }),
        ).toBe(true)
      })

      it('Should return true for 3267: 81 40 27', () => {
        expect(
          isEquationPossible({
            result: 3267,
            numbers: [81, 40, 27],
          }),
        ).toBe(true)
      })

      it('Should return false for 7290: 6 8 6 15', () => {
        expect(
          isEquationPossible({
            result: 7290,
            numbers: [6, 8, 6, 15],
          }),
        ).toBe(false)
      })

      it('Should return false for 192: 17 8 14', () => {
        expect(
          isEquationPossible({
            result: 192,
            numbers: [17, 8, 14],
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
