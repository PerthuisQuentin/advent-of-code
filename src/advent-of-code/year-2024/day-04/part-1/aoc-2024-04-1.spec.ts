import Path from 'path'

import { FixedGrid2D } from 'src/utils/fixed-grid-2d'
import { Point2D } from 'src/utils/point-2d'
import { readTestFile } from 'tests/test-files'

import { countXmasWordsFromAPoint, getResponse } from './aoc-2024-04-1'

describe('2024-04-1', () => {
  describe('Sub methods tests', () => {
    describe('countXmasWordsFromAPoint', () => {
      it('Should find 1 XMAS word from left to right', () => {
        const grid = new FixedGrid2D([
          ['X', 'X', 'X', 'X', 'X', 'X'],
          ['M', 'X', 'M', 'A', 'S', 'M'],
          ['A', 'A', 'A', 'A', 'A', 'A'],
        ])

        expect(countXmasWordsFromAPoint(grid, new Point2D({ x: 1, y: 1 }))).toBe(1)
      })

      it('Should find 1 XMAS word from right to left', () => {
        const grid = new FixedGrid2D([
          ['X', 'X', 'X', 'X', 'X', 'X'],
          ['M', 'S', 'A', 'M', 'X', 'M'],
          ['A', 'A', 'A', 'A', 'A', 'A'],
        ])

        expect(countXmasWordsFromAPoint(grid, new Point2D({ x: 4, y: 1 }))).toBe(1)
      })

      it('Should find 1 XMAS word from top to bottom', () => {
        const grid = new FixedGrid2D([
          ['X', 'M', 'A'],
          ['X', 'X', 'A'],
          ['X', 'M', 'A'],
          ['X', 'A', 'A'],
          ['X', 'S', 'A'],
          ['X', 'M', 'A'],
        ])

        expect(countXmasWordsFromAPoint(grid, new Point2D({ x: 1, y: 4 }))).toBe(1)
      })

      it('Should find 1 XMAS word from bottom to top', () => {
        const grid = new FixedGrid2D([
          ['X', 'M', 'A'],
          ['X', 'S', 'A'],
          ['X', 'A', 'A'],
          ['X', 'M', 'A'],
          ['X', 'X', 'A'],
          ['X', 'M', 'A'],
        ])

        expect(countXmasWordsFromAPoint(grid, new Point2D({ x: 1, y: 1 }))).toBe(1)
      })

      it('Should find 1 XMAS word from top-left to bottom-right', () => {
        const grid = new FixedGrid2D([
          ['X', 'M', 'A', 'A'],
          ['X', 'M', 'A', 'A'],
          ['X', 'M', 'A', 'A'],
          ['X', 'A', 'A', 'S'],
        ])

        expect(countXmasWordsFromAPoint(grid, new Point2D({ x: 0, y: 3 }))).toBe(1)
      })

      it('Should find 1 XMAS word from top-right to bottom-left', () => {
        const grid = new FixedGrid2D([
          ['A', 'A', 'M', 'X'],
          ['A', 'A', 'M', 'X'],
          ['A', 'A', 'M', 'X'],
          ['S', 'A', 'A', 'X'],
        ])

        expect(countXmasWordsFromAPoint(grid, new Point2D({ x: 3, y: 3 }))).toBe(1)
      })

      it('Should find 1 XMAS word from bottom-left to top-right', () => {
        const grid = new FixedGrid2D([
          ['X', 'A', 'A', 'S'],
          ['A', 'A', 'A', 'X'],
          ['A', 'M', 'M', 'X'],
          ['X', 'A', 'M', 'M'],
        ])

        expect(countXmasWordsFromAPoint(grid, new Point2D({ x: 0, y: 0 }))).toBe(1)
      })

      it('Should find 1 XMAS word from bottom-right to top-left', () => {
        const grid = new FixedGrid2D([
          ['S', 'A', 'A', 'X'],
          ['X', 'A', 'A', 'A'],
          ['X', 'M', 'M', 'A'],
          ['M', 'M', 'A', 'X'],
        ])

        expect(countXmasWordsFromAPoint(grid, new Point2D({ x: 3, y: 0 }))).toBe(1)
      })

      it('Should find 8 XMAS word in all directions', () => {
        const grid = new FixedGrid2D([
          ['S', '.', '.', 'S', '.', '.', 'S'],
          ['.', 'A', '.', 'A', '.', 'A', '.'],
          ['.', '.', 'M', 'M', 'M', '.', '.'],
          ['S', 'A', 'M', 'X', 'M', 'A', 'S'],
          ['.', '.', 'M', 'M', 'M', '.', '.'],
          ['.', 'A', '.', 'A', '.', 'A', '.'],
          ['S', '.', '.', 'S', '.', '.', 'S'],
        ])

        expect(countXmasWordsFromAPoint(grid, new Point2D({ x: 3, y: 3 }))).toBe(8)
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
