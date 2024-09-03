import log from 'loglevel'
import React, { useContext, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { CreateAlgorithmTableNameProps } from '@components'
import { RemoteLearningElement, RemoteTopic, User } from '@core'
import {
  SnackbarContext,
  postCalculateLearningPathForAllStudents,
  postLearningElement,
  postLearningPathAlgorithm,
  postTopic
} from '@services'
import { usePersistedStore } from '@store'
import { LearningElementWithClassification } from './CreateTopicModal'

type useCreateTopicModalProps = {
  setIsSending: React.Dispatch<React.SetStateAction<boolean>>
  setSuccessTopicCreated: React.Dispatch<React.SetStateAction<boolean>>
  setSelectedTopics: React.Dispatch<React.SetStateAction<RemoteTopic[]>>
  selectedLearningElements: { [p: number]: RemoteLearningElement[] }
  setSelectedLearningElements: React.Dispatch<React.SetStateAction<{ [p: number]: RemoteLearningElement[] }>>
  selectedLearningElementsClassification: { [p: number]: LearningElementWithClassification[] }
  setSelectedLearningElementsClassification: React.Dispatch<
    React.SetStateAction<{ [p: number]: LearningElementWithClassification[] }>
  >
  selectedAlgorithms: { [p: number]: CreateAlgorithmTableNameProps[] }
  setSelectedAlgorithms: React.Dispatch<React.SetStateAction<{ [p: number]: CreateAlgorithmTableNameProps[] }>>
}

export const useCreateTopicModal = ({
  setIsSending,
  setSuccessTopicCreated,
  setSelectedTopics,
  selectedLearningElements,
  setSelectedLearningElements,
  selectedLearningElementsClassification,
  setSelectedLearningElementsClassification,
  selectedAlgorithms,
  setSelectedAlgorithms
}: useCreateTopicModalProps) => {
  const { addSnackbar } = useContext(SnackbarContext)
  const { t } = useTranslation()

  //Hooks
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

  const handleCreateAlgorithms = (userId: number, topicId: number, algorithmShortname: string) => {
    const outputJson: string = JSON.stringify({
      algorithm_s_name: algorithmShortname
    })
    return postLearningPathAlgorithm({ userId, topicId, outputJson })
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

  const handleCreate = (
    topicName: string,
    lmsCourseId: number,
    selectedLearningElementsClassification: { [key: number]: LearningElementWithClassification[] },
    algorithmShortName: string,
    courseId?: string
  ) => {
    if (courseId == undefined) return
    getUser()
      .then((user) => {
        handleCreateTopics(topicName, lmsCourseId, courseId, user).then((topic) => {
          const topicLmsId = topic.lms_id
          const topicId = topic.id
          setIsSending(true)
          Promise.all(
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
              handleCreateAlgorithms(user.settings.user_id, topic.id, algorithmShortName)
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
                      setSuccessTopicCreated(true)
                      setIsSending(false)
                    } else {
                      addSnackbar({
                        message: t('error.postCalculateLearningPathForAllStudents'),
                        severity: 'error',
                        autoHideDuration: 5000
                      })
                      log.error(t('error.postCalculateLearningPathForAllStudents'))
                      setSuccessTopicCreated(false)
                      setIsSending(false)
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
    setSelectedTopics(topics)

    const topicIds = topics.map((topic) => topic.topic_lms_id)
    // selectedLearningElements where the topic is not selected anymore

    // Remove all selectedLearningElements when Topic is deselected
    const selectedLearningElementKeysNotInTopics = Object.keys(selectedLearningElements).filter(
      (topicId) => !topicIds.includes(parseInt(topicId))
    )
    selectedLearningElementKeysNotInTopics.forEach((topicId) => {
      delete selectedLearningElements[parseInt(topicId)]
    })

    // Remove all selectedLearningElementClassifications when Topic is deselected
    const selectedLearningElementClassificationKeysNotInTopics = Object.keys(
      selectedLearningElementsClassification
    ).filter((topicId) => !topicIds.includes(parseInt(topicId)))
    selectedLearningElementClassificationKeysNotInTopics.forEach((topicId) => {
      delete selectedLearningElementsClassification[parseInt(topicId)]
    })

    // Remove all selectedAlgorithms when Topic is deselected
    const selectedAlgorithmKeysNotInTopics = Object.keys(selectedAlgorithms).filter(
      (topicId) => !topicIds.includes(parseInt(topicId))
    )
    selectedAlgorithmKeysNotInTopics.forEach((topicId) => {
      delete selectedAlgorithms[parseInt(topicId)]
    })
  }

  const handleLearningElementChange = (learningElements: { [key: number]: RemoteLearningElement[] }) => {
    setSelectedLearningElements(learningElements)
  }

  const handleLearningElementClassification = (learningElementClassifications: {
    [key: number]: LearningElementWithClassification[]
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
      handleAlgorithmChange
    }),
    [
      handleCreate,
      handleTopicChange,
      handleLearningElementChange,
      handleLearningElementClassification,
      handleAlgorithmChange
    ]
  )
}
