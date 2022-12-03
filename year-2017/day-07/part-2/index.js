const ArrayUtils = require("../../../utils/array")

const LINE_REGEX = /(\w+) \((\d+)\)( -> ([\w, ]+))?/

const buildTowersMap = parsedLines => {
	const towersMap = new Map()
	parsedLines.forEach(line => {
		towersMap.set(line.name, line)
	})
	parsedLines.forEach(line => {
		line.childs.forEach(child => {
			towersMap.get(child).parent = line.name
		})
	})
	return towersMap
}

const getWeight = (towersMap, name) => {
	const tower = towersMap.get(name)
	if (!tower.totalWeight) tower.totalWeight = tower.weight + ArrayUtils.sum(tower.childs.map(child => getWeight(towersMap, child)))
	return tower.totalWeight
}

const getUnbalancedChild = (towersMap, tower) => {
	const towerChilds = tower.childs.map(child => towersMap.get(child))
	const unbalancedChild = towerChilds.find(towerChild => !towerChilds.some(child => child.name !== towerChild.name && child.totalWeight === towerChild.totalWeight))
	return unbalancedChild
}

const findUnbalancedWeight = (towersMap, root) => {
	let unbalancedChild = root
	let newUnbalancedChild
	do {
		newUnbalancedChild = getUnbalancedChild(towersMap, unbalancedChild)
		if (newUnbalancedChild) unbalancedChild = newUnbalancedChild
	} while(newUnbalancedChild)

	const parent = towersMap.get(unbalancedChild.parent)
	const balancedChild = towersMap.get(parent.childs.find(child => child !== unbalancedChild.name))
	const requiredWeight = balancedChild.totalWeight - (unbalancedChild.totalWeight - unbalancedChild.weight)

	return requiredWeight
}

const contestResponse = input => {
	const parsedLines = input
		.map(line => {
			const matches = line.match(LINE_REGEX)
			const tower = {
				name: matches[1],
				weight: Number(matches[2]),
				childs: []
			}
			if (matches[4]) tower.childs = matches[4].split(', ')
			return tower
		})

	const towersMap = buildTowersMap(parsedLines)

	let root = towersMap.get(parsedLines[0].name)
	while(root.parent) {
		root = towersMap.get(root.parent)
	}

	getWeight(towersMap, root.name)

	// console.log(towersMap)

	return findUnbalancedWeight(towersMap, root)
}

module.exports = contestResponse