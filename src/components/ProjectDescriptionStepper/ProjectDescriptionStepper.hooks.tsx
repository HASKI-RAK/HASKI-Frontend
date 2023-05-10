import { useState, RefObject } from 'react'

/**
 * TODO: Comment
 */
export type useProjectDescriptionStepperHookParams = {
  defaultBodyState?: string[]
  defaultHeaderState?: string
}

/**
 * TODO: Comment
 */
export type ProjectDescriptionStepperHookReturn = {
  readonly bodyState: string[]
  readonly headerState: string
  readonly setBodyState: (body: string[]) => void
  readonly setHeaderState: (header: string) => void
  readonly animateBody: (ref: RefObject<HTMLDivElement>, body: string[]) => void
  readonly animateHeader: (ref: RefObject<HTMLDivElement>, header: string) => void
  readonly fadeInEffect: (body: string[]) => () => void
  readonly typewriterEffect: (header: string) => () => void
}

/**
 * TODO: Comment
 * @param params
 * @returns
 */
export const useProjectDescriptionStepper = (
  params?: useProjectDescriptionStepperHookParams
): ProjectDescriptionStepperHookReturn => {
  // Default values
  const { defaultHeaderState = '', defaultBodyState = [] } = params || {}

  // State data
  const [bodyState, setBodyState] = useState(defaultBodyState)
  const [headerState, setHeaderState] = useState(defaultHeaderState)

  // Logic
  // Checks if top of component is in the viewport and animates body texts if states are not equal to param.
  const animateBody = (ref: RefObject<HTMLDivElement>, body: string[]) => {
    const topPosition = ref.current?.getBoundingClientRect().top
    const viewportBottom = window.innerHeight

    if (topPosition !== null && typeof topPosition === 'number') {
      if (topPosition <= viewportBottom) {
        if (body !== bodyState) {
          fadeInEffect(body)
        }
      }
    }
  }

  // Checks if top of component is in the viewport and animates header texts if states are not equal to param.
  const animateHeader = (ref: RefObject<HTMLDivElement>, header: string) => {
    const topPosition = ref.current?.getBoundingClientRect().top
    const viewportBottom = window.innerHeight

    if (topPosition !== null && typeof topPosition === 'number') {
      if (topPosition <= viewportBottom) {
        if (header !== headerState) {
          typewriterEffect(header)
        }
      }
    }
  }

  // Animates body text by setting the bodyState after a short timeout.
  const fadeInEffect = (body: string[]) => {
    const bodyTimeout = setTimeout(() => {
      setBodyState(body)
    }, 1000)
    return () => clearTimeout(bodyTimeout)
  }

  // Animates header text by writing one character at a time into the headerState with a short timeout.
  const typewriterEffect = (header: string) => {
    const headerTimeout = setTimeout(() => {
      setHeaderState(header.slice(0, headerState.length + 1))
    }, 50)
    return () => clearTimeout(headerTimeout)
  }

  return {
    bodyState,
    headerState,
    setBodyState,
    setHeaderState,
    animateBody,
    animateHeader,
    fadeInEffect,
    typewriterEffect
  } as const
}
