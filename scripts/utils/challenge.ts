export enum ChallengeName {
  AdventOfCode = 'Advent of Code',
  EverybodyCodes = 'Everybody Codes',
}

export type EditionResponse = {
  edition: string
}

export type EditionAndExerciceResponse = EditionResponse & {
  exercice: string
}

export type EditionPaths = {
  editionFolderName: string
  editionPath: string
  readmePath: string
}

export type ExerciePaths = {
  exerciceFolderName: string
  exercicePath: string
}

export type PartPaths = {
  partPath: string
  fileName: string
  codePath: string
  testPath: string
}

export type Challenge = {
  name: ChallengeName
  exerciceName: string
  exerciceAmount: number
  partAmount: number
  askEdition: () => Promise<EditionResponse>
  askEditionAndExercice: () => Promise<EditionAndExerciceResponse>
  getEditionPaths: (edition: string) => EditionPaths
  getExercicePaths: (edition: string, exercice: string) => ExerciePaths
  getPartPaths: (edition: string, exercice: string, part: string) => PartPaths
  getInput: (edition: string, exercice: string) => Promise<string>
}
