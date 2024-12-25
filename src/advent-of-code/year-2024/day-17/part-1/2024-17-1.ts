export class StrangeDevice {
  private registerA: number
  private registerB: number
  private registerC: number
  private program: number[]
  private pointer: number = 0
  private output: number[] = []

  constructor(registerA: number, registerB: number, registerC: number, program: number[]) {
    this.registerA = registerA
    this.registerB = registerB
    this.registerC = registerC
    this.program = program
  }

  public clone(): StrangeDevice {
    return new StrangeDevice(this.registerA, this.registerB, this.registerC, this.program)
  }

  public getProgram(): number[] {
    return this.program
  }

  public getRegisterA(): number {
    return this.registerA
  }

  public setRegisterA(value: number): void {
    this.registerA = value
  }

  public getRegisterB(): number {
    return this.registerB
  }

  public getRegisterC(): number {
    return this.registerC
  }

  public run(): number[] {
    while (true) {
      const instruction = this.program[this.pointer]
      const operand = this.program[this.pointer + 1]
      if (instruction === undefined || operand === undefined) break
      this.execute(instruction, operand)
    }

    return this.output
  }

  private getInstructionMethod(instruction: number): (operand: number) => void {
    switch (instruction) {
      case 0:
        return this.adv.bind(this)
      case 1:
        return this.bxl.bind(this)
      case 2:
        return this.bst.bind(this)
      case 3:
        return this.jnz.bind(this)
      case 4:
        return this.bxc.bind(this)
      case 5:
        return this.out.bind(this)
      case 6:
        return this.bdv.bind(this)
      case 7:
        return this.cdv.bind(this)
      default:
        throw new Error(`Invalid instruction: ${instruction}`)
    }
  }

  private getComboOperand(operand: number): number {
    switch (operand) {
      case 0:
      case 1:
      case 2:
      case 3:
        return operand
      case 4:
        return this.registerA
      case 5:
        return this.registerB
      case 6:
        return this.registerC
      default:
        throw new Error(`Invalid operand: ${operand}`)
    }
  }

  private divideRegisterAByOperand(operand: number): number {
    const numerator = this.registerA
    const denominator = Math.pow(2, this.getComboOperand(operand))
    return Math.trunc(numerator / denominator)
  }

  private execute(instruction: number, operand: number): void {
    const method = this.getInstructionMethod(instruction)
    method(operand)
  }

  private incrementPointer(): void {
    this.pointer += 2
  }

  private adv(operand: number): void {
    this.registerA = this.divideRegisterAByOperand(operand)
    this.incrementPointer()
  }

  private bxl(operand: number): void {
    this.registerB = this.registerB ^ operand
    this.incrementPointer()
  }

  private bst(operand: number): void {
    this.registerB = this.getComboOperand(operand) & 0b111
    this.incrementPointer()
  }

  private jnz(operand: number): void {
    if (this.registerA === 0) this.incrementPointer()
    else this.pointer = operand
  }

  private bxc(): void {
    this.registerB = this.registerB ^ this.registerC
    this.incrementPointer()
  }

  private out(operand: number): void {
    const result = this.getComboOperand(operand) % 8
    this.output.push(result)
    this.incrementPointer()
  }

  private bdv(operand: number): void {
    this.registerB = this.divideRegisterAByOperand(operand)
    this.incrementPointer()
  }

  private cdv(operand: number): void {
    this.registerC = this.divideRegisterAByOperand(operand)
    this.incrementPointer()
  }
}

export const parseInput = (input: string[]): StrangeDevice => {
  const [, registerA] = input[0]!.split(': ')
  const [, registerB] = input[1]!.split(': ')
  const [, registerC] = input[2]!.split(': ')
  const [, programString] = input[4]!.split(': ')
  const program = programString!.split(',').map(Number)
  return new StrangeDevice(Number(registerA), Number(registerB), Number(registerC), program)
}

export const getResponse = (input: string[]): string => {
  const device = parseInput(input)
  return device.run().join(',')
}
