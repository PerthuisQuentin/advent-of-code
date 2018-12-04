const Fs = require('fs')
const Path = require('path')
const Assert = require('assert')
const Should = require('should')

const codePath = Path.resolve(__dirname, '../')
const testPath = Path.resolve(__dirname, '../test')

describe('Advent of code', () => {
	// Foreach Advent of code years
	Fs.readdirSync(testPath).forEach(yearFile => {
		const yearTestPath = Path.join(testPath, yearFile)

		if (!Fs.lstatSync(yearTestPath).isDirectory()) return

		describe(yearFile, () => {
			// Foreach year exerices
			Fs.readdirSync(yearTestPath).forEach(dayFile => {
				const dayTestPath = Path.join(yearTestPath, dayFile)
				
				if (!Fs.lstatSync(dayTestPath).isDirectory()) return

				describe(dayFile, () => {
					// Foreach exercice part
					Fs.readdirSync(dayTestPath).forEach(partFile => {
						const partTestPath = Path.join(dayTestPath, partFile)

						if (!Fs.lstatSync(partTestPath).isDirectory()) return

						describe(partFile, () => {
							var partCode = require(Path.join(codePath, yearFile, dayFile, partFile + '.js'))
		
							// Foreach test
							Fs.readdirSync(partTestPath).forEach(testFile => {
								const testPath = Path.join(partTestPath, testFile)
								const content = Fs.readFileSync(testPath, { encoding: 'utf-8' })
								
								const rows = content.split('\n')
								const separationIndex = rows.indexOf('')
								const input = rows.slice(0, separationIndex)
								const output = rows.slice(separationIndex + 1)
		
								it(`${Path.basename(testFile, '.txt')} : Should return ${output}`, () => {
									output.should.containEql(partCode(input))
								})
							})
						})
					})
				})
			})
		})
	})
})