import Path from 'path'

import { readTestFile } from 'tests/test-files'

import { getNextNumber, getResponse } from './aoc-2025-01-2'

describe('aoc-2025-01-2', () => {
  describe('Sub methods tests', () => {
    describe('getNextNumber', () => {
      it('Should return 65 for 45 + 20', () => {
        expect(getNextNumber({ value: 45, zeros: 0 }, 20)).toEqual({ value: 65, zeros: 0 })
      })

      it('Should return 55 for 86 - 31', () => {
        expect(getNextNumber({ value: 86, zeros: 0 }, -31)).toEqual({ value: 55, zeros: 0 })
      })

      it('Should return 0 for 14 - 14', () => {
        expect(getNextNumber({ value: 14, zeros: 0 }, -14)).toEqual({ value: 0, zeros: 1 })
      })

      it('Should return 0 for 99 + 1', () => {
        expect(getNextNumber({ value: 99, zeros: 0 }, 1)).toEqual({ value: 0, zeros: 1 })
      })

      it('Should return 99 for 0 - 1', () => {
        expect(getNextNumber({ value: 0, zeros: 0 }, -1)).toEqual({ value: 99, zeros: 0 })
      })

      it('Should return 5 for 90 + 15', () => {
        expect(getNextNumber({ value: 90, zeros: 0 }, 15)).toEqual({ value: 5, zeros: 1 })
      })

      it('Should return 5 for 90 + 15', () => {
        expect(getNextNumber({ value: 90, zeros: 0 }, 15)).toEqual({ value: 5, zeros: 1 })
      })

      it('Should return 94 for 10 - 16', () => {
        expect(getNextNumber({ value: 10, zeros: 0 }, -16)).toEqual({ value: 94, zeros: 1 })
      })

      it('Should return 10 for 50 + 260', () => {
        expect(getNextNumber({ value: 50, zeros: 0 }, 260)).toEqual({ value: 10, zeros: 3 })
      })

      it('Should return 90 for 50 - 260', () => {
        expect(getNextNumber({ value: 50, zeros: 0 }, -260)).toEqual({ value: 90, zeros: 3 })
      })

      it('Should return 0 for 0 + 100', () => {
        expect(getNextNumber({ value: 0, zeros: 0 }, 100)).toEqual({ value: 0, zeros: 1 })
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
