import { Dispatch, SetStateAction, useCallback, useMemo } from 'react'
import { RemoteLearningElement, RemoteTopics } from '@core'
import { Solution } from '../../Modal/CreateTopicModal/CreateTopicModal'

type useCreateTopicModalProps = {
  selectedLearningElements: { [p: number]: RemoteLearningElement[] }
  onLearningElementChange: (selectedLearningElements: { [key: number]: RemoteLearningElement[] }) => void
  selectedTopics: RemoteTopics[]
  setSelectAllLearningElementsChecked: Dispatch<SetStateAction<boolean>>
  selectedSolutions: { [key: number]: Solution[] }
  onSolutionChange: (selectedSolutions: { [key: number]: Solution[] }) => void
}

export const useCreateLearningElementTable = ({
  selectedLearningElements,
  onLearningElementChange,
  selectedTopics,
  setSelectAllLearningElementsChecked,
  selectedSolutions,
  onSolutionChange
}: useCreateTopicModalProps) => {
  const handleLearningElementCheckboxChange = (topicId: number, element: RemoteLearningElement, checked: boolean) => {
    const updatedSelectedElements = {
      ...selectedLearningElements,
      [topicId]: checked
        ? [...(selectedLearningElements[topicId] || []), element]
        : selectedLearningElements[topicId].filter((el) => el.lms_id !== element.lms_id)
    }

    onLearningElementChange(updatedSelectedElements)

    const updatedSolutions = {
      ...selectedSolutions,
      [topicId]: checked
        ? [...(selectedSolutions[topicId] || [])]
        : (selectedSolutions[topicId] || []).filter((solution) => solution.solutionLmsId !== element.lms_id)
    }

    onSolutionChange(updatedSolutions)
  }

  const handleSelectAllLearningElements = useCallback(() => {
    const allLearningElements = selectedTopics.reduce(
      (accumulator, topic) => ({
        ...accumulator,
        [topic.topic_lms_id]: topic.lms_learning_elements
      }),
      {} as { [key: number]: RemoteLearningElement[] }
    )

    onLearningElementChange(allLearningElements)
  }, [onLearningElementChange, selectedTopics])

  const handleDeselectAllLearningElements = useCallback(() => {
    const clearedElements = selectedTopics.reduce(
      (accumulator, topic) => ({
        ...accumulator,
        [topic.topic_lms_id]: []
      }),
      {} as { [key: number]: RemoteLearningElement[] }
    )

    onLearningElementChange(clearedElements)
  }, [onLearningElementChange, selectedTopics])

  const handleToggleAll = (isChecked: boolean) => {
    setSelectAllLearningElementsChecked(isChecked)
    if (isChecked) {
      handleSelectAllLearningElements()
    } else {
      handleDeselectAllLearningElements()
    }
  }

  return useMemo(
    () => ({
      handleLearningElementCheckboxChange,
      handleToggleAll
    }),
    [handleLearningElementCheckboxChange, handleToggleAll]
  )
}
