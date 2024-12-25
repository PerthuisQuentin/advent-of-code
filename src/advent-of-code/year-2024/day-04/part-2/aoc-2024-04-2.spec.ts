import Path from 'path'

import { FixedGrid2D } from 'src/utils/fixed-grid-2d'
import { Point2D } from 'src/utils/point-2d'
import { readTestFile } from 'tests/test-files'

import { getResponse, isXmasCross } from './aoc-2024-04-2'

describe('2024-04-2', () => {
  describe('Sub methods tests', () => {
    describe('isXmasCross', () => {
      it('Should find the X-MAS cross', () => {
        const grid = new FixedGrid2D([
          ['M', '.', 'M'],
          ['.', 'A', '.'],
          ['S', '.', 'S'],
        ])

        expect(isXmasCross(grid, new Point2D({ x: 1, y: 1 }))).toBe(true)
      })

      it('Should find the X-MAS cross', () => {
        const grid = new FixedGrid2D([
          ['M', '.', 'S'],
          ['.', 'A', '.'],
          ['M', '.', 'S'],
        ])

        expect(isXmasCross(grid, new Point2D({ x: 1, y: 1 }))).toBe(true)
      })

      it('Should not find an X-MAS cross', () => {
        const grid = new FixedGrid2D([
          ['S', '.', 'M'],
          ['.', 'A', '.'],
          ['M', '.', 'S'],
        ])

        expect(isXmasCross(grid, new Point2D({ x: 1, y: 1 }))).toBe(false)
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
