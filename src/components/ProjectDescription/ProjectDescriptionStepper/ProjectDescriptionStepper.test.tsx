import { useProjectDescriptionStepper } from './ProjectDescriptionStepper.hooks'
import { act, render, renderHook, fireEvent } from '@testing-library/react'
import ProjectDescriptionStepper from './ProjectDescriptionStepper'
import { MemoryRouter } from 'react-router-dom'
import '@testing-library/jest-dom'

const mockProjectDescriptionStepperProps = {
  body: ['body1', 'body2', 'body3'],
  header: 'header'
}

jest.useFakeTimers()
jest.spyOn(global, 'setTimeout')

afterEach(() => {
  jest.clearAllTimers()
  jest.clearAllMocks()
})

describe('Test ProjectDescriptionStepper', () => {
  test('ProjectDescriptionStepper renders without input', () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <ProjectDescriptionStepper />
      </MemoryRouter>
    )
    const projectDescriptionStepper = getByTestId('projectDescriptionStepper')
    expect(projectDescriptionStepper).toBeInTheDocument()
  })

  test('ProjectDescriptionCard without input can be scrolled', () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <ProjectDescriptionStepper />
      </MemoryRouter>
    )
    const projectDescriptionStepper = getByTestId('projectDescriptionStepper')
    window.dispatchEvent(new Event('scroll'))
    expect(projectDescriptionStepper).toBeInTheDocument()
  })

  test('ProjectDescriptionCard renders with input', () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <ProjectDescriptionStepper
          body={mockProjectDescriptionStepperProps.body}
          header={mockProjectDescriptionStepperProps.header}
        />
      </MemoryRouter>
    )

    const projectDescriptionStepper = getByTestId('projectDescriptionStepper')
    expect(projectDescriptionStepper).toBeInTheDocument()
  })

  test('ProjectDescriptionCard with input can be scrolled', () => {
    const { getByText } = render(
      <MemoryRouter>
        <ProjectDescriptionStepper
          body={mockProjectDescriptionStepperProps.body}
          header={mockProjectDescriptionStepperProps.header}
        />
      </MemoryRouter>
    )

    act(() => {
      window.dispatchEvent(new Event('scroll'))
      jest.runAllTimers()
    })

    expect(setTimeout).toHaveBeenCalledTimes(6)
    expect(getByText(mockProjectDescriptionStepperProps.body[0])).toBeInTheDocument()
    expect(getByText(mockProjectDescriptionStepperProps.header.slice(0, 1))).toBeInTheDocument()
  })

  test('Step through all body texts of ProjectDescriptionStepper', () => {
    const { getByText, getAllByRole } = render(
      <MemoryRouter>
        <ProjectDescriptionStepper
          body={mockProjectDescriptionStepperProps.body}
          header={mockProjectDescriptionStepperProps.header}
        />
      </MemoryRouter>
    )

    act(() => {
      window.dispatchEvent(new Event('scroll'))
      jest.runAllTimers()
    })
    expect(getByText(mockProjectDescriptionStepperProps.body[0])).toBeInTheDocument()
    expect(getByText(mockProjectDescriptionStepperProps.header.slice(0, 1))).toBeInTheDocument()

    // Steps to the right
    const buttons = getAllByRole('button')
    fireEvent.click(buttons[1])
    expect(getByText(mockProjectDescriptionStepperProps.body[1])).toBeInTheDocument()
    fireEvent.click(buttons[1])
    expect(getByText(mockProjectDescriptionStepperProps.body[2])).toBeInTheDocument()
    fireEvent.click(buttons[1])
    expect(getByText(mockProjectDescriptionStepperProps.body[2])).toBeInTheDocument()

    // Steps to the left
    fireEvent.click(buttons[0])
    expect(getByText(mockProjectDescriptionStepperProps.body[1])).toBeInTheDocument()
    fireEvent.click(buttons[0])
    expect(getByText(mockProjectDescriptionStepperProps.body[0])).toBeInTheDocument()
  })

  test('General functionality of ProjectDescriptionCard hook', () => {
    const { result } = renderHook(() => useProjectDescriptionStepper())

    expect(result.current).toMatchObject({
      bodyState: [],
      headerState: '',
      setBodyState: expect.any(Function),
      setHeaderState: expect.any(Function),
      animateBody: expect.any(Function),
      animateHeader: expect.any(Function),
      fadeInEffect: expect.any(Function),
      typewriterEffect: expect.any(Function)
    })

    const mockDivElement = document.createElement('div')
    const mockRef = {
      current: mockDivElement
    }

    // Animates body and header with passing the height condition and input not equal to current states
    act(() => {
      result.current.animateBody(mockRef, ['body1', 'body2', 'body3'])
      result.current.animateHeader(mockRef, 'header')
      jest.runAllTimers()
    })

    expect(result.current.bodyState).toStrictEqual(['body1', 'body2', 'body3'])
    expect(result.current.headerState).toBe('h')

    act(() => {
      result.current.setHeaderState('header')

      // Animates body and header with passing the height condition and input equal to current states
      result.current.animateBody(mockRef, result.current.bodyState)
      result.current.animateHeader(mockRef, result.current.headerState)
    })

    expect(result.current.bodyState).toStrictEqual(['body1', 'body2', 'body3'])
    expect(result.current.headerState).toBe('header')
  })

  test('Animation functionality of ProjectDescriptionCard hook with topPosition greater than viewportBottom', () => {
    const { result } = renderHook(() => useProjectDescriptionStepper())
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
      result.current.animateBody(mockRef, result.current.bodyState)
      result.current.animateHeader(mockRef, result.current.headerState)
    })

    expect(result.current.bodyState).toStrictEqual([])
    expect(result.current.headerState).toBe('')
  })

  test('Animation functionality of ProjectDescriptionCard hook with undefined ref.current', () => {
    const { result } = renderHook(() => useProjectDescriptionStepper())
    const mockRef = {
      current: null
    }

    act(() => {
      result.current.animateBody(mockRef, ['body1', 'body2', 'body3'])
      result.current.animateHeader(mockRef, 'header')
    })

    expect(result.current.bodyState).toStrictEqual([])
    expect(result.current.headerState).toBe('')
  })

  test('Effect functionality of ProjectDescriptionCard hook', () => {
    const { result } = renderHook(() => useProjectDescriptionStepper())
    expect(setTimeout).toHaveBeenCalledTimes(0)
    const fadeInEffect = result.current.fadeInEffect(['body1', 'body2', 'body3'])
    const typewriterEffect = result.current.typewriterEffect('header')

    // Call effect functions and run timers
    act(() => {
      fadeInEffect()
      typewriterEffect()
      jest.runAllTimers()
    })

    expect(setTimeout).toHaveBeenCalledTimes(2)
  })

  test('Setter functionality of ProjectDescriptionCard hook', () => {
    const { result } = renderHook(() => useProjectDescriptionStepper())
    expect(result.current.bodyState).toStrictEqual([])
    expect(result.current.headerState).toBe('')

    act(() => {
      result.current.setBodyState(['body1', 'body2', 'body3'])
      result.current.setHeaderState('header')
    })

    expect(result.current.bodyState).toStrictEqual(['body1', 'body2', 'body3'])
    expect(result.current.headerState).toBe('header')
  })
})
