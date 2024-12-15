import Path from 'path'

import { FixedGrid2D } from 'src/utils/fixed-grid-2d'
import { readTestFile } from 'tests/test-files'

import { getResponse, parseInput } from './2024-15-1'

describe('2024-15-1', () => {
  describe('Sub methods tests', () => {
    describe('parseInput', () => {
      it('Should parse input to grid and instructions correclty', () => {
        const input = [
          '########',
          '#..O.O.#',
          '##@.O..#',
          '#...O..#',
          '#.#.O..#',
          '#...O..#',
          '#......#',
          '########',
          '',
          '<^^>>>vv',
          '<v>>v<<',
        ]

        expect(parseInput(input)).toEqual({
          grid: new FixedGrid2D([
            ['#', '#', '#', '#', '#', '#', '#', '#'],
            ['#', '.', '.', 'O', '.', 'O', '.', '#'],
            ['#', '#', '@', '.', 'O', '.', '.', '#'],
            ['#', '.', '.', '.', 'O', '.', '.', '#'],
            ['#', '.', '#', '.', 'O', '.', '.', '#'],
            ['#', '.', '.', '.', 'O', '.', '.', '#'],
            ['#', '.', '.', '.', '.', '.', '.', '#'],
            ['#', '#', '#', '#', '#', '#', '#', '#'],
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
