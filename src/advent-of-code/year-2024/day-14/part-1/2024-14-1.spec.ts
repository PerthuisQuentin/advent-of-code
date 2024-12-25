import Path from 'path'

import { Point2D } from 'src/utils/point-2d'
import { readTestFile } from 'tests/test-files'

import { countRobotsInQuadrant, getResponse, moveRobot, parseInput } from './2024-14-1'

describe('2024-14-1', () => {
  describe('Sub methods tests', () => {
    describe('parseInput', () => {
      it('Should parse size and robots correctly', () => {
        const result = parseInput([
          '11,7',
          'p=0,4 v=3,-3',
          'p=6,3 v=-1,-3',
          'p=10,3 v=-1,2',
          'p=2,0 v=2,-1',
        ])

        expect(result).toEqual({
          size: new Point2D({ x: 11, y: 7 }),
          robots: [
            {
              position: new Point2D({ x: 0, y: 4 }),
              velocity: new Point2D({ x: 3, y: -3 }),
            },
            {
              position: new Point2D({ x: 6, y: 3 }),
              velocity: new Point2D({ x: -1, y: -3 }),
            },
            {
              position: new Point2D({ x: 10, y: 3 }),
              velocity: new Point2D({ x: -1, y: 2 }),
            },
            {
              position: new Point2D({ x: 2, y: 0 }),
              velocity: new Point2D({ x: 2, y: -1 }),
            },
          ],
        })
      })
    })

    describe('moveRobot', () => {
      it('Should move robot to its new position', () => {
        const size = new Point2D({ x: 11, y: 7 })
        const robot = {
          position: new Point2D({ x: 0, y: 4 }),
          velocity: new Point2D({ x: 3, y: -3 }),
        }

        const result = moveRobot(size, robot)

        expect(result).toEqual({
          position: new Point2D({ x: 3, y: 1 }),
          velocity: new Point2D({ x: 3, y: -3 }),
        })
      })

      it('Should teleport robot when its going below zero in x', () => {
        const size = new Point2D({ x: 11, y: 7 })
        const robot = {
          position: new Point2D({ x: 2, y: 4 }),
          velocity: new Point2D({ x: -3, y: 0 }),
        }

        const result = moveRobot(size, robot)

        expect(result).toEqual({
          position: new Point2D({ x: 10, y: 4 }),
          velocity: new Point2D({ x: -3, y: 0 }),
        })
      })

      it('Should teleport robot when its going above size in x', () => {
        const size = new Point2D({ x: 11, y: 7 })
        const robot = {
          position: new Point2D({ x: 8, y: 4 }),
          velocity: new Point2D({ x: 5, y: 0 }),
        }

        const result = moveRobot(size, robot)

        expect(result).toEqual({
          position: new Point2D({ x: 2, y: 4 }),
          velocity: new Point2D({ x: 5, y: 0 }),
        })
      })

      it('Should teleport robot when its going below zero in y', () => {
        const size = new Point2D({ x: 11, y: 7 })
        const robot = {
          position: new Point2D({ x: 2, y: 4 }),
          velocity: new Point2D({ x: 0, y: -7 }),
        }

        const result = moveRobot(size, robot)

        expect(result).toEqual({
          position: new Point2D({ x: 2, y: 4 }),
          velocity: new Point2D({ x: 0, y: -7 }),
        })
      })

      it('Should teleport robot when its going above size in y', () => {
        const size = new Point2D({ x: 11, y: 7 })
        const robot = {
          position: new Point2D({ x: 2, y: 4 }),
          velocity: new Point2D({ x: 0, y: 4 }),
        }

        const result = moveRobot(size, robot)

        expect(result).toEqual({
          position: new Point2D({ x: 2, y: 1 }),
          velocity: new Point2D({ x: 0, y: 4 }),
        })
      })

      it('Should move example robot correctly after 1 step', () => {
        const size = new Point2D({ x: 11, y: 7 })
        const robot = {
          position: new Point2D({ x: 2, y: 4 }),
          velocity: new Point2D({ x: 2, y: -3 }),
        }

        const result = moveRobot(size, robot, 1)

        expect(result).toEqual({
          position: new Point2D({ x: 4, y: 1 }),
          velocity: new Point2D({ x: 2, y: -3 }),
        })
      })

      it('Should move example robot correctly after 2 step', () => {
        const size = new Point2D({ x: 11, y: 7 })
        const robot = {
          position: new Point2D({ x: 2, y: 4 }),
          velocity: new Point2D({ x: 2, y: -3 }),
        }

        const result = moveRobot(size, robot, 2)

        expect(result).toEqual({
          position: new Point2D({ x: 6, y: 5 }),
          velocity: new Point2D({ x: 2, y: -3 }),
        })
      })

      it('Should move example robot correctly after 3 step', () => {
        const size = new Point2D({ x: 11, y: 7 })
        const robot = {
          position: new Point2D({ x: 2, y: 4 }),
          velocity: new Point2D({ x: 2, y: -3 }),
        }

        const result = moveRobot(size, robot, 3)

        expect(result).toEqual({
          position: new Point2D({ x: 8, y: 2 }),
          velocity: new Point2D({ x: 2, y: -3 }),
        })
      })
    })

    describe('countRobotsInQuadrant', () => {
      it('Should return the good amounts of robots in each quadrant', () => {
        const robots = [
          {
            position: new Point2D({ x: 0, y: 2 }),
            velocity: new Point2D({ x: 1, y: 1 }),
          },
          {
            position: new Point2D({ x: 6, y: 0 }),
            velocity: new Point2D({ x: 2, y: 2 }),
          },
          {
            position: new Point2D({ x: 6, y: 0 }),
            velocity: new Point2D({ x: 3, y: 3 }),
          },
          {
            position: new Point2D({ x: 9, y: 0 }),
            velocity: new Point2D({ x: 4, y: 4 }),
          },
          {
            position: new Point2D({ x: 1, y: 6 }),
            velocity: new Point2D({ x: 5, y: 5 }),
          },
          {
            position: new Point2D({ x: 3, y: 5 }),
            velocity: new Point2D({ x: 6, y: 6 }),
          },
          {
            position: new Point2D({ x: 4, y: 5 }),
            velocity: new Point2D({ x: 7, y: 7 }),
          },
          {
            position: new Point2D({ x: 4, y: 5 }),
            velocity: new Point2D({ x: 8, y: 8 }),
          },
          {
            position: new Point2D({ x: 6, y: 6 }),
            velocity: new Point2D({ x: 9, y: 9 }),
          },
        ]

        expect(countRobotsInQuadrant(new Point2D({ x: 11, y: 7 }), robots)).toEqual([1, 3, 4, 1])
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
