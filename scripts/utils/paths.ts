import { EditionPaths, ExerciePaths, PartPaths } from './challenge'

const basePath = `./src`

export const getYearPaths =
  (challengeFolderName: string, editionName: string) =>
  (year: string): EditionPaths => {
    const editionFolderName = `${editionName}-${year}`
    const editionPath = `${basePath}/${challengeFolderName}/${editionFolderName}`
    const readmePath = `${editionPath}/README.md`

    return {
      editionFolderName,
      editionPath,
      readmePath,
    }
  }

export const getDayPaths =
  (challengeFolderName: string, editionName: string, exerciceName: string) =>
  (year: string, day: string): ExerciePaths => {
    const { editionPath } = getYearPaths(challengeFolderName, editionName)(year)

    const paddedDay = day.padStart(2, '0')
    const exerciceFolderName = `${exerciceName}-${paddedDay}`
    const exercicePath = `${editionPath}/${exerciceFolderName}`

    return {
      exerciceFolderName,
      exercicePath,
    }
  }

export const getPartPaths =
  (challengeFolderName: string, editionName: string, exerciceName: string) =>
  (year: string, day: string, part: string): PartPaths => {
    const { exercicePath } = getDayPaths(challengeFolderName, editionName, exerciceName)(year, day)

    const paddedDay = day.padStart(2, '0')

    const partPath = `${exercicePath}/part-${part}`
    const fileName = `${year}-${paddedDay}-${part}`
    const codePath = `${partPath}/${fileName}.ts`
    const testPath = `${partPath}/${fileName}.spec.ts`

    return {
      partPath,
      fileName,
      codePath,
      testPath,
    }
  }
