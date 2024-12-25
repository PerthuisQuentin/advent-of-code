import { sum } from 'src/utils/array'

type Lists = { list1: number[]; list2: number[] }

export const parseInput = (input: string[]): Lists => {
  return input
    .map((line) => line.split('   '))
    .reduce(
      (acc, [a, b]) => {
        acc.list1.push(Number(a as string))
        acc.list2.push(Number(b as string))
        return acc
      },
      { list1: [], list2: [] } as Lists,
    )
}

export const findSmallest = (list: number[]): { value: number; index: number } => {
  return list.reduce(
    (acc, value, index) => {
      if (value < acc.value) {
        acc.value = value
        acc.index = index
      }
      return acc
    },
    { value: list[0], index: 0 } as { value: number; index: number },
  )
}

export const getResponse = (input: string[]): string => {
  const { list1, list2 } = parseInput(input)

  const distances: number[] = []

  while (list1.length) {
    const smallest1 = findSmallest(list1)
    const smallest2 = findSmallest(list2)

    distances.push(Math.abs(smallest1.value - smallest2.value))

    list1.splice(smallest1.index, 1)
    list2.splice(smallest2.index, 1)
  }

  return sum(distances).toString()
}
