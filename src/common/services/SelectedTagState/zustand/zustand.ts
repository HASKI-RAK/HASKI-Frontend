import create from "zustand"
import { SelectedTagsState } from "../SelectedTagsState"

export const useSelectedTagsStore = create<SelectedTagsState>()((set) => ({
    selectedTags: undefined,
    /*setSelectedTags: (newSelectedTag) =>
        set(() => ({
            newSelectedTag: 'string' ? newSelectedTag.split(',') : newSelectedTag,
        }))*/
}))