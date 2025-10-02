import { Dispatch, SetStateAction, useCallback, useContext, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import log from 'loglevel'
import {
  CreateAlgorithmTableNameProps,
  handleError,
  RemoteLearningElementWithClassification,
  RemoteLearningElementWithSolution,
  Solution
} from '@components'
import { RemoteLearningElement, RemoteTopics, User } from '@core'
import {
  postAddAllStudentsToTopics,
  postCalculateLearningPathForAllStudents,
  postLearningElement,
  postLearningElementSolution,
  postLearningPathAlgorithm,
  postTopic,
  SnackbarContext
} from '@services'
import { usePersistedStore, useStore } from '@store'

export type useCreateTopicModalProps = {
  setCreateTopicIsSending?: Dispatch<SetStateAction<boolean>>
  setSelectedTopics?: Dispatch<SetStateAction<RemoteTopics[]>>
  setSelectedLearningElements: Dispatch<SetStateAction<{ [p: number]: RemoteLearningElement[] }>>
  selectedLearningElementSolution: { [topicId: number]: RemoteLearningElementWithSolution[] }
  setSelectedLearningElementSolution: Dispatch<
    SetStateAction<{ [topicId: number]: RemoteLearningElementWithSolution[] }>
  >
  selectedSolutions: { [topicId: number]: Solution[] }
  setSelectedSolutions: Dispatch<SetStateAction<{ [topicId: number]: Solution[] }>>
  setSelectedLearningElementsClassification: Dispatch<
    SetStateAction<{ [p: number]: RemoteLearningElementWithClassification[] }>
  >
  setSelectedAlgorithms?: Dispatch<SetStateAction<{ [p: number]: CreateAlgorithmTableNameProps }>>
  setSuccessfullyCreatedTopicsCount?: Dispatch<SetStateAction<number>>
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

  const handleCreateSolutions = (learningElementLmsId: number, solutionLmsId: number, activityType: string) => {
    const outputJson = JSON.stringify({
      solution_lms_id: solutionLmsId,
      activity_type: activityType
    })
    return postLearningElementSolution({ learningElementLmsId, outputJson })
  }

  const handleCreateLearningElementsInExistingTopic = useCallback(
    async (
      topicLmsId: number,
      selectedLearningElementsClassification: { [key: number]: RemoteLearningElementWithClassification[] },
      topicId?: string,
      courseId?: string
    ): Promise<void> => {
      if (!topicId || !courseId) return

      return getUser()
        .then((user) => {
          const filteredLearningElements = selectedLearningElementsClassification[topicLmsId].filter(
            (element) => !element.disabled
          )
          return Promise.all(
            filteredLearningElements.map((element) =>
              handleCreateLearningElements(
                element.lms_learning_element_name,
                element.lms_activity_type,
                element.classification,
                element.lms_id,
                parseInt(topicId),
                user
              )
            )
          ).then(() => ({ user }))
        })
        .then(({ user }) => {
          return handleCalculateLearningPaths(
            user.settings.user_id,
            user.role,
            user.university,
            courseId,
            parseInt(topicId)
          )
        })
        .then(async () => {
          // Create solutions for learning elements
          const elementsWithSolution: RemoteLearningElementWithSolution[] = Object.values(
            selectedLearningElementSolution[topicLmsId] || []
          )
            .flat()
            .filter((element) => element.solutionLmsId && element.solutionLmsId > 0)
          if (elementsWithSolution.length === 0) {
            return Promise.resolve()
          }

          return Promise.all(
            elementsWithSolution.map((solution) =>
              handleCreateSolutions(
                solution.learningElementLmsId,
                solution.solutionLmsId,
                solution.solutionLmsType ?? 'resource'
              )
            )
          )
        })
        .catch((error) => {
          handleError(t, addSnackbar, 'error.postLearningElementSolution', error, 5000)
          //throw error to skip the next then block
          throw error
        })
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
    async (
      topicName: string,
      lmsCourseId: number,
      selectedLearningElementsClassification: { [key: number]: RemoteLearningElementWithClassification[] },
      algorithmShortName: string,
      courseId?: string
    ): Promise<void> => {
      if (!courseId) return

      await getUser()
        .then((user) => handleCreateTopics(topicName, lmsCourseId, courseId, user).then((topic) => ({ user, topic })))
        .then(async ({ user, topic }) => {
          const topicLmsId = topic.lms_id
          const topicId = topic.id

          const filtered = (selectedLearningElementsClassification[topicLmsId] ?? []).filter((e) => !e.disabled)

          await Promise.all(
            filtered.map((el) =>
              handleCreateLearningElements(
                el.lms_learning_element_name,
                el.lms_activity_type,
                el.classification,
                el.lms_id,
                topicId,
                user
              ).catch((error) => {
                addSnackbar({
                  message: t('error.postLearningElement') + ' ' + el.lms_learning_element_name,
                  severity: 'error',
                  autoHideDuration: 5000
                })
                log.error(t('error.postLearningElement') + '' + error + '' + el.lms_learning_element_name)
                throw error
              })
            )
          )
          return { user, topicId, topicLmsId }
        })
        .then(({ user, topicId, topicLmsId }) =>
          handleCreateAlgorithms(user.settings.user_id, user.lms_user_id, topicId, algorithmShortName)
            .then(() => handleAddAllStudentsToTopics(courseId))
            .catch((error) => {
              // swallow algo/add-students errors (like before)
              handleError(t, addSnackbar, 'error.postLearningPathAlgorithm', error, 5000)
            })
            .then(() => ({ user, topicId, topicLmsId }))
        )
        .then(({ user, topicId, topicLmsId }) =>
          handleCalculateLearningPaths(user.settings.user_id, user.role, user.university, courseId, topicId)
            .then(() => {
              addSnackbar({
                message: t('appGlobal.dataSendSuccessful'),
                severity: 'success',
                autoHideDuration: 5000
              })
              log.info(t('appGlobal.dataSendSuccessful'))
              setSuccessfullyCreatedTopicsCount?.((prev) => prev + 1)
            })
            .catch((error) => {
              // swallow calculate errors (like before)
              handleError(t, addSnackbar, 'error.postCalculateLearningPathForAllStudents', error, 5000)
            })
            .then(() => ({ topicLmsId }))
        )
        .then(({ topicLmsId }) => {
          const elementsWithSolution = Object.values(selectedLearningElementSolution[topicLmsId] || [])
            .flat()
            .filter((e) => e.solutionLmsId && e.solutionLmsId > 0)

          if (elementsWithSolution.length === 0) return

          return Promise.all(
            elementsWithSolution.map((s) =>
              handleCreateSolutions(s.learningElementLmsId, s.solutionLmsId, s.solutionLmsType ?? 'resource').catch(
                (error) => {
                  // per-solution error is handled, chain continues
                  handleError(
                    t,
                    addSnackbar,
                    'error.postLearningElementSolution',
                    error + ' Learning Element Lms_Id = ' + s.learningElementLmsId,
                    5000
                  )
                }
              )
            )
          )
        })
        .catch((error) => {
          // outer failure (getUser/postTopic/LE creation rethrow)
          handleError(t, addSnackbar, 'error.postTopic', error, 5000)
          setCreateTopicIsSending?.(false)
        })
    },
    [
      getUser,
      handleCreateTopics,
      handleCreateLearningElements,
      handleCreateAlgorithms,
      handleAddAllStudentsToTopics,
      handleCalculateLearningPaths,
      handleCreateSolutions,
      selectedLearningElementSolution,
      setSuccessfullyCreatedTopicsCount,
      setCreateTopicIsSending,
      addSnackbar,
      t
    ]
  )

  const handleTopicChange = useCallback(
    (topics: RemoteTopics[]) => {
      const sortedTopics = topics.slice().sort((a, b) => a.topic_lms_id - b.topic_lms_id)
      setSelectedTopics?.(sortedTopics)

      const topicIds = sortedTopics.map((topic) => topic.topic_lms_id)
      setSelectedLearningElements((elements) =>
        Object.fromEntries(Object.entries(elements).filter(([key]) => topicIds.includes(Number(key))))
      )
      setSelectedLearningElementsClassification((classifications) =>
        Object.fromEntries(Object.entries(classifications).filter(([key]) => topicIds.includes(Number(key))))
      )
      setSelectedAlgorithms?.((algorithms) =>
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

  const handleLearningElementSolutionChange = (learningElementSolution: {
    [topicId: number]: RemoteLearningElementWithSolution[]
  }) => {
    setSelectedLearningElementSolution(learningElementSolution)
  }

  const handleLearningElementClassification = (learningElementClassifications: {
    [key: number]: RemoteLearningElementWithClassification[]
  }) => {
    setSelectedLearningElementsClassification(learningElementClassifications)
  }

  const handleAlgorithmChange = useCallback(
    (algorithms: { [key: number]: CreateAlgorithmTableNameProps }) => {
      setSelectedAlgorithms?.(algorithms)
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
      handleLearningElementSolutionChange,
      handleSolutionsChange,
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
      handleLearningElementSolutionChange,
      handleSolutionsChange,
      handleAlgorithmChange
    ]
  )
}
