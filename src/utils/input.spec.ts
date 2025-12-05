import { FixedGrid2D } from './fixed-grid-2d'
import { parseInputToGrid, parseTwoPartsInput } from './input'

describe('parseInputToGrid', () => {
  it('should parse input strings into a FixedGrid2D', () => {
    const input = ['abc', 'def', 'ghi']
    const grid = parseInputToGrid(input)

    expect(grid).toBeInstanceOf(FixedGrid2D)
    expect(grid.toString()).toEqual('abc\ndef\nghi')
  })
})

describe('parseTwoPartsInput', () => {
  it('should split input into two parts separated by empty line', () => {
    const input = ['line1', 'line2', '', 'line3', 'line4']
    const result = parseTwoPartsInput(input)

    expect(result).toEqual({
      part1: ['line1', 'line2'],
      part2: ['line3', 'line4'],
    })
  })

  it('should handle input with only part1', () => {
    const input = ['line1', 'line2', '']
    const result = parseTwoPartsInput(input)

    expect(result).toEqual({
      part1: ['line1', 'line2'],
      part2: [],
    })
  })

  it('should handle input with empty part1', () => {
    const input = ['', 'line1', 'line2']
    const result = parseTwoPartsInput(input)

    expect(result).toEqual({
      part1: [],
      part2: ['line1', 'line2'],
    })
  })

  it('should handle input with multiple sections using first empty line', () => {
    const input = ['line1', '', 'line2', '', 'line3']
    const result = parseTwoPartsInput(input)

    expect(result).toEqual({
      part1: ['line1'],
      part2: ['line2', '', 'line3'],
    })
  })
})
