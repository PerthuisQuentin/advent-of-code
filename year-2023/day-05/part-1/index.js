const { Range } = require('../../../utils')

const SEEDS_REGEX = /seeds: ([\d ]+)/
const MAP_REGEX = /(\w+)-to-(\w+) map:\n([\d \n]+)/

const parseSeeds = input => input[0].match(SEEDS_REGEX)[1].split(' ').map(Number)

const parseMapping = mapping => {
	const [destinationStart, sourceStart, length] = mapping.split(' ').map(Number)
	return {
		source: new Range(sourceStart, sourceStart + length, true, false),
		destination: new Range(destinationStart, destinationStart + length, true, false),
		offset: destinationStart - sourceStart,
	}
}

const parseMappings = mappings => mappings.split('\n').map(parseMapping)

const parseMap = mapMatches => {
	const [, sourceName, destinationName, mappings] = mapMatches
	return {
		sourceName,
		destinationName,
		mappings: parseMappings(mappings),
	}

}

const parseMaps = input => input
	.slice(2)
	.join('\n')
	.split('\n\n')
	.map(map => map.match(MAP_REGEX))
	.map(parseMap)

const applyMap = (seed, map) => {
	const mapping = map.mappings.find(mapping => mapping.source.has(seed))
	if (!mapping) return seed

	return seed + mapping.offset
}

const mapSeed = (seed, maps) => maps.reduce((seedStep, map) => applyMap(seedStep, map), seed)

const contestResponse = input => {
	const seeds = parseSeeds(input)
	const maps = parseMaps(input)

	return seeds
		.map(seed => mapSeed(seed, maps))
		.reduce((min, current) => current < min ? current : min)
}

module.exports = contestResponse