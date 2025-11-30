import { sum } from 'src/utils/array'

export const parseInput = (input: string[]): { runes: string[]; texts: string[] } => {
  const [, rawRunes] = input[0]!.split(':')
  return {
    runes: rawRunes!.trim().split(','),
    texts: input.slice(2),
  }
}

export const getAllIndexesForRegex = (regex: RegExp, text: string): number[] => {
  const indexes: number[] = []
  let match

  while ((match = regex.exec(text)) !== null) {
    indexes.push(match.index)
    regex.lastIndex = match.index + 1
  }

  return indexes
}

export const countRunes = (runes: string[], text: string): number => {
  const allRunes = [...runes, ...runes.map((rune) => rune.split('').reverse().join(''))]
  const indexesSet = new Set()

  allRunes.forEach((rune) => {
    const regex = new RegExp(rune, 'g')

    getAllIndexesForRegex(regex, text).forEach((index) => {
      for (let i = 0; i < rune.length; i++) {
        indexesSet.add(index + i)
      }
    })
  })

  return indexesSet.size
}

export const getResponse = (input: string[]): string => {
  const { runes, texts } = parseInput(input)

  return sum(texts.map((text) => countRunes(runes, text))).toString()
}
