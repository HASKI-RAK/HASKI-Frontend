import log from 'loglevel'
import { useCallback, useContext, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { CreateAlgorithmTableNameProps, handleError } from '@components'
import { RemoteLearningElement, RemoteTopics, User } from '@core'
import {
  SnackbarContext,
  postAddAllStudentsToTopics,
  postCalculateLearningPathForAllStudents,
  postLearningElement,
  postLearningElementSolution,
  postLearningPathAlgorithm,
  postTopic,
} from '@services'
import { usePersistedStore } from '@store'
import { RemoteLearningElementWithClassification, RemoteLearningElementWithSolution, Solution } from './CreateTopicModal'

export type useCreateTopicModalProps = {
  setCreateTopicIsSending: React.Dispatch<React.SetStateAction<boolean>>
  setSelectedTopics: React.Dispatch<React.SetStateAction<RemoteTopics[]>>
  setSelectedLearningElements: React.Dispatch<React.SetStateAction<{ [p: number]: RemoteLearningElement[] }>>
  selectedLearningElementSolution: { [topicId: number]: RemoteLearningElementWithSolution[] }
  setSelectedLearningElementSolution: React.Dispatch<React.SetStateAction<{ [topicId: number]: RemoteLearningElementWithSolution[]}>>
  selectedSolutions: { [topicId: number]: Solution[] }
  setSelectedSolutions: React.Dispatch<React.SetStateAction<{ [topicId: number]: Solution[] }>>
  setSelectedLearningElementsClassification: React.Dispatch<
    React.SetStateAction<{ [p: number]: RemoteLearningElementWithClassification[] }>
  >
  setSelectedAlgorithms: React.Dispatch<React.SetStateAction<{ [p: number]: CreateAlgorithmTableNameProps }>>
  setSuccessfullyCreatedTopicsCount: React.Dispatch<React.SetStateAction<number>>
}

export const useCreateTopicModal = ({
  setCreateTopicIsSending,
  setSelectedTopics,
  setSelectedLearningElements,
  setSelectedLearningElementsClassification,
  selectedLearningElementSolution,
  setSelectedLearningElementSolution,
  setSelectedSolutions,
  setSelectedAlgorithms,
  setSuccessfullyCreatedTopicsCount
}: useCreateTopicModalProps) => {
  const { t } = useTranslation()
  const { addSnackbar } = useContext(SnackbarContext)
  const getUser = usePersistedStore((state) => state.getUser)

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

  const handleCreateSolutions = (learningElementLmsId: number, solutionLmsId: number) => {
    return postLearningElementSolution( {learningElementLmsId, solutionLmsId} )
  }

  const handleCreate = useCallback(
  (
    topicName: string,
    lmsCourseId: number,
    selectedLearningElementsClassification: { [key: number]: RemoteLearningElementWithClassification[] },
    algorithmShortName: string,
    courseId?: string
  ): Promise<void> => {
    if (!courseId) return Promise.resolve()
    return getUser()
      .then((user) => {
        return handleCreateTopics(topicName, lmsCourseId, courseId, user).then((topic) => {
          const topicLmsId = topic.lms_id
          const topicId = topic.id
          // Filter out disabled learning elements, that are used as solutions
          const filterdLearningElements = selectedLearningElementsClassification[topicLmsId].filter((element) => !element.disabled)
          setCreateTopicIsSending(true)

          // Step 1: Create learning elements
          return Promise.all(
            filterdLearningElements.map((element) =>
              handleCreateLearningElements(
                element.lms_learning_element_name,
                element.lms_activity_type,
                element.classification,
                element.lms_id,
                topic.id,
                user
              ).catch((error) => {
                addSnackbar({
                  message: t('error.postLearningElement') + ' ' + element.lms_learning_element_name,
                  severity: 'error',
                  autoHideDuration: 5000
                })
                log.error(t('error.postLearningElement') + '' + error + '' + element.lms_learning_element_name)
                throw error
              })
            )
          )
            .then(() => {
              // Step 2: Create solutions for learning elements
              const elementsWithSolution = Object.values(selectedLearningElementSolution)
                .flat()
                .filter((element) => element.solutionLmsId && element.solutionLmsId > 0)

              return Promise.all(
                elementsWithSolution.map((solution) =>
                  handleCreateSolutions(solution.learningElementLmsId, solution.solutionLmsId).catch((error) => {
                    addSnackbar({
                      message: t('error.postLearningElementSolution') + ' ' + solution.learningElementLmsId,
                      severity: 'error',
                      autoHideDuration: 5000,
                    })
                    log.error(
                      t('error.postLearningElementSolution') + '' + error + '' + solution.learningElementLmsId
                    )
                    throw error
                  })
                )
              )
            })
            .then(() => {
              // Step 3: Create algorithms and add students to topics
              return handleCreateAlgorithms(user.settings.user_id, user.lms_user_id, topic.id, algorithmShortName)
                .then(() => {
                  return handleAddAllStudentsToTopics(courseId)
                })
                .then(() => ({ topicId, user }))
            })
            .then(({ topicId, user }) => {
              // Step 4: Calculate learning paths
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
  ])

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
      setSelectedSolutions((solutions) =>
        Object.fromEntries(Object.entries(solutions).filter(([key]) => topicIds.includes(Number(key))))
      )
      setSelectedLearningElementSolution((learningElementSolution) =>
        Object.fromEntries(Object.entries(learningElementSolution).filter(([key]) => topicIds.includes(Number(key))))
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

  const handleSolutionsChange = (solutions: { [topicId: number]: Solution[] }) => {
    setSelectedSolutions(solutions)
  }

  const handleLearningElementSolutionChange = (learningElementSolution: { [topicId: number]: RemoteLearningElementWithSolution[]}) => {
    setSelectedLearningElementSolution(learningElementSolution)
  }

  const handleLearningElementClassification = (learningElementClassifications: {
    [key: number]: RemoteLearningElementWithClassification[]
  }) => {
    setSelectedLearningElementsClassification(learningElementClassifications)
  }

  const handleAlgorithmChange = useCallback(
    (algorithms: { [key: number]: CreateAlgorithmTableNameProps }) => {
      setSelectedAlgorithms(algorithms)
    },
    [setSelectedAlgorithms]
  )

  return useMemo(
    () => ({
      handleCreate,
      handleTopicChange,
      handleLearningElementChange,
      handleLearningElementClassification,
      handleLearningElementSolutionChange,
      handleSolutionsChange,
      handleAlgorithmChange
    }),
    [
      handleCreate,
      handleTopicChange,
      handleLearningElementChange,
      handleLearningElementClassification,
      handleLearningElementSolutionChange,
      handleSolutionsChange,
      handleAlgorithmChange
    ]
  )
}
