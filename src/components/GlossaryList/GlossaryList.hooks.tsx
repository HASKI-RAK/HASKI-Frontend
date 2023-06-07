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

  // Logic
  const onFilterByTags = useCallback(
    (glossaryEntries: GlossaryEntryProps[], selectedTags?: string[]): GlossaryEntryProps[] => {
      const filteredGlossaryEntries: GlossaryEntryProps[] = []

      if (selectedTags === undefined || selectedTags.length === 0) {
        return glossaryEntries
      }

      Array.from(glossaryEntries).forEach((glossaryEntry) => {
        if (selectedTags.every((selectedTag) => glossaryEntry.tags?.includes(selectedTag))) {
          filteredGlossaryEntries.push(glossaryEntry)
        }
      })

      return filteredGlossaryEntries
    },
    []
  )

  const onFilterByIndexElement = useCallback(
    (glossaryEntries: GlossaryEntryProps[], selectedIndexElement?: string): GlossaryEntryProps[] => {
      const filteredGlossaryEntries: GlossaryEntryProps[] = []

      if (selectedIndexElement === null || selectedIndexElement === '' || selectedIndexElement === undefined) {
        return glossaryEntries
      }

      if (selectedIndexElement === t('pages.glossary.fundamentals')) {
        Array.from(glossaryEntries).forEach((glossaryEntry) => {
          if (glossaryEntry.fundamental) {
            filteredGlossaryEntries.push(glossaryEntry)
          }
        })

        return filteredGlossaryEntries
      }

      Array.from(glossaryEntries).forEach((glossaryEntry) => {
        if (
          glossaryEntry.term &&
          Array.from(glossaryEntry.term)[0].toLowerCase() === selectedIndexElement.toLowerCase()
        ) {
          filteredGlossaryEntries.push(glossaryEntry)
        }
      })

      return filteredGlossaryEntries
    },
    []
  )

  const onSearchByQuery = useCallback(
    (glossaryEntries: GlossaryEntryProps[], searchQuery?: string): GlossaryEntryProps[] => {
      const searchedGlossaryEntries: GlossaryEntryProps[] = []

      if (searchQuery === undefined || searchQuery === '') {
        return glossaryEntries
      }

      Array.from(glossaryEntries).forEach((glossaryEntry) => {
        if (
          glossaryEntry.term?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          glossaryEntry.definition?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          glossaryEntry.sources?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          glossaryEntry.tags?.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
        ) {
          searchedGlossaryEntries.push(glossaryEntry)
        }
      })

      return searchedGlossaryEntries
    },
    []
  )

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
        filterByTags: onFilterByTags,
        filterByIndexElement: onFilterByIndexElement,
        searchByQuery: onSearchByQuery,
        collapseAll: onCollapseAll,
        expandAll: onExpandAll
      } as const),
    [onFilterByTags, onFilterByIndexElement, onSearchByQuery, onCollapseAll, onExpandAll]
  )
}
