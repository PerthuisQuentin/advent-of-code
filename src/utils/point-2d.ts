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
}
