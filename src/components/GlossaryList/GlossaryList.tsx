import { GlossaryEntry, GlossaryEntryProps } from '@components'
import { useGlossaryList as _useGlossaryList, GlossaryListHookReturn } from './GlossaryList.hooks'
import { useEffect, useState } from 'react'

export type GlossaryListProps = {
  glossaryEntries?: GlossaryEntryProps[]
  expandedList?: string[]
  setExpandedList?: (newExpandedList: string[]) => void
  searchQuery?: string
  selectedIndexElement?: string
  selectedTags?: string[]
  useGlossaryList?: () => GlossaryListHookReturn
}

const GlossaryList = ({ useGlossaryList = _useGlossaryList, ...props }: GlossaryListProps) => {
  const { filterByTags, filterByIndexElement, searchByQuery } = useGlossaryList()

  const [glossaryEntryState, setGlossaryState] = useState<GlossaryEntryProps[]>([])

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
  }, [
    props.glossaryEntries,
    filterByTags,
    props.selectedTags,
    filterByIndexElement,
    props.selectedIndexElement,
    searchByQuery,
    props.searchQuery,
    setGlossaryState
  ])

  return (
    <>
      {Array.from(glossaryEntryState).map((glossaryEntry, index) => (
        <GlossaryEntry
          key={glossaryEntry.term && glossaryEntry.term + index}
          expandedList={props.expandedList}
          setExpandedList={props.setExpandedList}
          {...glossaryEntry}
        />
      ))}
    </>
  )
}

export default GlossaryList
