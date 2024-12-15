import { Cell2D, FixedGrid2D } from './fixed-grid-2d'
import { Point2D } from './point-2d'
import { Rectangle2D } from './rectangle-2d'

describe('FixedGrid2D', () => {
  describe('constructor', () => {
    it('should create a FixedGrid2d by loading a grid array', () => {
      const grid = new FixedGrid2D([
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
      ])

      expect(grid).toEqual({
        bounds: new Rectangle2D({ minX: 0, minY: 0, maxX: 2, maxY: 2 }),
        fixedBounds: true,
        grid: new Map([
          [
            0,
            new Map([
              [0, new Cell2D({ x: 0, y: 0, value: 7 })],
              [1, new Cell2D({ x: 0, y: 1, value: 4 })],
              [2, new Cell2D({ x: 0, y: 2, value: 1 })],
            ]),
          ],
          [
            1,
            new Map([
              [0, new Cell2D({ x: 1, y: 0, value: 8 })],
              [1, new Cell2D({ x: 1, y: 1, value: 5 })],
              [2, new Cell2D({ x: 1, y: 2, value: 2 })],
            ]),
          ],
          [
            2,
            new Map([
              [0, new Cell2D({ x: 2, y: 0, value: 9 })],
              [1, new Cell2D({ x: 2, y: 1, value: 6 })],
              [2, new Cell2D({ x: 2, y: 2, value: 3 })],
            ]),
          ],
        ]),
      })
    })

    it('should create a FixedGrid2d with a given size', () => {
      const grid = new FixedGrid2D(new Point2D({ x: 3, y: 4 }), '.')

      expect(grid).toEqual({
        bounds: new Rectangle2D({ minX: 0, minY: 0, maxX: 2, maxY: 3 }),
        fixedBounds: true,
        grid: new Map([
          [
            0,
            new Map([
              [0, new Cell2D({ x: 0, y: 0, value: '.' })],
              [1, new Cell2D({ x: 0, y: 1, value: '.' })],
              [2, new Cell2D({ x: 0, y: 2, value: '.' })],
              [3, new Cell2D({ x: 0, y: 3, value: '.' })],
            ]),
          ],
          [
            1,
            new Map([
              [0, new Cell2D({ x: 1, y: 0, value: '.' })],
              [1, new Cell2D({ x: 1, y: 1, value: '.' })],
              [2, new Cell2D({ x: 1, y: 2, value: '.' })],
              [3, new Cell2D({ x: 1, y: 3, value: '.' })],
            ]),
          ],
          [
            2,
            new Map([
              [0, new Cell2D({ x: 2, y: 0, value: '.' })],
              [1, new Cell2D({ x: 2, y: 1, value: '.' })],
              [2, new Cell2D({ x: 2, y: 2, value: '.' })],
              [3, new Cell2D({ x: 2, y: 3, value: '.' })],
            ]),
          ],
        ]),
      })
    })
  })

  describe('isOutsideBounds', () => {
    it('Should return false with a point inside the grid', () => {
      const grid = new FixedGrid2D([
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
      ])

      expect(grid.isOutsideBounds(new Point2D({ x: 1, y: 1 }))).toBe(false)
    })

    it('Should return true with a point outside the grid', () => {
      const grid = new FixedGrid2D([
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
      ])

      expect(grid.isOutsideBounds(new Point2D({ x: 4, y: 6 }))).toBe(true)
    })
  })

  describe('getRow', () => {
    it('Should return a row from the grid', () => {
      const grid = new FixedGrid2D([
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
      ])

      expect(grid.getRow(1)).toEqual(
        new Map([
          [0, new Cell2D({ x: 1, y: 0, value: 8 })],
          [1, new Cell2D({ x: 1, y: 1, value: 5 })],
          [2, new Cell2D({ x: 1, y: 2, value: 2 })],
        ]),
      )
    })
  })

  describe('getCell', () => {
    it('Should return a cell from the grid', () => {
      const grid = new FixedGrid2D([
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
      ])

      expect(grid.getCell(new Point2D({ x: 1, y: 1 }))).toEqual(
        new Cell2D({ x: 1, y: 1, value: 5 }),
      )
    })
  })

  describe('setCell', () => {
    it('Should throw an error when trying to set a cell outside the grid', () => {
      const grid = new FixedGrid2D([
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
      ])

      expect(() => {
        grid.setCell(new Cell2D({ x: 3, y: 3, value: 10 }))
      }).toThrow('Cannot set cell outside bounds when fixed bounds')
    })

    it('Should set a cell in the grid', () => {
      const grid = new FixedGrid2D([
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
      ])

      grid.setCell(new Cell2D({ x: 1, y: 1, value: 10 }))

      expect(grid.getCell(new Point2D({ x: 1, y: 1 }))).toEqual(
        new Cell2D({ x: 1, y: 1, value: 10 }),
      )
    })
  })

  describe('forEach', () => {
    it('Should iterate over all cells in the grid', () => {
      const grid = new FixedGrid2D([
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
      ])

      const callback = jest.fn()
      grid.forEach(callback)

      expect(callback.mock.calls).toEqual([
        [new Cell2D({ x: 0, y: 2, value: 1 })],
        [new Cell2D({ x: 1, y: 2, value: 2 })],
        [new Cell2D({ x: 2, y: 2, value: 3 })],
        [new Cell2D({ x: 0, y: 1, value: 4 })],
        [new Cell2D({ x: 1, y: 1, value: 5 })],
        [new Cell2D({ x: 2, y: 1, value: 6 })],
        [new Cell2D({ x: 0, y: 0, value: 7 })],
        [new Cell2D({ x: 1, y: 0, value: 8 })],
        [new Cell2D({ x: 2, y: 0, value: 9 })],
      ])
    })
  })

  describe('toArray', () => {
    it('Should return the grid as an array', () => {
      const grid = new FixedGrid2D([
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
      ])

      expect(grid.toArray()).toEqual([
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
      ])
    })
  })

  describe('toString', () => {
    it('Should return the grid as a string', () => {
      const grid = new FixedGrid2D([
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
      ])

      expect(grid.toString()).toBe('123\n456\n789')
    })

    it('Should return the grid as a string with a transformation', () => {
      const grid = new FixedGrid2D([
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
      ])

      expect(grid.toString((x: number) => (x * 2).toString())).toBe('246\n81012\n141618')
    })
  })

  describe('getAllCellsOf', () => {
    it('Should return all cells with a specific value', () => {
      const grid = new FixedGrid2D([
        ['a', 'b', 'c'],
        ['b', 'a', 'c'],
        ['c', 'a', 'b'],
      ])

      expect(grid.getAllCellsOf('b')).toEqual([
        new Cell2D({ x: 1, y: 2, value: 'b' }),
        new Cell2D({ x: 0, y: 1, value: 'b' }),
        new Cell2D({ x: 2, y: 0, value: 'b' }),
      ])
    })
  })

  describe('getNeighbors', () => {
    it('Should return the neighbors of a cell in the grid', () => {
      const grid = new FixedGrid2D([
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
      ])

      expect(grid.getNeighbors(new Point2D({ x: 1, y: 1 }))).toEqual([
        new Cell2D({ x: 0, y: 1, value: 4 }),
        new Cell2D({ x: 1, y: 0, value: 8 }),
        new Cell2D({ x: 2, y: 1, value: 6 }),
        new Cell2D({ x: 1, y: 2, value: 2 }),
      ])
    })

    it('Should return the partial neighbors of a cell in the grid', () => {
      const grid = new FixedGrid2D([
        [1, 2],
        [4, 5],
      ])

      expect(grid.getNeighbors(new Point2D({ x: 0, y: 0 }))).toEqual([
        new Cell2D({ x: 1, y: 0, value: 5 }),
        new Cell2D({ x: 0, y: 1, value: 1 }),
      ])
    })

    it('Should return an empty array if the cell has no neighbors', () => {
      const grid = new FixedGrid2D([[1]])

      expect(grid.getNeighbors(new Point2D({ x: 0, y: 0 }))).toEqual([])
    })
  })
})
