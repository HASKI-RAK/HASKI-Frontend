import { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { handleError } from '@components'
import { LearningElement, LearningPathElementStatus } from '@core'
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

  /**
   * Updates the next recommended learning element for a student
   * based on their current progress in the topic and course.
   *
   * @param userId - The ID of the user.
   * @param courseId - The ID of the course.
   * @param topicId - The ID of the topic.
   * @param learningPathElementStatus - The student's current progress on learning elements within the topic and course.
   */
  const updateNextLearningElement = useCallback(
    (userId: number, courseId: string, topicId: string, learningPathElementStatus: LearningPathElementStatus[]) => {
      getLearningElementRecommendation(userId, courseId, topicId)
        .then((learningElementRecommendation) => {
          const nextLearningElement = learningElementRecommendation.find((recommendation) =>
            learningPathElementStatus.some((item) => item.cmid === recommendation.lms_id && item.state === 0)
          )
          setRecommendedLearningElement(nextLearningElement)
        })
        .catch((error) => {
          handleError(t, addSnackbar, 'error.getLearningElementRecommendation', error, 3000)
        })
    },
    [getLearningElementRecommendation, setRecommendedLearningElement, handleError, t, addSnackbar]
  )

  useEffect(() => {
    if (!isAuth || !isStudentRole || !topicId || !courseId) return

    getUser()
      .then((user) => {
        getLearningPathElementStatus(courseId, user.lms_user_id)
          .then((learningPathElementStatus) => {
            updateNextLearningElement(user.id, courseId, topicId, learningPathElementStatus)
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
