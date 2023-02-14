import { GlossaryEntry, GlossaryEntryProps } from "@components"
import { useTranslation } from "react-i18next"

export const GlossaryList = () => {
    const { t } = useTranslation()
    const glossaryElements : GlossaryEntryProps[] = t<string>('pages.glossary.elements', { returnObjects: true}) as GlossaryEntryProps[]

    return(
        <>
            {
                glossaryElements.map((glossaryElement) => (
                    <GlossaryEntry key={glossaryElement.term} term={glossaryElement.term} definition={glossaryElement.definition} sources={glossaryElement.sources} />
                ))
            }
        </>
    );
}