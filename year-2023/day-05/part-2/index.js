const { ArrayUtils, Range } = require('../../../utils')

const SEEDS_REGEX = /seeds: ([\d ]+)/
const MAP_REGEX = /(\w+)-to-(\w+) map:\n([\d \n]+)/

const parseSeedRanges = input => {
	const numbers = input[0]
		.match(SEEDS_REGEX)[1]
		.split(' ')
		.map(Number)

	return ArrayUtils
		.stackBy(numbers, 2)
		.map(([start, length]) => new Range(start, start + length -1, true, true))
}

const parseMapping = range => {
	const [destinationStart, sourceStart, length] = range.split(' ').map(Number)
	return {
		source: new Range(sourceStart, sourceStart + length - 1),
		destination: new Range(destinationStart, destinationStart + length - 1),
		offset: destinationStart - sourceStart,
	}
}

const parseMappings = mappings => mappings.split('\n').map(parseMapping)

const parseMap = mapMatches => {
	const [, source, destination, mappings] = mapMatches
	return {
		source,
		destination,
		mappings: parseMappings(mappings),
	}
}

const parseMaps = input => input
	.slice(2)
	.join('\n')
	.split('\n\n')
	.map(map => map.match(MAP_REGEX))
	.map(parseMap)

const getMaxEndOfMap = map => {
	return map.mappings
		.map(mapping => mapping.destination.end)
		.reduce((max, end) => Math.max(max, end), 0)
}

const getSeedFromLocation = (location, reversedMaps) => {
	let seed = location

	reversedMaps.forEach(map => {
		const mapping = map.mappings.find(mapping => mapping.destination.has(seed))
		if (mapping) seed = seed - mapping.offset
	})

	return seed
}

const doesSeedRangesHasValue = (seedRanges, value) => seedRanges.some(seedRange => seedRange.has(value))

const searchMinSeed = (seedRanges, reversedMaps) => {
	const maxEndOfMap = getMaxEndOfMap(reversedMaps[0])
	let location = 0
	let minSeed

	while(!minSeed && location < maxEndOfMap) {
		const seed = getSeedFromLocation(location, reversedMaps)
		if (doesSeedRangesHasValue(seedRanges, seed)) minSeed = seed
		else location++
	}

	return location
}

const contestResponse = input => {
	const seedRanges = parseSeedRanges(input)
	const reversedMaps = parseMaps(input).reverse()

	return searchMinSeed(seedRanges, reversedMaps)
}

module.exports = contestResponse