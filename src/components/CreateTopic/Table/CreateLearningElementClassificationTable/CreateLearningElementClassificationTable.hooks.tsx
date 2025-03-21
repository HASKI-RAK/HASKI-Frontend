import { useCallback, useMemo } from 'react'
import { LearningElementWithClassification } from '@components'
import { Solution } from '../../Modal/CreateTopicModal/CreateTopicModal'

type useCreateLearningElementClassificationTableProps = {
  LearningElementsClassification: { [key: number]: LearningElementWithClassification[] }
  selectedSolutions: { [key: number]: Solution[] }
  onSolutionChange: (selectedSolutions: { [key: number]: Solution[] }) => void
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
  const handleSolutionchange = (topicId: number, elementLmsId: number, lmsName: string, isChecked: boolean) => {
    const updatedSolutions = {
      ...selectedSolutions,
      [topicId]: isChecked
        ? [...(selectedSolutions[topicId] || []), { solutionLmsId: elementLmsId, solutionLmsName: lmsName }]
        : selectedSolutions[topicId].filter((solution) => solution.solutionLmsId !== elementLmsId)
    }
    const updatedClassification = {
      ...LearningElementsClassification,
      [topicId]: LearningElementsClassification[topicId].map((element) =>
        element.lms_id === elementLmsId ? { ...element, disabled: isChecked } : element
      )
    }
    onLearningElementChange(updatedClassification)
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
