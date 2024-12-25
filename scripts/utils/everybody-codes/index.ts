import { Challenge, ChallengeName } from '../challenge'
import { getDayPaths, getPartPaths, getYearPaths } from '../paths'

import { askYear, askYearAndQuest } from './prompts'

const CHALLENGE_FOLDER_NAME = 'everybody-codes'
const EDITION_FILE_NAME = 'year'
const EXERCICE_FILE_NAME = 'quest'

export const EverybodyCodes: Challenge = {
  name: ChallengeName.EverybodyCodes,
  exerciceName: 'Quest',
  exerciceAmount: 20,
  partAmount: 3,
  askEdition: askYear,
  askEditionAndExercice: askYearAndQuest,
  getEditionPaths: getYearPaths(CHALLENGE_FOLDER_NAME, EDITION_FILE_NAME),
  getExercicePaths: getDayPaths(CHALLENGE_FOLDER_NAME, EDITION_FILE_NAME, EXERCICE_FILE_NAME),
  getPartPaths: getPartPaths(CHALLENGE_FOLDER_NAME, EDITION_FILE_NAME, EXERCICE_FILE_NAME),
  getInput: () => Promise.resolve('data'),
}
