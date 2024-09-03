import { useCallback, useMemo } from 'react'
import { RemoteLearningElement, RemoteTopic } from '@core'

type useCreateTopicModalProps = {
  selectedLearningElements: { [p: number]: RemoteLearningElement[] }
  onLearningElementChange: (selectedLearningElements: { [key: number]: RemoteLearningElement[] }) => void
  selectedTopicsModal: RemoteTopic[]
}

export const useCreateLearningElementTable = ({
  selectedLearningElements,
  onLearningElementChange,
  selectedTopicsModal
}: useCreateTopicModalProps) => {
  const handleLearningElementCheckboxChange = (topicId: number, element: RemoteLearningElement, checked: boolean) => {
    const updatedSelectedElements = {
      ...selectedLearningElements,
      [topicId]: checked
        ? [...(selectedLearningElements[topicId] || []), element]
        : (selectedLearningElements[topicId] || []).filter((el) => el.lms_id !== element.lms_id)
    }

    onLearningElementChange(updatedSelectedElements)
  }

  const handleSelectAllLearningElements = useCallback(() => {
    const allLearningElements = selectedTopicsModal.reduce(
      (accumulator, topic) => ({
        ...accumulator,
        [topic.topic_lms_id]: topic.lms_learning_elements
      }),
      {} as { [key: number]: RemoteLearningElement[] }
    )

    onLearningElementChange(allLearningElements)
  }, [onLearningElementChange, selectedTopicsModal])

  const handleDeselectAllLearningElements = useCallback(() => {
    const clearedElements = selectedTopicsModal.reduce(
      (accumulator, topic) => ({
        ...accumulator,
        [topic.topic_lms_id]: []
      }),
      {} as { [key: number]: RemoteLearningElement[] }
    )

    onLearningElementChange(clearedElements)
  }, [onLearningElementChange, selectedTopicsModal])

  return useMemo(
    () => ({
      handleLearningElementCheckboxChange,
      handleSelectAllLearningElements,
      handleDeselectAllLearningElements
    }),
    [handleLearningElementCheckboxChange, handleSelectAllLearningElements, handleDeselectAllLearningElements]
  )
}
