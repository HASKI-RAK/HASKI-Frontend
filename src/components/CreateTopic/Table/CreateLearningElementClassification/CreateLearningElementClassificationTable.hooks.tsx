import { useCallback, useMemo } from 'react'

import { LearningElementWithClassification } from '@components'

type useCreateLearningElementClassificationTableProps = {
  LearningElementsClassification: { [key: number]: LearningElementWithClassification[] }
  onLearningElementChange: (selectedLearningElements: { [key: number]: LearningElementWithClassification[] }) => void
}

export const useCreateLearningElementClassificationTable = ({
  LearningElementsClassification,
  onLearningElementChange
}: useCreateLearningElementClassificationTableProps) => {
  const handleClassificationChange = useCallback(
    (topicId: number, elementId: number, classificationKey: string) => {
      const updatedClassification = {
        ...LearningElementsClassification,
        [topicId]: LearningElementsClassification[topicId].map((element) =>
          element.lms_id === elementId ? { ...element, classification: classificationKey } : element
        )
      }
      onLearningElementChange(updatedClassification) // Call the prop function to update the parent component
    },
    [LearningElementsClassification, onLearningElementChange]
  )

  return useMemo(
    () => ({
      handleClassificationChange
    }),
    [handleClassificationChange]
  )
}
