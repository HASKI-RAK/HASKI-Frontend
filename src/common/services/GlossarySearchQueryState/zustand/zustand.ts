import create from 'zustand'
import { GlossarySearchQueryState } from '../GlossarySearchQueryState'

export const useGlossarySearchQueryState = create<GlossarySearchQueryState>()((set) => ({
  searchQuery: undefined,
  setSearchQuery: (newSearchQuery) => set({ searchQuery: newSearchQuery })
}))
