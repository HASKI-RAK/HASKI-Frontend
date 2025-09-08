import { useContext, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { handleError } from '@components'
import { LearningElement } from '@core'
import { AuthContext, RoleContext, SnackbarContext } from '@services'
import { usePersistedStore, useStore } from '@store'

/**
 * Return type for the {@link useLearningElementRecommendation} hook.
 */
export type LearningElementRecommendationHookReturn = {
  /**
   * The currently recommended learning element for a student in a topic and course.
   */
  recommendedLearningElement?: LearningElement
}

/**
 * Hook for retrieving and processing the recommended learning element for a student in a topic and course.
 *
 * This hook fetches the recommended learning elements for a student and determines the next undone learning element to be recommended.
 *
 * @category Hooks
 *
 * @returns See {@link LearningElementRecommendationHookReturn}.
 *
 * @example
 * ```tsx
 * const { recommendedLearningElement } = useLearningElementRecommendation()
 * ```
 */
export const useLearningElementRecommendation = (): LearningElementRecommendationHookReturn => {
  // Hooks
  const { courseId, topicId } = useParams()
  const { t } = useTranslation()

  // Contexts
  const { isAuth } = useContext(AuthContext)
  const { isStudentRole } = useContext(RoleContext)
  const { addSnackbar } = useContext(SnackbarContext)

  // Store
  const getUser = usePersistedStore((state) => state.getUser)
  const getLearningPathElementStatus = usePersistedStore((state) => state.getLearningPathElementStatus)
  const getLearningElementRecommendation = useStore((state) => state.getLearningElementRecommendation)
  const learningElementRecommendation = useStore((state) => state._learningElementRecommendationCache)

  // State
  const [recommendedLearningElement, setRecommendedLearningElement] = useState<LearningElement | undefined>()

  useEffect(() => {
    if (!isAuth) return

    isStudentRole &&
      topicId &&
      courseId &&
      getUser()
        .then((user) => {
          getLearningPathElementStatus(courseId, user.lms_user_id)
            .then((learningPathElementStatus) => {
              getLearningElementRecommendation(user.id, courseId, topicId)
                .then((learningElementRecommendation) => {
                  learningElementRecommendation.find((recommendation) => {
                    if (learningPathElementStatus.find((item) => item.cmid === recommendation.lms_id)?.state === 0) {
                      setRecommendedLearningElement(recommendation)
                    }
                  })
                })
                .catch((error) => {
                  handleError(t, addSnackbar, 'error.getLearningElementRecommendation', error, 3000)
                })
            })
            .catch((error) => {
              handleError(t, addSnackbar, 'error.getLearningPathElementStatus', error, 3000)
            })
        })
        .catch((error) => {
          handleError(t, addSnackbar, 'error.getUser', error, 3000)
        })
  }, [
    topicId,
    courseId,
    getUser,
    getLearningPathElementStatus,
    getLearningElementRecommendation,
    setRecommendedLearningElement,
    learningElementRecommendation
  ])

  return useMemo(
    () => ({
      recommendedLearningElement
    }),
    [recommendedLearningElement]
  )
}
