import { count, max, min, multiply, split, sum } from './array'

describe('Array', () => {
  describe('sum', () => {
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

  describe('multiply', () => {
    it('Should return the product of the list', () => {
      expect(multiply([1, 2, 3, 4, 5])).toBe(120)
    })

    it('Should return the only value in a list of 1 element', () => {
      expect(multiply([5])).toBe(5)
    })

    it('Should throw an error when the list is empty.', () => {
      expect(() => multiply([])).toThrow('Empty list')
    })
  })

  describe('min', () => {
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

  describe('max', () => {
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

  describe('count', () => {
    it('Should return the count of elements greater than 3', () => {
      expect(count([1, 2, 3, 4, 5], (x) => x > 3)).toBe(2)
    })

    it('Should return the count of strings with length greater than 2', () => {
      expect(count(['aa', 'bbb', 'cccc', 'ddddddd', 'ee'], (x) => x.length > 2)).toBe(3)
    })

    it('Should return the length of the list if all elements match the predicate', () => {
      expect(count([1, 2, 3, 4, 5], (x) => x > 0)).toBe(5)
    })

    it('Should return 0 for an empty list', () => {
      expect(count([], (x) => x > 0)).toBe(0)
    })
  })

  describe('split', () => {
    it('Should split array in multiple array while excluding the separator', () => {
      expect(split([1, 2, 3, 4, 5, 6, 7, 8, 9], 5)).toEqual([
        [1, 2, 3, 4],
        [6, 7, 8, 9],
      ])
    })

    it('Should return the original array if the separator is not found', () => {
      expect(split([1, 2, 3, 4, 5, 6, 7, 8, 9], 10)).toEqual([[1, 2, 3, 4, 5, 6, 7, 8, 9]])
    })

    it('Should return an empty array if the input array is empty', () => {
      expect(split([], 10)).toEqual([[]])
    })

    it('Should return an array of empty array if the separator is the first element', () => {
      expect(split([1, 2, 3, 4, 5, 6, 7, 8, 9], 1)).toEqual([[], [2, 3, 4, 5, 6, 7, 8, 9]])
    })

    it('Should return an array of empty array if the separator is the last element', () => {
      expect(split([1, 2, 3, 4, 5, 6, 7, 8, 9], 9)).toEqual([[1, 2, 3, 4, 5, 6, 7, 8], []])
    })

    it('Should return an array of empty array if the separator is the only element', () => {
      expect(split([1], 1)).toEqual([[], []])
    })

    it('Should split srting array', () => {
      expect(split(['hello', '', 'world'], '')).toEqual([['hello'], ['world']])
    })
  })
})
