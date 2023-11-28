import { RefObject, useCallback, useMemo, useState } from 'react'

/**
 * @prop defaultHeaderState - The default value for the header state.
 * @category Hooks
 * @interface
 */
export type useProjectTeamCompetenciesCardHookParams = {
  defaultHeaderState?: string
}

/**
 * @prop headerState - The state that is used to animate the header text.
 * @prop setHeaderState - The function that sets the header state.
 * @prop animateHeader - The function that animates the header text.
 * @prop typewriterEffect - The function that realizes the typewriter effect.
 * @category Hooks
 * @interface
 */
export type ProjectTeamCompetenciesCardHookReturn = {
  readonly headerState: string
  readonly setHeaderState: (header: string) => void
  readonly animateHeader: (ref: RefObject<HTMLDivElement>, header: string) => void
  readonly typewriterEffect: (header: string) => () => void
}

/**
 * useProjectTeamCompetenciesCard hook.
 *
 * @param params - The default values for the card.
 *
 * @remarks
 * Hook for the ProjectTeamCompetenciesCard logic.
 * Handles states and provides functions to animate the header text.
 *
 * @returns - States and logic to animate the header text.
 *
 * @category Hooks
 */
export const useProjectTeamCompetenciesCard = (
  params?: useProjectTeamCompetenciesCardHookParams
): ProjectTeamCompetenciesCardHookReturn => {
  // Default values
  const { defaultHeaderState = '' } = params ?? {}

  // State data
  const [headerState, setHeaderState] = useState(defaultHeaderState)

  // Logic
  // Animates header text by writing one character at a time into the headerState with a short timeout.
  const typewriterEffect = useCallback(
    (header: string) => {
      const headerTimeout = setTimeout(() => {
        setHeaderState(header.slice(0, headerState.length + 1))
      }, 50)
      return () => clearTimeout(headerTimeout)
    },
    [headerState, setHeaderState]
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
      headerState,
      setHeaderState,
      animateHeader,
      typewriterEffect
    }),
    [headerState, setHeaderState, animateHeader, typewriterEffect]
  )
}
