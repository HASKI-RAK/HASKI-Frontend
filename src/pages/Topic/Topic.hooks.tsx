import { LearningPath } from '@core'
import { LearningPathLearningElementNode } from '@components'
import { Node } from 'reactflow'
import { Theme } from '@mui/material'

export type TopicHookReturn = {
  readonly mapLearningPathToNodes: (
    learningPath: LearningPath,
    theme: Theme,
    handleSetUrl: (url: string) => void,
    handleSetTitle: (title: string) => void,
    handleOpen: () => void,
    handleClose: () => void
  ) => Node[]
}

export const useTopic = (): TopicHookReturn => {
  const mapLearningPathToNodes = (
    learningPath: LearningPath,
    theme: Theme,
    handleSetUrl: (url: string) => void,
    handleSetTitle: (title: string) => void,
    handleOpen: () => void,
    handleClose: () => void
  ): Node[] => {
    // Sort learning path
    const sortedLearningPath = Array.from(learningPath.path).sort((a, b) => a.position - b.position)

    // Every exercise learning element
    const learningPathExercises = sortedLearningPath.filter((item) => item.learning_element.classification === 'ÜB')

    // Every learning element except exercises
    const learningPathExcludingExercises = sortedLearningPath.filter(
      (item) => item.learning_element.classification !== 'ÜB'
    )

    const groupHeight = 175
    const nodeOffsetX = 50

    const learningElementStyle = {
      background: theme.palette.primary.main,
      padding: 10,
      border: '1px solid ' + theme.palette.grey[500],
      borderRadius: 8,
      cursor: 'pointer'
    }

    // Exercise nodes
    const exerciseLearningElementChildNodes = learningPathExercises.map((node, index) => {
      const node_data: LearningPathLearningElementNode = {
        lms_id: node.learning_element.lms_id,
        name: node.learning_element.name,
        activity_type: node.learning_element.activity_type,
        classification: node.learning_element.classification,
        is_recommended: node.recommended,
        handleSetUrl: handleSetUrl,
        handleSetTitle: handleSetTitle,
        handleOpen: handleOpen,
        handleClose: handleClose
      }
      return {
        id: node.position.toString() + '-' + node.learning_element.lms_id,
        type: node.learning_element.classification,
        data: node_data,
        position: {
          x: nodeOffsetX + 300 * index,
          y: 250 * (learningPathExercises[0].position - 1) + 50
        },
        style: learningElementStyle
      }
    })

    // Parent node for exercise learning elements
    const exerciseLearningElementParentNode =
      learningPathExercises.length > 0
        ? {
            id: learningPathExercises[0].position.toString(),
            data: { label: 'Übungen' },
            type: 'GROUP',
            position: {
              x: 0,
              y: 250 * (learningPathExercises[0].position - 1)
            },
            style: {
              border: '1px solid ' + theme.palette.grey[500],
              borderRadius: 8,
              width: 300 * learningPathExercises.length + nodeOffsetX,
              height: groupHeight
            }
          }
        : null

    // Leftover learning elements
    const learningElementNodesExcludingExercises = learningPathExcludingExercises.map((item) => {
      const node_data: LearningPathLearningElementNode = {
        lms_id: item.learning_element.lms_id,
        name: item.learning_element.name,
        activity_type: item.learning_element.activity_type,
        classification: item.learning_element.classification,
        is_recommended: item.recommended,
        handleSetUrl: handleSetUrl,
        handleSetTitle: handleSetTitle,
        handleOpen: handleOpen,
        handleClose: handleClose
      }

      // TODO: Rename
      const getY = () => {
        if (exerciseLearningElementParentNode && item.position >= parseInt(exerciseLearningElementParentNode.id)) {
          return 250 * (item.position - exerciseLearningElementChildNodes.length) + groupHeight - 70
        } else {
          return 250 * (item.position - 1)
        }
      }

      return {
        id: item.position.toString(),
        type: item.learning_element.classification,
        data: node_data,
        position: {
          x: nodeOffsetX + (300 * (learningPathExercises.length - 1)) / 2,
          y: getY()
        },
        style: learningElementStyle
      }
    })

    // Insert exercise nodes into learning elements
    const learningElementNodesBeforeExercises = learningElementNodesExcludingExercises.filter(
      (item) => exerciseLearningElementParentNode && parseInt(item.id) < parseInt(exerciseLearningElementParentNode.id)
    )

    const learningElementNodesAfterExercises = learningElementNodesExcludingExercises.filter(
      (item) => exerciseLearningElementParentNode && parseInt(item.id) > parseInt(exerciseLearningElementParentNode.id)
    )

    // Add 1 to the id of all elements (including exercises) after the exercise parent node
    const learningElementNodesAfterExercisesElementParentNode = learningElementNodesAfterExercises.map((item) => {
      return {
        ...item,
        id: (parseInt(item.id) + 1).toString()
      }
    })

    const learningElementNodes = [
      ...(learningElementNodesBeforeExercises.length > 0
        ? learningElementNodesBeforeExercises
        : learningElementNodesExcludingExercises),
      ...(exerciseLearningElementParentNode
        ? [exerciseLearningElementParentNode, ...exerciseLearningElementChildNodes]
        : []),
      ...learningElementNodesAfterExercisesElementParentNode
    ]

    return learningElementNodes
  }

  return {
    mapLearningPathToNodes
  }
}
