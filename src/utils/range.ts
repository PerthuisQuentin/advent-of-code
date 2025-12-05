export class Range {
  public start: number
  public end: number
  public startInclusive: boolean
  public endInclusive: boolean

  constructor(start: number, end: number, startInclusive = true, endInclusive = true) {
    this.start = start
    this.end = end
    this.startInclusive = startInclusive
    this.endInclusive = endInclusive
  }

  public clone(): Range {
    return new Range(this.start, this.end, this.startInclusive, this.endInclusive)
  }

  get hash(): string {
    return `${this.start}-${this.end}-${this.startInclusive}-${this.endInclusive}`
  }

  public asInclusive(): Range {
    const start = this.startInclusive ? this.start : this.start + 1
    const end = this.endInclusive ? this.end : this.end - 1
    return new Range(start, end, true, true)
  }

  public has(value: number): boolean {
    const range = this.asInclusive()
    return range.start <= value && value <= range.end
  }

  public isSame(range: Range): boolean {
    return (
      this.start === range.start &&
      this.end === range.end &&
      this.startInclusive === range.startInclusive &&
      this.endInclusive === range.endInclusive
    )
  }

  public intersects(range: Range): boolean {
    const rangeA = this.asInclusive()
    const rangeB = range.asInclusive()
    return rangeA.end >= rangeB.start && rangeB.end >= rangeA.start
  }

  public contains(range: Range): boolean {
    const rangeA = this.asInclusive()
    const rangeB = range.asInclusive()
    return rangeA.start <= rangeB.start && rangeB.end <= rangeA.end
  }

  public merge(range: Range): Range | null {
    if (!this.intersects(range)) return null

    const rangeA = this.asInclusive()
    const rangeB = range.asInclusive()

    const start = Math.min(rangeA.start, rangeB.start)
    const end = Math.max(rangeA.end, rangeB.end)

    return new Range(start, end, true, true)
  }

  public size(): number {
    const range = this.asInclusive()
    return range.end - range.start + 1
  }

  public toString(): string {
    return `${this.startInclusive ? '[' : '('}${this.start}, ${this.end}${this.endInclusive ? ']' : ')'}`
  }
}
