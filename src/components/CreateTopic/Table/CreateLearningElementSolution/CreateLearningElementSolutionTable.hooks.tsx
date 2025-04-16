import { useCallback, useMemo } from 'react'
import { RemoteLearningElementWithSolution, Solution } from '../../Modal/CreateTopicModal/CreateTopicModal'

type useCreateLearningElementSolutionTable = {
  learningElementsWithSolutions: { [key: number]: RemoteLearningElementWithSolution[] }
  selectedSolutions: { [key: number]: Solution[] }
  onLearningElementSolutionChange: (selectedSolutions: { [key: number]: RemoteLearningElementWithSolution[] }) => void
}

export const useCreateLearningElementSolutionTable = ({
  learningElementsWithSolutions,
  selectedSolutions,
  onLearningElementSolutionChange
}: useCreateLearningElementSolutionTable) => {
  const handleSolutionChange = useCallback(
    (topicId: number, elementId: number, solutionLmsId: number, solutionLmsType: string | undefined) => {
      const updatedLeElSolutions = {
        ...learningElementsWithSolutions,
        [topicId]: learningElementsWithSolutions[topicId].map((element) =>
          element.learningElementLmsId === elementId ? { ...element, solutionLmsId, solutionLmsType } : element
        )
      }
      //updateDisplayedSolutions(topicId)
      onLearningElementSolutionChange(updatedLeElSolutions)
    },
    [learningElementsWithSolutions, onLearningElementSolutionChange]
  )

  const resetUnavailableSolutions = useCallback(
    (elementsWithSolutions: RemoteLearningElementWithSolution[], topicId: number) => {
      const topicSolutions = selectedSolutions[topicId] || []
      return elementsWithSolutions.map((element) =>
        topicSolutions.find((solution) => solution.solutionLmsId === element.solutionLmsId)
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
