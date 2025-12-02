import Path from 'path'

import { readTestFile } from 'tests/test-files'

import {
  getRangeInvalidIds,
  getResponse,
  hasRepeatingPattern,
  isInvalidId,
  parseInput,
} from './aoc-2025-02-1'

describe('aoc-2025-02-1', () => {
  describe('Sub methods tests', () => {
    describe('parseInput', () => {
      it('Should parse the input', () => {
        const input = '11-22,95-115,998-1012,1188511880-1188511890,222220-222224'

        expect(parseInput(input)).toEqual([
          { start: '11', end: '22' },
          { start: '95', end: '115' },
          { start: '998', end: '1012' },
          { start: '1188511880', end: '1188511890' },
          { start: '222220', end: '222224' },
        ])
      })
    })

    describe('hasRepeatingPattern', () => {
      it('Should return true for a pattern of length 2 on 1010', () => {
        expect(hasRepeatingPattern('1010', 2)).toBe(true)
      })

      it('Should return true for a pattern of length 1 on 22', () => {
        expect(hasRepeatingPattern('22', 1)).toBe(true)
      })

      it('Should return true for a pattern of length 5 on 1188511885', () => {
        expect(hasRepeatingPattern('1188511885', 5)).toBe(true)
      })

      it('Should return false for a pattern of length 2 on 10', () => {
        expect(hasRepeatingPattern('10', 2)).toBe(false)
      })

      it('Should return false for a pattern of length 3 on 1010', () => {
        expect(hasRepeatingPattern('1010', 3)).toBe(false)
      })

      it('Should return false for a pattern of length 1 on 123456', () => {
        expect(hasRepeatingPattern('123456', 1)).toBe(false)
      })

      it('Should return false for a pattern of length 2 on 121213', () => {
        expect(hasRepeatingPattern('121213', 2)).toBe(false)
      })
    })

    describe('isInvalidId', () => {
      it('Should return true for 1111', () => {
        expect(isInvalidId('1111')).toBe(true)
      })

      it('Should return true for 99', () => {
        expect(isInvalidId('99')).toBe(true)
      })

      it('Should return true for 1188511885', () => {
        expect(isInvalidId('1188511885')).toBe(true)
      })

      it('Should return true for 222222', () => {
        expect(isInvalidId('222222')).toBe(true)
      })

      it('Should return true for 446446', () => {
        expect(isInvalidId('446446')).toBe(true)
      })

      it('Should return true for 38593859', () => {
        expect(isInvalidId('38593859')).toBe(true)
      })

      it('Should return false for 112233', () => {
        expect(isInvalidId('112233')).toBe(false)
      })

      it('Should return false for 111112', () => {
        expect(isInvalidId('111112')).toBe(false)
      })

      it('Should return false for 12345', () => {
        expect(isInvalidId('12345')).toBe(false)
      })

      it('Should return false for 123123123', () => {
        expect(isInvalidId('123123123')).toBe(false)
      })
    })

    describe('getRangeInvalidIds', () => {
      it('Should return 11,22 for range 11-22', () => {
        expect(getRangeInvalidIds({ start: '11', end: '22' }, isInvalidId)).toEqual([11, 22])
      })

      it('Should return 1188511885 for range 1188511880-1188511890', () => {
        expect(getRangeInvalidIds({ start: '1188511880', end: '1188511890' }, isInvalidId)).toEqual(
          [1188511885],
        )
      })

      it('Should return 38593859 for range 38593856-38593862', () => {
        expect(getRangeInvalidIds({ start: '38593856', end: '38593862' }, isInvalidId)).toEqual([
          38593859,
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
