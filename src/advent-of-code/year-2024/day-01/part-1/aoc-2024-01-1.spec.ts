import Path from 'path'

import { readTestFile } from 'tests/test-files'

import { findSmallest, getResponse, parseInput } from './aoc-2024-01-1'

describe('2024-01-1', () => {
  describe('Sub methods tests', () => {
    it('Should parse the input', () => {
      const input = [
        '3   4',
        '4   3',
        '2   5',
        '1   3',
        '3   9',
        '3   3',
        '4   2',
        '4   5',
        '5   6',
      ]

      expect(parseInput(input)).toEqual({
        list1: [3, 4, 2, 1, 3, 3, 4, 4, 5],
        list2: [4, 3, 5, 3, 9, 3, 2, 5, 6],
      })
    })

    it('Should find smallest and his index', () => {
      const list = [3, 4, 2, 1, 3, 3, 1, 4, 5]

      expect(findSmallest(list)).toEqual({ value: 1, index: 3 })
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
