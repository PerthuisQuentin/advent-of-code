import Path from 'path'

import { readTestFile } from 'tests/test-files'

import { getResponse, isInvalidId } from './aoc-2025-02-2'

describe('aoc-2025-02-2', () => {
  describe('Sub methods tests', () => {
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

      it('Should return true for 123123123', () => {
        expect(isInvalidId('123123123')).toBe(true)
      })

      it('Should return true for 1212121212', () => {
        expect(isInvalidId('1212121212')).toBe(true)
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
