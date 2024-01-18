import { RefObject, useMemo } from 'react'

/**
 * @prop isInViewport - Indicates if the element is in the viewport or not.
 * @interface
 */
export type ViewportHookReturn = {
  readonly isInViewport: (ref: RefObject<HTMLDivElement>) => boolean
}

/**
 * useViewport hook.
 *
 * @remarks
 * Hook for Viewport logic.
 * Provides a function to check if an element is inside the viewport.
 *
 * @returns - Logic to check if an element is inside the viewport.
 *
 * @category Services
 * @category Hooks
 */
export const useViewport = (): ViewportHookReturn => {
  const isInViewport = (ref: RefObject<HTMLDivElement>) => {
    const top = ref.current?.getBoundingClientRect().top

    if (top !== null && typeof top === 'number') {
      return top <= window.innerHeight
    } else {
      return false
    }
  }

  return useMemo(() => ({ isInViewport }), [isInViewport])
}
