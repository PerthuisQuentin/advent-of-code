const NUMBER_REGEX = /\d+/g

const isValid = triangle => (
	((triangle[0] + triangle[1]) > triangle[2]) &&
	((triangle[1] + triangle[2]) > triangle[0]) &&
	((triangle[2] + triangle[0]) > triangle[1])
)

const contestResponse = input => {
	const lines = input.map(line => line.match(NUMBER_REGEX).map(Number))

	const triangles = []

	for (let i = 0; i < lines.length; i += 3) {
		for (let y = 0; y < 3; y++) {
			triangles.push([
				lines[i + 0][y],
				lines[i + 1][y],
				lines[i + 2][y],
			])
		}
	}

	const possibleTriangles = triangles.filter(isValid)

	return possibleTriangles.length
}

module.exports = contestResponse