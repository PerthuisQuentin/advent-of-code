import { sum } from 'src/utils/array'

export const parseInput = (input: string[]): { runes: string[]; text: string } => {
  const [, rawRunes] = input[0]!.split(':')
  return {
    runes: rawRunes!.trim().split(','),
    text: input[2]!,
  }
}

export const countRunes = (runes: string[], text: string): number => {
  const regexes = runes.map((rune) => new RegExp(rune, 'g'))
  return sum(regexes.map((regex) => (text.match(regex) ?? []).length))
}

export const getResponse = (input: string[]): string => {
  const { runes, text } = parseInput(input)

  return countRunes(runes, text).toString()
}
