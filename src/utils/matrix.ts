import { roundToPrecision } from './math'

export type Matrix = number[][]

export const getIdentifyMatrix = (size: number): Matrix => {
  const matrix: Matrix = []
  for (let i = 0; i < size; i++) {
    const row = []
    for (let j = 0; j < size; j++) {
      row.push(i === j ? 1 : 0)
    }
    matrix.push(row)
  }
  return matrix
}

export const pivotMatrix = (matrix: Matrix, row: number, col: number): Matrix => {
  const pivotValue = matrix[row]![col]
  const newMatrix = matrix.map((r, i) => {
    if (i === row) {
      return r.map((element) => element / pivotValue!)
    }
    return r
  })

  return newMatrix
}

export const augmentMatrix = (matrix: Matrix, augmentWith: Matrix): Matrix => {
  return matrix.map((row, i) => [...row, ...augmentWith[i]!])
}

export const reduceMatrix = (matrix: Matrix, size: number): Matrix => {
  return matrix.map((row) => row.slice(size))
}

const findPivotRow = (matrix: Matrix, col: number, startRow: number): number => {
  let pivotRow = startRow
  for (let i = startRow + 1; i < matrix.length; i++) {
    if (Math.abs(matrix[i]![col]!) > Math.abs(matrix[pivotRow]![col]!)) {
      pivotRow = i
    }
  }
  return pivotRow
}

const swapRows = (matrix: Matrix, row1: number, row2: number): void => {
  const temp = matrix[row1]
  matrix[row1] = matrix[row2]!
  matrix[row2] = temp!
}

const normalizeRow = (matrix: Matrix, row: number, col: number): void => {
  const pivotValue = matrix[row]![col]!
  for (const j in matrix[row]!) {
    matrix[row][j]! /= pivotValue
  }
}

const eliminateColumn = (matrix: Matrix, pivotRow: number, col: number): void => {
  for (let i = 0; i < matrix.length; i++) {
    if (i !== pivotRow) {
      const factor = matrix[i]![col]!
      for (let j = 0; j < matrix[i]!.length; j++) {
        matrix[i]![j]! -= factor * matrix[pivotRow]![j]!
      }
    }
  }
}

export const invertMatrix = (matrix: Matrix): Matrix | null => {
  const size = matrix.length
  const identity = getIdentifyMatrix(size)
  const augmented = augmentMatrix(matrix, identity)

  for (let i = 0; i < size; i++) {
    const pivotRow = findPivotRow(augmented, i, i)
    if (augmented[pivotRow]![i] === 0) {
      return null
    }

    swapRows(augmented, i, pivotRow)
    normalizeRow(augmented, i, i)
    eliminateColumn(augmented, i, i)
  }

  return reduceMatrix(augmented, size)
}

export const solveLinearEquations = (matrix: Matrix, constants: number[]): number[] | null => {
  const inverseMatrix = invertMatrix(matrix)
  if (!inverseMatrix) {
    return null
  }
  return inverseMatrix
    .map((row) => row.reduce((sum, value, index) => sum + value * constants[index]!, 0))
    .map((value) => roundToPrecision(value))
}
