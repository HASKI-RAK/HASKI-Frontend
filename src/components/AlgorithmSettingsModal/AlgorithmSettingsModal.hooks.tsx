import { useCallback, useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { handleError } from '@components'
import { postStudentLpLeAlg, postTeacherLpLeAlg, RoleContext, SnackbarContext } from '@services'
import { usePersistedStore, useStore } from '@store'

/**
 * @category Hooks
 * @interface
 */

/**
 * Props for the `useAlgorithmSettingsModal` hook.
 */
export type useAlgorithmSettingsModalHookParams = {
  /**
   * Function executed when closing the modal.
   */
  handleClose: () => void

  /**
   * Optional function executed when the algorithm is changed.
   */
  changeObserver?: () => void

  /**
   * Array of algorithm options, each containing the name, description, and key.
   */
  options: { name: string; description: string; key: string }[]

  /**
   * The ID of the topic, if available.
   */
  topicId?: number
}

/**
 * Custom hook to manage algorithm selection for learning paths within a course or topic.
 *
 * This hook provides logic for displaying algorithm options, tracking the currently
 * selected algorithm, and saving the user's choice to the backend for either a student
 * or a teacher (or both, if the user is a course creator).
 *
 * It centralizes state management and side-effects for algorithm settings modals,
 * reducing duplication and simplifying UI components.
 *
 * @param params - See {@link useAlgorithmSettingsModalHookParams}
 * @category Hooks
 *
 * @returns An object containing:
 * - `handleSave`: Persists the selected algorithm to the backend.
 * - `handleSelect`: Updates the selected algorithm option.
 * - `waitForBackend`: Whether a backend request is in progress.
 * - `selected`: Index of the currently selected algorithm.
 * - `studentAlgorithm`: The short name of the selected student algorithm.
 * - `teacherAlgorithm`: The short name of the selected teacher algorithm.
 *
 * @example
 * const {
 *   handleSave,
 *   handleSelect,
 *   waitForBackend,
 *   selected,
 *   studentAlgorithm,
 *   teacherAlgorithm
 * } = useAlgorithmSettingsModal({
 *   handleClose,
 *   options,
 *   topicId,
 *   changeObserver
 * });
 */
const useAlgorithmSettingsModal = (params: useAlgorithmSettingsModalHookParams) => {
  const { addSnackbar } = useContext(SnackbarContext)
  const getUser = usePersistedStore((state) => state.getUser)
  const setStudentLpLeAlgorithm = useStore((state) => state.setStudentLpLeAlgorithm)
  const setTeacherLpLeAlgorithm = useStore((state) => state.setTeacherLpLeAlgorithm)
  const [waitForBackend, setWaitForBackend] = useState(false)
  const clearLearningPathElementCache = useStore((state) => state.clearLearningPathElementCache)
  const getLearningPathElement = useStore((state) => state.getLearningPathElement)
  const { courseId } = useParams<{ courseId: string }>()
  const [selected, setSelected] = useState(0)
  const { isCourseCreatorRole, isStudentRole } = useContext(RoleContext)
  const getStudentAlgorithm = useStore((state) => state.getStudentLpLeAlgorithm)
  const getTeacherAlgorithm = useStore((state) => state.getTeacherLpLeAlgorithm)
  const [studentAlgorithm, setStudentAlgorithm] = useState<string | undefined>(undefined)
  const [teacherAlgorithm, setTeacherAlgorithm] = useState<string | undefined>(undefined)
  const { t } = useTranslation()

  /**
   * Saves the selected teacher algorithm for the given topic by posting to the backend.
   *
   * @param userId - The ID of the current user.
   * @param lmsUserId - The LMS-specific user ID.
   */
  const postTeacherAlgorithm = useCallback(
    (userId: number, lmsUserId: number) => {
      postTeacherLpLeAlg(userId, lmsUserId, params.topicId, params.options[selected].key)
        .then(() => {
          setTeacherLpLeAlgorithm(params.topicId, params.options[selected].key)
          addSnackbar({
            message: t('components.AlgorithmSettingsModal.success'),
            severity: 'success',
            autoHideDuration: 5000
          })
          if (params.changeObserver) params.changeObserver()
        })
        .catch((error) => {
          handleError(t, addSnackbar, 'error.postTeacherLpLeAlg', error, 5000)
          setWaitForBackend(false)
        })
    },
    [params.options, params.topicId]
  )

  /**
   * Saves the selected student algorithm for the given course and topic by posting to the backend.
   *
   * @param userId - The ID of the current user.
   * @param lmsUserId - The LMS-specific user ID.
   */
  const postStudentAlgorithm = useCallback(
    (userId: number, lmsUserId: number) => {
      postStudentLpLeAlg(userId, lmsUserId, courseId, params.topicId, params.options[selected].key)
        .then(() => {
          setStudentLpLeAlgorithm(userId, params.topicId, params.options[selected].key)
          // Fetch the new learning path then close the modal
          clearLearningPathElementCache()
          getLearningPathElement(userId, lmsUserId, userId, courseId, String(params.topicId))
            .then(() => {
              setWaitForBackend(false)
              addSnackbar({
                message: t('components.AlgorithmSettingsModal.success'),
                severity: 'success',
                autoHideDuration: 5000
              })
              params.handleClose()
            })
            .catch((error) => {
              handleError(t, addSnackbar, 'error.getLearningPathElement', error, 5000)
              setWaitForBackend(false)
            })
          if (params.changeObserver) params.changeObserver()
        })
        .catch((error) => {
          handleError(t, addSnackbar, 'error.postStudentLpLeAlg', error, 5000)
          setWaitForBackend(false)
        })
    },
    [params.handleClose, params.options, params.topicId]
  )

  /**
   * Handles saving the currently selected algorithm, choosing the correct backend call
   * depending on the user's role (student or course creator).
   */
  const handleSave = useCallback(() => {
    setWaitForBackend(true)
    getUser().then((user) => {
      if (isCourseCreatorRole) {
        postTeacherAlgorithm(user.settings.user_id, user.lms_user_id)
        postStudentAlgorithm(user.settings.user_id, user.lms_user_id)
      } else if (isStudentRole) {
        postStudentAlgorithm(user.settings.user_id, user.lms_user_id)
      } else {
        handleError(t, addSnackbar, 'components.AlgorithmSettingsModal.wrongRole', new Error('Wrong role'), 5000)
        params.handleClose()
      }
    })
  }, [params.handleClose, params.options, params.topicId])

  /**
   * Handles selecting a new algorithm option by updating the internal selected index.
   *
   * @param event - The change event from the option selector (e.g., radio button).
   */
  const handleSelect = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSelected(parseInt(event.target.value))
    },
    [setSelected]
  )

  useEffect(() => {
    getUser().then((user) => {
      getStudentAlgorithm(user.settings.user_id, params.topicId)
        .then((res) => {
          setStudentAlgorithm(res.short_name)
        })
        .catch((error) => {
          handleError(t, addSnackbar, 'error.fetchStudentLpLeAlg', error, 5000)
          setStudentAlgorithm(undefined)
        })
    })
    getTeacherAlgorithm(params.topicId)
      .then((res) => {
        setTeacherAlgorithm(res.short_name)
      })
      .catch((error) => {
        handleError(t, addSnackbar, 'error.fetchTeacherLpLeAlg', error, 5000)
        setTeacherAlgorithm(undefined)
      })
  }, [params])

  useEffect(() => {
    if (studentAlgorithm) {
      const newSelected = params.options.findIndex((option) => option.key === studentAlgorithm)
      setSelected(newSelected)
    }
  }, [studentAlgorithm])

  return {
    handleSave,
    handleSelect,
    waitForBackend,
    selected,
    studentAlgorithm,
    teacherAlgorithm
  } as const
}

export default useAlgorithmSettingsModal
