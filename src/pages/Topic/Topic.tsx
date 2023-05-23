import { nodeTypes, LearningPathLearningElementNode } from '@components'
import { LearningElement, LearningPath, LearningPathLearningElement, LearningPathReturn } from '@core'
import { Box, Theme, useTheme } from '@mui/material'
import log from 'loglevel'
import { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import ReactFlow, { Node, Edge, MiniMap, Controls, Background } from 'reactflow'
import useBoundStore from '@store'
import { AuthContext } from '@services'
import StudentLearningElement from 'src/common/core/StudentLearningElement/StudentLearningElement'
import { useTranslation } from 'react-i18next'
import 'reactflow/dist/style.css'
import { DefaultSkeleton as Skeleton } from '@common/components'

const _useTopic = () => {
  console.log('useTopic')
}

const studentLearningElement: StudentLearningElement = {
  id: 160,
  learning_element_id: 4,
  student_id: 2,
  done: false,
  done_at: 'null'
}

const learningElement: LearningElement[] = [
  {
    id: 4,
    lms_id: 108,
    name: 'Kurzübersicht',
    activity_type: 'h5pactivity',
    classification: 'KÜ',
    university: 'HS-KE',
    created_by: 'Dimitri Bigler',
    created_at: 'Wed, 05 Apr 2023 13:38:28 GMT',
    last_updated: 'null',
    student_learning_element: studentLearningElement
  },
  {
    id: 5,
    lms_id: 108,
    name: 'Kurzübersicht',
    activity_type: 'h5pactivity',
    classification: 'ÜB', // EK
    university: 'HS-KE',
    created_by: 'Dimitri Bigler',
    created_at: 'Wed, 05 Apr 2023 13:38:28 GMT',
    last_updated: 'null',
    student_learning_element: studentLearningElement
  },
  {
    id: 6,
    lms_id: 108,
    name: 'Kurzübersicht',
    activity_type: 'h5pactivity',
    classification: 'ÜB', // AN
    university: 'HS-KE',
    created_by: 'Dimitri Bigler',
    created_at: 'Wed, 05 Apr 2023 13:38:28 GMT',
    last_updated: 'null',
    student_learning_element: studentLearningElement
  },
  {
    id: 7,
    lms_id: 108,
    name: 'Kurzübersicht',
    activity_type: 'h5pactivity',
    classification: 'ÜB', // AN
    university: 'HS-KE',
    created_by: 'Dimitri Bigler',
    created_at: 'Wed, 05 Apr 2023 13:38:28 GMT',
    last_updated: 'null',
    student_learning_element: studentLearningElement
  },
  {
    id: 8,
    lms_id: 108,
    name: 'Kurzübersicht',
    activity_type: 'h5pactivity',
    classification: 'AN', // AN
    university: 'HS-KE',
    created_by: 'Dimitri Bigler',
    created_at: 'Wed, 05 Apr 2023 13:38:28 GMT',
    last_updated: 'null',
    student_learning_element: studentLearningElement
  },
  {
    id: 8,
    lms_id: 108,
    name: 'Kurzübersicht',
    activity_type: 'h5pactivity',
    classification: 'AN', // AN
    university: 'HS-KE',
    created_by: 'Dimitri Bigler',
    created_at: 'Wed, 05 Apr 2023 13:38:28 GMT',
    last_updated: 'null',
    student_learning_element: studentLearningElement
  }
]

const learningPathLearningElement: LearningPathLearningElement[] = [
  {
    position: 1,
    id: 4,
    learning_element_id: 246,
    learning_path_id: 16,
    recommended: true,
    learning_element: learningElement[0]
  },
  {
    position: 2,
    id: 5,
    learning_element_id: 246,
    learning_path_id: 16,
    recommended: true,
    learning_element: learningElement[1]
  },
  {
    position: 3,
    id: 6,
    learning_element_id: 246,
    learning_path_id: 16,
    recommended: true,
    learning_element: learningElement[2]
  },
  {
    position: 4,
    id: 7,
    learning_element_id: 246,
    learning_path_id: 16,
    recommended: true,
    learning_element: learningElement[3]
  },
  {
    position: 5,
    id: 8,
    learning_element_id: 246,
    learning_path_id: 16,
    recommended: true,
    learning_element: learningElement[4]
  },
  {
    position: 6,
    id: 8,
    learning_element_id: 246,
    learning_path_id: 16,
    recommended: true,
    learning_element: learningElement[5]
  }
]

const learningPath: LearningPath = {
  based_on: 'aoc',
  calculated_on: 'null',
  course_id: 2,
  id: 16,
  path: learningPathLearningElement
}

type TopicProps = {
  useTopic?: typeof _useTopic
}
// TODO URL Stuktur übelrgeen. bzswp. localhost:3000/topic?topic=1

// Topic Page - TODO Component extract
export const Topic = ({ useTopic = _useTopic }: TopicProps): JSX.Element => {
  const [initialNodes, setInitialNodes] = useState<Node[]>()
  const [initialEdges, setInitialEdges] = useState<Edge[]>()
  const authcontext = useContext(AuthContext)
  const { courseId, topicId } = useParams()
  const { t } = useTranslation()
  const theme = useTheme()

  const fetchUser = useBoundStore((state) => state.fetchUser)
  const fetchLearningPath = useBoundStore((state) => state.fetchLearningPath)

  useEffect(() => {
    // request to backend to get learning path for topic
    // alert('Topic: ' + topic)
    if (authcontext.isAuth)
      fetchUser()
        .then((user) => {
          fetchLearningPath(user.settings.user_id, user.lms_user_id, user.id, Number(courseId), Number(topicId)).then(
            (learning_path_data) => {
              const nodes = mapLearningPathToNodes(learning_path_data, theme)

              setInitialNodes(nodes)
              // Get first character of node ids
              const nodeIDs = nodes.map((item) => Array.from(item.id)[0])

              // Erase duplicate of node ids
              const uniqueNodeIDs = [...new Set(nodeIDs)]

              const edges: Edge[] = uniqueNodeIDs.map((item, index) => ({
                id: 'Edge' + item.toString(),
                source: item,
                target: uniqueNodeIDs[index + 1]
              }))

              //setInitialEdges(edges)
              setInitialEdges(edges)
            }
          )
        })
        .catch((error) => {
          // 🍿 snackbar error
          alert('Error: ' + error)
        })
  }, [authcontext.isAuth, courseId, fetchLearningPath, fetchUser, theme, topicId])

  log.setLevel('error')

  // TODO: HIer edges rendern
  return initialNodes && initialEdges ? (
    <Box height={'100%'}>
      <ReactFlow nodes={initialNodes} edges={initialEdges} nodeTypes={nodeTypes} fitView>
        <Background gap={16} />
        <MiniMap nodeBorderRadius={2} />
        <Controls />
      </ReactFlow>
    </Box>
  ) : (
    <Skeleton variant="rectangular" width={'80%'} height={'80%'} />
  )
}

export default Topic

const mapLearningPathToNodes = (learningPath: LearningPath, theme: Theme): Node[] => {
  // Sort learning path
  const sortedLearningPath = learningPath.path.sort((a, b) => a.position - b.position)

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
      is_recommended: node.recommended
    }
    return {
      id: index.toString(),
      type: node.learning_element.classification,
      data: node_data,
      position: {
        x: nodeOffsetX + 300 * index,
        y: 50
      },
      style: learningElementStyle
    }
  })

  // Parent node for exercise learning elements
  const exerciseLearningElementParentNode = learningPathExercises.length > 0 ? {
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
  } : null

  // Rest of learning elements
  const learningElementNodesExcludingExercises = learningPathExcludingExercises.map((item, index) => {
    const node_data: LearningPathLearningElementNode = {
      lms_id: item.learning_element.lms_id,
      name: item.learning_element.name,
      activity_type: item.learning_element.activity_type,
      classification: item.learning_element.classification,
      is_recommended: item.recommended
    }

    return {
      id: item.position.toString(),
      type: item.learning_element.classification,
      data: node_data,
      position: {
        x: nodeOffsetX + (300 * (learningPathExercises.length - 1)) / 2,
        y:
          exerciseLearningElementParentNode && item.position < parseInt(exerciseLearningElementParentNode.id)
            ? 250 * (item.position - 1)
            : exerciseLearningElementParentNode
              ? 250 * (item.position - exerciseLearningElementChildNodes.length) + groupHeight - 70
              : 250 * (item.position - 1),
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

  const learningElementNodes = [
    ...(learningElementNodesBeforeExercises.length > 0 ? learningElementNodesBeforeExercises : learningElementNodesExcludingExercises),
    ...(exerciseLearningElementParentNode ? [exerciseLearningElementParentNode, ...exerciseLearningElementChildNodes] : []),
    ...learningElementNodesAfterExercises
  ]

  return learningElementNodes
}