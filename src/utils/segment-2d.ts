import { Point2D } from './point-2d'

export class Segment2D {
  public start: Point2D
  public end: Point2D

  constructor({ start, end }: { start: Point2D; end: Point2D }) {
    this.start = start
    this.end = end
  }

  public getLength(): number {
    const dx = this.end.x - this.start.x
    const dy = this.end.y - this.start.y
    return Math.sqrt(dx * dx + dy * dy)
  }

  public getManhattanLength(): number {
    return this.start.getManhattanDistance(this.end)
  }

  public getMiddlePoint(): Point2D {
    return this.start.getMiddlePoint(this.end)
  }

  public isHorizontal(): boolean {
    return this.start.y === this.end.y
  }

  public isVertical(): boolean {
    return this.start.x === this.end.x
  }

  public contains(point: Point2D): boolean {
    // Check if point is on the line segment using cross product
    const crossProduct =
      (point.y - this.start.y) * (this.end.x - this.start.x) -
      (point.x - this.start.x) * (this.end.y - this.start.y)

    // If cross product is not 0, point is not on the line
    if (Math.abs(crossProduct) > Number.EPSILON) return false

    // Check if point is within the segment bounds
    const minX = Math.min(this.start.x, this.end.x)
    const maxX = Math.max(this.start.x, this.end.x)
    const minY = Math.min(this.start.y, this.end.y)
    const maxY = Math.max(this.start.y, this.end.y)

    return point.x >= minX && point.x <= maxX && point.y >= minY && point.y <= maxY
  }

  public getPoints(): Point2D[] {
    return this.start.getPointsOnLineTo(this.end)
  }

  /**
   * Determines if a point is on the left side of this segment (counter-clockwise orientation).
   * Uses the cross product to determine the orientation.
   * @param point Point to test
   * @returns true if the point is on the left side (counter-clockwise), false otherwise
   */
  public isPointCounterClockwise(point: Point2D): boolean {
    return (
      (point.y - this.start.y) * (this.end.x - this.start.x) >
      (this.end.y - this.start.y) * (point.x - this.start.x)
    )
  }

  /**
   * Checks if this segment intersects with another segment.
   * @param other The other segment to check intersection with
   * @returns true if the segments intersect, false otherwise
   */
  public intersects(other: Segment2D): boolean {
    return (
      this.isPointCounterClockwise(other.start) !== this.isPointCounterClockwise(other.end) &&
      other.isPointCounterClockwise(this.start) !== other.isPointCounterClockwise(this.end)
    )
  }

  /**
   * Checks if this segment properly intersects with another segment.
   * A proper intersection means they cross each other, not just touch at endpoints or overlap.
   * @param other The other segment to check intersection with
   * @returns true if the segments properly intersect (cross), false if they only touch at endpoints, one endpoint is on the other segment, or don't intersect
   */
  public properlyIntersects(other: Segment2D): boolean {
    // First check if they intersect at all
    if (!this.intersects(other)) {
      return false
    }

    // Check if they share an endpoint (touching, not crossing)
    const sharesEndpoint =
      this.start.isSame(other.start) ||
      this.start.isSame(other.end) ||
      this.end.isSame(other.start) ||
      this.end.isSame(other.end)

    if (sharesEndpoint) {
      return false
    }

    // Check if any endpoint of one segment is on the other segment
    // This handles cases where segments overlap or touch at non-endpoints
    if (
      this.contains(other.start) ||
      this.contains(other.end) ||
      other.contains(this.start) ||
      other.contains(this.end)
    ) {
      return false
    }

    return true
  }

  /**
   * Checks if a horizontal ray from a point (going right) intersects this segment.
   * Used in ray casting algorithms for point-in-polygon tests.
   * @param point The point from which the horizontal ray originates
   * @returns true if the ray intersects the segment, false otherwise
   */
  public intersectsHorizontalRay(point: Point2D): boolean {
    // The segment must cross the height of the point
    if (this.start.y > point.y === this.end.y > point.y) {
      return false
    }

    // Calculate the X intersection of the ray with the segment
    const xIntersection =
      this.start.x +
      ((this.end.x - this.start.x) * (point.y - this.start.y)) / (this.end.y - this.start.y)

    // The point must be to the left of the intersection
    return point.x < xIntersection
  }
}
