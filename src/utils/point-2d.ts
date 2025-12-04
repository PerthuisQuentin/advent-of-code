export class Point2D {
  public x: number
  public y: number

  constructor({ x, y }: { x: number; y: number }) {
    this.x = x
    this.y = y
  }

  get hash(): string {
    return `${this.x}/${this.y}`
  }

  static fromHash(hash: string): Point2D {
    const [x, y] = hash.split('/').map(Number)
    return new Point2D({ x: x!, y: y! })
  }

  public clone(): Point2D {
    return new Point2D({ x: this.x, y: this.y })
  }

  public isSame(point: Point2D): boolean {
    return this.x === point.x && this.y === point.y
  }

  public add(point: Point2D): Point2D {
    return new Point2D({ x: this.x + point.x, y: this.y + point.y })
  }

  public subtract(point: Point2D): Point2D {
    return new Point2D({ x: this.x - point.x, y: this.y - point.y })
  }

  public multiply(factor: number): Point2D {
    return new Point2D({ x: this.x * factor, y: this.y * factor })
  }

  public getMirroredPoint(mirrorPoint: Point2D): Point2D {
    return new Point2D({
      x: mirrorPoint.x - (this.x - mirrorPoint.x),
      y: mirrorPoint.y - (this.y - mirrorPoint.y),
    })
  }

  public getNeighbors(): Point2D[] {
    return [
      new Point2D({ x: this.x - 1, y: this.y }),
      new Point2D({ x: this.x, y: this.y - 1 }),
      new Point2D({ x: this.x + 1, y: this.y }),
      new Point2D({ x: this.x, y: this.y + 1 }),
    ]
  }

  public getNeighborsDiagonal(): Point2D[] {
    return [
      new Point2D({ x: this.x - 1, y: this.y - 1 }),
      new Point2D({ x: this.x - 1, y: this.y + 1 }),
      new Point2D({ x: this.x + 1, y: this.y - 1 }),
      new Point2D({ x: this.x + 1, y: this.y + 1 }),
    ]
  }

  public getNeighborsAll(): Point2D[] {
    return [...this.getNeighbors(), ...this.getNeighborsDiagonal()]
  }

  public isOnSameLine(point: Point2D): boolean {
    return this.x === point.x || this.y === point.y
  }

  public getManhattanDistance(point: Point2D): number {
    return Math.abs(this.x - point.x) + Math.abs(this.y - point.y)
  }

  public getMiddlePoint(point: Point2D): Point2D {
    return new Point2D({
      x: Math.floor((this.x + point.x) / 2),
      y: Math.floor((this.y + point.y) / 2),
    })
  }

  // Bresenham's line algorithm
  public getPointsOnLineTo(point: Point2D): Point2D[] {
    const points: Point2D[] = []
    const dx = Math.abs(point.x - this.x)
    const dy = Math.abs(point.y - this.y)
    const sx = this.x < point.x ? 1 : -1
    const sy = this.y < point.y ? 1 : -1
    let err = dx - dy

    let x = this.x
    let y = this.y

    while (true) {
      points.push(new Point2D({ x, y }))

      if (x === point.x && y === point.y) break

      const e2 = 2 * err
      if (e2 > -dy) {
        err -= dy
        x += sx
      }
      if (e2 < dx) {
        err += dx
        y += sy
      }
    }

    return points
  }
}
