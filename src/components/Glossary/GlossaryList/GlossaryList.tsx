import { useGlossaryList as _useGlossaryList, GlossaryListHookReturn } from './GlossaryList.hooks'
import { GlossaryEntry, GlossaryEntryProps } from '@components'
import { useEffect, useState, memo } from 'react'

/**
 * @props glossaryEntries - The entries to be displayed in the list.
 * @props expandedList -  The list of terms of the currently expanded entries.
 * @props setExpandedList - The function to set the currently expanded entries.
 * @props searchQuery - The query to search for in the properties of the entries.
 * @props selectedIndexElement - The index element to filter the entries by.
 * @props selectedTags - The tags to filter the entries by.
 * @props useGlossaryList - The hook supplying expand, filter and search functions.
 * @interface
 */
export type GlossaryListProps = {
  glossaryEntries?: GlossaryEntryProps[]
  expandedList?: string[]
  setExpandedList?: (newExpandedList: string[]) => void
  searchQuery?: string
  selectedIndexElement?: string
  selectedTags?: string[]
  useGlossaryList?: () => GlossaryListHookReturn
}

/**
 * GlossaryList component.
 *
 * @param props - Props containing the glossaryEntries, expandedList, setExpandedList, searchQuery, selectedIndexElement, selectedTags and useGlossaryList.
 *
 * @remarks
 * GlossaryList presents a component where a list of glossary entries is displayed. The selection of entries which are displayed can be altered using the props.
 * It can be used as a standalone component on a page.
 *
 * @category Components
 */
const GlossaryList = ({ useGlossaryList = _useGlossaryList, ...props }: GlossaryListProps) => {
  const [glossaryEntryState, setGlossaryEntryState] = useState<GlossaryEntryProps[]>([])
  const { filterByTags, filterByIndexElement, searchByQuery } = useGlossaryList()

  // Filters and searches the glossary entries
  useEffect(() => {
    if (props.glossaryEntries) {
      const byTagsFilteredGlossaryEntries = filterByTags(props.glossaryEntries, props.selectedTags)
      const bySelectedIndexElementFilteredGlossaryEntries = filterByIndexElement(
        byTagsFilteredGlossaryEntries,
        props.selectedIndexElement
      )
      const byQuerySearchedGlossaryEntries = searchByQuery(
        bySelectedIndexElementFilteredGlossaryEntries,
        props.searchQuery
      )
      setGlossaryEntryState(byQuerySearchedGlossaryEntries)
    }
  }, [
    props.glossaryEntries,
    props.searchQuery,
    props.selectedIndexElement,
    props.selectedTags,
    filterByTags,
    filterByIndexElement,
    searchByQuery,
    setGlossaryEntryState
  ])

  return (
    <>
      {glossaryEntryState.map((glossaryEntry, index) => (
        <GlossaryEntry
          key={glossaryEntry.term ?? index}
          expandedList={props.expandedList}
          setExpandedList={props.setExpandedList}
          {...glossaryEntry}
        />
      ))}
    </>
  )
}

export default memo(GlossaryList)
