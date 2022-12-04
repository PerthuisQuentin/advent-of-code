const isOverlaping = pair => {
	const [assignmentA, assignmentB] = pair

	return (
		(assignmentA.start >= assignmentB.start && assignmentA.end <= assignmentB.end)
		|| (assignmentB.start >= assignmentA.start && assignmentB.end <= assignmentA.end)
	)
}

const contestResponse = input => {
	const overlapingPairs = input
		.map(line => line.split(','))
		.map(pair => pair.map(assignment => assignment.split('-').map(Number)))
		.map(pair => pair.map(assignment => ({
			start: assignment[0],
			end: assignment[1]
		})))
		.filter(isOverlaping)

	return overlapingPairs.length
}

module.exports = contestResponse