import Path from 'path'

import { readTestFile } from 'tests/test-files'

import { getResponse } from './aoc-2024-13-2'

describe('2024-13-2', () => {
  describe('Sub methods tests', () => {})

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
