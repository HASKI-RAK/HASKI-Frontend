import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { LearningElement, LearningElementRecommendation, LearningPathElementStatus } from '@core'
import { AuthContext } from '@services'
import { usePersistedStore, useStore } from '@store'

// todo
export const useRecommendation = () => {
  const { isAuth } = useContext(AuthContext)
  //! rerendered noch nicht, wenn ein modal geschlossen wird.

  const { courseId, topicId } = useParams()
  const getUser = usePersistedStore((state) => state.getUser)
  const getLearningElementRecommendation = useStore((state) => state.getLearningElementRecommendation)
  const getLearningPathElementStatus = usePersistedStore((state) => state.getLearningPathElementStatus)

  // TODO: State for list of recommendations
  const [recommendedLearningElement, setRecommendedLearningElement] = useState<LearningElement | null>(null)

  // TODO: Check if first item is already done
  // TODO: IF yes move to second item and repeat
  // TODO: First undone item will be returned?

  useEffect(() => {
    isAuth &&
      topicId &&
      courseId &&
      getUser() //? This much security needed? -> getUser doesnt return anything if not authenticated
        .then((user) => {
          getLearningPathElementStatus(courseId, user.lms_user_id).then((learningPathElementStatus) => {
            // Handle successful status retrieval
            console.log(learningPathElementStatus)
            getLearningElementRecommendation(user.id, parseInt(courseId), parseInt(topicId)).then(
              (learningElementRecommendation) => {
                // Handle successful recommendation retrieval
                console.log(learningElementRecommendation)
                learningElementRecommendation.find((recommendation) => {
                  const condition =
                    learningPathElementStatus.find((item) => item.cmid === recommendation.lms_id)?.state === 0
                  console.log(condition)
                  if (condition) {
                    // Found an undone recommendation
                    console.log('Found recommendation: ', recommendation)
                    setRecommendedLearningElement(recommendation)
                  }
                })
              }
            )
          })
        })
        .catch(() => {
          // Handle error
        })
  }, [
    getLearningPathElementStatus,
    courseId,
    getLearningElementRecommendation,
    topicId,
    setRecommendedLearningElement,
    getUser,
    isAuth
  ])

  return {
    recommendedLearningElement
  }
}

// TODO: Should return the currently recommended learning element

// Soll es jedes Mal blinken, wenn der Lernpfad neuangezeigt wird? Vielleicht
// Soll es jedes Mal blinken, wenn ein neues Element empfohlen wird? Ja!
