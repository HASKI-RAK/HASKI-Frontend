import '@testing-library/jest-dom'
import { renderHook } from '@testing-library/react'
import { useViewport } from './Viewport.hooks'

describe('Viewport hook tests', () => {
  /**
   * Test Viewport hook
   * [HASKI-REQ-0090] React SPA-Architektur mit Provider-Hierarchie und Routing
   */
  test('General functionality of useViewport', () => {
    const { result } = renderHook(() => useViewport())

    expect(result.current).toMatchObject({
      isInViewport: expect.any(Function)
    })
  })

  test('Functionality of isInViewport with topPosition less than viewportBottom', () => {
    const { result } = renderHook(() => useViewport())

    expect(result.current).toMatchObject({
      isInViewport: expect.any(Function)
    })

    const mockDivElement = document.createElement('div')
    const mockRef = {
      current: mockDivElement
    }

    expect(result.current.isInViewport(mockRef)).toBe(true)
  })

  test('Functionality of isInViewport with topPosition greater than viewportBottom', () => {
    const { result } = renderHook(() => useViewport())

    const mockDivElement = document.createElement('div')
    const mockRef = {
      current: mockDivElement
    }

    mockDivElement.getBoundingClientRect = () => ({
      top: 1000,
      bottom: 0,
      right: 0,
      width: 0,
      height: 0,
      x: 0,
      y: 0,
      left: 0,
      toJSON: jest.fn()
    })

    Object.defineProperty(mockRef.current, 'getBoundingClientRect', {
      value: mockDivElement.getBoundingClientRect
    })

    expect(result.current.isInViewport(mockRef)).toBe(false)
  })

  test('Functionality of isInViewport with undefined ref', () => {
    const { result } = renderHook(() => useViewport())
    const mockRef = {
      current: null
    }

    expect(result.current.isInViewport(mockRef)).toBe(false)
  })
})
