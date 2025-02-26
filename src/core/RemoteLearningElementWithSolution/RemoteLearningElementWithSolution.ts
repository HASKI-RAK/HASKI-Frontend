import LearningElement from "../LearningElement/LearningElement";

type LearningElementWithSolution = LearningElement & {
  lmsSolutionId: number
}

export default LearningElementWithSolution