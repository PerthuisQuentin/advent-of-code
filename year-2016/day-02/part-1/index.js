const KEYPADS = [
	['1', '2', '3'],
	['4', '5', '6'],
	['7', '8' ,'9'],
]

const UP = 'U'
const DOWN = 'D'
const LEFT = 'L'
const RIGHT = 'R'

const contestResponse = input => {
	let position = { x: 1, y: 1 }
	let code = ''

	input
		.forEach(line => {
			line.split('').forEach(instruction => {
				let nextPosition = { x: position.x, y: position.y }

				switch (instruction) {
					case UP:
						nextPosition.y--
						break;
					case DOWN:
						nextPosition.y++
						break;
					case LEFT:
						nextPosition.x--
						break;
					case RIGHT:
						nextPosition.x++
						break;
					default:
						throw new Error(`Unknwon instruction: ${instruction}`)
				}

				const keyPadValue = KEYPADS[nextPosition.y] && KEYPADS[nextPosition.y][nextPosition.x]

				if (keyPadValue) {
					position = nextPosition
				}
			})

			code += KEYPADS[position.y][position.x]
		})

	return code
}

module.exports = contestResponse