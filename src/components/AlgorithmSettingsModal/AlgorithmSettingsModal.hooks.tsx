import { useCallback } from 'react'

export type useAlgorithmSettingsModalHookParams = {
    handleClose: () => void
    options: {name: string, description: string, key: string}[]
    selected: number
    getIDs: () => { courseID: string | null, topicID: string | null}
  }

const useAlgorithmSettingsModal = (params: useAlgorithmSettingsModalHookParams) => {
    const handleSave = useCallback(() => {
      console.log('Save selected algorithm', params.options[params.selected].name, 'for course', params.getIDs().courseID, 'and topic', params.getIDs().topicID)
      // TODO: Set the selected algorithm for the Course using getIDs() to get the courseID and topicID; string has to be converted to number
    params.handleClose() }, [params.handleClose, params.options, params.selected, params.getIDs])
    return { handleSave } as const
}

export default useAlgorithmSettingsModal