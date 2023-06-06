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
      if (props.selectedTags) {
        setGlossaryState(filterByTags(props.selectedTags, props.glossaryEntries))
      }

      if (props.selectedIndexElement) {
        setGlossaryState(filterByIndexElement(props.selectedIndexElement, glossaryEntryState))
      }

      if (props.searchQuery) {
        searchByQuery(props.searchQuery, glossaryEntryState)
      }
    }
  }, [props])

  return (
    <div data-testid="GlossaryList">
      {Array.from(glossaryEntryState).map((glossaryEntry, index) => (
        <GlossaryEntry
          key={glossaryEntry.term && glossaryEntry.term + index}
          expandedList={props.expandedList}
          setExpandedList={props.setExpandedList}
          {...glossaryEntry}
        />
      ))}
    </div>
  )
}

//for tests
export type TestGlossaryListProps = GlossaryListProps
export const TestGlossaryList = GlossaryList

export default GlossaryList
