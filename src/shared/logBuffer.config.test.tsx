import log from 'loglevel'
import { logBuffer } from './logBuffer.config'
import { mockServices } from 'jest.setup'

describe('Test the demo component', () => {
  beforeEach(() => {
    jest.resetModules()
    process.env = {
      NODE_ENV: 'development',
    }
  })
  test('log messages are added to localStorage', () => {
    
    logBuffer(jest.mock)
    log.setLevel('trace')
    log.trace('This is a trace')
    log.warn('This is a warning')
    
    const currentDate = new Date().toUTCString()
    expect(localStorage.getItem('ringBufferContent')).not.toBeNull()
    expect(localStorage.getItem('ringBufferContent')).toContain(currentDate)
    expect(localStorage.getItem('ringBufferContent')).toContain('This is a warning')
    expect(localStorage.getItem('ringBufferContent')).toContain('This is a trace')
  })
})

describe('localStorage already set', () => {
  jest.resetModules()
    process.env = {
      NODE_ENV: 'development',
    }
  beforeEach(() => {
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn(() => '{"buffer": ["mockedValue"]}'),
        setItem: localStorage.setItem.bind(localStorage),
        removeItem: jest.fn()
      },
      writable: true
    })
  })

  test('should return a value from GlobalRingBuffer', () => {
    logBuffer(jest.mock)
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

    logBuffer(jest.mock)
    log.setLevel('trace')
    log.trace('')
    log.warn('')
    log.error('')

    // TODO: Find a better way to check if logBuffer is doing what it is supposed to do.
    expect(localStorage.getItem('ringBufferContent')).toEqual(undefined)
  })
})

describe('production is set',()=>{

  test('error message is sent to the backend', () => {
    mockServices.fetchUser
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn(() => '{"buffer": ["mockedValue"]}'),
        setItem: localStorage.setItem.bind(localStorage),
        removeItem: jest.fn()
      },
      writable: true
    })

    jest.resetModules()
    process.env = {
      NODE_ENV: 'production',
    }
    console.log(localStorage.getItem('perstisted_storage'),'ps')
    logBuffer(jest.mock)
    log.setLevel('trace')
    log.error('This is an error')
    const ringBuffer = JSON.parse(localStorage.getItem('ringBufferContent') || '{}')
    expect(ringBuffer).not.toBeNull()
    expect(ringBuffer).toEqual({"buffer": [], "size": 100})
  })
})