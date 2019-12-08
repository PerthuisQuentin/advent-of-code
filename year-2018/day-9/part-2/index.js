const contestResponse = input => {
	const split = input[0].split(' ')
	const playerAmount = Number(split[0])
	const lastMarble = Number(split[6]) * 100
	const playerScores = (new Array(playerAmount)).fill(0)
	let marbles = [0]
	let index = 0
	let currentPlayer = 0

	for (let marble = 1; marble <= lastMarble; marble++) {
		console.log(marble)
		if (Number.isInteger(marble / 23)) {
			playerScores[currentPlayer] += marble
			index -= 7
			if (index < 0) {
				index = marbles.length - Math.abs(index)
			}
			playerScores[currentPlayer] += marbles[index]
			marbles.splice(index, 1)
		} else {
			index += 1
			if (index > marbles.length - 1) {
				index = 1
				marbles.splice(index, 0, marble)
			} else {
				index += 1
				marbles.splice(index, 0, marble)
			}
		}
		currentPlayer = (currentPlayer + 1) % playerAmount
	}

	const maxScore = playerScores.reduce((prev, cur) => cur > prev ? cur : prev)

	return maxScore.toString()
}

module.exports = contestResponse