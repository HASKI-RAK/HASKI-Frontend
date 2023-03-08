import { useEffect, useCallback } from "react"
import { useTranslation } from "react-i18next"
import { GlossaryState, useGlossaryStore } from "@services"
import { GlossaryEntryProps } from "@components"

export type useGlossaryFormHookParams = {
    defaultExpandedList?: string[]
    defaultSearchQuery?: string
    defaultSelectedIndexElement?: string
    defaultSelectedTags?: string[]
}

export type GlossaryFormHookReturn = {
    readonly glossaryState: GlossaryState
    readonly filterByTags: (selectedTags: string[], inputData: GlossaryEntryProps[]) => GlossaryEntryProps[]
    readonly filterByIndexElement: (selectedIndexElement: string, inputData: GlossaryEntryProps[]) => GlossaryEntryProps[]
    readonly searchByQuery: (inputData: GlossaryEntryProps[]) => GlossaryEntryProps[]
    readonly collapseAll: () => void
    readonly expandAll: (inputData: GlossaryEntryProps[]) => void
}

export const useGlossaryForm = (params?: useGlossaryFormHookParams): GlossaryFormHookReturn => {
    const  { t } = useTranslation();
    
    // Default values
    const {
        defaultExpandedList = [],
        defaultSearchQuery = '',
        defaultSelectedIndexElement = '',
        defaultSelectedTags = []
    } = params || {}
    
    // State data
    const {
        expandedList,
        searchQuery,
        selectedIndexElement,
        selectedTags,
        setExpandedList,
        setSearchQuery,
        setSelectedIndexElement,
        setSelectedTags
    } = useGlossaryStore()

    useEffect(() => {
        setExpandedList && setExpandedList(defaultExpandedList)
        setSearchQuery && setSearchQuery(defaultSearchQuery)
        setSelectedIndexElement && setSelectedIndexElement(defaultSelectedIndexElement)
        setSelectedTags && setSelectedTags(defaultSelectedTags)
      }, []);

    // Logic
    const onFilterByTags = useCallback((selectedTags: string[], glossaryEntries: GlossaryEntryProps[]): GlossaryEntryProps[]  => {
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
    }, [])
    
    const onFilterByIndexElement = useCallback((selectedIndexElement: string, glossaryEntries: GlossaryEntryProps[]): GlossaryEntryProps[]  => {
        const filteredGlossaryEntries: GlossaryEntryProps[] = []

        if(selectedIndexElement === null || selectedIndexElement === '') {
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
    }, [])

    const onSearchByQuery = useCallback((glossaryEntries: GlossaryEntryProps[]): GlossaryEntryProps[]  => {
        const searchedGlossaryEntries: GlossaryEntryProps[] = []

        if(searchQuery === undefined || searchQuery === '') {
            return glossaryEntries
        }

        glossaryEntries.forEach((glossaryEntry) => {
            if((glossaryEntry.term?.toLowerCase().includes(searchQuery.toLowerCase()))
            || (glossaryEntry.definition?.toLowerCase().includes(searchQuery.toLowerCase()))
            || (glossaryEntry.sources?.toLowerCase().includes(searchQuery.toLowerCase()))
            || (glossaryEntry.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())))) {
                
                searchedGlossaryEntries.push(glossaryEntry)
            }
        })

        return searchedGlossaryEntries
    }, [searchQuery])

    const onCollapseAll = useCallback(() => {
        setExpandedList && setExpandedList([])
    }, [])

    const onExpandAll = useCallback((glossaryEntries: GlossaryEntryProps[]) => {
        const tempExpandedList: string[] = []
        
        glossaryEntries.forEach(glossaryEntry => {
            glossaryEntry.term && tempExpandedList.push(glossaryEntry.term)
        })

        setExpandedList && setExpandedList(tempExpandedList)
    }, [])

    return {
        glossaryState: {
            expandedList: expandedList,
            searchQuery: searchQuery,
            selectedIndexElement: selectedIndexElement,
            selectedTags: selectedTags,
            setExpandedList: setExpandedList,
            setSearchQuery: setSearchQuery,
            setSelectedIndexElement: setSelectedIndexElement,
            setSelectedTags: setSelectedTags
        },
        filterByTags: onFilterByTags,
        filterByIndexElement: onFilterByIndexElement,
        searchByQuery: onSearchByQuery,
        collapseAll: onCollapseAll,
        expandAll: onExpandAll
    } as const
}