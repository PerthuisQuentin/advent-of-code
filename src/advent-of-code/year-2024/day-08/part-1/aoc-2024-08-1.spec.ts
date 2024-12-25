import Path from 'path'

import { Cell2D, FixedGrid2D } from 'src/utils/fixed-grid-2d'
import { Point2D } from 'src/utils/point-2d'
import { readTestFile } from 'tests/test-files'

import {
  getAllAntennaCouples,
  getAllAntennasByType,
  getAntiNodes,
  getResponse,
} from './aoc-2024-08-1'

describe('2024-08-1', () => {
  describe('Sub methods tests', () => {
    describe('getAllAntennasByType', () => {
      it('Should return antennas by types', () => {
        const grid = new FixedGrid2D([
          ['.', '.', '.', '.', '0', '.'],
          ['.', '0', '.', '.', '.', '.'],
          ['.', '.', '.', '0', '.', '.'],
          ['0', '.', '.', '.', '.', '.'],
          ['.', '.', 'A', '.', '.', '.'],
          ['.', '.', '.', '.', '.', '.'],
          ['.', '.', '.', '.', '.', '.'],
          ['.', '.', '.', '.', 'A', '.'],
          ['.', '.', '.', '.', '.', 'A'],
        ])

        expect(getAllAntennasByType(grid)).toEqual(
          new Map([
            [
              '0',
              [
                new Cell2D({ x: 4, y: 8, value: '0' }),
                new Cell2D({ x: 1, y: 7, value: '0' }),
                new Cell2D({ x: 3, y: 6, value: '0' }),
                new Cell2D({ x: 0, y: 5, value: '0' }),
              ],
            ],
            [
              'A',
              [
                new Cell2D({ x: 2, y: 4, value: 'A' }),
                new Cell2D({ x: 4, y: 1, value: 'A' }),
                new Cell2D({ x: 5, y: 0, value: 'A' }),
              ],
            ],
          ]),
        )
      })
    })

    describe('getAntiNodes', () => {
      it('Should return correct antinodes', () => {
        const antenna1 = new Cell2D({ x: 1, y: 1, value: 'A' })
        const antenna2 = new Cell2D({ x: 3, y: 3, value: 'A' })

        const { antinode1, antinode2 } = getAntiNodes(antenna1, antenna2)

        expect(antinode1).toEqual(new Point2D({ x: 5, y: 5 }))
        expect(antinode2).toEqual(new Point2D({ x: -1, y: -1 }))
      })

      it('Should return correct antinodes', () => {
        const antenna1 = new Cell2D({ x: 2, y: 2, value: 'B' })
        const antenna2 = new Cell2D({ x: 4, y: 4, value: 'B' })

        const { antinode1, antinode2 } = getAntiNodes(antenna1, antenna2)

        expect(antinode1).toEqual(new Point2D({ x: 6, y: 6 }))
        expect(antinode2).toEqual(new Point2D({ x: 0, y: 0 }))
      })
    })

    describe('getAllAntennaCouples', () => {
      it('Should return all possible antenna couples', () => {
        const antennas = [
          new Cell2D({ x: 1, y: 1, value: 'A' }),
          new Cell2D({ x: 2, y: 2, value: 'A' }),
          new Cell2D({ x: 3, y: 3, value: 'A' }),
        ]

        const couples = getAllAntennaCouples(antennas)

        expect(couples).toEqual([
          [antennas[0], antennas[1]],
          [antennas[0], antennas[2]],
          [antennas[1], antennas[2]],
        ])
      })

      it('Should return an empty array if less than two antennas are provided', () => {
        const antennas = [new Cell2D({ x: 1, y: 1, value: 'A' })]

        const couples = getAllAntennaCouples(antennas)

        expect(couples).toEqual([])
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
