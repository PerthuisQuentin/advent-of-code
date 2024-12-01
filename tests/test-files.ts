import Fs from 'fs'

export type TestFile = {
  input: string[]
  output: string
}

export const readTestFile = (path: string): TestFile => {
  const testContent = Fs.readFileSync(path, 'utf-8')

  const rows = testContent.split('\n')

  const inputIndex = rows.indexOf('--input--')
  const outputIndex = rows.indexOf('--output--')

  const input = rows.slice(inputIndex + 1, outputIndex - 1)
  const rawOutput = rows.slice(outputIndex + 1)
  const output = rawOutput[0] ? rawOutput[0] : ''

  return { input, output }
}
