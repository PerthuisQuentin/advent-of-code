const LEFT = 'L'
const RIGHT = 'R'
const NODE_REGEX = /(\w+) = \((\w+), (\w+)\)/
const STARTING_LETTER = 'A'
const TARGET_LETTER = 'Z'

const mapInstructions = instructions => instructions.split('')

const mapNode = nodeLine => {
	const [, name, left, right] = nodeLine.match(NODE_REGEX)
	return {
		name,
		lastLetter: name[name.length - 1],
		[LEFT]: left,
		[RIGHT]: right
	}
}

const mapNodes = lines => {
	const nodes = lines.map(mapNode)

	const map = new Map()
	nodes.forEach(node => map.set(node.name, node))

	const startingNodes = nodes.filter(node => node.lastLetter === STARTING_LETTER)

	return { startingNodes, map }
}

const getNextNode = (currentNode, instruction, map) => {
	const nextNode = map.get(currentNode[instruction])
	return nextNode
}

const getLoopSize = (instructions, map, node) => {
	const visitedTargetNodes = new Map()
	let currentNode = node
	let instruction
	let step = 0

	do {
		if (currentNode.lastLetter === TARGET_LETTER) {
			visitedTargetNodes.set(currentNode.name, step)
		}

		instruction = instructions[step % instructions.length]
		currentNode = getNextNode(currentNode, instruction, map)
		step++
	} while (!visitedTargetNodes.has(currentNode.name))

	return step - visitedTargetNodes.get(currentNode.name)
}

function getGCD(a, b) {
    let n1 = Math.abs(Math.floor(a))
    let n2 = Math.abs(Math.floor(b))

    while (n2 !== 0) {
        let temp = n2
        n2 = n1 % n2
        n1 = temp
    }

    return n1
}

function getLCM(a, b) {
    return (a * b) / getGCD(a, b);
}

const contestResponse = input => {
	const instructions = mapInstructions(input[0])
	const { map, startingNodes } = mapNodes(input.slice(2))

	return startingNodes
		.map(node => getLoopSize(instructions, map, node))
		.reduce(getLCM)
}

module.exports = contestResponse