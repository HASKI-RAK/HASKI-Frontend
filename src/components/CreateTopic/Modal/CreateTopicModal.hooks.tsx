import log from 'loglevel'
import React, { useContext, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { CreateAlgorithmTableNameProps } from '@components'
import { RemoteLearningElement, RemoteTopic, User } from '@core'
import {
  SnackbarContext,
  postCalculateLearningPathForAllStudents,
  postLearningElement,
  postLearningElementSolution,
  postLearningPathAlgorithm,
  postTopic,
} from '@services'
import { usePersistedStore } from '@store'
import { RemoteLearningElementWithClassification, RemoteLearningElementWithSolution, Solution } from './CreateTopicModal'

type useCreateTopicModalProps = {
  setCreateTopicIsSending: React.Dispatch<React.SetStateAction<boolean>>
  setSuccessTopicCreated: React.Dispatch<React.SetStateAction<boolean>>
  setSelectedTopics: React.Dispatch<React.SetStateAction<RemoteTopic[]>>
  selectedLearningElements: { [p: number]: RemoteLearningElement[] }
  setSelectedLearningElements: React.Dispatch<React.SetStateAction<{ [p: number]: RemoteLearningElement[] }>>
  selectedLearningElementsClassification: { [p: number]: RemoteLearningElementWithClassification[] }
  selectedLearningElementSolution: { [topicId: number]: RemoteLearningElementWithSolution[] }
  setSelectedLearningElementSolution: React.Dispatch<React.SetStateAction<{ [topicId: number]: RemoteLearningElementWithSolution[]}>>
  selectedSolutions: { [topicId: number]: Solution[] }
  setSelectedSolutions: React.Dispatch<React.SetStateAction<{ [topicId: number]: Solution[] }>>
  setSelectedLearningElementsClassification: React.Dispatch<
    React.SetStateAction<{ [p: number]: RemoteLearningElementWithClassification[] }>
  >
  selectedAlgorithms: { [p: number]: CreateAlgorithmTableNameProps[] }
  setSelectedAlgorithms: React.Dispatch<React.SetStateAction<{ [p: number]: CreateAlgorithmTableNameProps[] }>>
}

export const useCreateTopicModal = ({
  setCreateTopicIsSending,
  setSuccessTopicCreated,
  setSelectedTopics,
  selectedLearningElements,
  setSelectedLearningElements,
  selectedLearningElementsClassification,
  setSelectedLearningElementsClassification,
  selectedLearningElementSolution,
  setSelectedLearningElementSolution,
  selectedSolutions,
  setSelectedSolutions,
  selectedAlgorithms,
  setSelectedAlgorithms
}: useCreateTopicModalProps) => {
  //Hooks
  const { t } = useTranslation()
  const { addSnackbar } = useContext(SnackbarContext)

  //States
  const getUser = usePersistedStore((state) => state.getUser)

  const handleCreateTopics = (topicName: string, lmsCourseId: number, courseId: string, user: User) => {
    const date = new Date()
    const outputJson: string = JSON.stringify({
      name: topicName,
      lms_id: lmsCourseId,
      is_topic: true,
      contains_le: true,
      created_by: user.name,
      created_at: date.toISOString().split('.')[0] + 'Z',
      updated_at: date.toISOString().split('.')[0] + 'Z',
      university: user.university
    })
    return postTopic({ courseId, outputJson })
  }

  const handleCreateLearningElements = (
    learningElementName: string,
    learningElementActivityType: string,
    learningElementClassification: string,
    lmsLearningElementId: number,
    topicId: number,
    user: User
  ) => {
    const date = new Date()
    const outputJson: string = JSON.stringify({
      lms_id: lmsLearningElementId,
      activity_type: learningElementActivityType,
      classification: learningElementClassification,
      name: learningElementName,
      created_by: user.name,
      created_at: date.toISOString().split('.')[0] + 'Z',
      updated_at: date.toISOString().split('.')[0] + 'Z',
      university: user.university
    })
    return postLearningElement({ topicId, outputJson })
  }

  const handleCreateAlgorithms = (userId: number, lmsUserId: number, topicId: number, algorithmShortname: string) => {
    const outputJson: string = JSON.stringify({
      algorithm_short_name: algorithmShortname
    })
    return postLearningPathAlgorithm({ userId, lmsUserId, topicId, outputJson })
  }

  const handleCalculateLearningPaths = (
    userId: number,
    userRole: string,
    university: string,
    courseId: string,
    topicId: number
  ) => {
    const outputJson: string = JSON.stringify({
      university: university,
      role: userRole
    })

    return postCalculateLearningPathForAllStudents({ userId, courseId, topicId, outputJson })
  }

  const handleCreateSolutions = (learningElementId: number, solutionLmsId: number) => {
    return postLearningElementSolution( {learningElementId, solutionLmsId} )
  }

  const handleCreate = (
    topicName: string,
    lmsCourseId: number,
    selectedLearningElementsClassification: { [key: number]: RemoteLearningElementWithClassification[] },
    algorithmShortName: string,
    courseId?: string
  ): Promise<void> => {
    if (courseId == undefined) return Promise.resolve()
    return getUser()
      .then((user) => {
        return handleCreateTopics(topicName, lmsCourseId, courseId, user).then((topic) => {
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
              return handleCreateAlgorithms(user.settings.user_id, user.lms_user_id, topic.id, algorithmShortName)
                .then(() => {
                  handleCalculateLearningPaths(
                    user.settings.user_id,
                    user.role,
                    user.university,
                    courseId,
                    topicId
                  ).then((response) => {
                    if (response) {
                      addSnackbar({
                        message: t('appGlobal.dataSendSuccessful'),
                        severity: 'success',
                        autoHideDuration: 5000
                      })
                      log.info(t('appGlobal.dataSendSuccessful'))
                      setCreateTopicIsSending(false)
                      setSuccessTopicCreated(true)
                    } else {
                      addSnackbar({
                        message: t('error.postCalculateLearningPathForAllStudents'),
                        severity: 'error',
                        autoHideDuration: 5000
                      })
                      log.error(t('error.postCalculateLearningPathForAllStudents'))
                      setSuccessTopicCreated(false)
                      setCreateTopicIsSending(false)
                    }
                  })
                })
                .catch((error) => {
                  addSnackbar({
                    message: t('error.postLearningPathAlgorithm'),
                    severity: 'error',
                    autoHideDuration: 5000
                  })
                  log.error(t('error.postLearningPathAlgorithm') + '' + error)
                })
            })
            .catch((error) => {
              addSnackbar({
                message: t('error.postTopic'),
                severity: 'error',
                autoHideDuration: 5000
              })
              log.error(t('error.postTopic') + '' + error)
            })
        })
      })
      .catch((error) => {
        addSnackbar({
          message: t('error.getUser'),
          severity: 'error',
          autoHideDuration: 3000
        })
        log.error(t('error.getUser') + '' + error)
      })
  }

  const handleTopicChange = (topics: RemoteTopic[]) => {
    const sortedTopics = [...topics].sort((a, b) => a.topic_lms_id - b.topic_lms_id)
    setSelectedTopics(sortedTopics)

    const topicIds = sortedTopics.map((topic) => topic.topic_lms_id)

    // Filter selectedLearningElements to only include keys that are in topicIds
    const filteredLearningElements = Object.fromEntries(
      Object.entries(selectedLearningElements).filter(([topicId]) => topicIds.includes(parseInt(topicId)))
    )
    setSelectedLearningElements(filteredLearningElements)

    // Filter Solutions to only include keys that are in topicIds
    const filteredSolutions = Object.fromEntries(
      Object.entries(selectedSolutions).filter(([topicId]) => topicIds.includes(parseInt(topicId)))
    )
    setSelectedSolutions(filteredSolutions)
    // Filter selectedLearningElementSolution to only include keys that are in topicIds
    const filteredLearningElementSolution = Object.fromEntries(
      Object.entries(selectedLearningElementSolution).filter(([topicId]) => topicIds.includes(parseInt(topicId)))
    )
    setSelectedLearningElementSolution(filteredLearningElementSolution)

    // Filter selectedLearningElementClassifications to only include keys that are in topicIds
    const filteredLearningElementClassifications = Object.fromEntries(
      Object.entries(selectedLearningElementsClassification).filter(([topicId]) => topicIds.includes(parseInt(topicId)))
    )
    setSelectedLearningElementsClassification(filteredLearningElementClassifications)

    // Filter selectedAlgorithms to only include keys that are in topicIds
    const filteredAlgorithms = Object.fromEntries(
      Object.entries(selectedAlgorithms).filter(([topicId]) => topicIds.includes(parseInt(topicId)))
    )
    setSelectedAlgorithms(filteredAlgorithms)
  }

  const handleLearningElementChange = (learningElements: { [key: number]: RemoteLearningElement[] }) => {
    setSelectedLearningElements(learningElements)
  }

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

  const handleAlgorithmChange = (algorithms: { [key: number]: CreateAlgorithmTableNameProps[] }) => {
    setSelectedAlgorithms(algorithms)
  }

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
