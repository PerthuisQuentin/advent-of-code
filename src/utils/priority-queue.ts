export class PriorityQueue<T> {
  private heap: T[] = []
  private compareFn: (a: T, b: T) => number

  constructor(elements: T[] = [], compareFn: (a: T, b: T) => number) {
    this.heap = []
    this.compareFn = compareFn
    elements.forEach((element) => this.add(element))
  }

  private getLeftChildIndex(parentIndex: number): number {
    return 2 * parentIndex + 1
  }

  private getRightChildIndex(parentIndex: number): number {
    return 2 * parentIndex + 2
  }

  private getParentIndex(childIndex: number): number {
    return Math.floor((childIndex - 1) / 2)
  }

  private hasLeftChild(index: number): boolean {
    return this.getLeftChildIndex(index) < this.heap.length
  }

  private hasRightChild(index: number): boolean {
    return this.getRightChildIndex(index) < this.heap.length
  }

  private hasParent(index: number): boolean {
    return this.getParentIndex(index) >= 0
  }

  private leftChild(index: number): T | undefined {
    return this.heap[this.getLeftChildIndex(index)]
  }

  private rightChild(index: number): T | undefined {
    return this.heap[this.getRightChildIndex(index)]
  }

  private parent(index: number): T | undefined {
    return this.heap[this.getParentIndex(index)]
  }

  private swap(indexOne: number, indexTwo: number): void {
    const temp = this.heap[indexOne]
    this.heap[indexOne] = this.heap[indexTwo]!
    this.heap[indexTwo] = temp!
  }

  public peek(): T | undefined {
    return this.heap[0]
  }

  public remove(): T | undefined {
    if (this.heap.length === 0) return undefined
    const item = this.heap[0]
    this.heap[0] = this.heap[this.heap.length - 1]!
    this.heap.pop()
    this.heapifyDown()
    return item
  }

  public add(item: T): void {
    this.heap.push(item)
    this.heapifyUp()
  }

  private heapifyUp(): void {
    let index = this.heap.length - 1
    while (this.hasParent(index) && this.compareFn(this.parent(index)!, this.heap[index]!) > 0) {
      this.swap(this.getParentIndex(index), index)
      index = this.getParentIndex(index)
    }
  }

  private heapifyDown(): void {
    let index = 0
    while (this.hasLeftChild(index)) {
      let smallerChildIndex = this.getLeftChildIndex(index)
      if (
        this.hasRightChild(index) &&
        this.compareFn(this.rightChild(index)!, this.leftChild(index)!) < 0
      ) {
        smallerChildIndex = this.getRightChildIndex(index)
      }
      if (this.compareFn(this.heap[index]!, this.heap[smallerChildIndex]!) < 0) {
        break
      } else {
        this.swap(index, smallerChildIndex)
      }
      index = smallerChildIndex
    }
  }
}
