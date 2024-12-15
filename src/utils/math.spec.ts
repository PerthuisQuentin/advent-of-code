import { isRound, roundToPrecision } from './math'

describe('Math', () => {
  describe('isRound', () => {
    it('should return true if the number is round', () => {
      expect(isRound(1)).toBe(true)
    })

    it('should return false if the number is not round', () => {
      expect(isRound(1.1)).toBe(false)
    })
  })

  describe('roundToPrecision', () => {
    it('should round the number to the given precision', () => {
      expect(roundToPrecision(1.123456789, 2)).toBe(1.12)
    })

    it('should round the number to 10 by default', () => {
      expect(roundToPrecision(1.123456789)).toBe(1.123456789)
    })
  })
})
