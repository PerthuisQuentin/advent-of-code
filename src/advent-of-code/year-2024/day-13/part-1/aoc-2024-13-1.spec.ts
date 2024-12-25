import Path from 'path'

import { readTestFile } from 'tests/test-files'

import {
  getMinTokenForClawMachine,
  getResponse,
  parseClawMachine,
  parseClawMachines,
} from './aoc-2024-13-1'

describe('2024-13-1', () => {
  describe('Sub methods tests', () => {
    describe('parseClawMachine', () => {
      it('Should parse correctly a claw machine', () => {
        expect(
          parseClawMachine([
            'Button A: X+94, Y+34',
            'Button B: X+22, Y+67',
            'Prize: X=8400, Y=5400',
          ]),
        ).toEqual({
          aX: 94,
          aY: 34,
          bX: 22,
          bY: 67,
          prizeX: 8400,
          prizeY: 5400,
        })
      })

      it('Should parse correctly a claw machine', () => {
        expect(
          parseClawMachine([
            'Button A: X+26, Y+66',
            'Button B: X+67, Y+21',
            'Prize: X=12748, Y=12176',
          ]),
        ).toEqual({
          aX: 26,
          aY: 66,
          bX: 67,
          bY: 21,
          prizeX: 12748,
          prizeY: 12176,
        })
      })
    })

    describe('parseClawMachines', () => {
      it('Should parse correctly multiple claw machines', () => {
        expect(
          parseClawMachines([
            'Button A: X+94, Y+34',
            'Button B: X+22, Y+67',
            'Prize: X=8400, Y=5400',
            '',
            'Button A: X+26, Y+66',
            'Button B: X+67, Y+21',
            'Prize: X=12748, Y=12176',
          ]),
        ).toEqual([
          {
            aX: 94,
            aY: 34,
            bX: 22,
            bY: 67,
            prizeX: 8400,
            prizeY: 5400,
          },
          {
            aX: 26,
            aY: 66,
            bX: 67,
            bY: 21,
            prizeX: 12748,
            prizeY: 12176,
          },
        ])
      })
    })

    describe('getMinTokenForClawMachine', () => {
      it('Should return 280 tokens for the claw machine', () => {
        expect(
          getMinTokenForClawMachine({
            aX: 94,
            aY: 34,
            bX: 22,
            bY: 67,
            prizeX: 8400,
            prizeY: 5400,
          }),
        ).toBe(280)
      })

      it('Should return 200 tokens for the claw machine', () => {
        expect(
          getMinTokenForClawMachine({
            aX: 17,
            aY: 86,
            bX: 84,
            bY: 37,
            prizeX: 7870,
            prizeY: 6450,
          }),
        ).toBe(200)
      })

      it('Should return null for an impossible claw machine', () => {
        expect(
          getMinTokenForClawMachine({
            aX: 26,
            aY: 66,
            bX: 67,
            bY: 21,
            prizeX: 12748,
            prizeY: 12176,
          }),
        ).toBe(null)
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
