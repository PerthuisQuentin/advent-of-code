import {
  augmentMatrix,
  getIdentifyMatrix,
  invertMatrix,
  Matrix,
  pivotMatrix,
  reduceMatrix,
  solveLinearEquations,
} from './matrix'

const isClose = (a: number, b: number, epsilon = 1e-10): boolean => Math.abs(a - b) < epsilon

const arrayCloseTo = (received: number[], expected: number[], epsilon = 1e-10): boolean => {
  if (received.length !== expected.length) return false
  for (let i = 0; i < received.length; i++) {
    if (!isClose(received[i]!, expected[i]!, epsilon)) return false
  }
  return true
}

const matrixCloseTo = (received: Matrix, expected: Matrix): boolean => {
  if (received.length !== expected.length) return false
  for (let i = 0; i < received.length; i++) {
    if (received[i]!.length !== expected[i]!.length) return false
    for (let j = 0; j < received[i]!.length; j++) {
      if (!isClose(received[i]![j]!, expected[i]![j]!)) return false
    }
  }
  return true
}

describe('Matrix', () => {
  describe('getIdentifyMatrix', () => {
    it('Should return an identify matrix of size 1', () => {
      expect(getIdentifyMatrix(1)).toEqual([[1]])
    })

    it('Should return an identify matrix of size 2', () => {
      expect(getIdentifyMatrix(2)).toEqual([
        [1, 0],
        [0, 1],
      ])
    })

    it('Should return an identify matrix of size 3', () => {
      expect(getIdentifyMatrix(3)).toEqual([
        [1, 0, 0],
        [0, 1, 0],
        [0, 0, 1],
      ])
    })
  })

  describe('pivotMatrix', () => {
    it('Should pivot the matrix correctly for row 0 and col 0', () => {
      const matrix = [
        [2, 4],
        [1, 3],
      ]
      const result = pivotMatrix(matrix, 0, 0)
      expect(result).toEqual([
        [1, 2],
        [1, 3],
      ])
    })

    it('Should pivot the matrix correctly for row 1 and col 1', () => {
      const matrix = [
        [2, 4],
        [1, 3],
      ]
      const result = pivotMatrix(matrix, 1, 1)
      expect(result).toEqual([
        [2, 4],
        [1 / 3, 1],
      ])
    })

    it('Should handle pivoting with zero correctly', () => {
      const matrix = [
        [0, 2],
        [1, 3],
      ]
      const result = pivotMatrix(matrix, 0, 1)
      expect(result).toEqual([
        [0, 1],
        [1, 3],
      ])
    })

    it('Should pivot the matrix correctly for a larger matrix (3x3)', () => {
      const matrix = [
        [3, 6, 9],
        [2, 4, 8],
        [1, 2, 3],
      ]
      const result = pivotMatrix(matrix, 0, 0)
      expect(result).toEqual([
        [1, 2, 3],
        [2, 4, 8],
        [1, 2, 3],
      ])
    })

    it('Should pivot the matrix correctly for a larger matrix (4x4)', () => {
      const matrix = [
        [4, 8, 12, 16],
        [3, 6, 9, 12],
        [2, 4, 6, 8],
        [1, 2, 3, 4],
      ]
      const result = pivotMatrix(matrix, 1, 1)
      expect(result).toEqual([
        [4, 8, 12, 16],
        [0.5, 1, 1.5, 2],
        [2, 4, 6, 8],
        [1, 2, 3, 4],
      ])
    })
  })

  describe('augmentMatrix', () => {
    it('Should augment a 2x2 matrix with a 2x2 identity matrix', () => {
      const matrix = [
        [1, 2],
        [3, 4],
      ]
      const identity = getIdentifyMatrix(2)
      const result = augmentMatrix(matrix, identity)
      expect(result).toEqual([
        [1, 2, 1, 0],
        [3, 4, 0, 1],
      ])
    })

    it('Should augment a 3x3 matrix with a 3x3 identity matrix', () => {
      const matrix = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
      ]
      const identity = getIdentifyMatrix(3)
      const result = augmentMatrix(matrix, identity)
      expect(result).toEqual([
        [1, 2, 3, 1, 0, 0],
        [4, 5, 6, 0, 1, 0],
        [7, 8, 9, 0, 0, 1],
      ])
    })

    it('Should augment a 2x2 matrix with another 2x2 matrix', () => {
      const matrix = [
        [1, 2],
        [3, 4],
      ]
      const augmentWith = [
        [5, 6],
        [7, 8],
      ]
      const result = augmentMatrix(matrix, augmentWith)
      expect(result).toEqual([
        [1, 2, 5, 6],
        [3, 4, 7, 8],
      ])
    })
  })

  describe('reduceMatrix', () => {
    it('Should reduce a 2x4 matrix to a 2x2 matrix', () => {
      const matrix = [
        [1, 2, 3, 4],
        [5, 6, 7, 8],
      ]
      const result = reduceMatrix(matrix, 2)
      expect(result).toEqual([
        [3, 4],
        [7, 8],
      ])
    })

    it('Should reduce a 3x6 matrix to a 3x3 matrix', () => {
      const matrix = [
        [1, 2, 3, 4, 5, 6],
        [7, 8, 9, 10, 11, 12],
        [13, 14, 15, 16, 17, 18],
      ]
      const result = reduceMatrix(matrix, 3)
      expect(result).toEqual([
        [4, 5, 6],
        [10, 11, 12],
        [16, 17, 18],
      ])
    })

    it('Should reduce a 2x3 matrix to a 2x1 matrix', () => {
      const matrix = [
        [1, 2, 3],
        [4, 5, 6],
      ]
      const result = reduceMatrix(matrix, 2)
      expect(result).toEqual([[3], [6]])
    })
  })

  describe('invertMatrix', () => {
    it('Should return the inverse of a 2x2 matrix', () => {
      const matrix = [
        [4, 7],
        [2, 6],
      ]
      const result = invertMatrix(matrix)
      const expected = [
        [0.6, -0.7],
        [-0.2, 0.4],
      ]
      expect(matrixCloseTo(result!, expected)).toBe(true)
    })

    it('Should return the inverse of a 3x3 matrix', () => {
      const matrix = [
        [3, 0, 2],
        [2, 0, -2],
        [0, 1, 1],
      ]
      const result = invertMatrix(matrix)
      const expected = [
        [0.2, 0.2, 0],
        [-0.2, 0.3, 1],
        [0.2, -0.3, 0],
      ]
      expect(matrixCloseTo(result!, expected)).toBe(true)
    })

    it('Should return null for a non-invertible matrix', () => {
      const matrix = [
        [1, 2],
        [2, 4],
      ]
      const result = invertMatrix(matrix)
      expect(result).toBeNull()
    })
  })

  describe('solveLinearEquations', () => {
    it('Should solve a system of linear equations for a 3x3 matrix', () => {
      const matrix = [
        [1, -1, 3],
        [2, 1, 2],
        [-2, -2, 1],
      ]
      const constants = [2, 2, 3]
      const result = solveLinearEquations(matrix, constants)
      const expected = [-3, 14 / 5, 13 / 5]
      expect(arrayCloseTo(result!, expected)).toBe(true)
    })

    it('Should return null for a non-invertible matrix', () => {
      const matrix = [
        [1, 2],
        [2, 4],
      ]
      const constants = [5, 10]
      const result = solveLinearEquations(matrix, constants)
      expect(result).toBeNull()
    })
  })
})
