import { Point2D } from './point-2d'
import { Rectangle2D } from './rectangle-2d'

export class Cell2D<T> extends Point2D {
  private _value: T

  constructor({ x, y, value }: { x: number; y: number; value: T }) {
    super({ x, y })
    this._value = value
  }

  get value(): T {
    return this._value
  }

  set value(value: T) {
    this._value = value
  }
}

export class FixedGrid2D<T> {
  private grid: Map<number, Map<number, Cell2D<T>>>
  private bounds: Rectangle2D
  private fixedBounds: boolean

  constructor(arayGrid: T[][]) {
    this.loadArray(arayGrid)
  }

  public isOutsideBounds(point: Point2D): boolean {
    return !this.bounds.contains(point)
  }

  private updateBounds(point: Point2D): void {
    if (point.x < this.bounds.minX) this.bounds.minX = point.x
    if (point.x > this.bounds.maxX) this.bounds.maxX = point.x
    if (point.y < this.bounds.minY) this.bounds.minY = point.y
    if (point.y > this.bounds.maxY) this.bounds.maxY = point.y
  }

  public getRow(x: number): Map<number, Cell2D<T>> | undefined {
    return this.grid.get(x)
  }

  private initRow(x: number): void {
    this.grid.set(x, new Map())
  }

  public getCell(point: Point2D): Cell2D<T> | undefined {
    return this.getRow(point.x)?.get(point.y)
  }

  public setCell(cell: Cell2D<T>): void {
    if (this.fixedBounds && this.isOutsideBounds(cell))
      throw new Error('Cannot set cell outside bounds when fixed bounds')

    if (this.getRow(cell.x) === undefined) this.initRow(cell.x)

    this.getRow(cell.x)!.set(cell.y, cell)
    this.updateBounds(cell)
  }

  private loadArray(array: T[][]): void {
    this.grid = new Map()
    this.bounds = new Rectangle2D({ minX: 0, minY: 0, maxX: 0, maxY: 0 })
    this.fixedBounds = false

    array.toReversed().forEach((row, y) => {
      row.forEach((value, x) => {
        this.setCell(new Cell2D({ x, y, value }))
      })
    })

    this.fixedBounds = true
  }

  public forEach(callback: (cell: Cell2D<T>) => void): void {
    for (let y = this.bounds.maxY; y >= this.bounds.minY; y--) {
      for (let x = this.bounds.minX; x <= this.bounds.maxX; x++) {
        callback(this.getCell(new Point2D({ x, y }))!)
      }
    }
  }

  public toArray(): T[][] {
    const grid: T[][] = []
    let row: T[] = []
    this.forEach((cell) => {
      if (cell.x === this.bounds.minX) {
        if (row.length > 0) grid.push(row)
        row = []
      }
      row.push(cell.value)
    })
    grid.push(row)
    return grid
  }

  public toString(): string {
    const gridArray = this.toArray()
    return gridArray.map((row) => row.join('')).join('\n')
  }

  public getAllCellsOf(value: T): Cell2D<T>[] {
    const result: Cell2D<T>[] = []
    this.forEach((cell) => {
      if (cell.value === value) result.push(cell)
    })
    return result
  }
}
