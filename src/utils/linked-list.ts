export class LinkedListNode<T> {
  public value: T
  public next: LinkedListNode<T> | null

  constructor(value: T) {
    this.value = value
    this.next = null
  }
}

export class LinkedList<T> {
  public head: LinkedListNode<T> | null
  public tail: LinkedListNode<T> | null

  constructor() {
    this.head = null
    this.tail = null
  }
}
