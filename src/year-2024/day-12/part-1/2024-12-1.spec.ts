import Path from 'path'

import { Cell2D, FixedGrid2D } from 'src/utils/fixed-grid-2d'
import { readTestFile } from 'tests/test-files'

import { findRegions, getRegionFencesPrice, getResponse } from './2024-12-1'

describe('2024-12-1', () => {
  describe('Sub methods tests', () => {
    describe('findRegions', () => {
      it('Should return the regions of the given grid', () => {
        const grid = new FixedGrid2D([
          ['A', 'A', 'A', 'A'],
          ['B', 'B', 'C', 'D'],
          ['B', 'B', 'C', 'C'],
          ['E', 'E', 'E', 'C'],
        ])

        expect(findRegions(grid)).toEqual([
          [
            new Cell2D({ x: 0, y: 3, value: 'A' }),
            new Cell2D({ x: 1, y: 3, value: 'A' }),
            new Cell2D({ x: 2, y: 3, value: 'A' }),
            new Cell2D({ x: 3, y: 3, value: 'A' }),
          ],
          [
            new Cell2D({ x: 0, y: 2, value: 'B' }),
            new Cell2D({ x: 0, y: 1, value: 'B' }),
            new Cell2D({ x: 1, y: 2, value: 'B' }),
            new Cell2D({ x: 1, y: 1, value: 'B' }),
          ],
          [
            new Cell2D({ x: 2, y: 2, value: 'C' }),
            new Cell2D({ x: 2, y: 1, value: 'C' }),
            new Cell2D({ x: 3, y: 1, value: 'C' }),
            new Cell2D({ x: 3, y: 0, value: 'C' }),
          ],
          [new Cell2D({ x: 3, y: 2, value: 'D' })],
          [
            new Cell2D({ x: 0, y: 0, value: 'E' }),
            new Cell2D({ x: 1, y: 0, value: 'E' }),
            new Cell2D({ x: 2, y: 0, value: 'E' }),
          ],
        ])
      })

      it('Should return the regions of the given grid', () => {
        const grid = new FixedGrid2D([
          ['O', 'O', 'O', 'O', 'O'],
          ['O', 'X', 'O', 'X', 'O'],
          ['O', 'O', 'O', 'O', 'O'],
          ['O', 'X', 'O', 'X', 'O'],
          ['O', 'O', 'O', 'O', 'O'],
        ])

        expect(findRegions(grid)).toEqual([
          [
            new Cell2D({ x: 0, y: 4, value: 'O' }),
            new Cell2D({ x: 0, y: 3, value: 'O' }),
            new Cell2D({ x: 1, y: 4, value: 'O' }),
            new Cell2D({ x: 2, y: 4, value: 'O' }),
            new Cell2D({ x: 2, y: 3, value: 'O' }),
            new Cell2D({ x: 3, y: 4, value: 'O' }),
            new Cell2D({ x: 4, y: 4, value: 'O' }),
            new Cell2D({ x: 4, y: 3, value: 'O' }),
            new Cell2D({ x: 4, y: 2, value: 'O' }),
            new Cell2D({ x: 3, y: 2, value: 'O' }),
            new Cell2D({ x: 4, y: 1, value: 'O' }),
            new Cell2D({ x: 4, y: 0, value: 'O' }),
            new Cell2D({ x: 3, y: 0, value: 'O' }),
            new Cell2D({ x: 2, y: 0, value: 'O' }),
            new Cell2D({ x: 1, y: 0, value: 'O' }),
            new Cell2D({ x: 2, y: 1, value: 'O' }),
            new Cell2D({ x: 2, y: 2, value: 'O' }),
            new Cell2D({ x: 1, y: 2, value: 'O' }),
            new Cell2D({ x: 0, y: 2, value: 'O' }),
            new Cell2D({ x: 0, y: 1, value: 'O' }),
            new Cell2D({ x: 0, y: 0, value: 'O' }),
          ],
          [new Cell2D({ x: 1, y: 3, value: 'X' })],
          [new Cell2D({ x: 3, y: 3, value: 'X' })],
          [new Cell2D({ x: 1, y: 1, value: 'X' })],
          [new Cell2D({ x: 3, y: 1, value: 'X' })],
        ])
      })
    })

    describe('getRegionFencesPrice', () => {
      const grid = new FixedGrid2D([
        ['A', 'A', 'A', 'A'],
        ['B', 'B', 'C', 'D'],
        ['B', 'B', 'C', 'C'],
        ['E', 'E', 'E', 'C'],
      ])

      it('Should return 40 for the region A', () => {
        expect(
          getRegionFencesPrice(grid, [
            new Cell2D({ x: 0, y: 3, value: 'A' }),
            new Cell2D({ x: 1, y: 3, value: 'A' }),
            new Cell2D({ x: 2, y: 3, value: 'A' }),
            new Cell2D({ x: 3, y: 3, value: 'A' }),
          ]),
        ).toBe(40)
      })

      it('Should return 32 for the region B', () => {
        expect(
          getRegionFencesPrice(grid, [
            new Cell2D({ x: 0, y: 2, value: 'B' }),
            new Cell2D({ x: 0, y: 1, value: 'B' }),
            new Cell2D({ x: 1, y: 2, value: 'B' }),
            new Cell2D({ x: 1, y: 1, value: 'B' }),
          ]),
        ).toBe(32)
      })

      it('Should return 40 for the region C', () => {
        expect(
          getRegionFencesPrice(grid, [
            new Cell2D({ x: 2, y: 2, value: 'C' }),
            new Cell2D({ x: 2, y: 1, value: 'C' }),
            new Cell2D({ x: 3, y: 1, value: 'C' }),
            new Cell2D({ x: 3, y: 0, value: 'C' }),
          ]),
        ).toBe(40)
      })

      it('Should return 4 for the region D', () => {
        expect(getRegionFencesPrice(grid, [new Cell2D({ x: 3, y: 2, value: 'D' })])).toBe(4)
      })

      it('Should return 24 for the region C', () => {
        expect(
          getRegionFencesPrice(grid, [
            new Cell2D({ x: 0, y: 0, value: 'E' }),
            new Cell2D({ x: 1, y: 0, value: 'E' }),
            new Cell2D({ x: 2, y: 0, value: 'E' }),
          ]),
        ).toBe(24)
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

    it('Test-03', () => {
      const { input, output } = readTestFile(Path.join(__dirname, './test-03.txt'))

      expect(getResponse(input)).toEqual(output)
    })

    it('Test-final', () => {
      const { input, output } = readTestFile(Path.join(__dirname, './test-final.txt'))

      expect(getResponse(input)).toEqual(output)
    })
  })
})
