import { useCallback, useMemo, memo } from "react"
import { LearningElementWithSolution } from "@core"
import { Solution, RemoteLearningElementWithSolution } from "../Modal/CreateTopicModal"

type useCreateLearningElementSolutionTable = {
  learningElementsWithSolutions: { [key: number]: RemoteLearningElementWithSolution[] }
  selectedSolutions: { [key: number]: Solution[] }
  onLearningElementSolutionChange: (selectedSolutions: { [key: number]: RemoteLearningElementWithSolution[] }) => void
  displayedSolutions: { [key: number]: Solution[] }
  setDisplayedSolutions: (displayedSolutions: { [key: number]: Solution[] }) => void
}

export const useCreateLearningElementSolutionTable = ({
  learningElementsWithSolutions,
  selectedSolutions,
  onLearningElementSolutionChange,
  displayedSolutions,
  setDisplayedSolutions} : useCreateLearningElementSolutionTable) => {

    const updateDisplayedSolutions = useCallback(
      (topicId: number) => {
        const availableSolutions = selectedSolutions[topicId].filter((solution) =>
          !(learningElementsWithSolutions[topicId] || []).some((element) => element.solutionLmsId === solution.solutionLmsId))
        const newDisplayedSolutions = [{solutionLmsId: 0, solutionLmsName: 'No Solution Placeholder'}, ...(availableSolutions || [])]
        setDisplayedSolutions({ ...displayedSolutions, [topicId]: newDisplayedSolutions })
      }, [learningElementsWithSolutions, displayedSolutions, setDisplayedSolutions])

    const handleSolutionChange = useCallback(
      (topicId: number, elementId: number, solutionLmsId: number) => {
        const updatedLeElSolutions = { ...learningElementsWithSolutions,
          [topicId]: learningElementsWithSolutions[topicId].map((element) =>
            element.learningElementLmsId === elementId ? { ...element, solutionLmsId } : element
          )
        }
        //updateDisplayedSolutions(topicId)
        onLearningElementSolutionChange(updatedLeElSolutions)
      }, [learningElementsWithSolutions, onLearningElementSolutionChange])

      return useMemo(() => ({ handleSolutionChange }), [handleSolutionChange])

      
  }