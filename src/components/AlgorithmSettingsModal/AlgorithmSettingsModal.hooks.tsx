import { useCallback } from 'react'

export type useAlgorithmSettingsModalHookParams = {
  handleClose: () => void
  options: { name: string; description: string; key: string }[]
  selected: number
  getIDs: { courseID: number | null; topicID: number | null }
}

const useAlgorithmSettingsModal = (params: useAlgorithmSettingsModalHookParams) => {
  const handleSave = useCallback(() => {
    // TODO: Set the selected algorithm for the Course using getIDs() to get the courseID and topicID; string has to be converted to number
    params.handleClose()
  }, [params.handleClose, params.options, params.selected, params.getIDs])
  return { handleSave } as const
}

export default useAlgorithmSettingsModal
