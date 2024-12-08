import { FixedGrid2D } from './fixed-grid-2d'
import { parseInputToGrid } from './input'

describe('parseInputToGrid', () => {
  it('should parse input strings into a FixedGrid2D', () => {
    const input = ['abc', 'def', 'ghi']
    const grid = parseInputToGrid(input)

    expect(grid).toBeInstanceOf(FixedGrid2D)
    expect(grid.toString()).toEqual('abc\ndef\nghi')
  })
})
