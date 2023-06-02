import { useEffect, useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { GlossaryState, useGlossaryStore } from '@services'
import { GlossaryEntryProps } from '@components'

export type useGlossaryContentHookParams = {
  defaultExpandedList?: string[]
  defaultSearchQuery?: string
  defaultSelectedIndexElement?: string
  defaultSelectedTags?: string[]
}

export type GlossaryContentHookReturn = {
  readonly glossaryState: GlossaryState
  readonly filterByTags: (selectedTags: string[], inputData: GlossaryEntryProps[]) => GlossaryEntryProps[]
  readonly filterByIndexElement: (selectedIndexElement: string, inputData: GlossaryEntryProps[]) => GlossaryEntryProps[]
  readonly searchByQuery: (inputData: GlossaryEntryProps[]) => GlossaryEntryProps[]
  readonly collapseAll: () => void
  readonly expandAll: (inputData: GlossaryEntryProps[]) => void
}

export const useGlossaryContent = (params?: useGlossaryContentHookParams): GlossaryContentHookReturn => {
  const { t } = useTranslation()

  // Default values
  const {
    defaultExpandedList = [],
    defaultSearchQuery = '',
    defaultSelectedIndexElement = '',
    defaultSelectedTags = []
  } = params ?? {}

  // State data
  const {
    expandedList,
    searchQuery,
    selectedIndexElement,
    selectedTags,
    setExpandedList,
    setSearchQuery,
    setSelectedIndexElement,
    setSelectedTags
  } = useGlossaryStore()

  useEffect(() => {
    setExpandedList?.(defaultExpandedList)
    setSearchQuery?.(defaultSearchQuery)
    setSelectedIndexElement?.(defaultSelectedIndexElement)
    setSelectedTags?.(defaultSelectedTags)
  }, [])

  // Logic
  const onFilterByTags = useCallback(
    (selectedTags: string[], glossaryEntries: GlossaryEntryProps[]): GlossaryEntryProps[] => {
      const filteredGlossaryEntries: GlossaryEntryProps[] = []

      if (selectedTags.length === 0) {
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
    (selectedIndexElement: string, glossaryEntries: GlossaryEntryProps[]): GlossaryEntryProps[] => {
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

  const onSearchByQuery = useCallback((glossaryEntries: GlossaryEntryProps[]): GlossaryEntryProps[] => {
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
  }, [])

  const onCollapseAll = useCallback(() => {
    setExpandedList?.([])
  }, [setExpandedList])

  const onExpandAll = useCallback((glossaryEntries: GlossaryEntryProps[]) => {
    const tempExpandedList: string[] = []

    Array.from(glossaryEntries).forEach((glossaryEntry) => {
      glossaryEntry.term && tempExpandedList.push(glossaryEntry.term)
    })

    setExpandedList?.(tempExpandedList)
  }, [])

  return useMemo(
    () =>
      ({
        glossaryState: {
          expandedList: expandedList,
          searchQuery: searchQuery,
          selectedIndexElement: selectedIndexElement,
          selectedTags: selectedTags,
          setExpandedList: setExpandedList,
          setSearchQuery: setSearchQuery,
          setSelectedIndexElement: setSelectedIndexElement,
          setSelectedTags: setSelectedTags
        },
        filterByTags: onFilterByTags,
        filterByIndexElement: onFilterByIndexElement,
        searchByQuery: onSearchByQuery,
        collapseAll: onCollapseAll,
        expandAll: onExpandAll
      } as const),
    [
      {
        glossaryState: {
          expandedList: expandedList,
          searchQuery: searchQuery,
          selectedIndexElement: selectedIndexElement,
          selectedTags: selectedTags,
          setExpandedList: setExpandedList,
          setSearchQuery: setSearchQuery,
          setSelectedIndexElement: setSelectedIndexElement,
          setSelectedTags: setSelectedTags
        },
        filterByTags: onFilterByTags,
        filterByIndexElement: onFilterByIndexElement,
        searchByQuery: onSearchByQuery,
        collapseAll: onCollapseAll,
        expandAll: onExpandAll
      }
    ]
  )
}
