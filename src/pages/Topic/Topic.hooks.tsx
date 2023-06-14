import { LearningPathLearningElementNode } from '@components'
import { useState, useCallback, useMemo } from 'react'
import { Node, Edge } from 'reactflow'
import { Theme } from '@mui/material' // TODO: DI
import { LearningPath } from '@core'

export type useTopicHookParams = {
  defaultUrl?: string
  defaultTitle?: string
  defaultIsOpen?: boolean
}

export type TopicHookReturn = {
  readonly url: string
  readonly title: string
  readonly isOpen: boolean
  readonly handleClose: () => void
  readonly mapLearningPathToNodes: (
    learningPath: LearningPath,
    theme: Theme,
    handleSetUrl: (url: string) => void,
    handleSetTitle: (title: string) => void,
    handleOpen: () => void,
    handleClose: () => void
  ) => Node[]
  readonly mapNodes: (
    learningPathData: LearningPath,
    theme: Theme
  ) => {
    nodes: Node[]
    edges: Edge[]
  }
}

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
      const learningPathExercises = sortedLearningPath.filter((item) => item.learningElement.classification === 'ÜB')

      // Every learning element except exercises
      const learningPathExcludingExercises = sortedLearningPath.filter(
        (item) => item.learningElement.classification !== 'ÜB'
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
        const nodeData: LearningPathLearningElementNode = {
          lmsId: node.learningElement.lmsId,
          name: node.learningElement.name,
          activityType: node.learningElement.activityType,
          classification: node.learningElement.classification,
          isRecommended: node.recommended,
          handleSetUrl: handleSetUrl,
          handleSetTitle: handleSetTitle,
          handleOpen: handleOpen,
          handleClose: handleClose
        }
        return {
          id: node.position.toString() + '-' + node.learningElement.lmsId,
          type: node.learningElement.classification,
          data: nodeData,
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
        const nodeData: LearningPathLearningElementNode = {
          lmsId: item.learningElement.lmsId,
          name: item.learningElement.name,
          activityType: item.learningElement.activityType,
          classification: item.learningElement.classification,
          isRecommended: item.recommended,
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
          type: item.learningElement.classification,
          data: nodeData,
          position: {
            x: nodeOffsetX + (300 * (learningPathExercises.length - 1)) / 2,
            y: getY()
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
    (learningPathData: LearningPath, theme: Theme) => {
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
        mapLearningPathToNodes,
        mapNodes
      } as const),
    [url, title, isOpen, handleClose, mapLearningPathToNodes, mapNodes]
  )
}
