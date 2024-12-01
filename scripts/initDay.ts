import Fs from 'fs'

import { getDayInput } from './utils/aoc-api'
import { getExampleFilesPaths, getPaths } from './utils/paths'
import { askYearAndDay } from './utils/prompts'

const run = async (): Promise<void> => {
  const { year, day } = await askYearAndDay()
  const paths = getPaths(year, day)
  const filesPaths = getExampleFilesPaths()

  // Create folders
  if (!Fs.existsSync(paths.yearPath)) Fs.mkdirSync(paths.yearPath)
  if (Fs.existsSync(paths.dayPath)) return console.log('Day folder already exists')
  Fs.mkdirSync(paths.dayPath)
  Fs.mkdirSync(paths.part1Path)
  Fs.mkdirSync(paths.part2Path)

  // Get input and create test-final file content
  const testFileContent = Fs.readFileSync(filesPaths.testFilePath, 'utf-8')
  const input = await getDayInput(year, day)
  const testFinalContent = Fs.readFileSync(filesPaths.testFinalFilePath, 'utf-8').replace(
    '${data}',
    input,
  )

  // Create part1 files
  Fs.copyFileSync(filesPaths.codeFilePath, paths.code1Path)
  Fs.copyFileSync(filesPaths.test1FilePath, `${paths.part1Path}/test-01.txt`)
  Fs.writeFileSync(`${paths.part1Path}/test-final.txt`, testFinalContent)
  Fs.writeFileSync(paths.test1Path, testFileContent.replaceAll('${name}', paths.fileName1))

  // Create part2 files
  Fs.copyFileSync(filesPaths.codeFilePath, paths.code2Path)
  Fs.copyFileSync(filesPaths.test1FilePath, `${paths.part2Path}/test-01.txt`)
  Fs.writeFileSync(`${paths.part2Path}/test-final.txt`, testFinalContent)
  Fs.writeFileSync(paths.test2Path, testFileContent.replaceAll('${name}', paths.fileName2))

  console.log('Done ! 🎉')
}

run().catch(console.error)
