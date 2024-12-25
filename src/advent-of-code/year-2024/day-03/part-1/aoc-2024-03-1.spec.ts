import Path from 'path'

import { readTestFile } from 'tests/test-files'

import { getResponse, parseInput, runOperations } from './aoc-2024-03-1'

describe('2024-03-1', () => {
  describe('Sub methods tests', () => {
    describe('parseInput', () => {
      it('Should return the multipliy operations from the input', () => {
        const input = ['xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))']

        expect(parseInput(input)).toEqual([
          { a: 2, b: 4 },
          { a: 5, b: 5 },
          { a: 11, b: 8 },
          { a: 8, b: 5 },
        ])
      })

      it('Should return the multipliy operations from the input with multiple lines', () => {
        const input = [
          'xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))',
          '?% mul(948,148)why() %how(670,744)mul(590,32);where())#}from()>how()mul(611,372)}{~^?>from()^mul(835,665)',
        ]

        expect(parseInput(input)).toEqual([
          { a: 2, b: 4 },
          { a: 5, b: 5 },
          { a: 11, b: 8 },
          { a: 8, b: 5 },
          { a: 948, b: 148 },
          { a: 590, b: 32 },
          { a: 611, b: 372 },
          { a: 835, b: 665 },
        ])
      })
    })

    describe('runOperations', () => {
      it('Should return the correct result for the given operations', () => {
        const operations = [
          { a: 2, b: 4 },
          { a: 5, b: 5 },
          { a: 11, b: 8 },
          { a: 8, b: 5 },
        ]

        expect(runOperations(operations)).toEqual(161)
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
