import { useMemo } from 'react'

//
export type GlobalNavigationItemReturn = {
  readonly content: { name: string; url: string }[]
  readonly isLoading: boolean
}

// Comment
export const useGlobalNavigationItem = (): GlobalNavigationItemReturn => {
  // Default values
  const isLoading = true
  const content: { name: string; url: string }[] = []

  return useMemo(
    () => ({
      content,
      isLoading
    }),
    [content, isLoading]
  )
}
