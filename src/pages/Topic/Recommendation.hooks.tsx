import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { handleError } from '@components'
import { LearningElement } from '@core'
import { usePersistedStore, useStore } from '@store'

// todo docs
export type LearningElementRecommendationHookReturn = {
  recommendedLearningElement?: LearningElement
}

// todo docs
export const useLearningElementRecommendation = (): LearningElementRecommendationHookReturn => {
  // Params
  const { courseId, topicId } = useParams()

  // Store
  const getUser = usePersistedStore((state) => state.getUser)
  const getLearningPathElementStatus = usePersistedStore((state) => state.getLearningPathElementStatus)
  const getLearningElementRecommendation = useStore((state) => state.getLearningElementRecommendation)
  const learningElementRecommendation = useStore((state) => state._learningElementRecommendation)

  // State
  const [recommendedLearningElement, setRecommendedLearningElement] = useState<LearningElement | undefined>()

  useEffect(() => {
    topicId &&
      courseId &&
      getUser()
        .then((user) => {
          getLearningPathElementStatus(courseId, user.lms_user_id).then((learningPathElementStatus) => {
            getLearningElementRecommendation(user.id, courseId, topicId).then((learningElementRecommendation) => {
              learningElementRecommendation.find((recommendation) => {
                if (learningPathElementStatus.find((item) => item.cmid === recommendation.lms_id)?.state === 0) {
                  setRecommendedLearningElement(recommendation)
                }
              })
            })
          })
        })
        .catch(() => {
          // todo error handling -> import function
          // handleError({}, () => void, '', '', 3000)
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
