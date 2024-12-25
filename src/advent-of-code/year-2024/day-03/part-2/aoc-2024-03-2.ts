export enum OperationType {
  Multiply = 'mul',
  Do = 'do',
  DoNot = "don't",
}

export type AnyOperation<T extends OperationType, P> = {
  type: T
  payload: P
}

export type OperationMultiply = AnyOperation<OperationType.Multiply, { a: number; b: number }>
export type OperationDo = AnyOperation<OperationType.Do, null>
export type OperationDoNot = AnyOperation<OperationType.DoNot, null>

export type Operation = OperationMultiply | OperationDo | OperationDoNot

export const MULTIPLY_REGEX = /mul\((\d+),(\d+)\)/
export const OPERATIONS_REGEX = /(mul\(\d+,\d+\))|(do\(\))|(don't\(\))/g

export const determineOperation = (operation: string): Operation => {
  const [type] = operation.split('(')

  if (type === OperationType.Multiply) {
    const matches = operation.match(MULTIPLY_REGEX)
    return {
      type: OperationType.Multiply,
      payload: { a: Number(matches![1]), b: Number(matches![2]) },
    }
  } else if (type === OperationType.Do) {
    return { type: OperationType.Do, payload: null }
  } else if (type === OperationType.DoNot) {
    return { type: OperationType.DoNot, payload: null }
  } else {
    throw new Error('Unknown operation')
  }
}

export const parseInput = (input: string[]): Operation[] => {
  const operations = input.map((line) => {
    return Array.from(line.matchAll(OPERATIONS_REGEX)).map((match) => {
      return determineOperation(match[0])
    })
  })

  return operations.flat()
}

export const runOperations = (operations: Operation[]): number => {
  let enabled = true
  let result = 0

  operations.forEach((operation) => {
    if (operation.type === OperationType.Do) {
      enabled = true
    } else if (operation.type === OperationType.DoNot) {
      enabled = false
    } else if (enabled && operation.type === OperationType.Multiply) {
      result += operation.payload.a * operation.payload.b
    }
  })

  return result
}

export const getResponse = (input: string[]): string => {
  const operations = parseInput(input)
  const result = runOperations(operations)
  return result.toString()
}
