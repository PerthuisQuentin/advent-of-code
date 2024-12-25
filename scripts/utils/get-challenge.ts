import { AdventOfCode } from './advent-of-code'
import { Challenge } from './challenge'
import { EverybodyCodes } from './everybody-codes'
import { askChallenge } from './prompts'

export const challenges: Challenge[] = [AdventOfCode, EverybodyCodes]

export const identifyChallenge = async (): Promise<Challenge> => {
  const challengeName = await askChallenge()
  const challenge = challenges.find((challenge) => challenge.name === challengeName)
  if (!challenge) throw new Error(`Challenge "${challengeName}" not found`)
  return challenge
}
