const Chalk = require('chalk')

const BLACK = 0
const WHITE = 1
const TRANSPARENT = 2

const buildLayers = (width, height, values) => {
	let index = 0
	let l = 0
	const layers = []

	while (index < (values.length - 1)) {
		layers[l] = []

		for (let h = 0; h < height; h++) {
			layers[l][h] = []

			for (let w = 0; w < width; w++) {
				layers[l][h][w] = values[index]
				index++
			}
		}

		l++
	}

	return layers
}

const mergeLayers = (width, height, layers) => {
const resultLayer = []

	for (let h = 0; h < height; h++) {
		resultLayer[h] = []

		for (let w = 0; w < width; w++) {
			let resultPixel = TRANSPARENT

			for (let l = 0; l < layers.length; l++) {
				const layerPixel = layers[l][h][w]
				if (layerPixel === BLACK || layerPixel === WHITE) {
					resultPixel = layerPixel
					break
				}
			}

			resultLayer[h][w] = resultPixel
		}
	}

	return resultLayer
}

const colorPixel = pixel => {
	switch (pixel) {
		case BLACK:
			return Chalk.bgGreen(BLACK)
		case WHITE:
			return Chalk.bgRed(WHITE)
		case TRANSPARENT:
		default:
			return Chalk.bgWhite(TRANSPARENT)
	}
}

const displayLayer = layer => layer.forEach(row => console.log(row.reduce((acc, cur) => acc + colorPixel(cur), '')))

const joinLayer = layer => layer.reduce((acc, cur) => acc + cur.join(''), '')

const contestResponse = input => {
	const width = Number(input[0])
	const height = Number(input[1])
	const values = input[2].split('').map(Number)

	const layers = buildLayers(width, height, values)
	const image = mergeLayers(width, height, layers)
	const result = joinLayer(image)

	displayLayer(image)

	return result
}

module.exports = contestResponse