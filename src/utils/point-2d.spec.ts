import { Point2D } from './point-2d'

describe('Point2D', () => {
  describe('constructor', () => {
    it('should create a point with given x and y values', () => {
      const point = new Point2D({ x: 1, y: 2 })

      expect(point.x).toBe(1)
      expect(point.y).toBe(2)
    })
  })

  describe('clone', () => {
    it('should clone a point', () => {
      const point = new Point2D({ x: 1, y: 2 })
      const clone = point.clone()

      expect(clone).not.toBe(point)
      expect(clone.x).toBe(1)
      expect(clone.y).toBe(2)
    })
  })

  describe('add', () => {
    it('should add two points', () => {
      const point1 = new Point2D({ x: 1, y: 2 })
      const point2 = new Point2D({ x: 3, y: 4 })
      const result = point1.add(point2)

      expect(result.x).toBe(4)
      expect(result.y).toBe(6)
    })
  })

  describe('multiply', () => {
    it('should multiply a point by a factor', () => {
      const point = new Point2D({ x: 1, y: 2 })
      const result = point.multiply(3)

      expect(result.x).toBe(3)
      expect(result.y).toBe(6)
    })
  })
})
