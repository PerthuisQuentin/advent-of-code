const LENGTHS = [2, 3, 4, 7]

const parseLine = line => line.split(' | ')[1].split(' ')

const contestResponse = input => {
	const lines = input.map(parseLine)
	const digits = lines.flat()

	return digits
		.filter(digit => LENGTHS.includes(digit.length))
		.length
}

module.exports = contestResponse