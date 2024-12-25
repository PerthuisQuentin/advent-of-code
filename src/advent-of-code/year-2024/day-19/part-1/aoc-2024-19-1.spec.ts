import Path from 'path'

import { readTestFile } from 'tests/test-files'

import { getResponse, parseInput } from './aoc-2024-19-1'

describe('2024-19-1', () => {
  describe('Sub methods tests', () => {
    describe('parseInput', () => {
      it('Should parse input to patterns and designs', () => {
        const input = [
          'r, wr, b, g, bwu, rb, gb, br',
          '',
          'brwrr',
          'bggr',
          'gbbr',
          'rrbgbr',
          'ubwu',
          'bwurrg',
          'brgr',
          'bbrgwb',
        ]

        expect(parseInput(input)).toEqual({
          patterns: ['r', 'wr', 'b', 'g', 'bwu', 'rb', 'gb', 'br'],
          designs: ['brwrr', 'bggr', 'gbbr', 'rrbgbr', 'ubwu', 'bwurrg', 'brgr', 'bbrgwb'],
        })
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
