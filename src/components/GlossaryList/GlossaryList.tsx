import { GlossaryEntry, GlossaryEntryProps } from '@components'

type GlossaryListProps = {
  glossaryEntries?: GlossaryEntryProps[]
  expandedList?: string[]
  setExpandedList?: (newExpandedList: string[]) => void
}

const GlossaryList = (props: GlossaryListProps) => {
  return (
    <div data-testid="GlossaryList">
      {props.glossaryEntries &&
        Array.from(props.glossaryEntries).map((glossaryEntry, index) => (
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
