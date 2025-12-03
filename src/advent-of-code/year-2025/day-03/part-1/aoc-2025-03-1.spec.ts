import Path from 'path'

import { readTestFile } from 'tests/test-files'

import { ACTIVABLE_BATTERIES, getMaxVoltage, getResponse } from './aoc-2025-03-1'

describe('aoc-2025-03-1', () => {
  describe('Sub methods tests', () => {
    describe('getMaxVoltage', () => {
      it('Should return 98 for 987654321111111', () => {
        expect(getMaxVoltage('987654321111111', ACTIVABLE_BATTERIES)).toBe(98)
      })

      it('Should return 89 for 811111111111119', () => {
        expect(getMaxVoltage('811111111111119', ACTIVABLE_BATTERIES)).toBe(89)
      })

      it('Should return 78 for 234234234234278', () => {
        expect(getMaxVoltage('234234234234278', ACTIVABLE_BATTERIES)).toBe(78)
      })

      it('Should return 92 for 818181911112111', () => {
        expect(getMaxVoltage('818181911112111', ACTIVABLE_BATTERIES)).toBe(92)
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
