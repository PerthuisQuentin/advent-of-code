export type ExampleFilesPaths = {
  codeFilePath: string
  testFilePath: string
  test1FilePath: string
  testFinalFilePath: string
  readmePath: string
}

export const getExampleFilesPaths = (): ExampleFilesPaths => {
  const basePath = `./scripts/files`
  const codeFilePath = `${basePath}/code.ts`
  const testFilePath = `${basePath}/test.spec.ts`
  const test1FilePath = `${basePath}/test-01.txt`
  const testFinalFilePath = `${basePath}/test-final.txt`
  const readmePath = `${basePath}/README.md`

  return {
    codeFilePath,
    testFilePath,
    test1FilePath,
    testFinalFilePath,
    readmePath,
  }
}
