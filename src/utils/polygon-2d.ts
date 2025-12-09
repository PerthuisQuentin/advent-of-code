import { Point2D } from './point-2d'
import { Segment2D } from './segment-2d'

export class Polygon2D {
  public vertices: Point2D[]

  constructor(vertices: Point2D[]) {
    if (vertices.length < 3) {
      throw new Error('A polygon must have at least 3 vertices')
    }
    this.vertices = vertices
  }

  /**
   * Checks if a point is inside the polygon using the ray casting algorithm.
   * The algorithm counts how many times a ray from the point crosses the polygon edges.
   * If the count is odd, the point is inside; if even, it's outside.
   * Points on the boundary are also considered inside.
   * @param point The point to test
   * @returns true if the point is inside the polygon or on its boundary, false otherwise
   */
  public contains(point: Point2D): boolean {
    // First check if the point is on any edge
    for (const edge of this.getEdges()) {
      if (edge.contains(point)) {
        return true
      }
    }

    // Then use ray casting for interior check
    let inside = false

    for (const edge of this.getEdges()) {
      if (edge.intersectsHorizontalRay(point)) {
        inside = !inside
      }
    }

    return inside
  }

  /**
   * Returns all edges of the polygon as segments.
   * @returns An array of segments representing the polygon edges
   */
  public getEdges(): Segment2D[] {
    const edges: Segment2D[] = []

    for (let i = 0; i < this.vertices.length; i++) {
      const start = this.vertices[i]!
      const end = this.vertices[(i + 1) % this.vertices.length]!
      edges.push(new Segment2D({ start, end }))
    }

    return edges
  }

  /**
   * Calculates the perimeter of the polygon.
   * @returns The sum of all edge lengths
   */
  public getPerimeter(): number {
    return this.getEdges().reduce((sum, edge) => sum + edge.getLength(), 0)
  }

  /**
   * Calculates the area of the polygon using the Shoelace formula.
   * @returns The area of the polygon
   */
  public getArea(): number {
    let area = 0

    for (let i = 0; i < this.vertices.length; i++) {
      const current = this.vertices[i]!
      const next = this.vertices[(i + 1) % this.vertices.length]!
      area += current.x * next.y - next.x * current.y
    }

    return Math.abs(area) / 2
  }
}
