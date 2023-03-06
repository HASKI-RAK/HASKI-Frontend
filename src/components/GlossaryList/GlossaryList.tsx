import { GlossaryEntry, GlossaryEntryProps } from "@components"

export const GlossaryList = (props: GlossaryListProps) => {
    return(
        <>
            {
                props.glossaryEntries?.map((glossaryEntry) => (
                    <GlossaryEntry
                        key={glossaryEntry.term}
                        expandedList={props.expandedList}
                        setExpandedList={props.setExpandedList}
                        {...glossaryEntry}
                    />
                ))
            }
        </>
    )
}
interface GlossaryListProps {
    glossaryEntries?: GlossaryEntryProps[]
    expandedList?: string[]
    setExpandedList?: (newExpandedList: string[]) => void
}