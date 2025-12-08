import { UnionFind } from './union-find'

describe('UnionFind', () => {
  type TestElement = { id: number; name: string }

  const createElement = (id: number, name: string): TestElement => ({ id, name })
  const getIdFn = (element: TestElement): number => element.id

  describe('constructor', () => {
    it('should initialize with elements', () => {
      const elements = [createElement(0, 'A'), createElement(1, 'B'), createElement(2, 'C')]
      const uf = new UnionFind(elements, getIdFn)

      expect(uf.getSize(elements[0]!)).toBe(1)
      expect(uf.getSize(elements[1]!)).toBe(1)
      expect(uf.getSize(elements[2]!)).toBe(1)
    })
  })

  describe('union', () => {
    it('should union two elements into the same set', () => {
      const elements = [createElement(0, 'A'), createElement(1, 'B'), createElement(2, 'C')]
      const uf = new UnionFind(elements, getIdFn)

      const result = uf.union(elements[0]!, elements[1]!)

      expect(result).toBe(true)
      expect(uf.areConnected(elements[0]!, elements[1]!)).toBe(true)
    })

    it('should return false when unioning already connected elements', () => {
      const elements = [createElement(0, 'A'), createElement(1, 'B')]
      const uf = new UnionFind(elements, getIdFn)

      uf.union(elements[0]!, elements[1]!)
      const result = uf.union(elements[0]!, elements[1]!)

      expect(result).toBe(false)
    })

    it('should merge sets correctly', () => {
      const elements = [
        createElement(0, 'A'),
        createElement(1, 'B'),
        createElement(2, 'C'),
        createElement(3, 'D'),
      ]
      const uf = new UnionFind(elements, getIdFn)

      uf.union(elements[0]!, elements[1]!) // {A, B}
      uf.union(elements[2]!, elements[3]!) // {C, D}
      uf.union(elements[1]!, elements[2]!) // {A, B, C, D}

      expect(uf.areConnected(elements[0]!, elements[3]!)).toBe(true)
    })
  })

  describe('find', () => {
    it('should return the same root for connected elements', () => {
      const elements = [createElement(0, 'A'), createElement(1, 'B'), createElement(2, 'C')]
      const uf = new UnionFind(elements, getIdFn)

      uf.union(elements[0]!, elements[1]!)

      expect(uf.find(elements[0]!)).toBe(uf.find(elements[1]!))
    })

    it('should return different roots for unconnected elements', () => {
      const elements = [createElement(0, 'A'), createElement(1, 'B')]
      const uf = new UnionFind(elements, getIdFn)

      expect(uf.find(elements[0]!)).not.toBe(uf.find(elements[1]!))
    })
  })

  describe('getSize', () => {
    it('should return 1 for isolated elements', () => {
      const elements = [createElement(0, 'A'), createElement(1, 'B')]
      const uf = new UnionFind(elements, getIdFn)

      expect(uf.getSize(elements[0]!)).toBe(1)
      expect(uf.getSize(elements[1]!)).toBe(1)
    })

    it('should return correct size after union', () => {
      const elements = [createElement(0, 'A'), createElement(1, 'B'), createElement(2, 'C')]
      const uf = new UnionFind(elements, getIdFn)

      uf.union(elements[0]!, elements[1]!)

      expect(uf.getSize(elements[0]!)).toBe(2)
      expect(uf.getSize(elements[1]!)).toBe(2)
      expect(uf.getSize(elements[2]!)).toBe(1)
    })

    it('should return correct size after multiple unions', () => {
      const elements = [
        createElement(0, 'A'),
        createElement(1, 'B'),
        createElement(2, 'C'),
        createElement(3, 'D'),
      ]
      const uf = new UnionFind(elements, getIdFn)

      uf.union(elements[0]!, elements[1]!)
      uf.union(elements[1]!, elements[2]!)
      uf.union(elements[2]!, elements[3]!)

      expect(uf.getSize(elements[0]!)).toBe(4)
      expect(uf.getSize(elements[1]!)).toBe(4)
      expect(uf.getSize(elements[2]!)).toBe(4)
      expect(uf.getSize(elements[3]!)).toBe(4)
    })
  })

  describe('areConnected', () => {
    it('should return true for connected elements', () => {
      const elements = [createElement(0, 'A'), createElement(1, 'B')]
      const uf = new UnionFind(elements, getIdFn)

      uf.union(elements[0]!, elements[1]!)

      expect(uf.areConnected(elements[0]!, elements[1]!)).toBe(true)
    })

    it('should return false for unconnected elements', () => {
      const elements = [createElement(0, 'A'), createElement(1, 'B')]
      const uf = new UnionFind(elements, getIdFn)

      expect(uf.areConnected(elements[0]!, elements[1]!)).toBe(false)
    })

    it('should return true for transitively connected elements', () => {
      const elements = [createElement(0, 'A'), createElement(1, 'B'), createElement(2, 'C')]
      const uf = new UnionFind(elements, getIdFn)

      uf.union(elements[0]!, elements[1]!)
      uf.union(elements[1]!, elements[2]!)

      expect(uf.areConnected(elements[0]!, elements[2]!)).toBe(true)
    })
  })

  describe('getAllSetSizes', () => {
    it('should return all individual sizes initially', () => {
      const elements = [createElement(0, 'A'), createElement(1, 'B'), createElement(2, 'C')]
      const uf = new UnionFind(elements, getIdFn)

      const sizes = uf.getAllSetSizes().sort((a, b) => a - b)

      expect(sizes).toEqual([1, 1, 1])
    })

    it('should return correct sizes after unions', () => {
      const elements = [
        createElement(0, 'A'),
        createElement(1, 'B'),
        createElement(2, 'C'),
        createElement(3, 'D'),
        createElement(4, 'E'),
      ]
      const uf = new UnionFind(elements, getIdFn)

      uf.union(elements[0]!, elements[1]!) // {A, B} size=2
      uf.union(elements[1]!, elements[2]!) // {A, B, C} size=3
      uf.union(elements[3]!, elements[4]!) // {D, E} size=2

      const sizes = uf.getAllSetSizes().sort((a, b) => a - b)

      expect(sizes).toEqual([2, 3])
    })

    it('should return single size when all elements are connected', () => {
      const elements = [createElement(0, 'A'), createElement(1, 'B'), createElement(2, 'C')]
      const uf = new UnionFind(elements, getIdFn)

      uf.union(elements[0]!, elements[1]!)
      uf.union(elements[1]!, elements[2]!)

      const sizes = uf.getAllSetSizes()

      expect(sizes).toEqual([3])
    })
  })

  describe('getSetCount', () => {
    it('should return the number of disjoint sets initially', () => {
      const elements = [createElement(0, 'A'), createElement(1, 'B'), createElement(2, 'C')]
      const uf = new UnionFind(elements, getIdFn)

      expect(uf.getSetCount()).toBe(3)
    })

    it('should return correct count after unions', () => {
      const elements = [
        createElement(0, 'A'),
        createElement(1, 'B'),
        createElement(2, 'C'),
        createElement(3, 'D'),
        createElement(4, 'E'),
      ]
      const uf = new UnionFind(elements, getIdFn)

      uf.union(elements[0]!, elements[1]!)
      expect(uf.getSetCount()).toBe(4) // {A,B}, {C}, {D}, {E}

      uf.union(elements[1]!, elements[2]!)
      expect(uf.getSetCount()).toBe(3) // {A,B,C}, {D}, {E}

      uf.union(elements[3]!, elements[4]!)
      expect(uf.getSetCount()).toBe(2) // {A,B,C}, {D,E}
    })

    it('should return 1 when all elements are connected', () => {
      const elements = [createElement(0, 'A'), createElement(1, 'B'), createElement(2, 'C')]
      const uf = new UnionFind(elements, getIdFn)

      uf.union(elements[0]!, elements[1]!)
      uf.union(elements[1]!, elements[2]!)

      expect(uf.getSetCount()).toBe(1)
    })

    it('should not change count when unioning already connected elements', () => {
      const elements = [createElement(0, 'A'), createElement(1, 'B'), createElement(2, 'C')]
      const uf = new UnionFind(elements, getIdFn)

      uf.union(elements[0]!, elements[1]!)
      expect(uf.getSetCount()).toBe(2)

      uf.union(elements[0]!, elements[1]!) // Already connected
      expect(uf.getSetCount()).toBe(2)
    })
  })

  describe('with simple numbers as elements', () => {
    it('should work with number elements using identity function', () => {
      const elements = [0, 1, 2, 3, 4]
      const identityFn = (n: number): number => n
      const uf = new UnionFind(elements, identityFn)

      uf.union(0, 1)
      uf.union(2, 3)
      uf.union(3, 4)

      expect(uf.areConnected(0, 1)).toBe(true)
      expect(uf.areConnected(2, 4)).toBe(true)
      expect(uf.areConnected(0, 2)).toBe(false)
      expect(uf.getSize(2)).toBe(3)

      const sizes = uf.getAllSetSizes().sort((a, b) => a - b)
      expect(sizes).toEqual([2, 3])
    })
  })
})
