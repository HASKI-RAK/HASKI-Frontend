import create from "zustand"
import { GlossaryState } from "../GlossaryState"

export const useGlossaryStore = create<GlossaryState>()((set) => ({
    expandedList : undefined,
    searchQuery : undefined,
    selectedIndexElement : undefined,
    selectedTags : [],
    setExpandedList: (newExpandedList) => set({expandedList: newExpandedList}),
    setSearchQuery: (newSearchQuery) => set({searchQuery: newSearchQuery}),
    setSelectedIndexElement: (newSelectedIndexElement) => set({selectedIndexElement: newSelectedIndexElement}),
    setSelectedTags: (newSelectedTags) => {
        if(newSelectedTags === undefined) { // typeof newSelectedTags === "undefined"
            set({selectedTags: [] as string[]})
        }
        else if(typeof newSelectedTags === "string") {
            set({selectedTags: newSelectedTags.split(',')})
        }
        else {
            set({selectedTags: newSelectedTags})
        }
    }
}))