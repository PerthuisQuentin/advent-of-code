import { Range } from './range'

describe('Range', () => {
  describe('constructor', () => {
    it('should create a range with given start and end values', () => {
      const range = new Range(1, 10)

      expect(range).toEqual({
        start: 1,
        end: 10,
        startInclusive: true,
        endInclusive: true,
      })
    })

    it('should create a range with custom inclusive flags', () => {
      const range = new Range(1, 10, false, false)

      expect(range).toEqual({
        start: 1,
        end: 10,
        startInclusive: false,
        endInclusive: false,
      })
    })

    it('should create a range with only start exclusive', () => {
      const range = new Range(1, 10, false, true)

      expect(range).toEqual({
        start: 1,
        end: 10,
        startInclusive: false,
        endInclusive: true,
      })
    })

    it('should create a range with only end exclusive', () => {
      const range = new Range(1, 10, true, false)

      expect(range).toEqual({
        start: 1,
        end: 10,
        startInclusive: true,
        endInclusive: false,
      })
    })
  })

  describe('clone', () => {
    it('should clone a range', () => {
      const range = new Range(1, 10, false, true)
      const clone = range.clone()

      expect(clone).not.toBe(range)
      expect(clone).toEqual(range)
    })
  })

  describe('hash', () => {
    it('should return a hash string for an inclusive range', () => {
      const range = new Range(1, 10)

      expect(range.hash).toBe('1-10-true-true')
    })

    it('should return a hash string for an exclusive range', () => {
      const range = new Range(1, 10, false, false)

      expect(range.hash).toBe('1-10-false-false')
    })

    it('should return a hash string for a partially exclusive range', () => {
      const range = new Range(5, 15, true, false)

      expect(range.hash).toBe('5-15-true-false')
    })
  })

  describe('asInclusive', () => {
    it('should return the same range if already inclusive', () => {
      const range = new Range(1, 10, true, true)
      const inclusive = range.asInclusive()

      expect(inclusive).toEqual({
        start: 1,
        end: 10,
        startInclusive: true,
        endInclusive: true,
      })
    })

    it('should adjust start if start is exclusive', () => {
      const range = new Range(1, 10, false, true)
      const inclusive = range.asInclusive()

      expect(inclusive).toEqual({
        start: 2,
        end: 10,
        startInclusive: true,
        endInclusive: true,
      })
    })

    it('should adjust end if end is exclusive', () => {
      const range = new Range(1, 10, true, false)
      const inclusive = range.asInclusive()

      expect(inclusive).toEqual({
        start: 1,
        end: 9,
        startInclusive: true,
        endInclusive: true,
      })
    })

    it('should adjust both start and end if both are exclusive', () => {
      const range = new Range(1, 10, false, false)
      const inclusive = range.asInclusive()

      expect(inclusive).toEqual({
        start: 2,
        end: 9,
        startInclusive: true,
        endInclusive: true,
      })
    })
  })

  describe('has', () => {
    it('should return true if value is within inclusive range', () => {
      const range = new Range(1, 10)

      expect(range.has(1)).toBe(true)
      expect(range.has(5)).toBe(true)
      expect(range.has(10)).toBe(true)
    })

    it('should return false if value is outside inclusive range', () => {
      const range = new Range(1, 10)

      expect(range.has(0)).toBe(false)
      expect(range.has(11)).toBe(false)
    })

    it('should return false if value is on exclusive start boundary', () => {
      const range = new Range(1, 10, false, true)

      expect(range.has(1)).toBe(false)
      expect(range.has(2)).toBe(true)
    })

    it('should return false if value is on exclusive end boundary', () => {
      const range = new Range(1, 10, true, false)

      expect(range.has(10)).toBe(false)
      expect(range.has(9)).toBe(true)
    })

    it('should return false if value is on exclusive boundaries', () => {
      const range = new Range(1, 10, false, false)

      expect(range.has(1)).toBe(false)
      expect(range.has(10)).toBe(false)
      expect(range.has(5)).toBe(true)
    })
  })

  describe('isSame', () => {
    it('should return true if ranges are identical', () => {
      const range1 = new Range(1, 10, true, true)
      const range2 = new Range(1, 10, true, true)

      expect(range1.isSame(range2)).toBe(true)
    })

    it('should return false if start values differ', () => {
      const range1 = new Range(1, 10)
      const range2 = new Range(2, 10)

      expect(range1.isSame(range2)).toBe(false)
    })

    it('should return false if end values differ', () => {
      const range1 = new Range(1, 10)
      const range2 = new Range(1, 11)

      expect(range1.isSame(range2)).toBe(false)
    })

    it('should return false if startInclusive differs', () => {
      const range1 = new Range(1, 10, true, true)
      const range2 = new Range(1, 10, false, true)

      expect(range1.isSame(range2)).toBe(false)
    })

    it('should return false if endInclusive differs', () => {
      const range1 = new Range(1, 10, true, true)
      const range2 = new Range(1, 10, true, false)

      expect(range1.isSame(range2)).toBe(false)
    })
  })

  describe('intersects', () => {
    it('should return true if ranges overlap', () => {
      const range1 = new Range(1, 10)
      const range2 = new Range(5, 15)

      expect(range1.intersects(range2)).toBe(true)
      expect(range2.intersects(range1)).toBe(true)
    })

    it('should return true if ranges touch at boundaries', () => {
      const range1 = new Range(1, 10)
      const range2 = new Range(10, 20)

      expect(range1.intersects(range2)).toBe(true)
    })

    it('should return false if ranges do not overlap', () => {
      const range1 = new Range(1, 10)
      const range2 = new Range(11, 20)

      expect(range1.intersects(range2)).toBe(false)
      expect(range2.intersects(range1)).toBe(false)
    })

    it('should return true if one range contains the other', () => {
      const range1 = new Range(1, 20)
      const range2 = new Range(5, 15)

      expect(range1.intersects(range2)).toBe(true)
      expect(range2.intersects(range1)).toBe(true)
    })

    it('should handle exclusive boundaries correctly', () => {
      const range1 = new Range(1, 10, true, false)
      const range2 = new Range(10, 20, true, true)

      expect(range1.intersects(range2)).toBe(false)
    })

    it('should return true if exclusive ranges still overlap', () => {
      const range1 = new Range(1, 10, false, false)
      const range2 = new Range(5, 15, false, false)

      expect(range1.intersects(range2)).toBe(true)
    })
  })

  describe('contains', () => {
    it('should return true if range contains another range', () => {
      const range1 = new Range(1, 20)
      const range2 = new Range(5, 15)

      expect(range1.contains(range2)).toBe(true)
    })

    it('should return false if range does not contain another range', () => {
      const range1 = new Range(5, 15)
      const range2 = new Range(1, 20)

      expect(range1.contains(range2)).toBe(false)
    })

    it('should return true if ranges are identical', () => {
      const range1 = new Range(1, 10)
      const range2 = new Range(1, 10)

      expect(range1.contains(range2)).toBe(true)
    })

    it('should return false if ranges partially overlap', () => {
      const range1 = new Range(1, 10)
      const range2 = new Range(5, 15)

      expect(range1.contains(range2)).toBe(false)
    })

    it('should handle exclusive boundaries correctly', () => {
      const range1 = new Range(1, 20, true, true)
      const range2 = new Range(1, 20, false, false)

      expect(range1.contains(range2)).toBe(true)
    })

    it('should return false if contained range extends beyond boundaries', () => {
      const range1 = new Range(1, 20, false, false)
      const range2 = new Range(1, 20, true, true)

      expect(range1.contains(range2)).toBe(false)
    })
  })

  describe('toString', () => {
    it('should return string representation for inclusive range', () => {
      const range = new Range(1, 10)

      expect(range.toString()).toBe('[1, 10]')
    })

    it('should return string representation for exclusive range', () => {
      const range = new Range(1, 10, false, false)

      expect(range.toString()).toBe('(1, 10)')
    })

    it('should return string representation for partially exclusive range', () => {
      const range = new Range(1, 10, true, false)

      expect(range.toString()).toBe('[1, 10)')
    })

    it('should return string representation for start exclusive range', () => {
      const range = new Range(1, 10, false, true)

      expect(range.toString()).toBe('(1, 10]')
    })
  })

  describe('merge', () => {
    it('should merge [1, 10] + [5, 15] = [1, 15]', () => {
      const range1 = new Range(1, 10)
      const range2 = new Range(5, 15)
      const merged = range1.merge(range2)

      expect(merged).toEqual({
        start: 1,
        end: 15,
        startInclusive: true,
        endInclusive: true,
      })
    })

    it('should merge [1, 10] + [10, 20] = [1, 20]', () => {
      const range1 = new Range(1, 10)
      const range2 = new Range(10, 20)
      const merged = range1.merge(range2)

      expect(merged).toEqual({
        start: 1,
        end: 20,
        startInclusive: true,
        endInclusive: true,
      })
    })

    it('should return null for [1, 10] + [11, 20] (no intersection)', () => {
      const range1 = new Range(1, 10)
      const range2 = new Range(11, 20)
      const merged = range1.merge(range2)

      expect(merged).toBeNull()
    })

    it('should merge (11, 20] + [12, 30] = [12, 30]', () => {
      const range1 = new Range(11, 20, false, true)
      const range2 = new Range(12, 30)
      const merged = range1.merge(range2)

      expect(merged).toEqual({
        start: 12,
        end: 30,
        startInclusive: true,
        endInclusive: true,
      })
    })

    it('should merge [1, 10) + [5, 15] = [1, 15]', () => {
      const range1 = new Range(1, 10, true, false)
      const range2 = new Range(5, 15)
      const merged = range1.merge(range2)

      expect(merged).toEqual({
        start: 1,
        end: 15,
        startInclusive: true,
        endInclusive: true,
      })
    })

    it('should merge (1, 10) + (5, 15) = [2, 14]', () => {
      const range1 = new Range(1, 10, false, false)
      const range2 = new Range(5, 15, false, false)
      const merged = range1.merge(range2)

      expect(merged).toEqual({
        start: 2,
        end: 14,
        startInclusive: true,
        endInclusive: true,
      })
    })

    it('should merge [1, 20] + [5, 15] = [1, 20] (contains)', () => {
      const range1 = new Range(1, 20)
      const range2 = new Range(5, 15)
      const merged = range1.merge(range2)

      expect(merged).toEqual({
        start: 1,
        end: 20,
        startInclusive: true,
        endInclusive: true,
      })
    })

    it('should be commutative: (1, 10] + [5, 15) = [5, 15) + (1, 10]', () => {
      const range1 = new Range(1, 10, false, true)
      const range2 = new Range(5, 15, true, false)
      const merged1 = range1.merge(range2)
      const merged2 = range2.merge(range1)

      expect(merged1).toEqual(merged2)
    })
  })

  describe('size', () => {
    it('should return size of inclusive range [1, 10]', () => {
      const range = new Range(1, 10)

      expect(range.size()).toBe(10)
    })

    it('should return size of exclusive range (1, 10)', () => {
      const range = new Range(1, 10, false, false)

      expect(range.size()).toBe(8)
    })

    it('should return size of partially exclusive range [1, 10)', () => {
      const range = new Range(1, 10, true, false)

      expect(range.size()).toBe(9)
    })

    it('should return size of partially exclusive range (1, 10]', () => {
      const range = new Range(1, 10, false, true)

      expect(range.size()).toBe(9)
    })

    it('should return size 1 for single value range [5, 5]', () => {
      const range = new Range(5, 5)

      expect(range.size()).toBe(1)
    })

    it('should return size 0 for empty exclusive range (5, 5)', () => {
      const range = new Range(5, 5, false, false)

      expect(range.size()).toBe(-1)
    })

    it('should return correct size for large range [0, 1000]', () => {
      const range = new Range(0, 1000)

      expect(range.size()).toBe(1001)
    })

    it('should return correct size for negative range [-10, -1]', () => {
      const range = new Range(-10, -1)

      expect(range.size()).toBe(10)
    })
  })
})
