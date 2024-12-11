import Path from 'path'

import { readTestFile } from 'tests/test-files'

import { getResponse } from './2024-10-2'

describe('2024-10-2', () => {
  describe('Sub methods tests', () => {})

  describe('Test files', () => {
    it('Test-01', () => {
      const { input, output } = readTestFile(Path.join(__dirname, './test-01.txt'))

      expect(getResponse(input)).toEqual(output)
    })

    it('Test-02', () => {
      const { input, output } = readTestFile(Path.join(__dirname, './test-02.txt'))

      expect(getResponse(input)).toEqual(output)
    })

    it('Test-03', () => {
      const { input, output } = readTestFile(Path.join(__dirname, './test-03.txt'))

      expect(getResponse(input)).toEqual(output)
    })

    it('Test-04', () => {
      const { input, output } = readTestFile(Path.join(__dirname, './test-04.txt'))

      expect(getResponse(input)).toEqual(output)
    })

    it('Test-final', () => {
      const { input, output } = readTestFile(Path.join(__dirname, './test-final.txt'))

      expect(getResponse(input)).toEqual(output)
    })
  })
})
