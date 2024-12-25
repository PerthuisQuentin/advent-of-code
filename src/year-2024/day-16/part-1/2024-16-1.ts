import { Cell2D, FixedGrid2D } from 'src/utils/fixed-grid-2d'
import { parseInputToGrid } from 'src/utils/input'
import { Point2D } from 'src/utils/point-2d'

export enum Tile {
  Empty = '.',
  Wall = '#',
  Start = 'S',
  End = 'E',
}

export const parseInput = (
  input: string[],
): { grid: FixedGrid2D<Tile>; start: Point2D; end: Point2D } => {
  const grid = parseInputToGrid(input, (char) => char as Tile)
  const start = grid.find((cell) => cell.value === Tile.Start)!.point
  const end = grid.find((cell) => cell.value === Tile.End)!.point
  grid.setCell(new Cell2D({ ...start, value: Tile.Empty }))
  grid.setCell(new Cell2D({ ...end, value: Tile.Empty }))
  return { grid, start, end }
}

// export type Hashable = {
//   hash: string
// }

// export class Node<T extends Hashable> {
//   public value: T

//   constructor(value: T) {
//     this.value = value
//   }

//   get hash(): string {
//     return this.value.hash
//   }
// }

// export class WeightedGraph<T extends Hashable> {
//   public nodes: Map<string, Node<T>> = new Map()
//   public links: Map<string, number> = new Map()

//   constructor(nodes: Node<T>[]) {
//     nodes.forEach((node) => this.addNode(node))
//   }

//   nodeToNodeHash(node1: Node<T>, node2: Node<T>): string {
//     return `${node1.hash}-${node2.hash}`
//   }

//   addNode(node: Node<T>): void {
//     this.nodes.set(node.hash, node)
//   }

//   addLink(node1: Node<T>, node2: Node<T>, weight: number = 1, bothWay: boolean = false): void {
//     this.links.set(this.nodeToNodeHash(node1, node2), weight)
//     if (bothWay) {
//       this.links.set(this.nodeToNodeHash(node2, node1), weight)
//     }
//   }
// }

// export const bfs = (grid: FixedGrid2D<Tile>, start: Point2D, end: Point2D): Point2D[] => {
//   const queue = [start]
//   const parentByHash = new Map<string, Point2D>()
//   const distanceByHash = new Map<string, number>()
//   distanceByHash.set(start.hash, 0)

//   while (queue.length > 0) {
//     const current = queue.shift()!
//     if (current.isSame(end)) {
//       break
//     }

//     for (const neighbor of grid.getNeighbors(current)) {
//       if (neighbor.value === Tile.Wall) {
//         continue
//       }

//       if (parentByHash.has(neighbor.hash)) {
//         continue
//       }

//       parentByHash.set(neighbor.hash, current)
//       distanceByHash.set(neighbor.hash, distanceByHash.get(current.hash)! + 1)
//       queue.push(neighbor.point)
//     }
//   }

//   const path: Point2D[] = []
//   let current = end
//   while (!current.isSame(start)) {
//     path.push(current)
//     current = parentByHash.get(current.hash)!
//   }

//   return path.reverse()
// }

export const djikstra = (grid: FixedGrid2D<Tile>, start: Point2D, end: Point2D): Point2D[] => {
  const queue = [start]
  const parentByHash = new Map<string, Point2D>()
  const distanceByHash = new Map<string, number>()

  grid.forEach((cell) => {
    if (cell.value === Tile.Empty) {
      distanceByHash.set(cell.point.hash, Infinity)
    }
  })
  distanceByHash.set(start.hash, 0)

  while (queue.length > 0) {
    const current = queue.shift()!
    if (current.isSame(end)) {
      break
    }

    for (const neighbor of grid.getNeighbors(current)) {
      if (neighbor.value === Tile.Wall) {
        continue
      }

      const distance = distanceByHash.get(current.hash)! + 1
      if (!distanceByHash.has(neighbor.hash) || distance < distanceByHash.get(neighbor.hash)!) {
        parentByHash.set(neighbor.hash, current)
        distanceByHash.set(neighbor.hash, distance)
        queue.push(neighbor.point)
      }
    }
  }

  const path: Point2D[] = []
  let current = end
  while (!current.isSame(start)) {
    path.push(current)
    current = parentByHash.get(current.hash)!
  }

  return path.reverse()
}

// export enum Direction {
//   Up = '^',
//   Down = 'v',
//   Left = '<',
//   Right = '>',
//   None = '.',
// }

// export class OrientedPoint2D extends Point2D {
//   public direction: Direction = Direction.None

//   constructor(x: number, y: number, direction: Direction) {
//     super({ x, y })
//     this.direction = direction
//   }

//   get hash(): string {
//     return `${this.x}/${this.y}/${this.direction}`
//   }
// }

export const getResponse = (input: string[]): string => {
  const { grid, start, end } = parseInput(input)

  console.log(grid.toString())
  console.log(start, end)

  // const nodes: Node<OrientedPoint2D>[] = grid
  //   .getAllCellsOf(Tile.Empty)
  //   .map((cell) => new Node(new OrientedPoint2D(cell.x, cell.y, Direction.None)))

  // const graph = new WeightedGraph(nodes)

  // console.log(graph)

  // const path = bfs(grid, start, end)

  // console.log(path)

  // path.forEach((point) => {
  //   grid.setCell(new Cell2D({ ...point, value: Tile.Start }))
  // })

  // console.log(grid.toString())
  // console.log(path.length)

  return input[0]!
}
