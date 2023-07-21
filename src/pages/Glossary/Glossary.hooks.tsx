import { GlossaryEntryProps } from '@components'
import { useCallback, useMemo } from 'react'

/**
 * TODO
 */
export type GlossaryHookReturn = {
  readonly collapseAll: (setExpandedList: (props: string[]) => void) => void
  readonly expandAll: (setExpandedList: (props: string[]) => void, glossaryEntries: GlossaryEntryProps[]) => void
}

/**
 * TODO
 * @returns
 */
export const useGlossary = (): GlossaryHookReturn => {
  //Logic
  // TODO
  const onCollapseAll = useCallback((setExpandedList: (props: string[]) => void) => {
    setExpandedList?.([])
  }, [])

  // TODO
  const onExpandAll = useCallback(
    (setExpandedList: (props: string[]) => void, glossaryEntries: GlossaryEntryProps[]) => {
      const tempExpandedList: string[] = []

      Array.from(glossaryEntries).forEach((glossaryEntry) => {
        glossaryEntry.term && tempExpandedList.push(glossaryEntry.term)
      })

      setExpandedList?.(tempExpandedList)
    },
    []
  )

  return useMemo(
    () => ({
      collapseAll: onCollapseAll,
      expandAll: onExpandAll
    }),
    [onCollapseAll, onExpandAll]
  )
}
