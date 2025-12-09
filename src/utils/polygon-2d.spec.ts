import { Point2D } from './point-2d'
import { Polygon2D } from './polygon-2d'
import { Segment2D } from './segment-2d'

describe('Polygon2D', () => {
  describe('constructor', () => {
    it('should create a polygon with at least 3 vertices', () => {
      const vertices = [
        new Point2D({ x: 0, y: 0 }),
        new Point2D({ x: 10, y: 0 }),
        new Point2D({ x: 5, y: 10 }),
      ]
      const polygon = new Polygon2D(vertices)

      expect(polygon.vertices).toHaveLength(3)
    })

    it('should throw an error if less than 3 vertices are provided', () => {
      const vertices = [new Point2D({ x: 0, y: 0 }), new Point2D({ x: 10, y: 0 })]

      expect(() => new Polygon2D(vertices)).toThrow('A polygon must have at least 3 vertices')
    })
  })

  describe('contains', () => {
    it('should return true for a point inside a triangle', () => {
      const polygon = new Polygon2D([
        new Point2D({ x: 0, y: 0 }),
        new Point2D({ x: 10, y: 0 }),
        new Point2D({ x: 5, y: 10 }),
      ])

      expect(polygon.contains(new Point2D({ x: 5, y: 5 }))).toBe(true)
    })

    it('should return false for a point outside a triangle', () => {
      const polygon = new Polygon2D([
        new Point2D({ x: 0, y: 0 }),
        new Point2D({ x: 10, y: 0 }),
        new Point2D({ x: 5, y: 10 }),
      ])

      expect(polygon.contains(new Point2D({ x: 15, y: 5 }))).toBe(false)
    })

    it('should return true for a point inside a square', () => {
      const polygon = new Polygon2D([
        new Point2D({ x: 0, y: 0 }),
        new Point2D({ x: 10, y: 0 }),
        new Point2D({ x: 10, y: 10 }),
        new Point2D({ x: 0, y: 10 }),
      ])

      expect(polygon.contains(new Point2D({ x: 5, y: 5 }))).toBe(true)
    })

    it('should return false for a point outside a square', () => {
      const polygon = new Polygon2D([
        new Point2D({ x: 0, y: 0 }),
        new Point2D({ x: 10, y: 0 }),
        new Point2D({ x: 10, y: 10 }),
        new Point2D({ x: 0, y: 10 }),
      ])

      expect(polygon.contains(new Point2D({ x: 15, y: 15 }))).toBe(false)
    })

    it('should handle complex polygons', () => {
      // L-shaped polygon
      const polygon = new Polygon2D([
        new Point2D({ x: 0, y: 0 }),
        new Point2D({ x: 10, y: 0 }),
        new Point2D({ x: 10, y: 5 }),
        new Point2D({ x: 5, y: 5 }),
        new Point2D({ x: 5, y: 10 }),
        new Point2D({ x: 0, y: 10 }),
      ])

      expect(polygon.contains(new Point2D({ x: 2, y: 2 }))).toBe(true)
      expect(polygon.contains(new Point2D({ x: 7, y: 2 }))).toBe(true)
      expect(polygon.contains(new Point2D({ x: 2, y: 7 }))).toBe(true)
      expect(polygon.contains(new Point2D({ x: 7, y: 7 }))).toBe(false)
    })

    it('should handle point on vertex', () => {
      const polygon = new Polygon2D([
        new Point2D({ x: 0, y: 0 }),
        new Point2D({ x: 10, y: 0 }),
        new Point2D({ x: 5, y: 10 }),
      ])

      // Points on boundary are considered inside
      expect(polygon.contains(new Point2D({ x: 0, y: 0 }))).toBe(true)
    })

    it('should return true for point on edge', () => {
      const polygon = new Polygon2D([
        new Point2D({ x: 0, y: 0 }),
        new Point2D({ x: 10, y: 0 }),
        new Point2D({ x: 10, y: 10 }),
        new Point2D({ x: 0, y: 10 }),
      ])

      // Point on the right edge
      expect(polygon.contains(new Point2D({ x: 10, y: 5 }))).toBe(true)
      // Point on the top edge
      expect(polygon.contains(new Point2D({ x: 5, y: 10 }))).toBe(true)
    })
  })

  describe('getEdges', () => {
    it('should return all edges as segments', () => {
      const polygon = new Polygon2D([
        new Point2D({ x: 0, y: 0 }),
        new Point2D({ x: 10, y: 0 }),
        new Point2D({ x: 5, y: 10 }),
      ])

      const edges = polygon.getEdges()
      expect(edges).toHaveLength(3)
      expect(edges.every((edge) => edge instanceof Segment2D)).toBe(true)
    })

    it('should form a closed loop', () => {
      const polygon = new Polygon2D([
        new Point2D({ x: 0, y: 0 }),
        new Point2D({ x: 10, y: 0 }),
        new Point2D({ x: 10, y: 10 }),
        new Point2D({ x: 0, y: 10 }),
      ])

      const edges = polygon.getEdges()

      for (let i = 0; i < edges.length; i++) {
        const current = edges[i]!
        const next = edges[(i + 1) % edges.length]!
        expect(current.end.isSame(next.start)).toBe(true)
      }
    })
  })

  describe('getPerimeter', () => {
    it('should calculate perimeter of a triangle', () => {
      const polygon = new Polygon2D([
        new Point2D({ x: 0, y: 0 }),
        new Point2D({ x: 3, y: 0 }),
        new Point2D({ x: 0, y: 4 }),
      ])

      // 3 + 4 + 5 = 12
      expect(polygon.getPerimeter()).toBe(12)
    })

    it('should calculate perimeter of a square', () => {
      const polygon = new Polygon2D([
        new Point2D({ x: 0, y: 0 }),
        new Point2D({ x: 10, y: 0 }),
        new Point2D({ x: 10, y: 10 }),
        new Point2D({ x: 0, y: 10 }),
      ])

      expect(polygon.getPerimeter()).toBe(40)
    })
  })

  describe('getArea', () => {
    it('should calculate area of a triangle', () => {
      const polygon = new Polygon2D([
        new Point2D({ x: 0, y: 0 }),
        new Point2D({ x: 10, y: 0 }),
        new Point2D({ x: 0, y: 10 }),
      ])

      expect(polygon.getArea()).toBe(50)
    })

    it('should calculate area of a square', () => {
      const polygon = new Polygon2D([
        new Point2D({ x: 0, y: 0 }),
        new Point2D({ x: 10, y: 0 }),
        new Point2D({ x: 10, y: 10 }),
        new Point2D({ x: 0, y: 10 }),
      ])

      expect(polygon.getArea()).toBe(100)
    })

    it('should calculate area of a rectangle', () => {
      const polygon = new Polygon2D([
        new Point2D({ x: 0, y: 0 }),
        new Point2D({ x: 5, y: 0 }),
        new Point2D({ x: 5, y: 10 }),
        new Point2D({ x: 0, y: 10 }),
      ])

      expect(polygon.getArea()).toBe(50)
    })

    it('should work regardless of vertex order', () => {
      const polygonCW = new Polygon2D([
        new Point2D({ x: 0, y: 0 }),
        new Point2D({ x: 10, y: 0 }),
        new Point2D({ x: 10, y: 10 }),
        new Point2D({ x: 0, y: 10 }),
      ])

      const polygonCCW = new Polygon2D([
        new Point2D({ x: 0, y: 0 }),
        new Point2D({ x: 0, y: 10 }),
        new Point2D({ x: 10, y: 10 }),
        new Point2D({ x: 10, y: 0 }),
      ])

      expect(polygonCW.getArea()).toBe(polygonCCW.getArea())
    })
  })
})
