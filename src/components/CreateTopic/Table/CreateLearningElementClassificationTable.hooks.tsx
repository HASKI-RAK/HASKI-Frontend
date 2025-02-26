import { useCallback, useMemo } from 'react'
import { LearningElementWithClassification } from '@components'
import { on } from 'events'

type useCreateLearningElementClassificationTableProps = {
  LearningElementsClassification: { [key: number]: LearningElementWithClassification[] }
  selectedSolutions: { [key: number]: number[] }
  onSolutionChange: (selectedSolutions: { [key: number]: number[] }) => void
  onLearningElementChange: (selectedLearningElements: { [key: number]: LearningElementWithClassification[] }) => void
}

export const useCreateLearningElementClassificationTable = ({
  LearningElementsClassification,
  selectedSolutions,
  onLearningElementChange,
  onSolutionChange
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
  const handleSolutionchange = (topicId: number, elementId: number, isChecked: boolean) => {
    const updatedSolutions = {
      ...selectedSolutions,
      [topicId]: isChecked
        ? [...(selectedSolutions[topicId] || []), elementId]
        : selectedSolutions[topicId].filter((id) => id !== elementId)
    }
    onSolutionChange(updatedSolutions)
  }


  return useMemo(
    () => ({
      handleClassificationChange,
      handleSolutionchange
    }),
    [handleClassificationChange, handleSolutionchange]
  )
}
