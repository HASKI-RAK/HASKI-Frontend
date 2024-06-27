import { useCallback } from 'react'

export type useAlgorithmSettingsModalHookParams = {
  handleClose: () => void
  options: { name: string; description: string; key: string }[]
  selected: number
  getIDs: { courseID: number | null; topicID: number | null }
}
/**
 * 
 * @param params - neccesary parameters from the component to change algorithms for a topic or course in the backend.
 * @returns function that saves the selected algorithm for the course or topic in the backend.
 */
const useAlgorithmSettingsModal = (params: useAlgorithmSettingsModalHookParams) => {
  const handleSave = useCallback(() => {
    // TODO: Set the selected algorithm for the Course using getIDs() to get the courseID and topicID; string has to be converted to number
    params.handleClose()
  }, [params.handleClose, params.options, params.selected, params.getIDs])
  return { handleSave } as const
}

export default useAlgorithmSettingsModal
