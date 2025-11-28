import { useCallback, useMemo } from 'react'
import { GlossaryEntryProps } from '@components'

/**
 * @prop collapseAll - Function to collapse all glossary entries.
 * @prop expandAll - Function to expand all glossary entries.
 * @category Hooks
 * @interface
 */
export type GlossaryHookReturn = {
  readonly collapseAll: (setExpandedList: (props: string[]) => void) => void
  readonly expandAll: (setExpandedList: (props: string[]) => void, glossaryEntries: GlossaryEntryProps[]) => void
}

/**
 * useGlossary hook.
 *
 * @remarks
 * Hook for the Glossary logic.
 * Provides functions to collapse and expand all glossary entries.
 *
 * @returns - Logic to change if all glossary entries are presented collapsed or expanded.
 *
 * @category Hooks
 */
export const useGlossary = (): GlossaryHookReturn => {
  //Logic
  // Collapses all glossary entries by setting the expandedList to an empty array.
  const collapseAll = useCallback((setExpandedList: (props: string[]) => void) => {
    setExpandedList?.([])
  }, [])

  // Expands all glossary entries by setting the expandedList to an array of all glossary entry terms.
  const expandAll = useCallback((setExpandedList: (props: string[]) => void, glossaryEntries: GlossaryEntryProps[]) => {
    setExpandedList?.(
      glossaryEntries.map((glossaryEntry) => glossaryEntry.term).filter((term): term is string => term !== undefined)
    )
  }, [])

  return useMemo(
    () => ({
      collapseAll,
      expandAll
    }),
    [collapseAll, expandAll]
  )
}
