import Path from 'path'

import { Cell2D, FixedGrid2D } from 'src/utils/fixed-grid-2d'
import { Point2D } from 'src/utils/point-2d'
import { readTestFile } from 'tests/test-files'

import { getAntiNodes, getResponse } from './2024-08-2'

describe('2024-08-2', () => {
  describe('Sub methods tests', () => {
    describe('getAntiNodes', () => {
      it('Should return correct antinodes', () => {
        const grid = new FixedGrid2D([
          ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
          ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
          ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
          ['.', '.', '.', 'A', '.', '.', '.', '.', '.', '.'],
          ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
          ['.', '.', '.', '.', 'A', '.', '.', '.', '.', '.'],
          ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
          ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
          ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
          ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
        ])

        const antenna1 = new Cell2D({ x: 3, y: 6, value: 'A' })
        const antenna2 = new Cell2D({ x: 4, y: 4, value: 'A' })

        expect(getAntiNodes(grid, antenna1, antenna2)).toEqual([
          new Point2D({ x: 3, y: 6 }),
          new Point2D({ x: 2, y: 8 }),
          new Point2D({ x: 4, y: 4 }),
          new Point2D({ x: 5, y: 2 }),
          new Point2D({ x: 6, y: 0 }),
        ])
      })
    })
  })

  describe('Test files', () => {
    it('Test-01', () => {
      const { input, output } = readTestFile(Path.join(__dirname, './test-01.txt'))

      expect(getResponse(input)).toEqual(output)
    })

    it('Test-02', () => {
      const { input, output } = readTestFile(Path.join(__dirname, './test-02.txt'))

      expect(getResponse(input)).toEqual(output)
    })

    it('Test-final', () => {
      const { input, output } = readTestFile(Path.join(__dirname, './test-final.txt'))

      expect(getResponse(input)).toEqual(output)
    })
  })
})
