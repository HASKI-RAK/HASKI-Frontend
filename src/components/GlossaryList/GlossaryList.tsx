import { GlossaryEntry, GlossaryEntryProps } from "@components"

export const GlossaryList = (props: GlossaryListProps) => {

    return(
        <>
            {
                props.glossaryEntries && props.glossaryEntries.map((glossaryEntry) => (
                    <GlossaryEntry
                        key={glossaryEntry.term && (glossaryEntry.term + glossaryEntry.definition + glossaryEntry.sources)}
                        term={glossaryEntry.term}
                        definition={glossaryEntry.definition}
                        sources={glossaryEntry.sources}
                        tags={glossaryEntry.tags}
                        fundamental={glossaryEntry.fundamental}
                    />
                ))
            }
        </>
    )
}

interface GlossaryListProps {
    glossaryEntries?: GlossaryEntryProps[]
}