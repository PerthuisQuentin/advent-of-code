const containerRegex = /([a-z]+ [a-z]+) bag[s]? contain/
const bagsRegex = /([0-9]+ [a-z]+ [a-z]+) bag[s]?/g

const parseLine = line => {
	const container = line.match(containerRegex)[1]

	const bagsMatchs = line.match(bagsRegex) || []
	const bags = bagsMatchs.map(s => {
		const [quantity, adjective, color] = s.split(' ')
		return {
			quantity: Number(quantity),
			name : `${adjective} ${color}`
		}
	})

	return {
		name: container,
		contain: bags
	}
}

const getBagSubAmount = (bagsByName, bagName) => {
	const currentBag = bagsByName[bagName]
	if (currentBag.contain.length === 0) return 1
	const subAmount = currentBag.contain.reduce((amount, bag) => amount + (bag.quantity * getBagSubAmount(bagsByName, bag.name)), 1)
	return subAmount
}

const contestResponse = input => {
	const bags = input.map(parseLine)
	const bagsByName = {}
	bags.forEach(bag => bagsByName[bag.name] = bag)
	
	return getBagSubAmount(bagsByName, 'shiny gold') - 1
}

module.exports = contestResponse