import Path from 'path'

import { FixedGrid2D } from 'src/utils/fixed-grid-2d'
import { Point2D } from 'src/utils/point-2d'
import { readTestFile } from 'tests/test-files'

import { addWallsToGrid, getResponse, parseInput, Tile } from './2024-18-1'

describe('2024-18-1', () => {
  describe('Sub methods tests', () => {
    describe('parseInput', () => {
      it('Should parse the modified input with size and walls', () => {
        const input = ['3', '12', '5,4', '4,2', '4,5', '3,0', '2,1', '1,3', '0,4']

        expect(parseInput(input)).toEqual({
          grid: new FixedGrid2D<Tile>(new Point2D({ x: 4, y: 4 }), Tile.Empty),
          amount: 12,
          walls: [
            new Point2D({ x: 5, y: 4 }),
            new Point2D({ x: 4, y: 2 }),
            new Point2D({ x: 4, y: 5 }),
            new Point2D({ x: 3, y: 0 }),
            new Point2D({ x: 2, y: 1 }),
            new Point2D({ x: 1, y: 3 }),
            new Point2D({ x: 0, y: 4 }),
          ],
        })
      })
    })

    describe('addWallsToGrid', () => {
      it('Should add the given walls to the grid', () => {
        const grid = new FixedGrid2D<Tile>(new Point2D({ x: 7, y: 7 }), Tile.Empty)
        const walls = [
          new Point2D({ x: 5, y: 4 }),
          new Point2D({ x: 4, y: 2 }),
          new Point2D({ x: 4, y: 5 }),
          new Point2D({ x: 3, y: 0 }),
          new Point2D({ x: 2, y: 1 }),
          new Point2D({ x: 6, y: 3 }),
          new Point2D({ x: 2, y: 4 }),
          new Point2D({ x: 1, y: 5 }),
          new Point2D({ x: 0, y: 6 }),
          new Point2D({ x: 3, y: 3 }),
          new Point2D({ x: 2, y: 6 }),
          new Point2D({ x: 5, y: 1 }),
        ]

        addWallsToGrid(grid, walls)

        expect(grid.toArray()).toEqual([
          ['.', '.', '.', '#', '.', '.', '.'],
          ['.', '.', '#', '.', '.', '#', '.'],
          ['.', '.', '.', '.', '#', '.', '.'],
          ['.', '.', '.', '#', '.', '.', '#'],
          ['.', '.', '#', '.', '.', '#', '.'],
          ['.', '#', '.', '.', '#', '.', '.'],
          ['#', '.', '#', '.', '.', '.', '.'],
        ])
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
