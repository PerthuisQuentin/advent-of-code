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

const listContainerBags = (bagsParents, containerBags, bagName) => {
	if (!bagsParents[bagName]) return
	bagsParents[bagName].forEach(bag => {
		containerBags.add(bag)
		listContainerBags(bagsParents, containerBags, bag)
	})
}

const contestResponse = input => {
	const bags = input.map(parseLine)
	const bagsParents = {}
	bags.forEach(bagParent => {
		bagParent.contain.forEach(bag => {
			if (!bagsParents[bag.name]) bagsParents[bag.name] = []
			bagsParents[bag.name].push(bagParent.name)
		})
	})
	
	const containerBags = new Set()
	listContainerBags(bagsParents, containerBags, 'shiny gold')
	
	return containerBags.size
}

module.exports = contestResponse