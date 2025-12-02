type Range = { start: string; end: string }

export const parseInput = (input: string): Range[] => {
  const ranges = input.split(',')
  return ranges.map((range) => {
    const [start, end] = range.split('-')
    if (!start || !end) throw new Error('Invalid input range')
    return { start, end }
  })
}

export const hasRepeatingPattern = (id: string, length: number): boolean => {
  if (length <= 0 || length > id.length / 2) return false

  const pattern = id.substring(0, length)
  for (let i = length; i < id.length; i += length) {
    const segment = id.substring(i, i + length)
    if (segment !== pattern) {
      return false
    }
  }
  return true
}

export const isInvalidId = (id: string): boolean => {
  if (id.length % 2 === 1) return false
  return hasRepeatingPattern(id, Math.floor(id.length / 2))
}

export const getRangeInvalidIds = (range: Range, isInvalid: (id: string) => boolean): number[] => {
  const start = parseInt(range.start, 10)
  const end = parseInt(range.end, 10)

  const invalidIds = []

  for (let i = start; i <= end; i++) {
    if (isInvalid(i.toString())) {
      invalidIds.push(i)
    }
  }

  return invalidIds
}

export const getResponse = (input: string[]): string => {
  const ranges = parseInput(input[0]!)

  const invalidIds = ranges.flatMap((range) => getRangeInvalidIds(range, isInvalidId))

  return invalidIds.reduce((sum, id) => sum + id, 0).toString()
}
