import Path from 'path'

import { readTestFile } from 'tests/test-files'

import { getMaxVoltage } from '../part-1/aoc-2025-03-1'

import { ACTIVABLE_BATTERIES, getResponse } from './aoc-2025-03-2'

describe('aoc-2025-03-2', () => {
  describe('Sub methods tests', () => {
    describe('getMaxVoltage', () => {
      it('Should return 987654321111 for 987654321111111', () => {
        expect(getMaxVoltage('987654321111111', ACTIVABLE_BATTERIES)).toBe(987654321111)
      })

      it('Should return 811111111119 for 811111111111119', () => {
        expect(getMaxVoltage('811111111111119', ACTIVABLE_BATTERIES)).toBe(811111111119)
      })

      it('Should return 434234234278 for 234234234234278', () => {
        expect(getMaxVoltage('234234234234278', ACTIVABLE_BATTERIES)).toBe(434234234278)
      })

      it('Should return 888911112111 for 818181911112111', () => {
        expect(getMaxVoltage('818181911112111', ACTIVABLE_BATTERIES)).toBe(888911112111)
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
