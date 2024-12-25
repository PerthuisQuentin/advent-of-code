import Fs from 'fs'

import { getExampleFilesPaths } from './utils/example-paths'
import { identifyChallenge } from './utils/get-challenge'

const run = async (): Promise<void> => {
  const challenge = await identifyChallenge()

  const { edition, exercice } = await challenge.askEditionAndExercice()
  const { editionPath } = challenge.getEditionPaths(edition)
  const { exercicePath } = challenge.getExercicePaths(edition, exercice)
  const { testFilePath, test1FilePath, testFinalFilePath, codeFilePath } = getExampleFilesPaths()

  // Create folders
  if (!Fs.existsSync(editionPath)) Fs.mkdirSync(editionPath)
  if (!Fs.existsSync(exercicePath)) Fs.mkdirSync(exercicePath)

  // Get input and create test-final file content
  const testFileContent = Fs.readFileSync(testFilePath, 'utf-8')

  const input = await challenge.getInput(edition, exercice)
  const testFinalContent = Fs.readFileSync(testFinalFilePath, 'utf-8').replace('${data}', input)

  for (let i = 1; i <= challenge.partAmount; i++) {
    const { partPath, fileName, codePath, testPath } = challenge.getPartPaths(
      edition,
      exercice,
      i.toString(),
    )

    if (!Fs.existsSync(partPath)) Fs.mkdirSync(partPath)

    Fs.copyFileSync(codeFilePath, codePath)
    Fs.copyFileSync(test1FilePath, `${partPath}/test-01.txt`)
    Fs.writeFileSync(`${partPath}/test-final.txt`, testFinalContent)
    Fs.writeFileSync(testPath, testFileContent.replaceAll('${name}', fileName))
  }

  console.log('Done ! 🎉')
}

run().catch(console.error)
