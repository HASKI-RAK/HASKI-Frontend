import { LearningPathLearningElementNode } from '@components'
import { useState, useCallback, useMemo } from 'react'
import { Node, Edge } from 'reactflow'
import { Theme } from '@common/theme'
import { LearningPathElement } from '@core'

/**
 * @interface useTopicHookParams
 * @property {string} [defaultUrl] - The default url of a node
 * @property {string} [defaultTitle] - The default title of a node
 * @property {boolean} [defaultIsOpen] - The default bool value if a node is open
 */
export type useTopicHookParams = {
  defaultUrl?: string
  defaultTitle?: string
  defaultIsOpen?: boolean
}

/**
 * @interface TopicHookReturn
 * @property {string} url - The url of a node
 * @property {string} title - The title of a node
 * @property {boolean} isOpen - The bool value if a node is open
 * @property {function} handleClose - The function to close a node
 * @property {function} handleOpen - The function to open a node
 * @property {function} handleSetUrl - The function to set the url of a node
 * @property {function} handleSetTitle - The function to set the title of a node
 * @property {function} mapNodes - The function to map the learning path to nodes and edges
 */
export type TopicHookReturn = {
  readonly url: string
  readonly title: string
  readonly isOpen: boolean
  readonly handleClose: () => void
  readonly handleOpen: () => void
  readonly handleSetUrl: (url: string) => void
  readonly handleSetTitle: (title: string) => void
  readonly mapNodes: (
    learningPathData: LearningPathElement,
    theme: Theme
  ) => {
    nodes: Node[]
    edges: Edge[]
  }
}

/**
 * Hook for the Topic page logic.
 * Handles states and provides functions to create nodes and edges.
 * @param params - The default values for url, title and isOpen.
 * @returns {TopicHookReturn} The Topic page logic.
 */
export const useTopic = (params?: useTopicHookParams): TopicHookReturn => {
  // Default values
  const { defaultUrl = '', defaultTitle = '', defaultIsOpen = false } = params ?? {}

  // State data
  const [url, setUrl] = useState(defaultUrl)
  const [title, setTitle] = useState(defaultTitle)
  const [isOpen, setIsOpen] = useState(defaultIsOpen)

  // Logic
  const handleOpen = useCallback(() => {
    setIsOpen(true)
  }, [setIsOpen])

  const handleClose = useCallback(() => {
    setIsOpen(false)
  }, [setIsOpen])

  const handleSetUrl = useCallback(
    (url: string) => {
      setUrl(url)
    },
    [setUrl]
  )

  const handleSetTitle = useCallback(
    (title: string) => {
      setTitle(title)
    },
    [setTitle]
  )

  const mapLearningPathToNodes = useCallback(
    (
      learningPath: LearningPathElement,
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

      const groupHeight = 200
      const nodeOffsetX = 50

      const learningElementStyle = {
        background: theme.palette.primary.main,
        padding: 10,
        border: '1px solid ' + theme.palette.grey[500],
        borderRadius: 8,
        cursor: 'pointer',
        width: 500
      }

      // Exercise nodes
      const exerciseLearningElementChildNodes: Node[] = learningPathExercises.map((node, index) => {
        const nodeData: LearningPathLearningElementNode = {
          lmsId: node.learning_element.lms_id,
          name: node.learning_element.name,
          activityType: node.learning_element.activity_type,
          classification: node.learning_element.classification,
          isRecommended: node.recommended,
          handleSetUrl: handleSetUrl,
          handleSetTitle: handleSetTitle,
          handleOpen: handleOpen,
          handleClose: handleClose
        }
        return {
          id: node.position.toString() + '-' + node.learning_element.lms_id,
          type: node.learning_element.classification,
          data: nodeData,
          position: {
            x: nodeOffsetX + 550 * (index - 4 * Math.floor(index / 4)),
            y: 250 * (learningPathExercises[0].position - 1) + Math.floor(index / 4) * 125 + 50
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
                width: 550 * (learningPathExercises.length > 3 ? 4 : learningPathExercises.length) + nodeOffsetX,
                height: groupHeight + Math.floor((learningPathExercises.length - 1) / 4) * 125
              }
            }
          : null

      // Leftover learning elements
      const learningElementNodesExcludingExercises = learningPathExcludingExercises.map((item) => {
        const nodeData: LearningPathLearningElementNode = {
          lmsId: item.learning_element.lms_id,
          name: item.learning_element.name,
          activityType: item.learning_element.activity_type,
          classification: item.learning_element.classification,
          isRecommended: item.recommended,
          handleSetUrl: handleSetUrl,
          handleSetTitle: handleSetTitle,
          handleOpen: handleOpen,
          handleClose: handleClose
        }

        const getNodeYPos = () => {
          if (exerciseLearningElementParentNode && item.position >= parseInt(exerciseLearningElementParentNode.id)) {
            return (
              250 * (item.position - exerciseLearningElementChildNodes.length) +
              groupHeight +
              Math.floor((learningPathExercises.length - 1) / 4) * 125 -
              70
            )
          } else {
            return 250 * (item.position - 1)
          }
        }

        return {
          id: item.position.toString(),
          type: item.learning_element.classification,
          data: nodeData,
          position: {
            x: nodeOffsetX + (550 * ((learningPathExercises.length > 3 ? 4 : learningPathExercises.length) - 1)) / 2,
            y: getNodeYPos()
          },
          style: learningElementStyle
        }
      })

      // Insert exercise nodes into learning elements
      const learningElementNodesBeforeExercises = learningElementNodesExcludingExercises.filter(
        (item) =>
          exerciseLearningElementParentNode && parseInt(item.id) < parseInt(exerciseLearningElementParentNode.id)
      )

      const learningElementNodesAfterExercises = learningElementNodesExcludingExercises.filter(
        (item) =>
          exerciseLearningElementParentNode && parseInt(item.id) > parseInt(exerciseLearningElementParentNode.id)
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
    },
    []
  )

  const mapNodes = useCallback(
    (learningPathData: LearningPathElement, theme: Theme) => {
      const nodes = mapLearningPathToNodes(
        learningPathData,
        theme,
        handleSetUrl,
        handleSetTitle,
        handleOpen,
        handleClose
      )

      // Id array of all nodes which types are not 'ÜB'
      const nodesWithEdges = nodes.filter((node) => node.type !== 'ÜB').map((node) => node.id)

      const edges: Edge[] = nodesWithEdges.map((item, index) => ({
        id: 'Edge' + item.toString(),
        source: item,
        target: nodesWithEdges[index + 1]
      }))

      return { nodes, edges }
    },
    [handleClose, handleOpen, handleSetTitle, handleSetUrl, mapLearningPathToNodes]
  )

  return useMemo(
    () =>
      ({
        url,
        title,
        isOpen,
        handleClose,
        handleOpen,
        handleSetUrl,
        handleSetTitle,
        mapNodes
      } as const),
    [url, title, isOpen, handleClose, handleOpen, handleSetUrl, handleSetTitle, mapNodes]
  )
}
