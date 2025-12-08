import Path from 'path'

import { readTestFile } from 'tests/test-files'

import { getResponse } from './aoc-2025-08-2'

describe('aoc-2025-08-2', () => {
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
