import { LearningPathLearningElementNode } from '@components'
import { useState, useCallback, useMemo } from 'react'
import { Node, Edge } from 'reactflow'
import { Theme } from '@common/theme'
import { LearningPathElement, LearningPathElementStatus, LearningPathLearningElement } from '@core'

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
 * @prop handleSetUrl - The function to set the url of a node
 * @prop handleSetTitle - The function to set the title of a node
 * @prop handleSetLmsId - The function to set the lms id of a node
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
  readonly handleSetUrl: (url: string) => void
  readonly handleSetTitle: (title: string) => void
  readonly handleSetLmsId: (lmsId: number) => void
  readonly mapNodes: (
    learningPathData: LearningPathElement,
    theme: Theme,
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

  // Logic
  // TODO: This function is not necessary. setIsOpen can be exported directly
  const handleOpen = useCallback(() => {
    setIsOpen(true)
  }, [setIsOpen])

  // TODO: This function is not necessary. setIsOpen can be exported directly
  const handleClose = useCallback(() => {
    setIsOpen(false)
  }, [setIsOpen])

  // TODO: This function is not necessary. setUrl can be exported directly
  const handleSetUrl = useCallback(
    (url: string) => {
      setUrl(url)
    },
    [setUrl]
  )

  // TODO: This function is not necessary. setTitle can be exported directly
  const handleSetTitle = useCallback(
    (title: string) => {
      setTitle(title)
    },
    [setTitle]
  )

  // TODO: This function is not necessary. setLmsId can be exported directly
  const handleSetLmsId = useCallback(
    (lmsId: number) => {
      setLmsId(lmsId)
    },
    [setLmsId]
  )

  const groupLearningElementsByClassification = (learningPath: LearningPathLearningElement[]) => {
    return Object.values(
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
  }

  // Creates aligned nodes of the passed LearningPathLearningElement array and returns them.
  // Can be used to create child nodes of a specific classification for a group node.
  const getLearningElementChildNodes = (
    learningElements: LearningPathLearningElement[],
    learningPathStatus: LearningPathElementStatus[],
    theme: Theme
  ): Node[] => {
    const nodeOffsetX = 50 // Can be defined globally

    const learningElementStyle = {
      background: theme.palette.primary.main,
      padding: 10,
      border: '1px solid ' + theme.palette.grey[500],
      borderRadius: 8,
      cursor: 'pointer',
      width: 500
    } // Can be defined globally

    return learningElements.map((node, index) => {
      const nodeData: LearningPathLearningElementNode = {
        lmsId: node.learning_element.lms_id,
        name: node.learning_element.name,
        activityType: node.learning_element.activity_type,
        classification: node.learning_element.classification,
        isRecommended: node.recommended,
        handleSetUrl: handleSetUrl,
        handleSetTitle: handleSetTitle,
        handleSetLmsId: handleSetLmsId,
        handleOpen: handleOpen,
        handleClose: handleClose,
        isDone: learningPathStatus?.find((item) => item.cmid === node.learning_element.lms_id)?.state === 1
      }
      return {
        id: node.position.toString() + '-' + node.learning_element.lms_id,
        type: node.learning_element.classification,
        data: nodeData,
        position: {
          x: nodeOffsetX + 550 * (index - 4 * Math.floor(index / 4)),
          y: 250 * (learningElements[0].position - 1) + Math.floor(index / 4) * 125 + 50
        },
        style: learningElementStyle
      }
    })
  }

  const getLearningElementParentNode = (learningElements: LearningPathLearningElement[], theme: Theme): Node => {
    const nodeOffsetX = 50 // Can be defined globally
    const groupHeight = 200 // Can be defined globally

    return {
      id: learningElements[0].position.toString(),
      data: { label: 'Übungen' },
      type: 'GROUP',
      position: {
        x: 0,
        y: 250 * (learningElements[0].position - 1)
      },
      style: {
        border: '1px solid ' + theme.palette.grey[500],
        borderRadius: 8,
        width: 550 * (learningElements.length > 3 ? 4 : learningElements.length) + nodeOffsetX,
        height: groupHeight + Math.floor((learningElements.length - 1) / 4) * 125
      }
    }
  }

  const getGroupedNodes = (
    learningPath: LearningPathLearningElement[],
    learningPathStatus: LearningPathElementStatus[],
    theme: Theme,
    index: number
  ): Node | Node[] => {
    const learningElementStyle = {
      background: theme.palette.primary.main,
      padding: 10,
      border: '1px solid ' + theme.palette.grey[500],
      borderRadius: 8,
      cursor: 'pointer',
      width: 500
    } // Can  be defined globally

    if (learningPath.length === 1) {
      const nodeData: LearningPathLearningElementNode = {
        lmsId: learningPath[0].learning_element.lms_id,
        name: learningPath[0].learning_element.name,
        activityType: learningPath[0].learning_element.activity_type,
        classification: learningPath[0].learning_element.classification,
        isRecommended: learningPath[0].recommended,
        handleSetUrl: handleSetUrl,
        handleSetTitle: handleSetTitle,
        handleSetLmsId: handleSetLmsId,
        handleOpen: handleOpen,
        handleClose: handleClose,
        isDone:
          learningPathStatus?.find((status) => status.cmid === learningPath[0].learning_element.lms_id)?.state === 1
      }

      return {
        id: learningPath[0].position.toString(),
        type: learningPath[0].learning_element.classification,
        data: nodeData,
        position: {
          x: 0,
          y: index * 250
        },
        style: learningElementStyle
      }
    }

    return [
      getLearningElementParentNode(learningPath, theme),
      ...getLearningElementChildNodes(learningPath, learningPathStatus, theme)
    ]
  }

  const mapLearningPathToNodes = useCallback(
    (learningPath: LearningPathElement, theme: Theme, learningPathStatus: LearningPathElementStatus[]): Node[] => {
      // Sort learning path by position
      const sortedLearningPath = Array.from(learningPath.path).sort((a, b) => a.position - b.position)

      // Group learning elements by classification
      const groupedElements = groupLearningElementsByClassification(sortedLearningPath)

      // Create nodes and return them
      const nodes = groupedElements.map((group, index) => {
        return getGroupedNodes(group, learningPathStatus, theme, index)
      })

      //return []
      // Dissovles the array of arrays into a single array.
      return nodes.flatMap((nodes) => nodes)
    },
    []
  )

  const mapLearningPathToNodes2 = useCallback(
    (
      learningPath: LearningPathElement,
      theme: Theme,
      handleSetUrl: (url: string) => void,
      handleSetTitle: (title: string) => void,
      handleSetLmsId: (lmsId: number) => void,
      handleOpen: () => void,
      handleClose: () => void,
      learningPathStatus: LearningPathElementStatus[]
    ): Node[] => {
      // Sort learning path
      const sortedLearningPath = Array.from(learningPath.path).sort((a, b) => a.position - b.position)

      const solvingPositionForDuplicates = sortedLearningPath.map((item, index) => {
        return { ...item, position: index + 1 } // Generate position based on array index
      })

      // Every exercise learning element
      const learningPathExercises = solvingPositionForDuplicates.filter(
        (item) => item.learning_element.classification === 'ÜB'
      )

      // Every learning element except exercises
      const learningPathExcludingExercises = solvingPositionForDuplicates.filter(
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
      const exerciseLearningElementChildNodes: Node[] = getLearningElementChildNodes(
        learningPathExercises,
        learningPathStatus,
        theme
      )

      // Parent node for exercise learning elements
      const exerciseLearningElementParentNode = getLearningElementParentNode(learningPathExercises, theme)

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
          handleSetLmsId: handleSetLmsId,
          handleOpen: handleOpen,
          handleClose: handleClose,
          isDone: learningPathStatus?.find((status) => status.cmid === item.learning_element.lms_id)?.state === 1
        }

        const getNodeYPos = () => {
          if (exerciseLearningElementParentNode && item.position >= parseInt(exerciseLearningElementParentNode.id)) {
            return (
              250 *
                (item.position -
                  parseInt(exerciseLearningElementChildNodes[exerciseLearningElementChildNodes.length - 1].id)) +
              exerciseLearningElementParentNode.position.y +
              groupHeight +
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

      return []
      return learningElementNodes
    },
    []
  )

  // Calculate nodes their status and edges
  const mapNodes = useCallback(
    (learningPathData: LearningPathElement, theme: Theme, learningPathStatus: LearningPathElementStatus[]) => {
      const nodes = mapLearningPathToNodes(
        learningPathData,
        theme,
        /*handleSetUrl,
        handleSetTitle,
        handleSetLmsId,
        handleOpen,
        handleClose,*/
        learningPathStatus
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
    [handleClose, handleOpen, handleSetTitle, handleSetUrl, handleSetLmsId, mapLearningPathToNodes]
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
        handleSetUrl,
        handleSetTitle,
        handleSetLmsId,
        mapNodes
      } as const),
    [url, title, lmsId, isOpen, handleClose, handleOpen, handleSetUrl, handleSetTitle, handleSetLmsId, mapNodes]
  )
}
