import { useCallback, useContext } from 'react'
import { SnackbarContext, postStudentLpLeAlg, postTeacherLpLeAlg } from '@services'
import { usePersistedStore } from '@store'

/**
 *
 * @param handleClose - function executed when closing the modal.
 * @param changeObserver - function executed when the algorithm is changed.
 * @param options - Array of objects containing the name, description and key of the algorithms.
 * @param selected - index of the currently selected algorithm.
 * @param getIDs - Object containing the courseID and topicID.
 */
export type useAlgorithmSettingsModalHookParams = {
  handleClose: () => void
  changeObserver?: () => void
  options: { name: string; description: string; key: string }[]
  selected: number
  getIDs: { courseID: number | null; topicID: number | undefined }
}
/**
 *
 * @param params - neccesary parameters from the component to change algorithms for a topic or course in the backend.
 * @returns function that saves the selected algorithm for the course or topic in the backend.
 */
const useAlgorithmSettingsModal = (params: useAlgorithmSettingsModalHookParams) => {
  const { addSnackbar } = useContext(SnackbarContext)
  const getUser = usePersistedStore.getState().getUser

  const handleSave = useCallback(() => {
    getUser().then((user) => {
      if (user.role === 'teacher') {
        postTeacherLpLeAlg(
          user.settings.user_id,
          user.lms_user_id,
          params.getIDs.topicID,
          params.options[params.selected].key
        )
          .then(() => {
            if (params.changeObserver) params.changeObserver()
          })
          .catch((error) => {
            addSnackbar({ message: error.message, severity: 'error', autoHideDuration: 5000 })
          })
      } else if (user.role === 'student') {
        postStudentLpLeAlg(user.settings.user_id, params.getIDs.topicID, params.options[params.selected].key)
          .then(() => {
            if (params.changeObserver) params.changeObserver()
          })
          .catch((error) => {
            addSnackbar({ message: error.message, severity: 'error', autoHideDuration: 5000 })
          })
      }
    })
    params.handleClose()
  }, [params.handleClose, params.options, params.selected, params.getIDs])
  return { handleSave } as const
}

export default useAlgorithmSettingsModal
