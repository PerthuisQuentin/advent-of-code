const countValue = (layer, search) => {
	return layer.reduce((acc, row) =>
		acc + row.reduce((acc, value) =>
			value === search ? acc + 1 : acc, 0
		)
	, 0)
}

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

const findLayerWithFewestZero = layers => {
	const layersZerosAmount = layers.map(layer => countValue(layer, 0))
	const minZeroValue = layersZerosAmount.reduce((acc, cur) => cur < acc ? cur : acc)
	const minZeroIndex = layersZerosAmount.indexOf(minZeroValue)
	const searchedLayer = layers[minZeroIndex]
	return searchedLayer
}

const calcLayer = layer => {
	const layerOneAmount = countValue(layer, 1)
	const layerTwoAmount = countValue(layer, 2)
	return layerOneAmount * layerTwoAmount
}

const contestResponse = input => {
	const width = Number(input[0])
	const height = Number(input[1])
	const values = input[2].split('').map(Number)

	const layers = buildLayers(width, height, values)
	const searchedLayer = findLayerWithFewestZero(layers)
	const result = calcLayer(searchedLayer)

	return result
}

module.exports = contestResponse