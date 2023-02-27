import { useEffect } from "react"
import { useTranslation } from "react-i18next"
import { 
    SelectedTagsState, 
    useSelectedTagsStore, 
    SelectedIndexElementState, 
    useSelectedIndexElementStore,
    SearchQueryState,
    useSearchQueryStore
} from "@services/*"
import { GlossaryEntryProps } from "@components"

export type useGlossaryFormHookParams = {
    defaultSelectedTags?: string[]
    defaultSelectedIndexElement?: string
    defaultSearchQuery? :string
}

export type GlossaryFormHookReturn = {
    readonly selectedTagsState: SelectedTagsState
    readonly selectedIndexElementState: SelectedIndexElementState
    readonly searchQueryState: SearchQueryState
    readonly filterByTags: (selectedTags: string[], inputData: GlossaryEntryProps[]) => GlossaryEntryProps[]
    readonly filterByIndexElement: (selectedIndexElement: string, inputData: GlossaryEntryProps[]) => GlossaryEntryProps[]
    readonly searchByQuery: (searchQuery: string, inputData: GlossaryEntryProps[]) => GlossaryEntryProps[]
}

export const useGlossaryForm = (params?: useGlossaryFormHookParams): GlossaryFormHookReturn => {
    const  { t } = useTranslation();
    
    // Default values
    const { defaultSelectedTags = [] } = params || {}
    const { defaultSelectedIndexElement = '' } = params || {}
    const { defaultSearchQuery = '' } = params || {}
    
    // State data
    const {selectedTags, setSelectedTags} = useSelectedTagsStore()
    const {selectedIndexElement, setSelectedIndexElement} = useSelectedIndexElementStore()
    const {searchQuery, setSearchQuery} = useSearchQueryStore()

    useEffect(() => {
        setSelectedTags!(defaultSelectedTags)
        setSelectedIndexElement!(defaultSelectedIndexElement)
        setSearchQuery!(defaultSearchQuery)
      }, []);

    // Logic
    const onFilterByTags = (selectedTags: string[], glossaryEntries: GlossaryEntryProps[]): GlossaryEntryProps[]  => {
        const filteredGlossaryEntries: GlossaryEntryProps[] = []
        
        if(selectedTags.length === 0) {
            return glossaryEntries
        }
        
        glossaryEntries.forEach((glossaryEntry) => {

            if(selectedTags.every(selectedTag => glossaryEntry.tags && glossaryEntry.tags.includes(selectedTag))) {
                filteredGlossaryEntries.push(glossaryEntry)
            }
        })
        
        return filteredGlossaryEntries
    }
    
    const onFilterByIndexElement = (selectedIndexElement: string, glossaryEntries: GlossaryEntryProps[]): GlossaryEntryProps[]  => {
        const filteredGlossaryEntries: GlossaryEntryProps[] = []

        if(selectedIndexElement === null || selectedIndexElement.length === 0) {
            return glossaryEntries
        }

        if(selectedIndexElement === t('pages.glossary.popular')) {
            return glossaryEntries
        }

        if(selectedIndexElement === t('pages.glossary.fundamentals')) {
            glossaryEntries.forEach((glossaryEntry) => {
                if(glossaryEntry.fundamental) {
                    filteredGlossaryEntries.push(glossaryEntry)
                }
            })
            return filteredGlossaryEntries
        }

        glossaryEntries.forEach((glossaryEntry) => {
            if(glossaryEntry.term && Array.from(glossaryEntry.term)[0] === selectedIndexElement) {
                filteredGlossaryEntries.push(glossaryEntry)
            }
        })

        return filteredGlossaryEntries
    }

    const onSearchByQuery = (searchQuery: string, glossaryEntries: GlossaryEntryProps[]): GlossaryEntryProps[]  => {
        const searchedGlossaryEntries: GlossaryEntryProps[] = []

        if(searchQuery === '') {
            return glossaryEntries
        }
        
        glossaryEntries.forEach((glossaryEntry) => {
            if((glossaryEntry.term && glossaryEntry.term.toLowerCase().includes(searchQuery.toLowerCase()))
            || (glossaryEntry.definition && glossaryEntry.definition.toLowerCase().includes(searchQuery.toLowerCase()))
            || (glossaryEntry.sources && glossaryEntry.sources.toLowerCase().includes(searchQuery.toLowerCase()))
            || (glossaryEntry.tags && glossaryEntry.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())))) {
                
                searchedGlossaryEntries.push(glossaryEntry)
            }
        })

        return searchedGlossaryEntries
    }

    return {
        selectedTagsState: {
            selectedTags: selectedTags,
            setSelectedTags: setSelectedTags
        },
        selectedIndexElementState: {
            selectedIndexElement: selectedIndexElement,
            setSelectedIndexElement: setSelectedIndexElement
        },
        searchQueryState: {
            searchQuery: searchQuery,
            setSearchQuery: setSearchQuery
        },
        filterByTags: onFilterByTags,
        filterByIndexElement: onFilterByIndexElement,
        searchByQuery: onSearchByQuery
    } as const
}