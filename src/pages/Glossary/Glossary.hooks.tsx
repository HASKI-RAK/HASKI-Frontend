import { GlossaryEntryProps } from '@components'
import { useCallback, useMemo } from 'react'

/**
 * @interface GlossaryHookReturn
 * @property {function} collapseAll - The function that collapses all glossary entries.
 * @property {function} expandAll - The function that expands all glossary entries.
 */
export type GlossaryHookReturn = {
  readonly collapseAll: (setExpandedList: (props: string[]) => void) => void
  readonly expandAll: (setExpandedList: (props: string[]) => void, glossaryEntries: GlossaryEntryProps[]) => void
}

/**
 * Hook for the Glossary logic.
 * Provides functions to collapse and expand all glossary entries.
 * @returns {GlossaryHookReturn} - The Glossary logic.
 */
export const useGlossary = (): GlossaryHookReturn => {
  //Logic
  // Collapses all glossary entries by setting the expandedList to an empty array.
  const onCollapseAll = useCallback((setExpandedList: (props: string[]) => void) => {
    setExpandedList?.([])
  }, [])

  // Expands all glossary entries by setting the expandedList to an array of all glossary entry terms.
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
