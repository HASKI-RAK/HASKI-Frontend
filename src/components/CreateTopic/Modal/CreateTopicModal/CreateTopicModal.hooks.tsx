import { CreateAlgorithmTableNameProps, RemoteLearningElementWithClassification,handleError } from '@components'
import { RemoteLearningElement, RemoteTopics, User } from '@core'
import {
  SnackbarContext,
  postAddAllStudentsToTopics,  postCalculateLearningPathForAllStudents,  postLearningElement,  postLearningPathAlgorithm,  postTopic} from '@services'
import { usePersistedStore, useStore } from '@store'
import log from 'loglevel'
import { Dispatch, SetStateAction, useCallback, useContext, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

export type useCreateTopicModalProps = {
  setCreateTopicIsSending?: Dispatch<SetStateAction<boolean>>
  setSelectedTopics?: Dispatch<SetStateAction<RemoteTopics[]>>
  setSelectedLearningElements: Dispatch<SetStateAction<{ [p: number]: RemoteLearningElement[] }>>
  setSelectedLearningElementsClassification: Dispatch<
    SetStateAction<{ [p: number]: RemoteLearningElementWithClassification[] }>
  >
  setSelectedAlgorithms?: Dispatch<SetStateAction<{ [p: number]: CreateAlgorithmTableNameProps }>>
  setSuccessfullyCreatedTopicsCount?: Dispatch<SetStateAction<number>>
}

export const useCreateTopicModal = ({
  setCreateTopicIsSending = () => {
    return false
  },
  setSelectedTopics = () => {
    return []
  },
  setSelectedLearningElements,
  setSelectedLearningElementsClassification,
  setSelectedAlgorithms = () => {
    return {}
  },
  setSuccessfullyCreatedTopicsCount = () => {
    return 0
  }
}: useCreateTopicModalProps) => {
  const { t } = useTranslation()
  const { addSnackbar } = useContext(SnackbarContext)
  const getUser = usePersistedStore((state) => state.getUser)
  const clearLearningPathElement = useStore((state) => state.clearLearningPathElementCache)
  const clearLearningPathElementStatusCache = usePersistedStore((state) => state.clearLearningPathElementStatusCache)

  // Helper function for creating a topic
  const handleCreateTopics = (topicName: string, lmsCourseId: number, courseId: string, user: User) => {
    const date = new Date().toISOString().split('.')[0] + 'Z'
    const outputJson = JSON.stringify({
      name: topicName,
      lms_id: lmsCourseId,
      is_topic: true,
      contains_le: true,
      created_by: user.name,
      created_at: date,
      updated_at: date,
      university: user.university
    })
    return postTopic({ courseId, outputJson })
  }

  // Helper function for creating learning elements
  const handleCreateLearningElements = (
    learningElementName: string,
    learningElementActivityType: string,
    learningElementClassification: string,
    lmsLearningElementId: number,
    topicId: number,
    user: User
  ) => {
    const date = new Date().toISOString().split('.')[0] + 'Z'
    const outputJson = JSON.stringify({
      lms_id: lmsLearningElementId,
      activity_type: learningElementActivityType,
      classification: learningElementClassification,
      name: learningElementName,
      created_by: user.name,
      created_at: date,
      updated_at: date,
      university: user.university
    })
    return postLearningElement({ topicId, outputJson })
  }

  const handleAddAllStudentsToTopics = (courseId: string) => {
    return postAddAllStudentsToTopics(courseId)
  }

  const handleCreateAlgorithms = (userId: number, lmsUserId: number, topicId: number, algorithmShortname: string) => {
    const outputJson = JSON.stringify({ algorithm_short_name: algorithmShortname })
    return postLearningPathAlgorithm({ userId, lmsUserId, topicId, outputJson })
  }

  const handleCalculateLearningPaths = (
    userId: number,
    userRole: string,
    university: string,
    courseId: string,
    topicId: number
  ) => {
    const outputJson = JSON.stringify({ university, role: userRole })
    return postCalculateLearningPathForAllStudents({ userId, courseId, topicId, outputJson })
  }

  const handleCreateLearningElementsInExistingTopic = useCallback(
    async (
      topicLmsId: number,
      selectedLearningElementsClassification: { [key: number]: RemoteLearningElementWithClassification[] },
      topicId?: string,
      courseId?: string
    ): Promise<void> => {
      if (!topicId || !courseId) return Promise.resolve()

      return getUser()
        .then((user) =>
          Promise.all(
            selectedLearningElementsClassification[topicLmsId].map((element) =>
              handleCreateLearningElements(
                element.lms_learning_element_name,
                element.lms_activity_type,
                element.classification,
                element.lms_id,
                parseInt(topicId),
                user
              )
            )
          ).then(() => user)
        )
        .then((user) =>
          handleCalculateLearningPaths(user.settings.user_id, user.role, user.university, courseId, parseInt(topicId))
        )
        .then(() => {
          clearLearningPathElement()
          clearLearningPathElementStatusCache()
          addSnackbar({
            message: t('appGlobal.dataSendSuccessful'),
            severity: 'success',
            autoHideDuration: 5000
          })
        })
        .catch((error) => {
          handleError(t, addSnackbar, 'error.postCalculateLearningPathForAllStudents', error, 5000)
        })
    },
    [getUser, handleCreateLearningElements, handleCalculateLearningPaths, addSnackbar, t]
  )

  const handleCreate = useCallback(
    (
      topicName: string,
      lmsCourseId: number,
      selectedLearningElementsClassification: { [key: number]: RemoteLearningElementWithClassification[] },
      algorithmShortName: string,
      courseId?: string
    ) => {
      if (!courseId) return
      return getUser()
        .then((user) => {
          return handleCreateTopics(topicName, lmsCourseId, courseId, user)
            .then((topic) => {
              const topicLmsId = topic.lms_id
              const topicId = topic.id
              setCreateTopicIsSending(true)

              return Promise.all(
                selectedLearningElementsClassification[topicLmsId].map((element) =>
                  handleCreateLearningElements(
                    element.lms_learning_element_name,
                    element.lms_activity_type,
                    element.classification,
                    element.lms_id,
                    topicId,
                    user
                  )
                )
              ).then(() => ({ topicId, user }))
            })
            .then(({ topicId, user }) => {
              return handleCreateAlgorithms(user.settings.user_id, user.lms_user_id, topicId, algorithmShortName)
                .then(() => {
                  return handleAddAllStudentsToTopics(courseId)
                })
                .then(() => ({ topicId, user }))
            })
            .then(({ topicId, user }) => {
              return handleCalculateLearningPaths(
                user.settings.user_id,
                user.role,
                user.university,
                courseId,
                topicId
              ).then(() => {
                addSnackbar({
                  message: t('appGlobal.dataSendSuccessful'),
                  severity: 'success',
                  autoHideDuration: 5000
                })
                log.info(t('appGlobal.dataSendSuccessful'))
                setSuccessfullyCreatedTopicsCount((prevCount) => prevCount + 1)
              })
            })
            .catch((error) => {
              handleError(t, addSnackbar, 'error.postCalculateLearningPathForAllStudents', error, 5000)
            })
        })
        .catch((error) => {
          handleError(t, addSnackbar, 'error.postLearningPathAlgorithm', error, 5000)
        })
    },
    [
      getUser,
      handleCreateTopics,
      handleCreateLearningElements,
      handleCreateAlgorithms,
      handleCalculateLearningPaths,
      addSnackbar,
      t,
      setCreateTopicIsSending
    ]
  )

  const handleTopicChange = useCallback(
    (topics: RemoteTopics[]) => {
      const sortedTopics = topics.slice().sort((a, b) => a.topic_lms_id - b.topic_lms_id)
      setSelectedTopics(sortedTopics)

      const topicIds = sortedTopics.map((topic) => topic.topic_lms_id)
      setSelectedLearningElements((elements) =>
        Object.fromEntries(Object.entries(elements).filter(([key]) => topicIds.includes(Number(key))))
      )
      setSelectedLearningElementsClassification((classifications) =>
        Object.fromEntries(Object.entries(classifications).filter(([key]) => topicIds.includes(Number(key))))
      )
      setSelectedAlgorithms((algorithms) =>
        Object.fromEntries(Object.entries(algorithms).filter(([key]) => topicIds.includes(Number(key))))
      )
    },
    [setSelectedTopics, setSelectedLearningElements, setSelectedLearningElementsClassification, setSelectedAlgorithms]
  )

  const handleLearningElementChange = useCallback(
    (learningElements: { [key: number]: RemoteLearningElement[] }) => {
      setSelectedLearningElements(learningElements)
    },
    [setSelectedLearningElements]
  )

  const handleLearningElementClassification = useCallback(
    (learningElementClassifications: { [key: number]: RemoteLearningElementWithClassification[] }) => {
      setSelectedLearningElementsClassification(learningElementClassifications)
    },
    [setSelectedLearningElementsClassification]
  )

  const handleAlgorithmChange = useCallback(
    (algorithms: { [key: number]: CreateAlgorithmTableNameProps }) => {
      setSelectedAlgorithms(algorithms)
    },
    [setSelectedAlgorithms]
  )

  return useMemo(
    () => ({
      handleCreateLearningElementsInExistingTopic,
      handleCreate,
      handleCreateLearningElements,
      handleCalculateLearningPaths,
      handleTopicChange,
      handleLearningElementChange,
      handleLearningElementClassification,
      handleAlgorithmChange
    }),
    [
      handleCreateLearningElementsInExistingTopic,
      handleCreate,
      handleCreateLearningElements,
      handleCalculateLearningPaths,
      handleTopicChange,
      handleLearningElementChange,
      handleLearningElementClassification,
      handleAlgorithmChange
    ]
  )
}
