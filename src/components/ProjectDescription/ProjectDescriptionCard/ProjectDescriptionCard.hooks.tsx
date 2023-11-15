import { useState, RefObject, useMemo, useCallback } from 'react'
import { debounce } from '@services'

/**
 * @prop defaultBodyState - The default value for the body state.
 * @prop defaultHeaderState - The default value for the header state.
 * @category Hooks
 * @interface
 */
export type useProjectDescriptionCardHookParams = {
  defaultBodyState?: string
  defaultHeaderState?: string
}

/**
 * @prop bodyState - The state that is used to animate the body text.
 * @prop headerState - The state that is used to animate the header text.
 * @prop setBodyState - The function that sets the body state.
 * @prop setHeaderState - The function that sets the header state.
 * @prop animateBody - The function that animates the body text.
 * @prop animateHeader - The function that animates the header text.
 * @prop fadeInEffect - The function that realizes the fade in effect.
 * @prop typewriterEffect - The function that realizes the typewriter effect.
 * @category Hooks
 * @interface
 */
export type ProjectDescriptionCardHookReturn = {
  readonly bodyState: string
  readonly headerState: string
  readonly setBodyState: (body: string) => void
  readonly setHeaderState: (header: string) => void
  readonly animateBody: (ref: RefObject<HTMLDivElement>, body: string) => void
  readonly animateHeader: (ref: RefObject<HTMLDivElement>, header: string) => void
  readonly fadeInEffect: (body: string) => () => void
  readonly typewriterEffect: (header: string) => () => void
}

/**
 * useProjectDescriptionCard hook.
 *
 * @param params - The default values for the card.
 *
 * @remarks
 * Hook for the ProjectDescriptionCard logic.
 * Handles states and provides functions to animate the body and header texts.
 *
 * @returns - States and logic to animate the body and header texts.
 *
 * @category Hooks
 */
export const useProjectDescriptionCard = (
  params?: useProjectDescriptionCardHookParams
): ProjectDescriptionCardHookReturn => {
  // Default values
  const { defaultHeaderState = '', defaultBodyState = '' } = params ?? {}

  // State data
  const [bodyState, setBodyState] = useState(defaultBodyState)
  const [headerState, setHeaderState] = useState(defaultHeaderState)

  // Logic
  // Animates body text by setting the bodyState after a short timeout.
  const fadeInEffect = useCallback(
    (bodyState: string) => {
      return debounce(() => {
        setBodyState(bodyState)
      }, 1000)
    },
    [setBodyState]
  )

  // Animates header text by writing one character at a time into the headerState with a short timeout.
  const typewriterEffect = useCallback(
    (header: string) => {
      return debounce(() => {
        setHeaderState(header.slice(0, headerState.length + 1))
      }, 50)
    },
    [setHeaderState, headerState]
  )

  // Checks if top of component is in the viewport and animates body texts if states are not equal to param.
  const animateBody = useCallback(
    (ref: RefObject<HTMLDivElement>, body: string) => {
      const topPosition = ref.current?.getBoundingClientRect().top
      const viewportBottom = window.innerHeight

      if (topPosition !== null && typeof topPosition === 'number') {
        if (topPosition <= viewportBottom) {
          if (body !== bodyState) {
            fadeInEffect(body)
          }
        }
      }
    },
    [bodyState, fadeInEffect]
  )

  // Checks if top of component is in the viewport and animates header texts if states are not equal to param.
  const animateHeader = useCallback(
    (ref: RefObject<HTMLDivElement>, header: string) => {
      const topPosition = ref.current?.getBoundingClientRect().top
      const viewportBottom = window.innerHeight

      if (topPosition !== null && typeof topPosition === 'number') {
        if (topPosition <= viewportBottom) {
          if (header !== headerState) {
            typewriterEffect(header)
          }
        }
      }
    },
    [headerState, typewriterEffect]
  )

  return useMemo(
    () => ({
      bodyState,
      headerState,
      setBodyState,
      setHeaderState,
      animateBody,
      animateHeader,
      fadeInEffect,
      typewriterEffect
    }),
    [bodyState, headerState, setBodyState, setHeaderState, animateBody, animateHeader, fadeInEffect, typewriterEffect]
  )
}
