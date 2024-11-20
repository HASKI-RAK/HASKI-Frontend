import { useCallback, useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { handleError } from '@components'
import { RoleContext, SnackbarContext, postStudentLpLeAlg, postTeacherLpLeAlg } from '@services'
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
  const clearLearningPathElementCache = useStore((state) => state.clearLearningPathElementCache)
  const getLearningPathElement = useStore((state) => state.getLearningPathElement)
  const { courseId } = useParams<{ courseId: string }>()
  const [selected, setSelected] = useState(0)
  const { isCourseCreatorRole, isStudentRole } = useContext(RoleContext)
  const getStudentAlgorithm = useStore((state) => state.getStudentLpLeAlgorithm)
  const getTeacherAlgorithm = useStore((state) => state.getTeacherLpLeAlgorithm)
  const [studentAlgorithm, setStudentAlgorithm] = useState<string | undefined>('')
  const [teacherAlgorithm, setTeacherAlgorithm] = useState<string | undefined>('')
  const { t } = useTranslation()

  const postTeacherAlgorithm = useCallback((userId: number, lmsUserId: number) => {
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
        addSnackbar({ message: error.message, severity: 'error', autoHideDuration: 5000 })
        setWaitForBackend(false)
      })
  }, [params.handleClose, params.options, params.topicId])

  const postStudentAlgorithm = useCallback((userId: number, lmsUserId: number) => {
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
  }, [params.handleClose, params.options, params.topicId])

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

  const getSelected = useCallback(() => {
    if (studentAlgorithm) {
      return params.options.findIndex((option) => option.key === studentAlgorithm)
    } else if (teacherAlgorithm) {
      return params.options.findIndex((option) => option.key === teacherAlgorithm)
    } else {
      return 0
    }
  }, [studentAlgorithm, params.options])

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
        .catch(() => {
          setStudentAlgorithm(undefined)
        })
    })
    getTeacherAlgorithm(params.topicId)
      .then((res) => {
        setTeacherAlgorithm(res.short_name)
      })
      .catch(() => {
        setTeacherAlgorithm(undefined)
      })
  }, [])

  useEffect(() => {
    const newSelected = getSelected()
    setSelected(newSelected)
  }, [studentAlgorithm])

  return { handleSave, handleSelect, waitForBackend, selected, studentAlgorithm, teacherAlgorithm } as const
}

export default useAlgorithmSettingsModal
