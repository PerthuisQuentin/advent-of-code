function sumNode(node) {
	const nodesAmount = node[0]
	const datasAmount = node[1]
	let id = 2
	let sum = 0

	for (let i = 0; i < nodesAmount; i++) {
		const result = sumNode(node.slice(id))
		sum += result.sum
		id += result.id
	}

	for (let i = 0; i < datasAmount; i++) {
		sum += node[id]
		id++
	}

	return { sum, id }
}

const contestResponse = input => {
	const nodes = input[0].split(' ').map(Number)
	const result = sumNode(nodes)

	return result.sum.toString()
}

module.exports = contestResponse