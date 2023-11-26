import { useProjectDescriptionCard } from './ProjectDescriptionCard.hooks'
import { act, render, renderHook } from '@testing-library/react'
import ProjectDescriptionCard from './ProjectDescriptionCard'
import '@testing-library/jest-dom'

const mockProjectDescriptionCardProps = {
  body: 'body',
  header: 'header'
}

jest.useFakeTimers()
jest.spyOn(global, 'setTimeout')

afterEach(() => {
  jest.clearAllTimers()
  jest.clearAllMocks()
})

describe('Test ProjectDescriptionCard', () => {
  const testId = 'projectDescriptionCard';
  test('ProjectDescriptionCard renders without input', () => {
    const { getByTestId } = render(<ProjectDescriptionCard />)
    const projectDescriptionCard = getByTestId(testId)
    expect(projectDescriptionCard).toBeInTheDocument()
  })

  test('ProjectDescriptionCard without input can be scrolled', () => {
    const { getByTestId } = render(<ProjectDescriptionCard />)
    const projectDescriptionCard = getByTestId(testId)
    window.dispatchEvent(new Event('scroll'))
    expect(projectDescriptionCard).toBeInTheDocument()
  })

  test('ProjectDescriptionCard renders with input', () => {
    const { getByTestId } = render(
      <ProjectDescriptionCard
        body={mockProjectDescriptionCardProps.body}
        header={mockProjectDescriptionCardProps.header}>
        <>Text</>
      </ProjectDescriptionCard>
    )

    const projectDescriptionCard = getByTestId(testId)
    expect(projectDescriptionCard).toBeInTheDocument()
  })

  test('ProjectDescriptionCard renders with input when reversed', () => {
    const { getByTestId } = render(
        <ProjectDescriptionCard
            body={mockProjectDescriptionCardProps.body}
            header={mockProjectDescriptionCardProps.header}
            isLeft={true}>
          <>Text</>
        </ProjectDescriptionCard>
    )

    const projectDescriptionCard = getByTestId(testId)
    expect(projectDescriptionCard).toBeInTheDocument()
  })

  test('ProjectDescriptionCard with input can be scrolled', () => {
    const { getByText } = render(
      <ProjectDescriptionCard
        body={mockProjectDescriptionCardProps.body}
        header={mockProjectDescriptionCardProps.header}>
        <>Text</>
      </ProjectDescriptionCard>
    )
    act(() => {
      window.dispatchEvent(new Event('scroll'))
      jest.runAllTimers()
    })

    expect(setTimeout).toHaveBeenCalledTimes(6)
    expect(getByText(mockProjectDescriptionCardProps.body)).toBeInTheDocument()
    expect(getByText(mockProjectDescriptionCardProps.header.slice(0, 1))).toBeInTheDocument()
  })

  test('ProjectDescriptionCard with input and reversed layout can be scrolled', () => {
    const { getByText } = render(
        <ProjectDescriptionCard
            body={mockProjectDescriptionCardProps.body}
            header={mockProjectDescriptionCardProps.header}
            isLeft={true}>
          <>Text</>
        </ProjectDescriptionCard>
    )
    act(() => {
      window.dispatchEvent(new Event('scroll'))
      jest.runAllTimers()
    })

    expect(setTimeout).toHaveBeenCalledTimes(6)
    expect(getByText(mockProjectDescriptionCardProps.body)).toBeInTheDocument()
    expect(getByText(mockProjectDescriptionCardProps.header.slice(0, 1))).toBeInTheDocument()
  })

  test('General functionality of ProjectDescriptionCard hook', () => {
    const { result } = renderHook(() => useProjectDescriptionCard())

    expect(result.current).toMatchObject({
      bodyState: '',
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
      result.current.animateBody(mockRef, 'body')
      result.current.animateHeader(mockRef, 'header')
      jest.runAllTimers()
    })

    expect(result.current.bodyState).toBe('body')
    expect(result.current.headerState).toBe('h')

    act(() => {
      result.current.setHeaderState('header')

      // Animates body and header with passing the height condition and input equal to current states
      result.current.animateBody(mockRef, result.current.bodyState)
      result.current.animateHeader(mockRef, result.current.headerState)
    })

    expect(result.current.bodyState).toBe('body')
    expect(result.current.headerState).toBe('header')
  })

  test('Animation functionality of ProjectDescriptionCard hook with topPosition greater than viewportBottom', () => {
    const { result } = renderHook(() => useProjectDescriptionCard())
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

    expect(result.current.bodyState).toBe('')
    expect(result.current.headerState).toBe('')
  })

  test('Animation functionality of ProjectDescriptionCard hook with undefined ref.current', () => {
    const { result } = renderHook(() => useProjectDescriptionCard())
    const mockRef = {
      current: null
    }

    act(() => {
      result.current.animateBody(mockRef, 'body')
      result.current.animateHeader(mockRef, 'header')
    })

    expect(result.current.bodyState).toBe('')
    expect(result.current.headerState).toBe('')
  })

  test('Effect functionality of ProjectDescriptionCard hook', () => {
    const { result } = renderHook(() => useProjectDescriptionCard())
    expect(setTimeout).toHaveBeenCalledTimes(0)
    const fadeInEffect = result.current.fadeInEffect('body')
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
    const { result } = renderHook(() => useProjectDescriptionCard())
    expect(result.current.bodyState).toBe('')
    expect(result.current.headerState).toBe('')

    act(() => {
      result.current.setBodyState('body')
      result.current.setHeaderState('header')
    })

    expect(result.current.bodyState).toBe('body')
    expect(result.current.headerState).toBe('header')
  })
})
