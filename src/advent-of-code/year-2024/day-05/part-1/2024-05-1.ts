import { sum } from 'src/utils/array'

type CoupleOrder = { x: number; y: number }
type Update = number[]

export const parseInput = (input: string[]): { coupleOrders: CoupleOrder[]; updates: Update[] } => {
  const index = input.indexOf('')
  const rawCoupleOrders = input.slice(0, index)
  const rawUpdates = input.slice(index + 1)

  const coupleOrders = rawCoupleOrders.map((rawCoupleOrder) => {
    const [x, y] = rawCoupleOrder.split('|').map(Number)
    return { x: x!, y: y! }
  })

  const updates = rawUpdates.map((rawUpdate) => rawUpdate.split(',').map(Number))

  return { coupleOrders, updates }
}

export const hashNumbers = (x: number, y: number): string => (x < y ? `${x}|${y}` : `${y}|${x}`)

export const getCoupleOrderHashMap = (coupleOrders: CoupleOrder[]): Map<string, CoupleOrder> => {
  const coupleOrderHashMap = new Map<string, CoupleOrder>()

  coupleOrders.forEach((coupleOrder) => {
    const hash = hashNumbers(coupleOrder.x, coupleOrder.y)
    coupleOrderHashMap.set(hash, coupleOrder)
  })

  return coupleOrderHashMap
}

export const sortUpdate = (
  update: Update,
  coupleOrderHashMap: Map<string, CoupleOrder>,
): Update => {
  const newUpdate = [...update]

  newUpdate.sort((a, b) => {
    const coupleOrder = coupleOrderHashMap.get(hashNumbers(a, b))
    if (coupleOrder) {
      return coupleOrder.x === a ? -1 : 1
    } else {
      return 0
    }
  })

  return newUpdate
}

export const getMiddleValue = (values: number[]): number => {
  const index = Math.floor(values.length / 2)
  return values[index]!
}

export const getResponse = (input: string[]): string => {
  const { coupleOrders, updates } = parseInput(input)
  const coupleOrderHashMap = getCoupleOrderHashMap(coupleOrders)

  const validUpdates = updates.filter((update) => {
    const sortedUpdate = sortUpdate(update, coupleOrderHashMap)
    return update.join(',') === sortedUpdate.join(',')
  })

  const result = sum(validUpdates.map((update) => getMiddleValue(update)))

  return result.toString()
}
