import Path from 'path'

import { readTestFile } from 'tests/test-files'

import { getCoupleOrderHashMap, getResponse, parseInput, sortUpdate } from './2024-05-1'

describe('2024-05-1', () => {
  describe('Sub methods tests', () => {
    describe('parseInput', () => {
      it('Should parse the input', () => {
        const input = ['1|2', '3|4', '5|6', '', '1,2,3,4,5', '6,7,8,9,10']

        expect(parseInput(input)).toEqual({
          coupleOrders: [
            { x: 1, y: 2 },
            { x: 3, y: 4 },
            { x: 5, y: 6 },
          ],
          updates: [
            [1, 2, 3, 4, 5],
            [6, 7, 8, 9, 10],
          ],
        })
      })
    })

    describe('getCoupleOrderHashMap', () => {
      it('Should return a hashmap of the couple orders', () => {
        const coupleOrders = [
          { x: 1, y: 2 },
          { x: 4, y: 3 },
          { x: 5, y: 6 },
        ]

        expect(getCoupleOrderHashMap(coupleOrders)).toEqual(
          new Map([
            ['1|2', { x: 1, y: 2 }],
            ['3|4', { x: 4, y: 3 }],
            ['5|6', { x: 5, y: 6 }],
          ]),
        )
      })
    })

    describe('sortUpdate', () => {
      it('Should sort an update according to couple orders', () => {
        const coupleOrderHashMap = new Map([
          ['47|53', { x: 47, y: 53 }],
          ['61|97', { x: 97, y: 61 }],
          ['47|97', { x: 97, y: 47 }],
          ['53|75', { x: 75, y: 53 }],
          ['53|61', { x: 61, y: 53 }],
          ['53|97', { x: 97, y: 53 }],
          ['47|75', { x: 75, y: 47 }],
          ['75|97', { x: 97, y: 75 }],
          ['47|61', { x: 47, y: 61 }],
          ['61|75', { x: 75, y: 61 }],
        ])

        expect(sortUpdate([75, 97, 47, 61, 53], coupleOrderHashMap)).toEqual([97, 75, 47, 61, 53])
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
