const NUMBER_REGEX = /\d+/g

const isValid = triangle => (
	((triangle[0] + triangle[1]) > triangle[2]) &&
	((triangle[1] + triangle[2]) > triangle[0]) &&
	((triangle[2] + triangle[0]) > triangle[1])
)

const contestResponse = input => {
	const possibleTriangles = input
		.map(line => line.match(NUMBER_REGEX).map(Number))
		.filter(isValid)

	return possibleTriangles.length
}

module.exports = contestResponse