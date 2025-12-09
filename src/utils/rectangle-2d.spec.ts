import { Point2D } from './point-2d'
import { Rectangle2D } from './rectangle-2d'
import { Segment2D } from './segment-2d'

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

  describe('getEdges', () => {
    it('should return 4 segments representing the rectangle edges', () => {
      const rect = new Rectangle2D({ minX: 2, minY: 3, maxX: 6, maxY: 9 })
      const edges = rect.getEdges()

      expect(edges).toHaveLength(4)
      expect(edges.every((edge) => edge instanceof Segment2D)).toBe(true)
    })

    it('should return top edge correctly', () => {
      const rect = new Rectangle2D({ minX: 2, minY: 3, maxX: 6, maxY: 9 })
      const edges = rect.getEdges()
      const topEdge = edges[0]!

      expect(topEdge.start.x).toBe(2)
      expect(topEdge.start.y).toBe(9)
      expect(topEdge.end.x).toBe(6)
      expect(topEdge.end.y).toBe(9)
    })

    it('should return right edge correctly', () => {
      const rect = new Rectangle2D({ minX: 2, minY: 3, maxX: 6, maxY: 9 })
      const edges = rect.getEdges()
      const rightEdge = edges[1]!

      expect(rightEdge.start.x).toBe(6)
      expect(rightEdge.start.y).toBe(9)
      expect(rightEdge.end.x).toBe(6)
      expect(rightEdge.end.y).toBe(3)
    })

    it('should return bottom edge correctly', () => {
      const rect = new Rectangle2D({ minX: 2, minY: 3, maxX: 6, maxY: 9 })
      const edges = rect.getEdges()
      const bottomEdge = edges[2]!

      expect(bottomEdge.start.x).toBe(6)
      expect(bottomEdge.start.y).toBe(3)
      expect(bottomEdge.end.x).toBe(2)
      expect(bottomEdge.end.y).toBe(3)
    })

    it('should return left edge correctly', () => {
      const rect = new Rectangle2D({ minX: 2, minY: 3, maxX: 6, maxY: 9 })
      const edges = rect.getEdges()
      const leftEdge = edges[3]!

      expect(leftEdge.start.x).toBe(2)
      expect(leftEdge.start.y).toBe(3)
      expect(leftEdge.end.x).toBe(2)
      expect(leftEdge.end.y).toBe(9)
    })

    it('should form a closed loop', () => {
      const rect = new Rectangle2D({ minX: 0, minY: 0, maxX: 10, maxY: 10 })
      const edges = rect.getEdges()

      // Each edge's end should match the next edge's start
      for (let i = 0; i < edges.length; i++) {
        const current = edges[i]!
        const next = edges[(i + 1) % edges.length]!
        expect(current.end.isSame(next.start)).toBe(true)
      }
    })
  })

  describe('getCorners', () => {
    it('should return 4 corner points', () => {
      const rect = new Rectangle2D({ minX: 2, minY: 3, maxX: 6, maxY: 9 })
      const corners = rect.getCorners()

      expect(corners).toHaveLength(4)
    })

    it('should return corners in correct order (bottom-left, bottom-right, top-right, top-left)', () => {
      const rect = new Rectangle2D({ minX: 2, minY: 3, maxX: 6, maxY: 9 })
      const corners = rect.getCorners()

      expect(corners[0]!.x).toBe(2) // bottom-left
      expect(corners[0]!.y).toBe(3)
      expect(corners[1]!.x).toBe(6) // bottom-right
      expect(corners[1]!.y).toBe(3)
      expect(corners[2]!.x).toBe(6) // top-right
      expect(corners[2]!.y).toBe(9)
      expect(corners[3]!.x).toBe(2) // top-left
      expect(corners[3]!.y).toBe(9)
    })

    it('should match the corners used by getEdges', () => {
      const rect = new Rectangle2D({ minX: 0, minY: 0, maxX: 10, maxY: 10 })
      const corners = rect.getCorners()
      const edges = rect.getEdges()

      // First corner should be the start of bottom edge (after rotation adjustment)
      expect(edges[2]!.end.isSame(corners[0]!)).toBe(true)
    })
  })
})
