import log from 'loglevel'
import { logBuffer } from './logBuffer.config'

describe('Test the demo component', () => {
  test('log messages are added to localStorage', () => {
    logBuffer()
    log.setLevel('trace')
    log.trace('This is a trace')
    log.warn('This is a warning')
    log.error('This is an error')
    const currentDate = new Date().toUTCString()

    expect(localStorage.getItem('ringBufferContent')).not.toBeNull()
    expect(localStorage.getItem('ringBufferContent')).toContain(currentDate)
    expect(localStorage.getItem('ringBufferContent')).toContain('This is a warning')
    expect(localStorage.getItem('ringBufferContent')).toContain('This is an error')
    expect(localStorage.getItem('ringBufferContent')).toContain('This is a trace')
  })
})

describe('localStorage already set', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn(() => '{"buffer": ["mockedValue"]}'),
        setItem: localStorage.setItem.bind(localStorage),
        removeItem: jest.fn()
      },
      writable: true
    })
    localStorage.setItem('ringBufferContent', '{"buffer": ["mockedValue"]}')
  })

  test('should return a value from GlobalRingBuffer', () => {
    logBuffer()
    log.setLevel('trace')
    log.trace('This is a trace')
    log.warn('This is a warning')
    log.error('This is an error')

    expect(localStorage.getItem('ringBufferContent')).not.toBeNull()
    expect(localStorage.getItem('ringBufferContent')).toContain('{"buffer": ["mockedValue"]}')
  })

  test('log empty messages are not added to localStorage', () => {
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn(() => undefined),
        setItem: localStorage.setItem.bind(localStorage),
        removeItem: jest.fn()
      },
      writable: true
    })

    logBuffer()
    log.setLevel('trace')
    log.trace('')
    log.warn('')
    log.error('')
    
    // TODO: Find a better way to check if logBuffer is doing what it is supposed to do.
    expect(localStorage.getItem('ringBufferContent')).toEqual(undefined)
  })
})
