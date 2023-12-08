const LEFT = 'L'
const RIGHT = 'R'
const NODE_REGEX = /(\w+) = \((\w+), (\w+)\)/
const STARTING_NODE = 'AAA'
const TARGET_NODE = 'ZZZ'

const mapInstructions = instructions => instructions.split('')

const mapNode = nodeLine => {
	const [, name, left, right] = nodeLine.match(NODE_REGEX)
	return {
		name,
		[LEFT]: left,
		[RIGHT]: right
	}
}

const mapNodes = lines => {
	const nodes = lines.map(mapNode)
	const map = new Map()
	nodes.forEach(node => map.set(node.name, node))
	return map
}

const followInstructions = (instructions, nodes) => {
	let currentNode = nodes.get(STARTING_NODE)
	let step = 0
	while (currentNode.name !== TARGET_NODE) {
		const instruction = instructions[step % instructions.length]

		const nextNode = nodes.get(currentNode[instruction])
		currentNode = nextNode

		step++
	}

	return step
}

const contestResponse = input => {
	const instructions = mapInstructions(input[0])
	const nodes = mapNodes(input.slice(2))

	return followInstructions(instructions, nodes)
}

module.exports = contestResponse