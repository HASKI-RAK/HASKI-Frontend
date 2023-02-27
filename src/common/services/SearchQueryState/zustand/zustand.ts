import create from "zustand"
import { SearchQueryState } from "../SearchQueryState"

export const useSearchQueryStore = create<SearchQueryState>()((set) => ({
    searchQuery : '',
    setSearchQuery: (newSearchQuery) => set({searchQuery: newSearchQuery})
}))