import { useCallback, useMemo, useState } from 'react'
import { Edge, Node } from 'reactflow'
import { useTheme } from '@common/hooks'
import { Theme } from '@common/theme'
import { LearningPathLearningElementNode, groupLabels } from '@components'
import { LearningElement, LearningPathElement, LearningPathElementStatus, LearningPathLearningElement } from '@core'

/**
 * @prop defaultUrl - The default url of a node
 * @prop defaultTitle - The default title of a node
 * @prop defaultIsOpen - The default bool value if a node is open
 * @prop defaultLmsId - The default lms id of a node
 * @category Hooks
 * @interface
 */
export type useTopicHookParams = {
  defaultUrl?: string
  defaultTitle?: string
  defaultIsOpen?: boolean
  defaultLmsId?: number
}

/**
 * @prop url - The url of a node
 * @prop title - The title of a node
 * @prop lmsId - The lms id of a node
 * @prop isOpen - The bool value if a node is open
 * @prop handleClose - The function to close a node
 * @prop handleOpen - The function to open a node
 * @prop mapNodes - The function to map the learning path to nodes and edges
 * @category Hooks
 * @interface
 */
export type TopicHookReturn = {
  readonly url: string
  readonly title: string
  readonly lmsId: number
  readonly isOpen: boolean
  readonly handleClose: () => void
  readonly handleOpen: () => void
  readonly mapNodes: (
    learningPathData: LearningPathElement,
    learningPathStatus: LearningPathElementStatus[]
  ) => {
    nodes: Node[]
    edges: Edge[]
  }
}

/**
 * useTopic hook.
 *
 * @param params - The default values for url, title, isOpen and lmsId.
 *
 * @remarks
 * Hook for the Topic page logic.
 * Handles states and provides functions to create nodes and edges.
 *
 * @returns - The Topic page logic.
 *
 * @category Hooks
 */
export const useTopic = (params?: useTopicHookParams): TopicHookReturn => {
  // Default values
  const { defaultUrl = '', defaultTitle = '', defaultIsOpen = false, defaultLmsId = -1 } = params ?? {}

  // State data
  const [url, setUrl] = useState(defaultUrl)
  const [title, setTitle] = useState(defaultTitle)
  const [isOpen, setIsOpen] = useState(defaultIsOpen)
  const [lmsId, setLmsId] = useState<number>(defaultLmsId)
  const theme = useTheme()

  // Global variables
  const nodeOffsetX = 50
  const groupHeight = 200

  // Logic
  const handleOpen = useCallback(() => {
    setIsOpen(true)
  }, [setIsOpen])

  const handleClose = useCallback(() => {
    setIsOpen(false)
  }, [setIsOpen])

  // Groups learning elements by classification.
  const groupLearningElementsByClassification = useCallback(
    (learningPath: LearningPathLearningElement[], nodesGrouped: boolean) => {
      // If nodes are not grouped, return an array of arrays, each containing a single learning element.
      if (!nodesGrouped) {
        return learningPath.map((learningElement) => [learningElement])
      }

      // Returns an array containg the values of the object.
      return Object.values(
        // Creates an object with the classification of learning elements as key and an array of learning elements as value.
        learningPath.reduce(
          (
            groupedLearningElements: { [classification: string]: LearningPathLearningElement[] },
            learningPathLearningElement: LearningPathLearningElement
          ) => {
            const classification = learningPathLearningElement.learning_element.classification

            groupedLearningElements = {
              ...groupedLearningElements,
              [classification]: groupedLearningElements[classification]
                ? [...groupedLearningElements[classification]]
                : []
            }

            groupedLearningElements[classification].push(learningPathLearningElement)
            return groupedLearningElements
          },
          {}
        )
      )
    },
    []
  )

  // Creates a single learning element node.
  const getLearningElementNode = useCallback(
    (
      learningElement: LearningElement,
      recommended: boolean,
      learningPathStatus: LearningPathElementStatus[],
      id: string,
      position: { x: number; y: number }
    ) => {
      const learningElementNodeStyle = {
        background: theme.palette.primary.main,
        padding: 10,
        border: '1px solid ' + theme.palette.grey[500],
        borderRadius: 8,
        cursor: 'pointer',
        width: 500
      }

      const nodeData: LearningPathLearningElementNode = {
        lmsId: learningElement.lms_id,
        name: learningElement.name,
        activityType: learningElement.activity_type,
        classification: learningElement.classification,
        isRecommended: recommended,
        handleSetUrl: setUrl,
        handleSetTitle: setTitle,
        handleSetLmsId: setLmsId,
        handleOpen: handleOpen,
        handleClose: handleClose,
        isDone: learningPathStatus?.find((item) => item.cmid === learningElement.lms_id)?.state === 1
      }

      return {
        id: id,
        type: learningElement.classification,
        data: nodeData,
        position: {
          x: position.x,
          y: position.y
        },
        style: learningElementNodeStyle
      }
    },
    [theme, handleOpen, handleClose, setUrl, setTitle, setLmsId]
  )

  // Creates aligned nodes of the passed LearningPathLearningElement array.
  const getLearningElementChildNodes = useCallback(
    (
      learningElements: LearningPathLearningElement[],
      learningPathStatus: LearningPathElementStatus[],
      position: number,
      yOffset: number
    ): Node[] => {
      return learningElements.map((node, index) => {
        return getLearningElementNode(
          node.learning_element,
          node.recommended,
          learningPathStatus,
          node.position.toString() + '-' + node.learning_element.lms_id,
          {
            x: -275 * (learningElements.length > 3 ? 4 : learningElements.length) + nodeOffsetX / 2 + 550 * (index % 4),
            y: 250 * position + 125 * Math.floor(index / 4) + 50 + yOffset
          }
        )
      })
    },
    [getLearningElementNode, nodeOffsetX]
  )

  // Creates a parent node for the passed LearningPathLearningElement array.
  const getLearningElementParentNode = useCallback(
    (learningElements: LearningPathLearningElement[], position: number, yOffset: number): Node => {
      return {
        id: learningElements[0].position.toString(),
        data: {
          classification: learningElements[0].learning_element.classification,
          label: groupLabels[learningElements[0].learning_element.classification]
        },
        type: 'GROUP',
        position: {
          x: (-550 * (learningElements.length > 3 ? 4 : learningElements.length) - nodeOffsetX) / 2,
          y: 250 * position + yOffset
        },
        style: {
          border: '1px solid ' + theme.palette.grey[500],
          borderRadius: 8,
          width: 550 * (learningElements.length > 3 ? 4 : learningElements.length) + nodeOffsetX,
          height: 125 * Math.floor((learningElements.length - 1) / 4) + groupHeight // First term is number of additional rows.
        }
      }
    },
    [theme, groupHeight, nodeOffsetX]
  )

  // Creates a group of nodes consisting of a parent node and its children or a single node from the passed LearningPathLearningElement array.
  const groupNodes = useCallback(
    (
      learningElements: LearningPathLearningElement[],
      learningPathStatus: LearningPathElementStatus[],
      index: number,
      yOffset: number
    ): Node | Node[] => {
      // If the learningPathLearningElement array has only one element, return a single node.
      if (learningElements.length === 1) {
        return getLearningElementNode(
          learningElements[0].learning_element,
          learningElements[0].recommended,
          learningPathStatus,
          learningElements[0].position.toString(),
          {
            x: -250,
            y: 250 * index + yOffset
          }
        )
      }

      return [
        getLearningElementParentNode(learningElements, index, yOffset),
        ...getLearningElementChildNodes(learningElements, learningPathStatus, index, yOffset)
      ]
    },
    [getLearningElementNode, getLearningElementParentNode, getLearningElementChildNodes, nodeOffsetX, groupHeight]
  )

  // Maps the learning path to nodes.
  const mapLearningPathToNodes = useCallback(
    (
      learningPath: LearningPathElement,
      learningPathStatus: LearningPathElementStatus[],
      nodesGrouped: boolean
    ): Node[] => {
      // Sort learning path by position
      const sortedLearningPath = Array.from(learningPath.path).sort((a, b) => a.position - b.position)

      // Group learning elements by classification
      const groupedElements = groupLearningElementsByClassification(sortedLearningPath, nodesGrouped)

      // Calculate the offset between nodes/groups and create grouped nodes
      const nodes = groupedElements.map((group, index) => {
        const yOffset = groupedElements
          .slice(0, index)
          .filter((group) => group.length)
          .map((group) => 125 * Math.floor((group.length - 1) / 4) + groupHeight / 2)
          .reduce((a, b) => a + b, 0)

        return groupNodes(group, learningPathStatus, index, yOffset)
      })

      // Dissovles the array of arrays into a single array.
      return nodes.flatMap((nodes) => nodes)
    },
    [groupLearningElementsByClassification, groupNodes, groupHeight]
  )

  // Creates nodes and edges.
  const mapNodes = useCallback(
    (learningPathData: LearningPathElement, learningPathStatus: LearningPathElementStatus[], nodesGrouped = false) => {
      const nodes = mapLearningPathToNodes(learningPathData, learningPathStatus, nodesGrouped)

      // Creates an array of node ids to be used for creating edges.
      const nodesWithEdges = nodesGrouped
        ? Object.values(
            // Creates an object with the classification of learning elements as key and an array of learning elements as value.
            nodes.reduce(
              (
                firstLearningElementsOfClassification: { [classification: string]: Node[] },
                learningElementNode: Node
              ) => {
                const classification = learningElementNode.data.classification

                firstLearningElementsOfClassification = {
                  ...firstLearningElementsOfClassification,
                  [classification]: firstLearningElementsOfClassification[classification]
                    ? [...firstLearningElementsOfClassification[classification]]
                    : []
                }

                if (firstLearningElementsOfClassification[classification].length === 0) {
                  firstLearningElementsOfClassification[classification].push(learningElementNode)
                }

                return firstLearningElementsOfClassification
              },
              {}
            )
          )
            .flatMap((nodes) => nodes)
            .map((node) => node.id)
        : nodes.map((node) => node.id) // If nodes are not grouped, return an array of node ids.

      // Creates an array of edges from the array of node ids.
      const edges: Edge[] = nodesWithEdges.map((item, index) => ({
        id: 'Edge' + item.toString(),
        source: item,
        target: nodesWithEdges[index + 1]
      }))

      return { nodes, edges }
    },
    [handleClose, handleOpen, mapLearningPathToNodes]
  )

  return useMemo(
    () =>
      ({
        url,
        title,
        lmsId,
        isOpen,
        handleClose,
        handleOpen,
        mapNodes
      } as const),
    [url, title, lmsId, isOpen, handleClose, handleOpen, mapNodes]
  )
}
