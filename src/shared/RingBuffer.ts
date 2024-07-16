export class RingBuffer<T> {
  private buffer: T[] = []
  private readonly size: number

  constructor(size: number) {
    this.size = size
  }

  public getSize(): number {
    return this.size
  }

  public add(...items: T[]) {
    this.buffer.push(...items)
    this.crop()
  }

  public clear() {
    this.buffer = []
  }

  public toArray() {
    return this.buffer.slice()
  }

  public fromArray(value: T[]) {
    this.clear()
    this.add(...value)
  }

  public get(element:number)
  {
    return this.buffer.at(element)
  }

  public remove(){
    return this.buffer.pop()
  }

  private crop() {
    while (this.buffer.length > this.size) {
      this.buffer.shift()
    }
  }
}
