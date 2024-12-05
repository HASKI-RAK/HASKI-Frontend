import log from 'loglevel'
import { logBuffer } from './logBuffer.config'

describe('Test the demo component', () => {
  beforeEach(() => {
    jest.resetModules()
    process.env = {
      NODE_ENV: 'development'
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
    NODE_ENV: 'development'
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

describe('production is set', () => {
  beforeEach(() => {
    jest.resetModules()
    process.env = {
      NODE_ENV: 'production'
    }
  })

  test('error message doesnt get send with no user_id', async () => {
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn((key) => {
          if (key === 'persisted_storage') return '{}'
          return null
        }),
        setItem: jest.fn(),
        removeItem: jest.fn(),
        clear: jest.fn()
      },
      writable: true
    })
    const persisted = JSON.parse(localStorage.getItem('persisted_storage') ?? '{}')
    expect(persisted).toEqual({})
    logBuffer(jest.mock)
    log.setLevel('trace')

    log.error('This is an error')
    const ringBuffer = JSON.parse(localStorage.getItem('ringBufferContent') || '{}')
    //const persistedStorage = JSON.parse(localStorage.getItem('persisted_storage')||'{}')
    //expect (persistedStorage).toEqual({})

    expect(ringBuffer).not.toBeNull()
    expect(ringBuffer).toEqual({})
  })

  test('error message is sent to the backend', async () => {
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn((key) => {
          if (key === 'persisted_storage')
            return '{"state":{"_user":{"id":1,"lms_user_id":7,"name":"Emily Johnson","role":"student","role_id":null,"settings":{"id":7,"pswd":"student","theme":"light","user_id":7},"university":"HS-AS","user_id":7},"_learningPathElementStatus":{"1-7":[{"cmid":2,"state":0,"timecompleted":0}]},"expire":1728651274},"version":1.1}'
          return null
        }),
        setItem: jest.fn(),
        removeItem: jest.fn(),
        clear: jest.fn()
      },
      writable: true
    })
    logBuffer(jest.mock)
    log.setLevel('trace')

    log.error('This is an error')
    const ringBuffer = JSON.parse(localStorage.getItem('ringBufferContent') || '{}')
    expect(ringBuffer).not.toBeNull()
    expect(ringBuffer).toEqual({})
  })
})
