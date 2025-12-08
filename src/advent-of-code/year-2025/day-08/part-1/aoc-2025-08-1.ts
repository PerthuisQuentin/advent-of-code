import { Point3D } from 'src/utils/point-3d'
import { UnionFind } from 'src/utils/union-find'

export type Node = {
  id: number
  point: Point3D
}

export type NodeCouple = {
  nodeA: Node
  nodeB: Node
  distance: number
}

export const parsePoints = (input: string[]): Point3D[] => {
  return input.map((line) => {
    const [x, y, z] = line.split(',').map(Number)
    return new Point3D({ x: x!, y: y!, z: z! })
  })
}

export const getNodeCouples = (nodes: Node[]): NodeCouple[] => {
  const couples: NodeCouple[] = []

  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const nodeA = nodes[i]!
      const nodeB = nodes[j]!
      const distance = nodeA.point.getEuclideanDistance(nodeB.point)

      couples.push({ nodeA, nodeB, distance })
    }
  }

  return couples
}

export const getResponse = (input: string[]): string => {
  const loopCount = parseInt(input[0]!, 10)

  const points = parsePoints(input.slice(1))
  const nodes = points.map((point, index) => ({ id: index, point }))
  const couples = getNodeCouples(nodes)

  couples.sort((a, b) => a.distance - b.distance)

  const networks = new UnionFind(nodes, (node) => node.id)

  for (let i = 0; i < loopCount; i++) {
    const link = couples[i]!
    networks.union(link.nodeA, link.nodeB)
  }

  const networkSizes = networks
    .getAllSetSizes()
    .toSorted((a, b) => a - b)
    .reverse()
  const threeBiggestSizes = networkSizes.slice(0, 3)
  const result = threeBiggestSizes.reduce((sum, size) => sum * size, 1)

  return result.toString()
}
