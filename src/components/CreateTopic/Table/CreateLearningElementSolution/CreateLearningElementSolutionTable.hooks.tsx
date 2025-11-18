import { useCallback, useMemo } from 'react'
import { RemoteLearningElementWithClassification, RemoteLearningElementWithSolution, Solution } from '@components'

type useCreateLearningElementSolutionTable = {
  learningElementsWithSolutions: { [key: number]: RemoteLearningElementWithSolution[] }
  selectedSolutions: { [key: number]: Solution[] }
  selectedLearningElementsClassification: { [key: number]: RemoteLearningElementWithClassification[] }
  onLearningElementSolutionChange: (selectedSolutions: { [key: number]: RemoteLearningElementWithSolution[] }) => void
}

export const useCreateLearningElementSolutionTable = ({
  learningElementsWithSolutions,
  selectedSolutions,
  selectedLearningElementsClassification,
  onLearningElementSolutionChange
}: useCreateLearningElementSolutionTable) => {
  const handleSolutionChange = useCallback(
    (topicId: number, elementId: number, solutionLmsId: number) => {
      const solutionLmsType = selectedLearningElementsClassification[topicId]?.find(
        (element) => element.lms_id === elementId
      )?.lms_activity_type
      const updatedLeElSolutions = {
        ...learningElementsWithSolutions,
        [topicId]: learningElementsWithSolutions[topicId].map((element) =>
          element.learningElementLmsId === elementId ? { ...element, solutionLmsId, solutionLmsType } : element
        )
      }
      onLearningElementSolutionChange(updatedLeElSolutions)
    },
    [learningElementsWithSolutions, onLearningElementSolutionChange]
  )

  const resetUnavailableSolutions = useCallback(
    (elementsWithSolutions: RemoteLearningElementWithSolution[], topicId: number) => {
      const topicSolutions = selectedSolutions[topicId]
      return elementsWithSolutions.map((element) =>
        topicSolutions.some((solution) => solution.solutionLmsId === element.solutionLmsId)
          ? element
          : { ...element, solutionLmsId: 0 }
      )
    },
    [selectedSolutions]
  )

  return useMemo(
    () => ({ handleSolutionChange, resetUnavailableSolutions }),
    [handleSolutionChange, resetUnavailableSolutions]
  )
}
