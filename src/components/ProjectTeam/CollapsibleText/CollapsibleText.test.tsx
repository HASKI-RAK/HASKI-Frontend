import React from 'react'
import { act, fireEvent, render, renderHook, screen } from '@testing-library/react'
import CollapsibleText from './CollapsibleText'
import '@testing-library/jest-dom'
import { useCollapsibleText } from './CollapsibleText.hooks'

jest.useFakeTimers()
jest.spyOn(global, 'setTimeout')

afterEach(() => {
  jest.clearAllTimers()
  jest.clearAllMocks()
})

describe('CollapsibleText Component', () => {
  const testId = 'CollapsibleText'
  const testProps = {
    header: 'Test Header',
    body: 'Test Body'
  }

  it('should render without errors', () => {
    render(<CollapsibleText {...testProps} />)
    expect(screen.getByTestId(testId)).toBeInTheDocument()
  })

  it('should display the correct header', () => {
    render(<CollapsibleText {...testProps} />)
    expect(screen.getByText(testProps.header)).toBeInTheDocument()
  })

  it('should be expandable when body is present', () => {
    render(<CollapsibleText {...testProps} />)
    const expandIcon = screen.getByTestId(testId).querySelector('svg')
    expect(expandIcon).toBeInTheDocument()

    // Check if clicking on the header expands the body
    fireEvent.click(screen.getByText(testProps.header))
    expect(screen.getByText(testProps.body)).toBeInTheDocument()
  })

  it('should not be expandable when body is not present', () => {
    render(<CollapsibleText header={testProps.header} />)
    const expandIcon = screen.getByTestId(testId).querySelector('svg')
    expect(expandIcon).not.toBeInTheDocument()
  })

  it('should display the correct body text if set as prop', () => {
    render(<CollapsibleText {...testProps} />)
    fireEvent.click(screen.getByTestId(testId)) // Expand the accordion
    expect(screen.getByText(testProps.body)).toBeInTheDocument()
  })

  test('General functionality of ProjectDescriptionCard hook', () => {
    const { result } = renderHook(() => useCollapsibleText())
    expect(result.current).toMatchObject({
      animateState: false,
      setAnimateState: expect.any(Function),
      animateObj: expect.any(Function),
      zoomInEffectAnimate: expect.any(Function)
    })
    const mockDivElement = document.createElement('div')
    const mockRef = {
      current: mockDivElement
    }
    act(() => {
      result.current.animateObj(mockRef, true)
      jest.runAllTimers()
    })
    expect(result.current.animateState).toBe(true)
  })

  test('Animation functionality of ProjectDescriptionCard hook with topPosition greater than viewportBottom', () => {
    const { result } = renderHook(() => useCollapsibleText())
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
    act(() => {
      result.current.animateObj(mockRef, result.current.animateState)
    })
    expect(result.current.animateState).toBe(false)
  })

  test('Animation functionality of ProjectDescriptionCard hook with undefined ref.current', () => {
    const { result } = renderHook(() => useCollapsibleText())
    const mockRef = {
      current: null
    }

    act(() => {
      result.current.animateObj(mockRef, true)
    })
    expect(result.current.animateState).toBe(false)
  })
})
