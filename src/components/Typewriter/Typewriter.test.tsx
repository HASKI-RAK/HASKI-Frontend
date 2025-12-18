import '@testing-library/jest-dom'
import { act, render } from '@testing-library/react'
import Typewriter from './Typewriter'

jest.useFakeTimers()
jest.spyOn(global, 'setTimeout')

afterEach(() => {
  jest.clearAllTimers()
})

describe('[HASKI-REQ-0083] Typewriter tests', () => {
  it('renders without input', () => {
    expect(render(<Typewriter />)).toBeTruthy()
  })

  it('renders without input and animation started', () => {
    const mockProps = {
      startAnimation: true,
      delay: 100
    }

    const typewriter = render(<Typewriter {...mockProps} />)

    act(() => {
      jest.runAllTimers()
    })

    expect(setTimeout).toHaveBeenCalled()
    expect(typewriter).toBeTruthy()
  })

  it('renders with string input and animation not started', () => {
    const mockProps = {
      startAnimation: false,
      delay: 100
    }
    expect(render(<Typewriter {...mockProps}>Text</Typewriter>)).toBeTruthy()
  })

  it('renders with string input and animation started', () => {
    const mockProps = {
      startAnimation: true,
      delay: 100
    }

    const mockText = 'T'

    const { getByText } = render(<Typewriter {...mockProps}>{mockText}</Typewriter>)

    act(() => {
      jest.runAllTimers()
    })

    expect(setTimeout).toHaveBeenCalled()
    expect(getByText(mockText)).toBeInTheDocument()
  })

  it('renders with string array input and animation started', () => {
    const mockProps = {
      startAnimation: true,
      delay: 100
    }

    const mockText = ['T']

    const { getByText } = render(<Typewriter {...mockProps}>{mockText}</Typewriter>)

    act(() => {
      jest.runAllTimers()
    })

    expect(setTimeout).toHaveBeenCalled()
    expect(getByText(mockText[0])).toBeInTheDocument()
  })

  it('renders with number input and animation started', () => {
    const mockProps = {
      startAnimation: true,
      delay: 100
    }

    const mockText = 1

    const { getByText } = render(<Typewriter {...mockProps}>{mockText}</Typewriter>)

    act(() => {
      jest.runAllTimers()
    })

    expect(setTimeout).toHaveBeenCalled()
    expect(getByText(mockText)).toBeInTheDocument()
  })

  it('renders with number array input and animation started', () => {
    const mockProps = {
      startAnimation: true,
      delay: 100
    }

    const mockText = [1]

    const { getByText } = render(<Typewriter {...mockProps}>{mockText}</Typewriter>)

    act(() => {
      jest.runAllTimers()
    })

    expect(setTimeout).toHaveBeenCalled()
    expect(getByText(mockText[0])).toBeInTheDocument()
  })
})
