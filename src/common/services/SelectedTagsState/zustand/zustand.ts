import create from "zustand"
import { SelectedTagsState } from "../SelectedTagsState"

export const useSelectedTagsStore = create<SelectedTagsState>()((set) => ({
    selectedTags : [],
    setSelectedTags: (newSelectedTags) => set({selectedTags: newSelectedTags})
}))