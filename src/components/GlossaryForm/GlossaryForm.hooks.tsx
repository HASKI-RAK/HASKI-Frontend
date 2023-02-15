import { useEffect } from "react"
import { SelectedTagsState, useSelectedTagsStore } from "@services/SelectedTagState"

export type useGlossaryFormHookParams = {
    defaultSelectedTags?: string[]
}

export type GlossaryFormHookReturn = {
    readonly selectedTagsState: SelectedTagsState
}

export const useGlossaryForm = (params?: useGlossaryFormHookParams): GlossaryFormHookReturn => {
    // Default values
    const { defaultSelectedTags = [] } = params || {}
    
    // State data
    const {selectedTags, setSelectedTags} = useSelectedTagsStore()

    useEffect(() => {
        setSelectedTags!(defaultSelectedTags)
      }, []);

    // Logic
    // TODO: Maybe Filter Logic für die Liste
    // TODO: Maye Search Logic für die Liste

    return {
        selectedTagsState: {
            selectedTags: selectedTags,
            setSelectedTags: setSelectedTags
        }
    } as const
}