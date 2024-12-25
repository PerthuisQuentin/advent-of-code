import Path from 'path'

import { FixedGrid2D } from 'src/utils/fixed-grid-2d'
import { readTestFile } from 'tests/test-files'

import { getResponse, parseInput } from './aoc-2024-15-2'

describe('2024-15-2', () => {
  describe('Sub methods tests', () => {
    describe('parseInput', () => {
      it('Should parse input to an expanded grid and instructions correclty', () => {
        const input = [
          '#######',
          '#...#.#',
          '#.....#',
          '#..OO@#',
          '#..O..#',
          '#.....#',
          '#######',
          '',
          '<^^>>>vv',
          '<v>>v<<',
        ]

        expect(parseInput(input)).toEqual({
          grid: new FixedGrid2D([
            ['#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#'],
            ['#', '#', '.', '.', '.', '.', '.', '.', '#', '#', '.', '.', '#', '#'],
            ['#', '#', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '#', '#'],
            ['#', '#', '.', '.', '.', '.', '[', ']', '[', ']', '@', '.', '#', '#'],
            ['#', '#', '.', '.', '.', '.', '[', ']', '.', '.', '.', '.', '#', '#'],
            ['#', '#', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '#', '#'],
            ['#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#'],
          ]),
          instructions: ['<', '^', '^', '>', '>', '>', 'v', 'v', '<', 'v', '>', '>', 'v', '<', '<'],
        })
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
