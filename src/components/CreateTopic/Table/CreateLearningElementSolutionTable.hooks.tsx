import { useCallback, useMemo, memo } from "react"
import { LearningElementWithSolution } from "@core"
import { Solution, RemoteLearningElementWithSolution } from "../Modal/CreateTopicModal"

type useCreateLearningElementSolutionTable = {
  learningElementsWithSolutions: { [key: number]: RemoteLearningElementWithSolution[] }
  selectedSolutions: { [key: number]: Solution[] }
  onLearningElementSolutionChange: (selectedSolutions: { [key: number]: RemoteLearningElementWithSolution[] }) => void
}

export const useCreateLearningElementSolutionTable = ({
  learningElementsWithSolutions,
  selectedSolutions,
  onLearningElementSolutionChange} : useCreateLearningElementSolutionTable) => {
    //Callbacks
    const handleSolutionChange = useCallback(
      (topicId: number, elementId: number, solutionLmsId: number) => {
        const updatedLeElSolutions = { ...learningElementsWithSolutions,
          [topicId]: learningElementsWithSolutions[topicId].map((element) =>
            element.learningElementLmsId === elementId ? { ...element, solutionLmsId } : element
          )
        }
        onLearningElementSolutionChange(updatedLeElSolutions)
      }, [learningElementsWithSolutions, onLearningElementSolutionChange])
      return useMemo(() => ({ handleSolutionChange }), [handleSolutionChange])
  }