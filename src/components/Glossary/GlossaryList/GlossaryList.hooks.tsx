import { useCallback, useMemo } from 'react'
import { GlossaryEntryProps } from '@components'
import { useTranslation } from 'react-i18next'

export type GlossaryListHookReturn = {
  readonly filterByTags: (glossaryEntries: GlossaryEntryProps[], selectedTags?: string[]) => GlossaryEntryProps[]
  readonly filterByIndexElement: (
    glossaryEntries: GlossaryEntryProps[],
    selectedIndexElement?: string
  ) => GlossaryEntryProps[]
  readonly searchByQuery: (glossaryEntries: GlossaryEntryProps[], searchQuery?: string) => GlossaryEntryProps[]
  readonly collapseAll: (setExpandedList: (newExpandedList: string[]) => void) => void
  readonly expandAll: (
    setExpandedList: (newExpandedList: string[]) => void,
    glossaryEntries: GlossaryEntryProps[]
  ) => void
}

export const useGlossaryList = (): GlossaryListHookReturn => {
  const { t } = useTranslation()

  const filterByTags = useCallback(
    (glossaryEntries: GlossaryEntryProps[], selectedTags?: string[]): GlossaryEntryProps[] => {
      if (selectedTags === undefined || selectedTags.length === 0) {
        return glossaryEntries
      }

      return glossaryEntries.filter((glossaryEntry) =>
        selectedTags.every((selectedTags) => glossaryEntry.tags?.includes(selectedTags))
      )
    },
    []
  )

  const filterByIndexElement = useCallback(
    (glossaryEntries: GlossaryEntryProps[], selectedIndexElement?: string): GlossaryEntryProps[] => {
      if (!selectedIndexElement) {
        return glossaryEntries
      }

      if (selectedIndexElement === t('pages.glossary.fundamentals')) {
        return glossaryEntries.filter((glossaryEntry) => glossaryEntry.fundamental)
      }

      return glossaryEntries.filter((glossaryEntry) =>
        glossaryEntry.term?.toLowerCase().startsWith(selectedIndexElement.toLowerCase())
      )
    },
    [t]
  )

  const searchByQuery = useCallback(
    (glossaryEntries: GlossaryEntryProps[], searchQuery?: string): GlossaryEntryProps[] => {
      if (!searchQuery) {
        return glossaryEntries
      }

      // Nullish coalescing operator (??) doesn't work for tests here, so logical OR (||) is used despite being not recommended by SonarLint.
      return glossaryEntries.filter(
        (glossaryEntry) =>
          glossaryEntry.term?.toLowerCase().includes(searchQuery.toLowerCase()) || // NOSONAR
          glossaryEntry.definition?.toLowerCase().includes(searchQuery.toLowerCase()) || // NOSONAR
          glossaryEntry.sources?.toLowerCase().includes(searchQuery.toLowerCase()) || // NOSONAR
          glossaryEntry.tags?.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    },
    []
  )

  const collapseAll = useCallback((setExpandedList: (newExpandedList: string[]) => void) => {
    setExpandedList?.([])
  }, [])

  const expandAll = useCallback(
    (setExpandedList: (newExpandedList: string[]) => void, glossaryEntries: GlossaryEntryProps[]) => {
      setExpandedList?.(glossaryEntries?.map(({ term }) => term).filter((term): term is string => term !== undefined))
    },
    []
  )

  return useMemo(
    () => ({
      filterByTags,
      filterByIndexElement,
      searchByQuery,
      collapseAll,
      expandAll
    }),
    [filterByTags, filterByIndexElement, searchByQuery, collapseAll, expandAll]
  )
}
