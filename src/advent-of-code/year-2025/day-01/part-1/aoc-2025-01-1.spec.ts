import Path from 'path'

import { readTestFile } from 'tests/test-files'

import { getNextNumber, getResponse, parseInput } from './aoc-2025-01-1'

describe('aoc-2025-01-1', () => {
  describe('Sub methods tests', () => {
    it('Should parse the input', () => {
      const input = ['L68', 'L30', 'R48', 'L5', 'R60', 'L55', 'L1', 'L99', 'R14', 'L82']

      expect(parseInput(input)).toEqual([-68, -30, 48, -5, 60, -55, -1, -99, 14, -82])
    })
  })

  describe('getNextNumber', () => {
    it('Should return 65 for 45 + 20', () => {
      expect(getNextNumber(45, 20)).toBe(65)
    })

    it('Should return 55 for 86 - 31', () => {
      expect(getNextNumber(86, -31)).toBe(55)
    })

    it('Should return 0 for 99 + 1', () => {
      expect(getNextNumber(99, 1)).toBe(0)
    })

    it('Should return 99 for 0 - 1', () => {
      expect(getNextNumber(0, -1)).toBe(99)
    })

    it('Should return 5 for 90 + 15', () => {
      expect(getNextNumber(90, 15)).toBe(5)
    })

    it('Should return 5 for 90 + 15', () => {
      expect(getNextNumber(90, 15)).toBe(5)
    })

    it('Should return 94 for 10 - 16', () => {
      expect(getNextNumber(10, -16)).toBe(94)
    })

    it('Should return 10 for 50 + 260', () => {
      expect(getNextNumber(50, 260)).toBe(10)
    })

    it('Should return 90 for 50 - 260', () => {
      expect(getNextNumber(50, -260)).toBe(90)
    })

    it('Should return 0 for 0 + 100', () => {
      expect(getNextNumber(0, 100)).toBe(0)
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
