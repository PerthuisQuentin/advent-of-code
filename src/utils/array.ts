export const sum = (list: number[]): number => {
  if (!list.length) throw new Error('Empty list')
  if (list.length === 1) return list[0]!
  return list.reduce((a, b) => a + b, 0)
}

export const min = (list: number[]): number => {
  if (!list.length) throw new Error('Empty list')
  if (list.length === 1) return list[0]!
  return list.reduce((a, b) => Math.min(a, b), list[0]!)
}

export const max = (list: number[]): number => {
  if (!list.length) throw new Error('Empty list')
  if (list.length === 1) return list[0]!
  return list.reduce((a, b) => Math.max(a, b), list[0]!)
}
