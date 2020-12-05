const FRONT = 'F'
const BACK = 'B'
const LEFT = 'L'
const RIGHT = 'R'

const getFloorMiddle = (a, b) => Math.floor((a + b) / 2)
const getCeilMiddle = (a, b) => Math.ceil((a + b) / 2)

const findSeatId = instructions => {
	let rowMin = 0, rowMax = 127, columnMin = 0, columnMax = 8

	instructions
		.split('')
		.forEach(instruction => {
			if (instruction === FRONT) {
				const middle = getFloorMiddle(rowMin, rowMax)
				rowMax = middle
			} else if (instruction === BACK) {
				const middle = getCeilMiddle(rowMin, rowMax)
				rowMin = middle
			} else if (instruction === LEFT) {
				const middle = getFloorMiddle(columnMin, columnMax)
				columnMax = middle
			} else if (instruction === RIGHT) {
				const middle = getCeilMiddle(columnMin, columnMax)
				columnMin = middle
			}
		})

	return (rowMin * 8) + columnMin 
}

const contestResponse = input => {
	const biggestID = input
		.map(findSeatId)
		.reduce((a, b) => b > a ? b : a)

	return biggestID
}

module.exports = contestResponse