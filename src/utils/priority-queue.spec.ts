import { PriorityQueue } from './priority-queue'

describe('PriorityQueue', () => {
  const compareNumbers = (a: number, b: number): number => a - b

  describe('add', () => {
    it('Should add elements to the queue', () => {
      const queue = new PriorityQueue<number>([10, 5, 20], compareNumbers)

      queue.add(15)

      expect(queue).toEqual({
        compareFn: compareNumbers,
        heap: [5, 10, 20, 15],
      })
    })
  })

  describe('remove', () => {
    it('Should remove element from the queue', () => {
      const queue = new PriorityQueue<number>([10, 5, 20], compareNumbers)

      queue.remove()

      expect(queue).toEqual({
        compareFn: compareNumbers,
        heap: [10, 20],
      })
    })

    it('Should return undefined if the queue is empty', () => {
      const queue = new PriorityQueue<number>([], compareNumbers)

      expect(queue.remove()).toBeUndefined()
    })
  })

  describe('peek', () => {
    it('should peek the top element without removing it', () => {
      const queue = new PriorityQueue<number>([10, 5, 20], compareNumbers)

      expect(queue.peek()).toBe(5)
    })

    it('should return undefined if the queue is empty', () => {
      const queue = new PriorityQueue<number>([], compareNumbers)

      expect(queue.peek()).toBeUndefined()
    })
  })

  describe('priority', () => {
    it('Should maintain priority queue order', () => {
      const queue = new PriorityQueue<number>([], compareNumbers)

      queue.add(10)
      queue.add(5)
      queue.add(30)
      queue.add(20)
      queue.add(15)
      queue.add(25)

      expect(queue.remove()).toBe(5)
      expect(queue.remove()).toBe(10)
      expect(queue.remove()).toBe(15)
      expect(queue.remove()).toBe(20)
      expect(queue.remove()).toBe(25)
      expect(queue.remove()).toBe(30)
    })

    it('Should maintain priority queue order with custom objects', () => {
      type CustomObject = { id: string; value: number }
      const compareCustomObjects = (a: CustomObject, b: CustomObject): number => a.value - b.value

      const queue = new PriorityQueue<CustomObject>([], compareCustomObjects)

      queue.add({ id: '1', value: 10 })
      queue.add({ id: '2', value: 5 })
      queue.add({ id: '3', value: 30 })
      queue.add({ id: '4', value: 20 })
      queue.add({ id: '5', value: 15 })
      queue.add({ id: '6', value: 25 })

      expect(queue.remove()).toEqual({ id: '2', value: 5 })
      expect(queue.remove()).toEqual({ id: '1', value: 10 })
      expect(queue.remove()).toEqual({ id: '5', value: 15 })
      expect(queue.remove()).toEqual({ id: '4', value: 20 })
      expect(queue.remove()).toEqual({ id: '6', value: 25 })
      expect(queue.remove()).toEqual({ id: '3', value: 30 })
    })
  })
})
