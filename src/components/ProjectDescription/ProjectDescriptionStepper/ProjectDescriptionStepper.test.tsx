import {useProjectDescriptionStepper} from './ProjectDescriptionStepper.hooks'
import {act, fireEvent, render, renderHook, screen} from '@testing-library/react'
import ProjectDescriptionStepper from './ProjectDescriptionStepper'
import { MemoryRouter } from 'react-router-dom'
import '@testing-library/jest-dom'

const mockProjectDescriptionStepperProps = {
  body: ['body1', 'body2', 'body3'],
  header: 'header'
}

const mockProjectDescriptionStepperAvatarProps = {
  ...mockProjectDescriptionStepperProps,
  withAvatar: true,
  avatarName: ['name1', 'name2', 'name3'],
  avatarDescription: ['description1', 'description2', 'description3']
}

jest.useFakeTimers()
jest.spyOn(global, 'setTimeout')

afterEach(() => {
  jest.clearAllTimers()
  jest.clearAllMocks()
})

describe('Test ProjectDescriptionStepper', () => {
  const testId = 'projectDescriptionStepper';

  test('ProjectDescriptionStepper renders without input', () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <ProjectDescriptionStepper />
      </MemoryRouter>
    )
    const projectDescriptionStepper = getByTestId(testId)
    expect(projectDescriptionStepper).toBeInTheDocument()
  })

  test('ProjectDescriptionCard without input can be scrolled', () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <ProjectDescriptionStepper />
      </MemoryRouter>
    )
    const projectDescriptionStepper = getByTestId(testId)
    window.dispatchEvent(new Event('scroll'))
    expect(projectDescriptionStepper).toBeInTheDocument()
  })

  test('ProjectDescriptionCard renders with input', () => {
    const { getByTestId } = render(
      <MemoryRouter>
       <ProjectDescriptionStepper {...mockProjectDescriptionStepperProps} />
      </MemoryRouter>
    )

    const projectDescriptionStepper = getByTestId(testId)
    expect(projectDescriptionStepper).toBeInTheDocument()
  })

  test('ProjectDescriptionCard renders with input and avatar', () => {
    const { getByTestId } = render(
        <ProjectDescriptionStepper {...mockProjectDescriptionStepperAvatarProps} />
    )

    const projectDescriptionStepper = getByTestId(testId)
    expect(projectDescriptionStepper).toBeInTheDocument()
  })

  test('ProjectDescriptionCard with input can be scrolled', () => {
    const { getByText } = render(
      <MemoryRouter>
        <ProjectDescriptionStepper {...mockProjectDescriptionStepperProps} />
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

  test('ProjectDescriptionCard with input and avatar can be scrolled', () => {
    const { getByText } = render(
        <ProjectDescriptionStepper {...mockProjectDescriptionStepperAvatarProps} />
    )

    act(() => {
      window.dispatchEvent(new Event('scroll'))
      jest.runAllTimers()
    })

    expect(setTimeout).toHaveBeenCalledTimes(15)
    expect(getByText(mockProjectDescriptionStepperAvatarProps.body[0])).toBeInTheDocument()
    expect(screen.getByAltText(mockProjectDescriptionStepperAvatarProps.avatarName[0])).toBeInTheDocument()
    expect(getByText(mockProjectDescriptionStepperAvatarProps.avatarName[0].slice(0, 1))).toBeInTheDocument()
    expect(getByText(mockProjectDescriptionStepperAvatarProps.avatarDescription[0].slice(0, 1))).toBeInTheDocument()
    expect(getByText(mockProjectDescriptionStepperAvatarProps.header.slice(0, 1))).toBeInTheDocument()
  })

  test('Step through all body texts of ProjectDescriptionStepper', () => {
    const { getByText, getAllByRole } = render(
      <MemoryRouter>
        <ProjectDescriptionStepper {...mockProjectDescriptionStepperProps} />
      </MemoryRouter>
    )

    act(() => {
      window.dispatchEvent(new Event('scroll'))
      jest.runAllTimers()
    })

    const checkContent = (index:number) => {
      expect(getByText(mockProjectDescriptionStepperProps.body[index])).toBeInTheDocument()
    }

    expect(getByText(mockProjectDescriptionStepperProps.header.slice(0, 1))).toBeInTheDocument()
    checkContent(0)

    const buttons = getAllByRole('button')
    // Steps to the right
    for (let i = 1; i < mockProjectDescriptionStepperProps.body.length; i++) {
      fireEvent.click(buttons[1]);
      const index = i < mockProjectDescriptionStepperAvatarProps.body.length ? i : i - 1; // -1 to test if next button is disabled after last element
      checkContent(index)
    }
    // Steps to the left
    for (let i = mockProjectDescriptionStepperProps.body.length - 1; i >= 0; i--) {
      fireEvent.click(buttons[0]);
      const index = i < 1 ? 0 : i - 1; // cap to 0 to check if back button gets disabled
      checkContent(index)
    }
  })

  test('Step through all body texts of ProjectDescriptionStepper with avatars', () => {
    const { getByText, getAllByRole } = render(
        <ProjectDescriptionStepper {...mockProjectDescriptionStepperAvatarProps} />
    )

    act(() => {
      window.dispatchEvent(new Event('scroll'))
      jest.runAllTimers()
    })

    const checkContent = (index:number) => {
      expect(getByText(mockProjectDescriptionStepperAvatarProps.body[index])).toBeInTheDocument();
      expect(screen.getByAltText(mockProjectDescriptionStepperAvatarProps.avatarName[index])).toBeInTheDocument();
      expect(getByText(mockProjectDescriptionStepperAvatarProps.avatarName[index].slice(0, 1))).toBeInTheDocument();
      expect(getByText(mockProjectDescriptionStepperAvatarProps.avatarDescription[index].slice(0, 1))).toBeInTheDocument();
    }

    expect(getByText(mockProjectDescriptionStepperAvatarProps.header.slice(0, 1))).toBeInTheDocument()
    checkContent(0)

    const buttons = getAllByRole('button')
    // Steps to the right
    for (let i = 1; i < mockProjectDescriptionStepperAvatarProps.body.length; i++) {
      fireEvent.click(buttons[1]);
      const index = i < mockProjectDescriptionStepperAvatarProps.body.length ? i : i - 1; // -1 to test if next button is disabled after last element
      checkContent(index)
    }
    // Steps to the left
    for (let i = mockProjectDescriptionStepperAvatarProps.body.length - 1; i >= 0; i--) {
      fireEvent.click(buttons[0]);
      const index = i < 1 ? 0 : i - 1; // cap to 0 to check if back button gets disabled
      checkContent(index)
    }
  })

  test('General functionality of ProjectDescriptionCard hook', () => {
    const { result } = renderHook(() => useProjectDescriptionStepper())

    expect(result.current).toMatchObject({
      bodyState: [],
      avatarState: false,
      avatarNameState: '',
      avatarDescriptionState: '',
      headerState: '',
      setBodyState: expect.any(Function),
      setAvatarState: expect.any(Function),
      setAvatarNameState: expect.any(Function),
      setAvatarDescriptionState: expect.any(Function),
      setHeaderState: expect.any(Function),
      animateBody: expect.any(Function),
      animateAvatar: expect.any(Function),
      animateAvatarName: expect.any(Function),
      animateAvatarDescription: expect.any(Function),
      fadeInEffectAvatar: expect.any(Function),
      animateHeader: expect.any(Function),
      fadeInEffect: expect.any(Function),
      typewriterEffect: expect.any(Function),
      typewriterEffectAN: expect.any(Function),
      typewriterEffectAD: expect.any(Function)
    })

    const mockDivElement = document.createElement('div')
    const mockRef = {
      current: mockDivElement
    }

    // Animates body and header with passing the height condition and input not equal to current states
    act(() => {
      result.current.animateBody(mockRef, ['body1', 'body2', 'body3'])
      result.current.animateHeader(mockRef, 'header')
      result.current.animateAvatar(mockRef, true)
      result.current.animateAvatarName(mockRef, 'name')
      result.current.animateAvatarDescription(mockRef, 'description')
      jest.runAllTimers()
    })

    expect(result.current.bodyState).toStrictEqual(['body1', 'body2', 'body3'])
    expect(result.current.headerState).toBe('h')
    expect(result.current.avatarState).toBe(true)
    expect(result.current.avatarNameState).toBe('n')
    expect(result.current.avatarDescriptionState).toBe('d')

    act(() => {
      result.current.setHeaderState('header')
      result.current.setAvatarNameState('name')
      result.current.setAvatarDescriptionState('description')

      // Animates body and header with passing the height condition and input equal to current states
      result.current.animateBody(mockRef, result.current.bodyState)
      result.current.animateHeader(mockRef, result.current.headerState)
      result.current.animateAvatar(mockRef, true)
      result.current.animateAvatarName(mockRef, 'name')
      result.current.animateAvatarDescription(mockRef, 'description')
    })

    expect(result.current.bodyState).toStrictEqual(['body1', 'body2', 'body3'])
    expect(result.current.headerState).toBe('header')
    expect(result.current.avatarState).toBe(true)
    expect(result.current.avatarNameState).toBe('name')
    expect(result.current.avatarDescriptionState).toBe('description')
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
      result.current.animateAvatar(mockRef, result.current.avatarState)
      result.current.animateAvatarName(mockRef, result.current.avatarNameState)
      result.current.animateAvatarDescription(mockRef, result.current.avatarDescriptionState)
    })

    expect(result.current.bodyState).toStrictEqual([])
    expect(result.current.headerState).toBe('')
    expect(result.current.avatarState).toBe(false)
    expect(result.current.avatarNameState).toBe('')
    expect(result.current.avatarDescriptionState).toBe('')
  })

  test('Animation functionality of ProjectDescriptionCard hook with undefined ref.current', () => {
    const { result } = renderHook(() => useProjectDescriptionStepper())
    const mockRef = {
      current: null
    }

    act(() => {
      result.current.animateBody(mockRef, ['body1', 'body2', 'body3'])
      result.current.animateHeader(mockRef, 'header')
      result.current.animateAvatar(mockRef, true)
      result.current.animateAvatarName(mockRef, 'name')
      result.current.animateAvatarDescription(mockRef, 'description')
    })

    expect(result.current.bodyState).toStrictEqual([])
    expect(result.current.headerState).toBe('')
    expect(result.current.avatarState).toBe(false)
    expect(result.current.avatarNameState).toBe('')
    expect(result.current.avatarDescriptionState).toBe('')
  })

  test('Effect functionality of ProjectDescriptionCard hook', () => {
    const { result } = renderHook(() => useProjectDescriptionStepper())
    expect(setTimeout).toHaveBeenCalledTimes(0)
    const fadeInEffect = result.current.fadeInEffect(['body1', 'body2', 'body3'])
    const fadeInEffectAvatar = result.current.fadeInEffectAvatar(true)
    const typewriterEffect = result.current.typewriterEffect('header')
    const typewriterEffectAN = result.current.typewriterEffectAN('name')
    const typewriterEffectAD = result.current.typewriterEffectAD('description')

    // Call effect functions and run timers
    act(() => {
      fadeInEffect()
      fadeInEffectAvatar()
      typewriterEffect()
      typewriterEffectAN()
      typewriterEffectAD()
      jest.runAllTimers()
    })

    expect(setTimeout).toHaveBeenCalledTimes(5)
  })

  test('Setter functionality of ProjectDescriptionCard hook', () => {
    const { result } = renderHook(() => useProjectDescriptionStepper())
    expect(result.current.bodyState).toStrictEqual([])
    expect(result.current.headerState).toBe('')
    expect(result.current.avatarState).toBe(false)
    expect(result.current.avatarNameState).toBe('')
    expect(result.current.avatarDescriptionState).toBe('')

    act(() => {
      result.current.setBodyState(['body1', 'body2', 'body3'])
      result.current.setHeaderState('header')
      result.current.setAvatarState(true)
      result.current.setAvatarNameState('name')
      result.current.setAvatarDescriptionState('description')
    })

    expect(result.current.bodyState).toStrictEqual(['body1', 'body2', 'body3'])
    expect(result.current.headerState).toBe('header')
    expect(result.current.avatarState).toBe(true)
    expect(result.current.avatarNameState).toBe('name')
    expect(result.current.avatarDescriptionState).toBe('description')
  })
})
