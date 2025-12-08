export class UnionFind<T> {
  private parent: Map<number, number>
  private size: Map<number, number>
  private elements: Map<number, T>
  private getIdFn: (element: T) => number

  constructor(elements: T[], getIdFn: (element: T) => number) {
    this.parent = new Map()
    this.size = new Map()
    this.elements = new Map()
    this.getIdFn = getIdFn

    elements.forEach((element) => {
      const id = getIdFn(element)
      this.parent.set(id, id)
      this.size.set(id, 1)
      this.elements.set(id, element)
    })
  }

  public find(element: T): number {
    const id = this.getIdFn(element)
    return this.findById(id)
  }

  private findById(id: number): number {
    if (this.parent.get(id) !== id) {
      this.parent.set(id, this.findById(this.parent.get(id)!))
    }
    return this.parent.get(id)!
  }

  public union(elementA: T, elementB: T): boolean {
    const rootA = this.find(elementA)
    const rootB = this.find(elementB)

    if (rootA === rootB) return false

    const sizeA = this.size.get(rootA)!
    const sizeB = this.size.get(rootB)!

    if (sizeA < sizeB) {
      this.parent.set(rootA, rootB)
      this.size.set(rootB, sizeA + sizeB)
    } else {
      this.parent.set(rootB, rootA)
      this.size.set(rootA, sizeA + sizeB)
    }

    return true
  }

  public getSize(element: T): number {
    const root = this.find(element)
    return this.size.get(root)!
  }

  public getAllSetSizes(): number[] {
    const roots = new Set<number>()
    const sizes: number[] = []

    this.parent.forEach((_, id) => {
      roots.add(this.findById(id))
    })

    roots.forEach((root) => {
      sizes.push(this.size.get(root)!)
    })

    return sizes
  }

  public getSetCount(): number {
    const roots = new Set<number>()

    this.parent.forEach((_, id) => {
      roots.add(this.findById(id))
    })

    return roots.size
  }

  public areConnected(elementA: T, elementB: T): boolean {
    return this.find(elementA) === this.find(elementB)
  }
}
