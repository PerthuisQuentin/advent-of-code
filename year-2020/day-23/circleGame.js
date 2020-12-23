const DoubleLinkedList = require('../../utils/doubleLinkedList')

class CircleGame {
	constructor(list, completeTo) {
		this.initCircle(list, completeTo)
		this.currentCup = list[0]
		this.move = 1
		this.lowest = 1
		this.highest = completeTo || list.reduce((a, b) => b > a ? b : a)
	}

	initCircle(list, completeTo) {
		const newList = list.map(x => x)
		const max = list.reduce((a, b) => b > a ? b : a)
		for (let i = max + 1; i <= completeTo; i++) {
			newList.push(i)
		}

		this.nodes = new DoubleLinkedList(newList)
	}

	pickUp() {
		const pickUpList = this.nodes.removeAfter(this.currentCup, 3)
		this.insertAtDestination(pickUpList)
	}
	
	getPickUp() {
		return this.nodes.getAfter(this.currentCup, 3)
	}

	getDestination() {
		let destination = this.currentCup
	
		do {
			destination = destination === this.lowest ? this.highest : destination - 1
		} while (!this.nodes.has(destination))
	
		return destination
	}
	
	insertAtDestination(pickUpList) {
		this.nodes.insertListAfter(this.getDestination(), pickUpList)
	}
	
	selectNextCup() {
		this.currentCup = this.nodes.getNext(this.currentCup)
	}

	doMove(logEnabled = false) {
		if (logEnabled) this.log()
		this.pickUp()
		this.selectNextCup()
		this.move++
	}

	doMoves(quantity, logEnabled = false) {
		for (let i = 0; i < quantity; i++) this.doMove(logEnabled)
	}

	log() {
		const list = this.nodes.getFrom(this.currentCup, this.nodes.length).map(cup => cup === this.currentCup ? `(${cup})` : cup).join(' ')
		const pickUpList = this.getPickUp().join(' ')
		console.log(`\n-- Move ${this.move} --`)
		console.log('cups:', list)
		console.log('pick up:', pickUpList)
	}

	getPart1Result() {
		return this.nodes.getAfter(1, this.nodes.length - 1).join('')
	}

	getPart2Result() {
		const [value1, value2] = this.nodes.getAfter(1, 2)
		return value1 * value2
	}
}

module.exports = CircleGame