import debounce from './debounce'
import '@testing-library/jest-dom'
import { act } from '@testing-library/react'

jest.useFakeTimers()
jest.spyOn(global, 'setTimeout')

afterEach(() => {
  jest.clearAllTimers()
  jest.clearAllMocks()
})

describe('Debounce tests', () => {
  test('General functionality', () => {
    const mockFunction = jest.fn()
    const debounceReturn = debounce(mockFunction)

    act(() => {
      jest.runAllTimers()
    })

    debounceReturn()

    expect(debounceReturn).toStrictEqual(expect.any(Function))
    expect(mockFunction).toHaveBeenCalled()
    expect(setTimeout).toHaveBeenCalled()
  })
})
