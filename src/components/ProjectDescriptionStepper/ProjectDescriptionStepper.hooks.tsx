import { useState, RefObject } from 'react'
import { useDebounce } from '@services'

/**
 * @typedef {Object} useProjectDescriptionStepperHookParams
 * @property {string[]} defaultBodyState - The default value for the body state.
 * @property {string} defaultHeaderState - The default value for the header state.
 */
export type useProjectDescriptionStepperHookParams = {
  defaultBodyState?: string[]
  defaultHeaderState?: string
}

/**
 * @typedef {Object} ProjectDescriptionStepperHookReturn
 * @property {string[]} bodyState - The state that is used to animate the body texts.
 * @property {string} headerState - The state that is used to animate the header text.
 * @property {function} setBodyState - The function that sets the body state.
 * @property {function} setHeaderState - The function that sets the header state.
 * @property {function} animateBody - The function that animates the body texts.
 * @property {function} animateHeader - The function that animates the header text.
 * @property {function} fadeInEffect - The function that realizes the fade in effect.
 * @property {function} typewriterEffect - The function that realizes the typewriter effect.
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
 * Hook for the ProjectDescriptionStepper logic.
 * Handles states and provides functions to animate the body and header texts.
 * @param params - The default value for the stepper.
 * @returns {ProjectDescriptionStepperHookReturn} - The ProjectDescriptionCard logic.
 */
export const useProjectDescriptionStepper = (
  params?: useProjectDescriptionStepperHookParams
): ProjectDescriptionStepperHookReturn => {
  // Default values
  const { defaultHeaderState = '', defaultBodyState = [] } = params ?? {}

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
