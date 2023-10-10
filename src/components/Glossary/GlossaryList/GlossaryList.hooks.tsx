import { useCallback, useMemo } from 'react'
import { GlossaryEntryProps } from '@components'
import { useTranslation } from 'react-i18next'

/**
 * @prop filterByTags - Function to filter the glossary entries by tags.
 * @prop filterByIndexElement - Function to filter the glossary entries by index element.
 * @prop searchByQuery - Function to search the glossary entries by query.
 * @prop collapseAll - Function to collapse all glossary entries.
 * @prop expandAll - Function to expand all glossary entries.
 * @category Hooks
 * @interface
 */
export type GlossaryListHookReturn = {
  readonly filterByTags: (glossaryEntries: GlossaryEntryProps[], selectedTags?: string[]) => GlossaryEntryProps[]
  readonly filterByIndexElement: (
    glossaryEntries: GlossaryEntryProps[],
    selectedIndexElement?: string
  ) => GlossaryEntryProps[]
  readonly searchByQuery: (glossaryEntries: GlossaryEntryProps[], searchQuery?: string) => GlossaryEntryProps[]
}

/**
 * useGlossaryList hook.
 *
 * @remarks
 * Hook for the GlossaryList logic.
 * Provides functions to filter, search, collapse and expand the glossary entries.
 *
 * @returns - Logic to manipulate the glossary entries and change if they're presented collapsed or expanded.
 *
 * @category Hooks
 */
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

  return useMemo(
    () => ({
      filterByTags,
      filterByIndexElement,
      searchByQuery
    }),
    [filterByTags, filterByIndexElement, searchByQuery]
  )
}
