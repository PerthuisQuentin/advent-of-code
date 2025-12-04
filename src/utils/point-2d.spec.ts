import { Point2D } from './point-2d'

describe('Point2D', () => {
  describe('constructor', () => {
    it('should create a point with given x and y values', () => {
      const point = new Point2D({ x: 1, y: 2 })

      expect(point).toEqual({
        x: 1,
        y: 2,
      })
    })
  })

  describe('clone', () => {
    it('should clone a point', () => {
      const point = new Point2D({ x: 1, y: 2 })
      const clone = point.clone()

      expect(clone).not.toBe(point)
      expect(clone).toEqual(point)
    })
  })

  describe('isSame', () => {
    it('should return true if the points are the same', () => {
      const point1 = new Point2D({ x: 1, y: 2 })
      const point2 = new Point2D({ x: 1, y: 2 })

      expect(point1.isSame(point2)).toBe(true)
    })

    it('should return false if the points are different', () => {
      const point1 = new Point2D({ x: 1, y: 2 })
      const point2 = new Point2D({ x: 3, y: 4 })

      expect(point1.isSame(point2)).toBe(false)
    })
  })

  describe('hash', () => {
    it('should return a string with x and y values separated by a slash', () => {
      const point = new Point2D({ x: 3, y: -8 })

      expect(point.hash).toBe('3/-8')
    })
  })

  describe('fromHash', () => {
    it('should create a point from a hash string', () => {
      const point = Point2D.fromHash('3/-8')

      expect(point).toEqual({
        x: 3,
        y: -8,
      })
    })
  })

  describe('add', () => {
    it('should add two points', () => {
      const point1 = new Point2D({ x: 1, y: 2 })
      const point2 = new Point2D({ x: 3, y: 4 })
      const result = point1.add(point2)

      expect(result).toEqual({
        x: 4,
        y: 6,
      })
    })
  })

  describe('subtract', () => {
    it('should subtract two points', () => {
      const point1 = new Point2D({ x: 1, y: 2 })
      const point2 = new Point2D({ x: 3, y: 4 })
      const result = point1.subtract(point2)

      expect(result).toEqual({
        x: -2,
        y: -2,
      })
    })
  })

  describe('multiply', () => {
    it('should multiply a point by a factor', () => {
      const point = new Point2D({ x: 1, y: 2 })
      const result = point.multiply(3)

      expect(result).toEqual({
        x: 3,
        y: 6,
      })
    })
  })

  describe('getMirroredPoint', () => {
    it('should return the mirrored point across the given mirror point', () => {
      const point = new Point2D({ x: 1, y: 2 })
      const mirrorPoint = new Point2D({ x: 3, y: 4 })
      const result = point.getMirroredPoint(mirrorPoint)

      expect(result).toEqual({
        x: 5,
        y: 6,
      })
    })

    it('should return the same point if the point is the same as the mirror point', () => {
      const point = new Point2D({ x: 3, y: 4 })
      const mirrorPoint = new Point2D({ x: 3, y: 4 })
      const result = point.getMirroredPoint(mirrorPoint)

      expect(result).toEqual({
        x: 3,
        y: 4,
      })
    })

    it('should return the mirrored point across the given mirror point with negative values', () => {
      const point = new Point2D({ x: -1, y: -2 })
      const mirrorPoint = new Point2D({ x: -3, y: -4 })
      const result = point.getMirroredPoint(mirrorPoint)

      expect(result).toEqual({
        x: -5,
        y: -6,
      })
    })
  })

  describe('getNeighbors', () => {
    it('should return the four neighboring points', () => {
      const point = new Point2D({ x: 2, y: 3 })
      const neighbors = point.getNeighbors()

      expect(neighbors).toEqual([
        new Point2D({ x: 1, y: 3 }),
        new Point2D({ x: 2, y: 2 }),
        new Point2D({ x: 3, y: 3 }),
        new Point2D({ x: 2, y: 4 }),
      ])
    })

    it('should return the correct neighbors for a point at the origin', () => {
      const point = new Point2D({ x: 0, y: 0 })
      const neighbors = point.getNeighbors()

      expect(neighbors).toEqual([
        new Point2D({ x: -1, y: 0 }),
        new Point2D({ x: 0, y: -1 }),
        new Point2D({ x: 1, y: 0 }),
        new Point2D({ x: 0, y: 1 }),
      ])
    })
  })

  describe('getNeighborsDiagonal', () => {
    it('should return the four diagonal neighboring points', () => {
      const point = new Point2D({ x: 2, y: 3 })
      const neighbors = point.getNeighborsDiagonal()

      expect(neighbors).toEqual([
        new Point2D({ x: 1, y: 2 }),
        new Point2D({ x: 1, y: 4 }),
        new Point2D({ x: 3, y: 2 }),
        new Point2D({ x: 3, y: 4 }),
      ])
    })

    it('should return the correct diagonal neighbors for a point at the origin', () => {
      const point = new Point2D({ x: 0, y: 0 })
      const neighbors = point.getNeighborsDiagonal()

      expect(neighbors).toEqual([
        new Point2D({ x: -1, y: -1 }),
        new Point2D({ x: -1, y: 1 }),
        new Point2D({ x: 1, y: -1 }),
        new Point2D({ x: 1, y: 1 }),
      ])
    })
  })

  describe('getNeighborsAll', () => {
    it('should return all eight neighboring points', () => {
      const point = new Point2D({ x: 2, y: 3 })
      const neighbors = point.getNeighborsAll()

      expect(neighbors).toEqual([
        new Point2D({ x: 1, y: 3 }),
        new Point2D({ x: 2, y: 2 }),
        new Point2D({ x: 3, y: 3 }),
        new Point2D({ x: 2, y: 4 }),
        new Point2D({ x: 1, y: 2 }),
        new Point2D({ x: 1, y: 4 }),
        new Point2D({ x: 3, y: 2 }),
        new Point2D({ x: 3, y: 4 }),
      ])
    })

    it('should return all eight neighbors for a point at the origin', () => {
      const point = new Point2D({ x: 0, y: 0 })
      const neighbors = point.getNeighborsAll()

      expect(neighbors).toEqual([
        new Point2D({ x: -1, y: 0 }),
        new Point2D({ x: 0, y: -1 }),
        new Point2D({ x: 1, y: 0 }),
        new Point2D({ x: 0, y: 1 }),
        new Point2D({ x: -1, y: -1 }),
        new Point2D({ x: -1, y: 1 }),
        new Point2D({ x: 1, y: -1 }),
        new Point2D({ x: 1, y: 1 }),
      ])
    })
  })

  describe('isOnSameLine', () => {
    it('should return true if the points are on the same X', () => {
      const point1 = new Point2D({ x: 1, y: 2 })
      const point2 = new Point2D({ x: 1, y: 4 })

      expect(point1.isOnSameLine(point2)).toBe(true)
    })

    it('should return true if the points are on the same Y', () => {
      const point1 = new Point2D({ x: 1, y: 2 })
      const point2 = new Point2D({ x: 3, y: 2 })

      expect(point1.isOnSameLine(point2)).toBe(true)
    })

    it('should return false if the points are not on the same line', () => {
      const point1 = new Point2D({ x: 1, y: 2 })
      const point2 = new Point2D({ x: 3, y: 4 })

      expect(point1.isOnSameLine(point2)).toBe(false)
    })
  })

  describe('getManhattanDistance', () => {
    it('should return the manhattan distance between two points', () => {
      const point1 = new Point2D({ x: 1, y: 2 })
      const point2 = new Point2D({ x: 4, y: 6 })

      expect(point1.getManhattanDistance(point2)).toBe(7)
    })

    it('should return the manhattan distance between two points with negative values', () => {
      const point1 = new Point2D({ x: -1, y: -2 })
      const point2 = new Point2D({ x: -4, y: -6 })

      expect(point1.getManhattanDistance(point2)).toBe(7)
    })

    it('should return 0 if the points are the same', () => {
      const point1 = new Point2D({ x: 1, y: 2 })
      const point2 = new Point2D({ x: 1, y: 2 })

      expect(point1.getManhattanDistance(point2)).toBe(0)
    })

    it('should return 1 if the points are adjacent', () => {
      const point1 = new Point2D({ x: 1, y: 2 })
      const point2 = new Point2D({ x: 2, y: 2 })

      expect(point1.getManhattanDistance(point2)).toBe(1)
    })

    it('should return 2 if the points are adjacent diagonally', () => {
      const point1 = new Point2D({ x: 1, y: 2 })
      const point2 = new Point2D({ x: 2, y: 3 })

      expect(point1.getManhattanDistance(point2)).toBe(2)
    })
  })

  describe('getMiddlePoint', () => {
    it('should return the middle point between two points', () => {
      const point1 = new Point2D({ x: 1, y: 2 })
      const point2 = new Point2D({ x: 5, y: 6 })
      const result = point1.getMiddlePoint(point2)

      expect(result).toEqual({
        x: 3,
        y: 4,
      })
    })

    it('should return the middle point between two points with negative values', () => {
      const point1 = new Point2D({ x: -1, y: -2 })
      const point2 = new Point2D({ x: -5, y: -6 })
      const result = point1.getMiddlePoint(point2)

      expect(result).toEqual({
        x: -3,
        y: -4,
      })
    })

    it('should return the same point if the points are the same', () => {
      const point1 = new Point2D({ x: 1, y: 2 })
      const point2 = new Point2D({ x: 1, y: 2 })
      const result = point1.getMiddlePoint(point2)

      expect(result).toEqual({
        x: 1,
        y: 2,
      })
    })

    it('should return the middle point between two points with negative values', () => {
      const point1 = new Point2D({ x: -1, y: -2 })
      const point2 = new Point2D({ x: -5, y: -6 })
      const result = point1.getMiddlePoint(point2)

      expect(result).toEqual({
        x: -3,
        y: -4,
      })
    })
  })

  describe('getPointsOnLineTo', () => {
    it('Should return all points on the line between the two points', () => {
      const point1 = new Point2D({ x: 0, y: 1 })
      const point2 = new Point2D({ x: 6, y: 4 })
      const points = point1.getPointsOnLineTo(point2)

      expect(points).toEqual([
        new Point2D({ x: 0, y: 1 }),
        new Point2D({ x: 1, y: 1 }),
        new Point2D({ x: 2, y: 2 }),
        new Point2D({ x: 3, y: 2 }),
        new Point2D({ x: 4, y: 3 }),
        new Point2D({ x: 5, y: 3 }),
        new Point2D({ x: 6, y: 4 }),
      ])
    })

    it('Should return all points on the line between the two points on a 1:1 diagonal', () => {
      const point1 = new Point2D({ x: 1, y: 1 })
      const point2 = new Point2D({ x: 4, y: 4 })
      const points = point1.getPointsOnLineTo(point2)

      expect(points).toEqual([
        new Point2D({ x: 1, y: 1 }),
        new Point2D({ x: 2, y: 2 }),
        new Point2D({ x: 3, y: 3 }),
        new Point2D({ x: 4, y: 4 }),
      ])
    })

    it('Should return the same point when the two points are the same', () => {
      const point1 = new Point2D({ x: 1, y: 1 })
      const point2 = new Point2D({ x: 1, y: 1 })
      const points = point1.getPointsOnLineTo(point2)

      expect(points).toEqual([new Point2D({ x: 1, y: 1 })])
    })

    it('Should return all points on the line between two points at the same X', () => {
      const point1 = new Point2D({ x: 1, y: 1 })
      const point2 = new Point2D({ x: 1, y: 5 })
      const points = point1.getPointsOnLineTo(point2)

      expect(points).toEqual([
        new Point2D({ x: 1, y: 1 }),
        new Point2D({ x: 1, y: 2 }),
        new Point2D({ x: 1, y: 3 }),
        new Point2D({ x: 1, y: 4 }),
        new Point2D({ x: 1, y: 5 }),
      ])
    })

    it('Should return all points on the line between two points at the same Y', () => {
      const point1 = new Point2D({ x: 3, y: 2 })
      const point2 = new Point2D({ x: 6, y: 2 })
      const points = point1.getPointsOnLineTo(point2)

      expect(points).toEqual([
        new Point2D({ x: 3, y: 2 }),
        new Point2D({ x: 4, y: 2 }),
        new Point2D({ x: 5, y: 2 }),
        new Point2D({ x: 6, y: 2 }),
      ])
    })
  })
})
