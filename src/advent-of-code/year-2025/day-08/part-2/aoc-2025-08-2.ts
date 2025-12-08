import { UnionFind } from 'src/utils/union-find'

import { getNodeCouples, parsePoints } from '../part-1/aoc-2025-08-1'

export const getResponse = (input: string[]): string => {
  const points = parsePoints(input.slice(1))
  const nodes = points.map((point, index) => ({ id: index, point }))
  const couples = getNodeCouples(nodes)

  couples.sort((a, b) => a.distance - b.distance)

  const networks = new UnionFind(nodes, (node) => node.id)

  let i = 0
  while (networks.getSetCount() > 1) {
    const link = couples[i]!
    networks.union(link.nodeA, link.nodeB)
    i++
  }

  const lastConnection = couples[i - 1]!
  const result = lastConnection.nodeA.point.x * lastConnection.nodeB.point.x

  return result.toString()
}
