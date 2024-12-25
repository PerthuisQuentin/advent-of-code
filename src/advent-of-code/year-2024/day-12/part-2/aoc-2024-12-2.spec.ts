import Path from 'path'

import { Cell2D } from 'src/utils/fixed-grid-2d'
import { readTestFile } from 'tests/test-files'

import { getRegionCorners, getResponse } from './aoc-2024-12-2'

describe('2024-12-2', () => {
  fdescribe('Sub methods tests', () => {
    describe('getRegionCorners', () => {
      it('Should return 4 sides for the region A', () => {
        expect(
          getRegionCorners([
            new Cell2D({ x: 0, y: 3, value: 'A' }),
            new Cell2D({ x: 1, y: 3, value: 'A' }),
            new Cell2D({ x: 2, y: 3, value: 'A' }),
            new Cell2D({ x: 3, y: 3, value: 'A' }),
          ]),
        ).toBe(4)
      })

      it('Should return 4 sides for the region B', () => {
        expect(
          getRegionCorners([
            new Cell2D({ x: 0, y: 2, value: 'B' }),
            new Cell2D({ x: 0, y: 1, value: 'B' }),
            new Cell2D({ x: 1, y: 2, value: 'B' }),
            new Cell2D({ x: 1, y: 1, value: 'B' }),
          ]),
        ).toBe(4)
      })

      it('Should return 8 sides for the region C', () => {
        expect(
          getRegionCorners([
            new Cell2D({ x: 2, y: 2, value: 'C' }),
            new Cell2D({ x: 2, y: 1, value: 'C' }),
            new Cell2D({ x: 3, y: 1, value: 'C' }),
            new Cell2D({ x: 3, y: 0, value: 'C' }),
          ]),
        ).toBe(8)
      })

      it('Should return 4 sides for the region D', () => {
        expect(getRegionCorners([new Cell2D({ x: 3, y: 2, value: 'D' })])).toBe(4)
      })

      it('Should return 4 sides for the region C', () => {
        expect(
          getRegionCorners([
            new Cell2D({ x: 0, y: 0, value: 'E' }),
            new Cell2D({ x: 1, y: 0, value: 'E' }),
            new Cell2D({ x: 2, y: 0, value: 'E' }),
          ]),
        ).toBe(4)
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

    it('Test-04', () => {
      const { input, output } = readTestFile(Path.join(__dirname, './test-04.txt'))

      expect(getResponse(input)).toEqual(output)
    })

    it('Test-05', () => {
      const { input, output } = readTestFile(Path.join(__dirname, './test-05.txt'))

      expect(getResponse(input)).toEqual(output)
    })

    it('Test-final', () => {
      const { input, output } = readTestFile(Path.join(__dirname, './test-final.txt'))

      expect(getResponse(input)).toEqual(output)
    })
  })
})
