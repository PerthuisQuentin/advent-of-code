const Fs = require('fs')
const Path = require('path')
const Assert = require('assert')
const argv = require('yargs').argv

const initialPath = './'

const yearSettings = {
	regex: /year-\d+/,
	option: 'year',
	text: 'Year'
}
const daySettings = {
	regex: /day-\d+/,
	option: 'day',
	text: 'Day'
}
const partSettings = {
	regex: /part-\d+/,
	option: 'part',
	text: 'Part'
}
const testSettings = {
	regex: /test-[0-9a-z]+/,
	option: 'test',
	text: 'Test'
}

const display = (text, number) => number ? `${text} #${number}` : text

const loopOnFiles = (path, regex, option, callback) => {
	Fs.readdirSync(path)
		.filter(name => regex.test(name))
		.filter(name => !argv[option] || name.includes(argv[option]))
		.forEach(callback)
}

const loopOnFolders = (settings, callback) => path => {
	if (!Fs.lstatSync(path).isDirectory()) return

	loopOnFiles(path, settings.regex, settings.option, name => {
		const newPath = Path.join(path, name)
		const number = name.split('-')[1]

		describe(display(settings.text, number), () => {
			callback(newPath)
		})
	})
}

const prettifyOutput = output => {
	if (!Array.isArray(output)) return output
	return `\n${output.join('\n')}\n`
}

const loopOnTests = path => {
	const partCode = require(Path.join('../', path, 'index.js'))

	loopOnFiles(path, testSettings.regex, testSettings.option, name => {
		const testPath = Path.join(path, name)
		const testNumber = Path.basename(name, '.txt').split('-')[1]
		const testContent = Fs.readFileSync(testPath, { encoding: 'utf-8' })

		const rows = testContent.split('\n')

		const inputIndex = rows.indexOf('--input--')
		const outputIndex = rows.indexOf('--output--')

		const input = rows.slice(inputIndex + 1, outputIndex - 1)
		const rawOutput = rows.slice(outputIndex + 1)

		const output = rawOutput.length === 1 ? rawOutput[0] : rawOutput

		it(`${display(testSettings.text, testNumber)} : Should return ${prettifyOutput(output)}`, () => {
			Assert.deepEqual(partCode(input), output)
		})
	})
}

const loopOnParts = loopOnFolders(partSettings, loopOnTests)
const loopOnDays = loopOnFolders(daySettings, loopOnParts)
const loopOnYears = loopOnFolders(yearSettings, loopOnDays)

describe('Advent of Code', () => {
	loopOnYears(initialPath)
})