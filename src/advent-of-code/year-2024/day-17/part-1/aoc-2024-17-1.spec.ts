import Path from 'path'

import { readTestFile } from 'tests/test-files'

import { getResponse, parseInput, StrangeDevice } from './aoc-2024-17-1'

describe('2024-17-1', () => {
  describe('Sub methods tests', () => {
    describe('parseInput', () => {
      it('Should parse input into a strange device', () => {
        const input = [
          'Register A: 3',
          'Register B: 437',
          'Register C: 0',
          '',
          'Program: 0,1,5,4,3,0',
        ]

        expect(parseInput(input)).toEqual(new StrangeDevice(3, 437, 0, [0, 1, 5, 4, 3, 0]))
      })
    })

    describe('example programs', () => {
      it('Should execute correctly the example 1', () => {
        const device = new StrangeDevice(0, 0, 9, [2, 6])

        const output = device.run()

        expect(device.getRegisterB()).toBe(1)
        expect(output).toEqual([])
      })

      it('Should execute correctly the example 2', () => {
        const device = new StrangeDevice(10, 0, 0, [5, 0, 5, 1, 5, 4])

        const output = device.run()

        expect(output).toEqual([0, 1, 2])
      })

      it('Should execute correctly the example 3', () => {
        const device = new StrangeDevice(2024, 0, 0, [0, 1, 5, 4, 3, 0])

        const output = device.run()

        expect(device.getRegisterA()).toBe(0)
        expect(output).toEqual([4, 2, 5, 6, 7, 7, 7, 7, 3, 1, 0])
      })

      it('Should execute correctly the example 4', () => {
        const device = new StrangeDevice(0, 29, 0, [1, 7])

        const output = device.run()

        expect(device.getRegisterB()).toBe(26)
        expect(output).toEqual([])
      })

      it('Should execute correctly the example 5', () => {
        const device = new StrangeDevice(0, 2024, 43690, [4, 0])

        const output = device.run()

        expect(device.getRegisterB()).toBe(44354)
        expect(output).toEqual([])
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
