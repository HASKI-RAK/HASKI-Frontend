import { GlossaryEntryProps } from '@components'
import { useCallback, useMemo } from 'react'

export type GlossaryContentHookReturn = {
  readonly collapseAll: (setExpandedList: (newExpandedList: string[]) => void) => void
  readonly expandAll: (
    setExpandedList: (newExpandedList: string[]) => void,
    glossaryEntries: GlossaryEntryProps[]
  ) => void
}

export const useGlossaryContent = (): GlossaryContentHookReturn => {
  //Logic
  const onCollapseAll = useCallback((setExpandedList: (newExpandedList: string[]) => void) => {
    setExpandedList?.([])
  }, [])

  const onExpandAll = useCallback(
    (setExpandedList: (newExpandedList: string[]) => void, glossaryEntries: GlossaryEntryProps[]) => {
      const tempExpandedList: string[] = []

      Array.from(glossaryEntries).forEach((glossaryEntry) => {
        glossaryEntry.term && tempExpandedList.push(glossaryEntry.term)
      })

      setExpandedList?.(tempExpandedList)
    },
    []
  )

  return useMemo(
    () =>
      ({
        collapseAll: onCollapseAll,
        expandAll: onExpandAll
      } as const),
    [onCollapseAll, onExpandAll]
  )
}
