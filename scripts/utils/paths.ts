const basePath = `./src`

export type YearPaths = {
  yearFolderName: string
  yearPath: string
  readmePath: string
}

export const getYearPaths = (year: string): YearPaths => {
  const yearFolderName = `year-${year}`
  const yearPath = `${basePath}/${yearFolderName}`
  const readmePath = `${yearPath}/README.md`

  return {
    yearFolderName,
    yearPath,
    readmePath,
  }
}

export type Paths = {
  yearFolderName: string
  dayFolderName: string
  yearPath: string
  dayPath: string
  part1Path: string
  part2Path: string
  fileName1: string
  fileName2: string
  code1Path: string
  code2Path: string
  test1Path: string
  test2Path: string
  readmePath: string
}

export const getPaths = (year: string, day: string): Paths => {
  const { yearFolderName, yearPath, readmePath } = getYearPaths(year)

  const paddedDay = day.padStart(2, '0')
  const dayFolderName = `day-${paddedDay}`
  const dayPath = `${yearPath}/${dayFolderName}`
  const part1Path = `${dayPath}/part-1`
  const part2Path = `${dayPath}/part-2`
  const fileName1 = `${year}-${paddedDay}-1`
  const fileName2 = `${year}-${paddedDay}-2`
  const code1Path = `${part1Path}/${fileName1}.ts`
  const code2Path = `${part2Path}/${fileName2}.ts`
  const test1Path = `${part1Path}/${fileName1}.spec.ts`
  const test2Path = `${part2Path}/${fileName2}.spec.ts`

  return {
    yearFolderName,
    dayFolderName,
    yearPath,
    dayPath,
    part1Path,
    part2Path,
    fileName1,
    fileName2,
    code1Path,
    code2Path,
    readmePath,
    test1Path,
    test2Path,
  }
}

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
