import { useCallback, useContext, useState } from 'react'
import { useParams } from 'react-router-dom'
import { SnackbarContext, postStudentLpLeAlg, postTeacherLpLeAlg } from '@services'
import { usePersistedStore, useStore } from '@store'

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
  topicId?: number
}
/**
 *
 * @param params - necessary parameters from the component to change algorithms for a topic or course in the backend.
 * @returns function that saves the selected algorithm for the course or topic in the backend.
 */
const useAlgorithmSettingsModal = (params: useAlgorithmSettingsModalHookParams) => {
  const { addSnackbar } = useContext(SnackbarContext)
  const getUser = usePersistedStore((state) => state.getUser)
  const setStudentLpLeAlgorithm = useStore((state) => state.setStudentLpLeAlgorithm)
  const setTeacherLpLeAlgorithm = useStore((state) => state.setTeacherLpLeAlgorithm)
  const [waitForBackend, setWaitForBackend] = useState(false)
  const triggerLearningPathElementReload = useStore((state) => state.triggerLearningPathElementReload)
  const getLearningPathElement = useStore((state) => state.getLearningPathElement)
  const { courseId } = useParams<{ courseId: string }>()

  const handleSave = useCallback(() => {
    getUser().then((user) => {
      if (user.role === 'teacher') {
        setWaitForBackend(true)
        postTeacherLpLeAlg(user.settings.user_id, user.lms_user_id, params.topicId, params.options[params.selected].key)
          .then(() => {
            setTeacherLpLeAlgorithm(params.topicId, params.options[params.selected].key)
            setWaitForBackend(false)
            params.handleClose()
            if (params.changeObserver) params.changeObserver()
          })
          .catch((error) => {
            addSnackbar({ message: error.message, severity: 'error', autoHideDuration: 5000 })
            params.handleClose()
          })
      } else if (user.role === 'student') {
        setWaitForBackend(true)
        postStudentLpLeAlg(
          user.settings.user_id,
          user.lms_user_id,
          courseId,
          params.topicId,
          params.options[params.selected].key
        )
          .then(() => {
            setStudentLpLeAlgorithm(user.settings.user_id, params.topicId, params.options[params.selected].key)
            // Fetch the new learning path then close the modal
            triggerLearningPathElementReload(true)
            getLearningPathElement(user.settings.user_id, user.lms_user_id, user.id, courseId, String(params.topicId))
              .then(() => {
                setWaitForBackend(false)
                params.handleClose()
              })
              .catch((error) => {
                addSnackbar({ message: error.message, severity: 'error', autoHideDuration: 5000 })
                params.handleClose()
                setWaitForBackend(false)
              })
            if (params.changeObserver) params.changeObserver()
          })
          .catch((error) => {
            addSnackbar({ message: error.message, severity: 'error', autoHideDuration: 5000 })
            params.handleClose()
          })
      }
    })
  }, [params.handleClose, params.options, params.selected, params.topicId])
  return { handleSave, waitForBackend } as const
}

export default useAlgorithmSettingsModal
