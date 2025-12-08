import { Point3D } from './point-3d'

describe('Point3D', () => {
  describe('constructor', () => {
    it('should create a point with given x, y and z values', () => {
      const point = new Point3D({ x: 1, y: 2, z: 3 })

      expect(point).toEqual({
        x: 1,
        y: 2,
        z: 3,
      })
    })
  })

  describe('clone', () => {
    it('should clone a point', () => {
      const point = new Point3D({ x: 1, y: 2, z: 3 })
      const clone = point.clone()

      expect(clone).not.toBe(point)
      expect(clone).toEqual(point)
    })
  })

  describe('isSame', () => {
    it('should return true if the points are the same', () => {
      const point1 = new Point3D({ x: 1, y: 2, z: 3 })
      const point2 = new Point3D({ x: 1, y: 2, z: 3 })

      expect(point1.isSame(point2)).toBe(true)
    })

    it('should return false if x differs', () => {
      const point1 = new Point3D({ x: 1, y: 2, z: 3 })
      const point2 = new Point3D({ x: 4, y: 2, z: 3 })

      expect(point1.isSame(point2)).toBe(false)
    })

    it('should return false if y differs', () => {
      const point1 = new Point3D({ x: 1, y: 2, z: 3 })
      const point2 = new Point3D({ x: 1, y: 5, z: 3 })

      expect(point1.isSame(point2)).toBe(false)
    })

    it('should return false if z differs', () => {
      const point1 = new Point3D({ x: 1, y: 2, z: 3 })
      const point2 = new Point3D({ x: 1, y: 2, z: 6 })

      expect(point1.isSame(point2)).toBe(false)
    })
  })

  describe('hash', () => {
    it('should return a string with x, y and z values separated by slashes', () => {
      const point = new Point3D({ x: 3, y: -8, z: 15 })

      expect(point.hash).toBe('3/-8/15')
    })
  })

  describe('fromHash', () => {
    it('should create a point from a hash string', () => {
      const point = Point3D.fromHash('3/-8/15')

      expect(point).toEqual({
        x: 3,
        y: -8,
        z: 15,
      })
    })
  })

  describe('getEuclideanDistance', () => {
    it('should return the euclidean distance between two points', () => {
      const point1 = new Point3D({ x: 0, y: 0, z: 0 })
      const point2 = new Point3D({ x: 3, y: 4, z: 0 })

      expect(point1.getEuclideanDistance(point2)).toBe(5)
    })

    it('should return the euclidean distance for 3D points', () => {
      const point1 = new Point3D({ x: 1, y: 2, z: 3 })
      const point2 = new Point3D({ x: 4, y: 6, z: 8 })

      // sqrt((4-1)² + (6-2)² + (8-3)²) = sqrt(9 + 16 + 25) = sqrt(50) ≈ 7.071
      expect(point1.getEuclideanDistance(point2)).toBeCloseTo(7.071, 3)
    })

    it('should return 0 if the points are the same', () => {
      const point1 = new Point3D({ x: 5, y: 10, z: 15 })
      const point2 = new Point3D({ x: 5, y: 10, z: 15 })

      expect(point1.getEuclideanDistance(point2)).toBe(0)
    })

    it('should handle negative coordinates', () => {
      const point1 = new Point3D({ x: -1, y: -2, z: -3 })
      const point2 = new Point3D({ x: 2, y: 2, z: 1 })

      // sqrt((2-(-1))² + (2-(-2))² + (1-(-3))²) = sqrt(9 + 16 + 16) = sqrt(41) ≈ 6.403
      expect(point1.getEuclideanDistance(point2)).toBeCloseTo(6.403, 3)
    })

    it('should be commutative', () => {
      const point1 = new Point3D({ x: 1, y: 2, z: 3 })
      const point2 = new Point3D({ x: 7, y: 9, z: 5 })

      expect(point1.getEuclideanDistance(point2)).toBe(point2.getEuclideanDistance(point1))
    })
  })
})
