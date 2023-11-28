import { RefObject, useCallback, useMemo, useState } from 'react'

/**
 * @prop defaultAnimateState - The default value for the animate state (trigger for when animation should start).
 * @category Hooks
 * @interface
 */
export type useCollapsibleTextHookParams = {
  defaultAnimateState?: boolean
}

/**
 * @prop animateState - The state that is used to animate the obj.
 * @prop setAnimateState - The function that sets the animate state.
 * @prop animateObj - The function that animates the obj.
 * @prop zoomInEffectAnimate - The function that realizes the zoom in effect.
 * @category Hooks
 * @interface
 */
export type CollapsibleTextHookReturn = {
  readonly animateState: boolean
  readonly setAnimateState: (animate: boolean) => void
  readonly animateObj: (ref: RefObject<HTMLDivElement>, animate: boolean) => void
  readonly zoomInEffectAnimate: (animate: boolean) => () => void
}

/**
 * useCollapsibleText hook.
 *
 * @remarks
 * Hook for the CollapsibleText logic.
 * Handles states and provides functions to animate the collapsible element (triggered zoom in animation).
 *
 * @returns - States and logic to animate the obj.
 *
 * @category Hooks
 */
export const useCollapsibleText = (params?: useCollapsibleTextHookParams): CollapsibleTextHookReturn => {
  // Default values
  const { defaultAnimateState = false } = params ?? {}

  // State data
  const [animateState, setAnimateState] = useState(defaultAnimateState)

  // Logic
  const zoomInEffectAnimate = useCallback(
    (animate: boolean) => {
      const timeout = setTimeout(() => {
        setAnimateState(animate)
      }, 250)
      return () => clearTimeout(timeout)
    },
    [animateState, setAnimateState]
  )

  const isElementInViewport = (ref: RefObject<HTMLDivElement>): boolean => {
    const topPosition = ref.current?.getBoundingClientRect().top
    const viewportBottom = window.innerHeight

    return topPosition !== null && typeof topPosition === 'number' && topPosition <= viewportBottom
  }

  const animateObj = useCallback(
    (ref: RefObject<HTMLDivElement>, animate: boolean) => {
      if (isElementInViewport(ref)) {
        if (animate !== animateState) {
          zoomInEffectAnimate(animate)
        }
      }
    },
    [isElementInViewport, animateState, zoomInEffectAnimate]
  )
  return useMemo(
    () => ({
      animateState,
      setAnimateState,
      animateObj,
      zoomInEffectAnimate
    }),
    [animateState, setAnimateState, animateObj, zoomInEffectAnimate]
  )
}
