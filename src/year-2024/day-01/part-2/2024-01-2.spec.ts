import Path from 'path'

import { readTestFile } from 'tests/test-files'

import { getOccurrences, getResponse } from './2024-01-2'

describe('2024-01-2', () => {
  describe('Sub methods tests', () => {
    it('Should return occurences of number in the list', () => {
      const list = [3, 4, 2, 1, 3, 3, 1, 4, 5]

      expect(getOccurrences(list)).toEqual(
        new Map([
          [3, 3],
          [4, 2],
          [2, 1],
          [1, 2],
          [5, 1],
        ]),
      )
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
