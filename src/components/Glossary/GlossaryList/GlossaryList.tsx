import { useGlossaryList as _useGlossaryList, GlossaryListHookReturn } from './GlossaryList.hooks'
import { GlossaryEntry, GlossaryEntryProps } from '@components'
import { useEffect, useState, memo } from 'react'

/**
 * @typedef {object} GlossaryListProps
 * @property {GlossaryEntryProps[]} [glossaryEntries] - The entries to be displayed in the list.
 * @property {string[]} [expandedList] -  The list of terms of the currently expanded entries.
 * @property {(newExpandedList: string[]) => void} [setExpandedList] - The function to set the currently expanded entries.
 * @property {string} [searchQuery] - The query to search for in the properties of the entries.
 * @property {string} [selectedIndexElement] - The index element to filter the entries by.
 * @property {string[]} [selectedTags] - The tags to filter the entries by.
 * @property {() => GlossaryListHookReturn} [useGlossaryList] - The hook supplying expand, filter and search functions.
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
 * GlossaryList presents a component where a list of glossary entries is displayed. The selection of entries which are displayed can be altered using the props.
 * It can be used as a standalone component on a page.
 * @param params - Props containing the glossaryEntries, expandedList, setExpandedList, searchQuery, selectedIndexElement, selectedTags and useGlossaryList.
 * @returns {JSX.Element} - The GlossaryList component
 * @category Components
 */
const GlossaryList = ({ useGlossaryList = _useGlossaryList, ...props }: GlossaryListProps) => {
  const [glossaryEntryState, setGlossaryState] = useState<GlossaryEntryProps[]>([])
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
      setGlossaryState(byQuerySearchedGlossaryEntries)
    }
  }, [props, filterByTags, filterByIndexElement, searchByQuery, setGlossaryState])

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
