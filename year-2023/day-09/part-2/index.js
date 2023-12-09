const mapSequel = line => line.split(' ').map(Number)

const mapSequels = lines => lines.map(mapSequel)

const getSubSequel = sequel => {
	const subSequel = []
	for (let i = 0; i < sequel.length - 1; i++) {
		subSequel.push(sequel[i + 1] - sequel[i])
	}
	return subSequel
}

const getSequelNextValue = sequel => {
	if (sequel.every(value => value === 0)) {
		return 0
	} else {
		const subSequel = getSubSequel(sequel)
		return sequel[0] - getSequelNextValue(subSequel)
	}
}

const contestResponse = input => {
	return mapSequels(input)
		.map(getSequelNextValue)
		.reduce((sum, value) => sum + value, 0)
}

module.exports = contestResponse