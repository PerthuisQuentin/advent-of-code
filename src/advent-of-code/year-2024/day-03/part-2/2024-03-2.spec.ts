import Path from 'path'

import { readTestFile } from 'tests/test-files'

import { determineOperation, getResponse, OperationType, parseInput } from './2024-03-2'

describe('2024-03-2', () => {
  describe('Sub methods tests', () => {
    describe('determineOperation', () => {
      it('Should return the correct operation for a multiply operation', () => {
        const operation = 'mul(2,4)'

        expect(determineOperation(operation)).toEqual({
          type: OperationType.Multiply,
          payload: { a: 2, b: 4 },
        })
      })

      it('Should return the correct operation for a do operation', () => {
        const operation = 'do()'

        expect(determineOperation(operation)).toEqual({
          type: OperationType.Do,
          payload: null,
        })
      })

      it('Should return the correct operation for a do not operation', () => {
        const operation = "don't()"

        expect(determineOperation(operation)).toEqual({
          type: OperationType.DoNot,
          payload: null,
        })
      })
    })

    describe('parseInput', () => {
      it('Should return the multipliy operations from the input', () => {
        const input = ["xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))"]

        expect(parseInput(input)).toEqual([
          { type: OperationType.Multiply, payload: { a: 2, b: 4 } },
          { type: OperationType.DoNot, payload: null },
          { type: OperationType.Multiply, payload: { a: 5, b: 5 } },
          { type: OperationType.Multiply, payload: { a: 11, b: 8 } },
          { type: OperationType.Do, payload: null },
          { type: OperationType.Multiply, payload: { a: 8, b: 5 } },
        ])
      })

      it('Should return the multipliy operations from the input with multiple lines', () => {
        const input = [
          "xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))",
          '?% mul(948,148)why() %how(670,744)mul(590,32);where())#}from()>how()mul(611,372)}{~^?>from()^mul(835,665)',
        ]

        expect(parseInput(input)).toEqual([
          { type: OperationType.Multiply, payload: { a: 2, b: 4 } },
          { type: OperationType.DoNot, payload: null },
          { type: OperationType.Multiply, payload: { a: 5, b: 5 } },
          { type: OperationType.Multiply, payload: { a: 11, b: 8 } },
          { type: OperationType.Do, payload: null },
          { type: OperationType.Multiply, payload: { a: 8, b: 5 } },
          { type: OperationType.Multiply, payload: { a: 948, b: 148 } },
          { type: OperationType.Multiply, payload: { a: 590, b: 32 } },
          { type: OperationType.Multiply, payload: { a: 611, b: 372 } },
          { type: OperationType.Multiply, payload: { a: 835, b: 665 } },
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
