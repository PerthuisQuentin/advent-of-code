import { Point2D } from './point-2d'
import { Segment2D } from './segment-2d'

describe('Segment2D', () => {
  describe('getLength', () => {
    it('should calculate horizontal segment length', () => {
      const segment = new Segment2D({
        start: new Point2D({ x: 0, y: 0 }),
        end: new Point2D({ x: 10, y: 0 }),
      })

      expect(segment.getLength()).toBe(10)
    })

    it('should calculate vertical segment length', () => {
      const segment = new Segment2D({
        start: new Point2D({ x: 0, y: 0 }),
        end: new Point2D({ x: 0, y: 10 }),
      })

      expect(segment.getLength()).toBe(10)
    })

    it('should calculate diagonal segment length', () => {
      const segment = new Segment2D({
        start: new Point2D({ x: 0, y: 0 }),
        end: new Point2D({ x: 3, y: 4 }),
      })

      expect(segment.getLength()).toBe(5)
    })
  })

  describe('getManhattanLength', () => {
    it('should calculate manhattan length', () => {
      const segment = new Segment2D({
        start: new Point2D({ x: 0, y: 0 }),
        end: new Point2D({ x: 3, y: 4 }),
      })

      expect(segment.getManhattanLength()).toBe(7)
    })
  })

  describe('getMiddlePoint', () => {
    it('should return middle point', () => {
      const segment = new Segment2D({
        start: new Point2D({ x: 0, y: 0 }),
        end: new Point2D({ x: 10, y: 10 }),
      })

      const middle = segment.getMiddlePoint()
      expect(middle.x).toBe(5)
      expect(middle.y).toBe(5)
    })
  })

  describe('isHorizontal', () => {
    it('should return true for horizontal segment', () => {
      const segment = new Segment2D({
        start: new Point2D({ x: 0, y: 5 }),
        end: new Point2D({ x: 10, y: 5 }),
      })

      expect(segment.isHorizontal()).toBe(true)
    })

    it('should return false for non-horizontal segment', () => {
      const segment = new Segment2D({
        start: new Point2D({ x: 0, y: 0 }),
        end: new Point2D({ x: 10, y: 10 }),
      })

      expect(segment.isHorizontal()).toBe(false)
    })
  })

  describe('isVertical', () => {
    it('should return true for vertical segment', () => {
      const segment = new Segment2D({
        start: new Point2D({ x: 5, y: 0 }),
        end: new Point2D({ x: 5, y: 10 }),
      })

      expect(segment.isVertical()).toBe(true)
    })

    it('should return false for non-vertical segment', () => {
      const segment = new Segment2D({
        start: new Point2D({ x: 0, y: 0 }),
        end: new Point2D({ x: 10, y: 10 }),
      })

      expect(segment.isVertical()).toBe(false)
    })
  })

  describe('contains', () => {
    it('should return true for point on segment', () => {
      const segment = new Segment2D({
        start: new Point2D({ x: 0, y: 0 }),
        end: new Point2D({ x: 10, y: 10 }),
      })

      expect(segment.contains(new Point2D({ x: 5, y: 5 }))).toBe(true)
    })

    it('should return false for point not on segment', () => {
      const segment = new Segment2D({
        start: new Point2D({ x: 0, y: 0 }),
        end: new Point2D({ x: 10, y: 10 }),
      })

      expect(segment.contains(new Point2D({ x: 5, y: 6 }))).toBe(false)
    })

    it('should return true for endpoint', () => {
      const segment = new Segment2D({
        start: new Point2D({ x: 0, y: 0 }),
        end: new Point2D({ x: 10, y: 10 }),
      })

      expect(segment.contains(new Point2D({ x: 0, y: 0 }))).toBe(true)
      expect(segment.contains(new Point2D({ x: 10, y: 10 }))).toBe(true)
    })

    it('should return false for point on line but outside segment', () => {
      const segment = new Segment2D({
        start: new Point2D({ x: 0, y: 0 }),
        end: new Point2D({ x: 10, y: 10 }),
      })

      expect(segment.contains(new Point2D({ x: 15, y: 15 }))).toBe(false)
      expect(segment.contains(new Point2D({ x: -5, y: -5 }))).toBe(false)
    })
  })

  describe('getPoints', () => {
    it('should return all points on horizontal segment', () => {
      const segment = new Segment2D({
        start: new Point2D({ x: 0, y: 0 }),
        end: new Point2D({ x: 3, y: 0 }),
      })

      const points = segment.getPoints()
      expect(points).toHaveLength(4)
      expect(points[0]!.isSame(new Point2D({ x: 0, y: 0 }))).toBe(true)
      expect(points[3]!.isSame(new Point2D({ x: 3, y: 0 }))).toBe(true)
    })
  })

  describe('isPointCounterClockwise', () => {
    it('should return true when point is on the left side (counter-clockwise)', () => {
      const segment = new Segment2D({
        start: new Point2D({ x: 0, y: 0 }),
        end: new Point2D({ x: 10, y: 0 }),
      })
      const point = new Point2D({ x: 5, y: 5 })

      expect(segment.isPointCounterClockwise(point)).toBe(true)
    })

    it('should return false when point is on the right side (clockwise)', () => {
      const segment = new Segment2D({
        start: new Point2D({ x: 0, y: 0 }),
        end: new Point2D({ x: 10, y: 0 }),
      })
      const point = new Point2D({ x: 5, y: -5 })

      expect(segment.isPointCounterClockwise(point)).toBe(false)
    })

    it('should return false when point is on the line', () => {
      const segment = new Segment2D({
        start: new Point2D({ x: 0, y: 0 }),
        end: new Point2D({ x: 10, y: 0 }),
      })
      const point = new Point2D({ x: 5, y: 0 })

      expect(segment.isPointCounterClockwise(point)).toBe(false)
    })

    it('should handle diagonal lines correctly', () => {
      const segment = new Segment2D({
        start: new Point2D({ x: 0, y: 0 }),
        end: new Point2D({ x: 10, y: 10 }),
      })
      const pointLeft = new Point2D({ x: 0, y: 10 })
      const pointRight = new Point2D({ x: 10, y: 0 })

      expect(segment.isPointCounterClockwise(pointLeft)).toBe(true)
      expect(segment.isPointCounterClockwise(pointRight)).toBe(false)
    })

    it('should handle vertical lines', () => {
      const segment = new Segment2D({
        start: new Point2D({ x: 5, y: 0 }),
        end: new Point2D({ x: 5, y: 10 }),
      })
      const pointLeft = new Point2D({ x: 0, y: 5 })
      const pointRight = new Point2D({ x: 10, y: 5 })

      expect(segment.isPointCounterClockwise(pointLeft)).toBe(true)
      expect(segment.isPointCounterClockwise(pointRight)).toBe(false)
    })
  })

  describe('intersects', () => {
    it('should return true when segments intersect', () => {
      const segment1 = new Segment2D({
        start: new Point2D({ x: 0, y: 0 }),
        end: new Point2D({ x: 10, y: 10 }),
      })
      const segment2 = new Segment2D({
        start: new Point2D({ x: 0, y: 10 }),
        end: new Point2D({ x: 10, y: 0 }),
      })

      expect(segment1.intersects(segment2)).toBe(true)
    })

    it('should return false when segments do not intersect', () => {
      const segment1 = new Segment2D({
        start: new Point2D({ x: 0, y: 0 }),
        end: new Point2D({ x: 10, y: 0 }),
      })
      const segment2 = new Segment2D({
        start: new Point2D({ x: 0, y: 10 }),
        end: new Point2D({ x: 10, y: 10 }),
      })

      expect(segment1.intersects(segment2)).toBe(false)
    })

    it('should return false when segments are parallel', () => {
      const segment1 = new Segment2D({
        start: new Point2D({ x: 0, y: 0 }),
        end: new Point2D({ x: 10, y: 0 }),
      })
      const segment2 = new Segment2D({
        start: new Point2D({ x: 0, y: 5 }),
        end: new Point2D({ x: 10, y: 5 }),
      })

      expect(segment1.intersects(segment2)).toBe(false)
    })

    it('should return false when segments touch at endpoint', () => {
      const segment1 = new Segment2D({
        start: new Point2D({ x: 0, y: 0 }),
        end: new Point2D({ x: 5, y: 5 }),
      })
      const segment2 = new Segment2D({
        start: new Point2D({ x: 5, y: 5 }),
        end: new Point2D({ x: 10, y: 0 }),
      })

      expect(segment1.intersects(segment2)).toBe(false)
    })

    it('should return true for perpendicular segments crossing', () => {
      const segment1 = new Segment2D({
        start: new Point2D({ x: 5, y: 0 }),
        end: new Point2D({ x: 5, y: 10 }),
      })
      const segment2 = new Segment2D({
        start: new Point2D({ x: 0, y: 5 }),
        end: new Point2D({ x: 10, y: 5 }),
      })

      expect(segment1.intersects(segment2)).toBe(true)
    })
  })

  describe('properlyIntersects', () => {
    it('should return true when segments cross', () => {
      const segment1 = new Segment2D({
        start: new Point2D({ x: 0, y: 0 }),
        end: new Point2D({ x: 10, y: 10 }),
      })
      const segment2 = new Segment2D({
        start: new Point2D({ x: 0, y: 10 }),
        end: new Point2D({ x: 10, y: 0 }),
      })

      expect(segment1.properlyIntersects(segment2)).toBe(true)
    })

    it('should return false when segments share start point', () => {
      const segment1 = new Segment2D({
        start: new Point2D({ x: 0, y: 0 }),
        end: new Point2D({ x: 10, y: 0 }),
      })
      const segment2 = new Segment2D({
        start: new Point2D({ x: 0, y: 0 }),
        end: new Point2D({ x: 0, y: 10 }),
      })

      expect(segment1.properlyIntersects(segment2)).toBe(false)
    })

    it('should return false when segments share end point', () => {
      const segment1 = new Segment2D({
        start: new Point2D({ x: 0, y: 0 }),
        end: new Point2D({ x: 10, y: 0 }),
      })
      const segment2 = new Segment2D({
        start: new Point2D({ x: 10, y: 0 }),
        end: new Point2D({ x: 10, y: 10 }),
      })

      expect(segment1.properlyIntersects(segment2)).toBe(false)
    })

    it('should return false when segments do not intersect', () => {
      const segment1 = new Segment2D({
        start: new Point2D({ x: 0, y: 0 }),
        end: new Point2D({ x: 10, y: 0 }),
      })
      const segment2 = new Segment2D({
        start: new Point2D({ x: 0, y: 10 }),
        end: new Point2D({ x: 10, y: 10 }),
      })

      expect(segment1.properlyIntersects(segment2)).toBe(false)
    })

    it('should return false for collinear overlapping segments sharing endpoint', () => {
      const segment1 = new Segment2D({
        start: new Point2D({ x: 0, y: 0 }),
        end: new Point2D({ x: 10, y: 0 }),
      })
      const segment2 = new Segment2D({
        start: new Point2D({ x: 10, y: 0 }),
        end: new Point2D({ x: 20, y: 0 }),
      })

      expect(segment1.properlyIntersects(segment2)).toBe(false)
    })

    it('should return false when one segment endpoint is on the other segment', () => {
      // Horizontal segment with vertical segment whose endpoint touches it
      const segment1 = new Segment2D({
        start: new Point2D({ x: 7, y: 3 }),
        end: new Point2D({ x: 11, y: 3 }),
      })
      const segment2 = new Segment2D({
        start: new Point2D({ x: 11, y: 1 }),
        end: new Point2D({ x: 11, y: 7 }),
      })

      expect(segment1.properlyIntersects(segment2)).toBe(false)
      expect(segment2.properlyIntersects(segment1)).toBe(false)
    })

    it('should return false for T-junction (one segment endpoint on another)', () => {
      const segment1 = new Segment2D({
        start: new Point2D({ x: 0, y: 5 }),
        end: new Point2D({ x: 10, y: 5 }),
      })
      const segment2 = new Segment2D({
        start: new Point2D({ x: 5, y: 0 }),
        end: new Point2D({ x: 5, y: 5 }),
      })

      expect(segment1.properlyIntersects(segment2)).toBe(false)
      expect(segment2.properlyIntersects(segment1)).toBe(false)
    })
  })

  describe('intersectsHorizontalRay', () => {
    it('should return true when ray crosses segment from left', () => {
      const segment = new Segment2D({
        start: new Point2D({ x: 5, y: 0 }),
        end: new Point2D({ x: 5, y: 10 }),
      })
      const point = new Point2D({ x: 0, y: 5 })

      expect(segment.intersectsHorizontalRay(point)).toBe(true)
    })

    it('should return false when ray does not cross segment', () => {
      const segment = new Segment2D({
        start: new Point2D({ x: 5, y: 0 }),
        end: new Point2D({ x: 5, y: 10 }),
      })
      const point = new Point2D({ x: 10, y: 5 })

      expect(segment.intersectsHorizontalRay(point)).toBe(false)
    })

    it('should return false when point is above segment', () => {
      const segment = new Segment2D({
        start: new Point2D({ x: 0, y: 0 }),
        end: new Point2D({ x: 10, y: 0 }),
      })
      const point = new Point2D({ x: 5, y: 5 })

      expect(segment.intersectsHorizontalRay(point)).toBe(false)
    })

    it('should return false when point is below segment', () => {
      const segment = new Segment2D({
        start: new Point2D({ x: 0, y: 10 }),
        end: new Point2D({ x: 10, y: 10 }),
      })
      const point = new Point2D({ x: 5, y: 5 })

      expect(segment.intersectsHorizontalRay(point)).toBe(false)
    })

    it('should handle diagonal segments correctly', () => {
      const segment = new Segment2D({
        start: new Point2D({ x: 0, y: 0 }),
        end: new Point2D({ x: 10, y: 10 }),
      })
      const pointLeft = new Point2D({ x: 2, y: 5 })
      const pointRight = new Point2D({ x: 8, y: 5 })

      expect(segment.intersectsHorizontalRay(pointLeft)).toBe(true)
      expect(segment.intersectsHorizontalRay(pointRight)).toBe(false)
    })

    it('should handle segment with different orientations', () => {
      // Segment going down
      const segment1 = new Segment2D({
        start: new Point2D({ x: 5, y: 10 }),
        end: new Point2D({ x: 5, y: 0 }),
      })
      // Segment going up
      const segment2 = new Segment2D({
        start: new Point2D({ x: 5, y: 0 }),
        end: new Point2D({ x: 5, y: 10 }),
      })

      const point = new Point2D({ x: 0, y: 5 })

      expect(segment1.intersectsHorizontalRay(point)).toBe(true)
      expect(segment2.intersectsHorizontalRay(point)).toBe(true)
    })
  })
})
