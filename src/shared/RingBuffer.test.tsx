import { RingBuffer } from './RingBuffer'

describe('[HASKI-REQ-0090] Test the RingBuffer class', () => {
  test('RingBuffer can be created and has correct size', () => {
    const ringBuffer = new RingBuffer(10)
    expect(ringBuffer.getSize()).toBe(10)
  })

  test('RingBuffer only has the last Elements inside of it', () => {
    const ringBuffer = new RingBuffer(5)
    ringBuffer.add(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)
    expect(ringBuffer.toArray()).toEqual([6, 7, 8, 9, 10])
  })

  test('RingBuffer can be cleared', () => {
    const ringBuffer = new RingBuffer(5)
    ringBuffer.add(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)
    ringBuffer.clear()
    expect(ringBuffer.toArray()).toEqual([])
    expect(ringBuffer.getSize()).toBe(5)
  })

  test('RingBuffer can be filled from an array', () => {
    const ringBuffer = new RingBuffer(5)
    ringBuffer.fromArray([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
    expect(ringBuffer.toArray()).toEqual([6, 7, 8, 9, 10])
  })

  test('RingBuffer can have string values', () => {
    const ringBuffer = new RingBuffer(5)
    ringBuffer.fromArray(['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'])
    expect(ringBuffer.toArray()).toEqual(['6', '7', '8', '9', '10'])
  })
})
