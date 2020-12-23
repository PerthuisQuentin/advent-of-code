class DoubleLinkedList {
	constructor(list) {
		this.init(list)
    }
    
    init(list) {
        this.nexts = new Map()
        this.prevs = new Map()
		list.forEach((value, i) => {
            this.nexts.set(value, list[i + 1])
            this.prevs.set(value, list[i - 1])
        })

        this.nexts.set(list[list.length - 1], list[0])
        this.prevs.set(list[0], list[list.length - 1])

        this.length = list.length
    }

    has(value) {
        return this.nexts.has(value)
    }

    getNext(value) {
        return this.nexts.get(value)
    }

    getPrev(value) {
        return this.prevs.get(value)
    }

    setNext(value, nextValue) {
        this.nexts.set(value, nextValue)
    }

    setPrev(value, prevValue) {
        this.prevs.set(value, prevValue)
    }

    remove(value) {
        this.setPrev(this.getNext(value), this.getPrev(value))
        this.setNext(this.getPrev(value), this.getNext(value))
        this.nexts.delete(value)
        this.prevs.delete(value)
        this.length--
    }

    insertAfter(value, newValue) {
        const nextValue = this.getNext(value)
        this.setNext(value, newValue)
        this.setNext(newValue, nextValue)
        this.setPrev(nextValue, newValue)
        this.setPrev(newValue, value)
        this.length++
    }

    insertBefore(value, newValue) {
        const prevValue = this.getPrev(value)
        this.setNext(prevValue, newValue)
        this.setNext(newValue, value)
        this.setPrev(value, newValue)
        this.setPrev(newValue, prevValue)
        this.length++
    }

    getAfter(value, length) {
        const result = []
        let currentValue = value

        for(let i = 0; i < Math.max(length, 1); i++) {
            currentValue = this.getNext(currentValue)
            result.push(currentValue)
        }

        return result
    }

    getFrom(value, length) {
        return this.getAfter(this.getPrev(value), length)
    }

    removeAfter(value, length) {
        const removed = []

        for(let i = 0; i < Math.max(length, 1); i++) {
            const valueToRemove = this.getNext(value)
            removed.push(valueToRemove)
            this.remove(valueToRemove)
        }

        return removed
    }

    insertListAfter(value, list) {
        const nextValue = this.getNext(value)
        list.forEach(newValue => this.insertBefore(nextValue, newValue))
    }
}

module.exports = DoubleLinkedList