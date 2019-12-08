function sumNode(node) {
	const nodesAmount = node[0]
	const datasAmount = node[1]
	let id = 2
	let value = 0
	let nodes = []

	for (let i = 0; i < nodesAmount; i++) {
		const result = sumNode(node.slice(id))
		nodes.push(result.value)
		id += result.id
	}

	if (nodesAmount > 0) {
		for (let i = 0; i < datasAmount; i++) {
			if (nodes[node[id] - 1]) {
				value += nodes[node[id] - 1]
			}
			id++
		}
	} else {
		for (let i = 0; i < datasAmount; i++) {
			value += node[id]
			id++
		}
	}

	return { value, id }
}

const contestResponse = input => {
	const nodes = input[0].split(' ').map(Number)
	const result = sumNode(nodes)

	return result.value.toString()
}

module.exports = contestResponse