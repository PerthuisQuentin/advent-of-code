import { Point2D } from './point-2d'
import { Rectangle2D } from './rectangle-2d'

describe('Rectangle2D', () => {
  describe('constructor', () => {
    it('should initialize with given minX, minY, maxX, and maxY', () => {
      const rect = new Rectangle2D({ minX: 1, minY: 2, maxX: 3, maxY: 4 })

      expect(rect).toEqual({
        minX: 1,
        minY: 2,
        maxX: 3,
        maxY: 4,
      })
    })
  })

  describe('clone', () => {
    it('should create a new Rectangle2D with the same properties', () => {
      const rect = new Rectangle2D({ minX: 1, minY: 2, maxX: 3, maxY: 4 })
      const clonedRect = rect.clone()

      expect(clonedRect).not.toBe(rect)
      expect(clonedRect).toEqual(rect)
    })
  })

  describe('contains', () => {
    it('should return true if the point is within the rectangle', () => {
      const rect = new Rectangle2D({ minX: 2, minY: 3, maxX: 6, maxY: 9 })
      const point = new Point2D({ x: 4, y: 6 })

      expect(rect.contains(point)).toBe(true)
    })

    it('should return true if the point is on the left border', () => {
      const rect = new Rectangle2D({ minX: 2, minY: 3, maxX: 6, maxY: 9 })
      const point = new Point2D({ x: 2, y: 6 })

      expect(rect.contains(point)).toBe(true)
    })

    it('should return true if the point is on the right border', () => {
      const rect = new Rectangle2D({ minX: 2, minY: 3, maxX: 6, maxY: 9 })
      const point = new Point2D({ x: 6, y: 6 })

      expect(rect.contains(point)).toBe(true)
    })

    it('should return true if the point is on the top border', () => {
      const rect = new Rectangle2D({ minX: 2, minY: 3, maxX: 6, maxY: 9 })
      const point = new Point2D({ x: 4, y: 9 })

      expect(rect.contains(point)).toBe(true)
    })

    it('should return true if the point is on the bottom border', () => {
      const rect = new Rectangle2D({ minX: 2, minY: 3, maxX: 6, maxY: 9 })
      const point = new Point2D({ x: 4, y: 3 })

      expect(rect.contains(point)).toBe(true)
    })

    it('should return false if the point is outside the rectangle on the left', () => {
      const rect = new Rectangle2D({ minX: 2, minY: 3, maxX: 6, maxY: 9 })
      const point = new Point2D({ x: 1, y: 5 })

      expect(rect.contains(point)).toBe(false)
    })

    it('should return false if the point is outside the rectangle on the right', () => {
      const rect = new Rectangle2D({ minX: 2, minY: 3, maxX: 6, maxY: 9 })
      const point = new Point2D({ x: 8, y: 5 })

      expect(rect.contains(point)).toBe(false)
    })

    it('should return false if the point is outside the rectangle from above', () => {
      const rect = new Rectangle2D({ minX: 2, minY: 3, maxX: 6, maxY: 9 })
      const point = new Point2D({ x: 6, y: 12 })

      expect(rect.contains(point)).toBe(false)
    })

    it('should return false if the point is outside the rectangle from under', () => {
      const rect = new Rectangle2D({ minX: 2, minY: 3, maxX: 6, maxY: 9 })
      const point = new Point2D({ x: 6, y: 1 })

      expect(rect.contains(point)).toBe(false)
    })
  })
})
