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
		.map(([start, length]) => new Range(start, start + length, true, false))
}

const parseMapping = range => {
	const [destinationStart, sourceStart, length] = range.split(' ').map(Number)
	return {
		source: new Range(sourceStart, sourceStart + length),
		destination: new Range(destinationStart, destinationStart + length),
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


const matchRanges = (seedRange, mappingRange) => {
	if (
		!seedRange.intersects(mappingRange)
		|| seedRange.isSame(mappingRange)
		|| mappingRange.contains(seedRange)
	) {
		return [Range.clone(seedRange)]
	}
	else if (seedRange.intersects(mappingRange)) {
		const seedRanges = []

		if (seedRange.start < mappingRange.start) {
			seedRanges.push(new Range(seedRange.start, mappingRange.start, true, false))
		}

		seedRanges.push(new Range(
			Math.max(seedRange.start, mappingRange.start),
			Math.min(seedRange.end, mappingRange.end),
			true,
			false
		))

		if (seedRange.end > mappingRange.end) {
			seedRanges.push(new Range(mappingRange.end, seedRange.end, true, false))
		}

		return seedRanges
	}

	throw new Error('Unknown case :' + JSON.stringify({ seedRange, mappingRange }))
}

const applyMapping = (seedRange, map) => {
	const mapping = map.mappings.find(mapping => mapping.source.intersects(seedRange))
	if (!mapping) return seedRange
	return new Range(
		seedRange.start + mapping.offset,
		seedRange.end + mapping.offset,
		true,
		false
	)
}

const applyMap = (seedRange, map) => {
	const matchingMappings = map.mappings.filter(mapping => mapping.source.intersects(seedRange))
	if (matchingMappings.length === 0) return [seedRange]

	const newSeedRanges = matchingMappings
		.map(mapping => matchRanges(seedRange, mapping.source))
		.flat()

	const uniqueSeedRanges = new Map()
	newSeedRanges.forEach(seedRange => uniqueSeedRanges.set(seedRange.toString(), seedRange))

	return Array.from(uniqueSeedRanges.values()).map(seedRange => applyMapping(seedRange, map))
}

const applyMaps = (seedRanges, maps) => {
	let result = [...seedRanges]

	for (const map of maps) {
		const newSeedRanges = []

		for (const seedRange of result) {
			newSeedRanges.push(...applyMap(seedRange, map))
		}

		result = newSeedRanges
	}

	return result
}

const contestResponse = input => {
	const seedRanges = parseSeedRanges(input)
	const maps = parseMaps(input)

	// console.log(JSON.stringify(maps, null, 2))
	// console.log(seedRanges[1])




	// console.log(seedRanges[1].toString())
	// let s = [seedRanges[1]]
	// let m = maps[0]

	// console.log('=====\n')

	// m = maps[0]
	// s = applyMaps(s, [m])
	// console.log(m.source, '->', m.destination)
	// console.log('==> ', s.map(seedRange => seedRange.toString()).join(' '))

	// console.log('=====\n')

	// m = maps[1]
	// s = applyMaps(s, [m])
	// console.log(m.source, '->', m.destination)
	// console.log('==> ', s.map(seedRange => seedRange.toString()).join(' '))

	// console.log('=====\n')

	// m = maps[2]
	// s = applyMaps(s, [m])
	// console.log(m.source, '->', m.destination)
	// console.log('==> ', s.map(seedRange => seedRange.toString()).join(' '))

	// console.log('=====\n')

	// m = maps[3]
	// s = applyMaps(s, [m])
	// console.log(m.source, '->', m.destination)
	// console.log('==> ', s.map(seedRange => seedRange.toString()).join(' '))

	// console.log('=====\n')

	// m = maps[4]
	// s = applyMaps(s, [m])
	// console.log(m.source, '->', m.destination)
	// console.log('==> ', s.map(seedRange => seedRange.toString()).join(' '))

	// console.log('=====\n')

	// m = maps[5]
	// s = applyMaps(s, [m])
	// console.log(m.source, '->', m.destination)
	// console.log('==> ', s.map(seedRange => seedRange.toString()).join(' '))

	// console.log('=====\n')

	// m = maps[6]
	// s = applyMaps(s, [m])
	// console.log(m.source, '->', m.destination)
	// console.log('==> ', s.map(seedRange => seedRange.toString()).join(' '))

	// console.log('=====\n')









	// console.log(JSON.stringify(maps, null, 2))

	// console.log(seedRanges[0])

	// console.log(mapSeedRange(seedRanges[0], maps))
	// console.log(mapSeedRange(seedRanges[1], maps))
	// console.log(maps)






	// const test = (seedRange, mappingRange, expectedResult) => {
	// 	const realResult = matchRanges(seedRange, mappingRange)
	// 	const good = JSON.stringify(realResult) === JSON.stringify(expectedResult)
	// 	console.log(`${good ? '✅' : '❌'} ${seedRange} with ${mappingRange} give ${realResult} should be ${expectedResult}`)
	// }

	// test(new Range(10, 21, true, false), new Range(30, 41, true, false), [new Range(10, 21, true, false)])

	// test(new Range(10, 21, true, false), new Range(10, 21, true, false), [new Range(10, 21, true, false)])

	// test(new Range(10, 21, true, false), new Range(10, 31, true, false), [new Range(10, 21, true, false)])
	// test(new Range(20, 31, true, false), new Range(10, 31, true, false), [new Range(20, 31, true, false)])
	// test(new Range(20, 31, true, false), new Range(10, 41, true, false), [new Range(20, 31, true, false)])

	// test(new Range(10, 31, true, false), new Range(10, 21, true, false), [new Range(10, 21, true, false), new Range(21, 31, true, false)])
	// test(new Range(10, 31, true, false), new Range(20, 31, true, false), [new Range(10, 20, true, false), new Range(20, 31, true, false)])
	// test(new Range(10, 41, true, false), new Range(20, 31, true, false), [new Range(10, 20, true, false), new Range(20, 31, true, false), new Range(31, 41, true, false)])

	// test(new Range(10, 31, true, false), new Range(20, 41, true, false), [new Range(10, 20, true, false), new Range(20, 31, true, false)])
	// test(new Range(20, 41, true, false), new Range(10, 31, true, false), [new Range(20, 31, true, false), new Range(31, 41, true, false)])




	// const seeds = seedRanges.map(getFullSeedRange).flat()
	// console.log(seeds.length)

	// const mapA = {
	// 	source: {
	// 		start: 10,
	// 		end: 20,
	// 	},
	// 	destination: {
	// 		start: 40,
	// 		end: 50,
	// 	}
	// }

	// const mapB = {
	// 	source: {
	// 		start: 60,
	// 		end: 70,
	// 	},
	// 	destination: {
	// 		start: 80,
	// 		end: 90,
	// 	}
	// }

	// console.log(mapA)
	// console.log(mapB)
	// console.log(mergeMaps(mapA, mapB))

	return applyMaps(seedRanges, maps)
		.reduce((minRange, seedRange) => seedRange.start < minRange.start ? seedRange : minRange)
		.start
}

module.exports = contestResponse