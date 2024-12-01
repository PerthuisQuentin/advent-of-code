import { max, min, sum } from './array'

describe('Array', () => {
  describe('Sum', () => {
    it('Should return the sum of the list', () => {
      expect(sum([1, 2, 3, 4, 5])).toBe(15)
    })

    it('Should return the only value in a list of 1 element', () => {
      expect(sum([5])).toBe(5)
    })

    it('Should throw an error when the list is empty.', () => {
      expect(() => sum([])).toThrow('Empty list')
    })
  })

  describe('Min', () => {
    it('Should return the min of the list', () => {
      expect(min([4, 8, 3, 9, 4])).toBe(3)
    })

    it('Should return the only value in a list of 1 element', () => {
      expect(min([5])).toBe(5)
    })

    it('Should throw an error when the list is empty.', () => {
      expect(() => min([])).toThrow('Empty list')
    })
  })

  describe('Max', () => {
    it('Should return the max of the list', () => {
      expect(max([4, 8, 3, 9, 4])).toBe(9)
    })

    it('Should return the only value in a list of 1 element', () => {
      expect(max([5])).toBe(5)
    })

    it('Should throw an error when the list is empty.', () => {
      expect(() => max([])).toThrow('Empty list')
    })
  })
})
