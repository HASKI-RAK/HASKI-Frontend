import { useCallback, useMemo } from 'react'
import { RemoteLearningElement, RemoteTopic } from '@core'

type useCreateTopicModalProps = {
  selectedLearningElements: { [p: number]: RemoteLearningElement[] }
  onLearningElementChange: (selectedLearningElements: { [key: number]: RemoteLearningElement[] }) => void
  selectedTopics: RemoteTopic[]
}

export const useCreateLearningElementTable = ({
  selectedLearningElements,
  onLearningElementChange,
  selectedTopics
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

  return useMemo(
    () => ({
      handleLearningElementCheckboxChange,
      handleSelectAllLearningElements,
      handleDeselectAllLearningElements
    }),
    [handleLearningElementCheckboxChange, handleSelectAllLearningElements, handleDeselectAllLearningElements]
  )
}
