import Path from 'path'

import { readTestFile } from 'tests/test-files'

import { getResponse } from './2024-01-1'

describe('2024-01-1', () => {
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
