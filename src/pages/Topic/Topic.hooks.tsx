import { CSSProperties, useCallback, useMemo, useState } from 'react'
import { Edge, Node } from 'reactflow'
import { Theme } from '@common/theme'
import { LearningPathLearningElementNode, groupLabels } from '@components'
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
  const [yOffset, setYOffset] = useState(0)

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

  const nodeOffsetX = 50 // Can be defined globally
  const groupHeight = 200 // Can be defined globally

  // ! 1.
  // TODO: Add comments
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

  // ! 2.
  // TODO: Rename and comment
  // Creates aligned nodes of the passed LearningPathLearningElement array and returns them.
  // Can be used to create child nodes of a specific classification for a group node.
  const getLearningElementChildNodes = (
    learningElements: LearningPathLearningElement[],
    learningPathStatus: LearningPathElementStatus[],
    learningElementNodeStyle: CSSProperties,
    position: number,
    yOffset: number
  ): Node[] => {
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
          x: -275 * (learningElements.length > 3 ? 4 : learningElements.length) + nodeOffsetX / 2 + 550 * (index % 4),
          y: 250 * position + 125 * Math.floor(index / 4) + 50 + yOffset // TODO: Tweak the values
        },
        style: learningElementNodeStyle
      }
    })
  }

  // ! 3.
  // TODO: Comment
  const getLearningElementParentNode = (
    learningElements: LearningPathLearningElement[],
    theme: Theme,
    position: number,
    yOffset?: number
  ): Node => {
    return {
      id: learningElements[0].position.toString(),
      data: {
        classification: learningElements[0].learning_element.classification,
        label: groupLabels[learningElements[0].learning_element.classification]
      },
      type: 'GROUP',
      position: {
        x: (-550 * (learningElements.length > 3 ? 4 : learningElements.length) - nodeOffsetX) / 2,
        y: 250 * position + yOffset! // TODO: Tweak the numbers
      },
      style: {
        border: '1px solid ' + theme.palette.grey[500],
        borderRadius: 8,
        width: 550 * (learningElements.length > 3 ? 4 : learningElements.length) + nodeOffsetX,
        height: 125 * Math.floor((learningElements.length - 1) / 4) + groupHeight // First term is number of additional rows.
      }
    }
  }

  // ! 4.
  const groupNodes = (
    learningPath: LearningPathLearningElement[],
    learningPathStatus: LearningPathElementStatus[],
    theme: Theme,
    index: number,
    yOffset?: number
  ): Node | Node[] => {
    // TODO: Comment
    const learningElementNodeStyle = {
      background: theme.palette.primary.main,
      padding: 10,
      border: '1px solid ' + theme.palette.grey[500],
      borderRadius: 8,
      cursor: 'pointer',
      width: 500
    }

    if (learningPath.length === 1) {
      // TODO: Nearly the same as in getLearningElementChildNodes except for the position and id
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
          x: -250,
          y: 250 * index + yOffset!
        },
        style: learningElementNodeStyle
      }
    }

    return [
      getLearningElementParentNode(learningPath, theme, index, yOffset),
      ...getLearningElementChildNodes(learningPath, learningPathStatus, learningElementNodeStyle, index, yOffset!)
    ]
  }

  // ! 5. Comment
  const mapLearningPathToNodes = useCallback(
    (learningPath: LearningPathElement, learningPathStatus: LearningPathElementStatus[], theme: Theme): Node[] => {
      // Sort learning path by position
      const sortedLearningPath = Array.from(learningPath.path).sort((a, b) => a.position - b.position)

      // Group learning elements by classification
      const groupedElements = groupLearningElementsByClassification(sortedLearningPath)

      // Create nodes and return them
      const nodes = groupedElements.map((group, i) => {
        const yOffset = groupedElements
          .filter((group, n) => group.length > 1 && n < i)
          .map((group) => 125 * Math.floor((group.length - 1) / 4) + groupHeight / 2)
          .reduce((a, b) => a + b, 0)

        return groupNodes(group, learningPathStatus, theme, i, yOffset)
      })

      // Dissovles the array of arrays into a single array.
      return nodes.flatMap((nodes) => nodes)
    },
    []
  )

  // ! 6.
  // TODO: Needs boolean to determine if nodes are grouped or not
  // Calculate nodes their status and edges
  const mapNodes = useCallback(
    (learningPathData: LearningPathElement, theme: Theme, learningPathStatus: LearningPathElementStatus[]) => {
      const nodes = mapLearningPathToNodes(learningPathData, learningPathStatus, theme)

      // TODO: Comment
      const nodesWithEdges = Object.values(
        nodes.reduce(
          (firstLearningElementsOfClassification: { [classification: string]: Node[] }, learningElementNode: Node) => {
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
