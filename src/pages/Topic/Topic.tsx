import { LearningPathLearningElementNode, IFrameModal, nodeTypes } from '@components'
import { LearningElement, LearningPath, LearningPathLearningElement, LearningPathReturn } from '@core'
import { Box, Button, Paper, Theme, Typography, useTheme } from '@mui/material'
import log from 'loglevel'
import { useEffect, useState, useContext, useCallback, useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ReactFlow, { Node, Edge, MiniMap, Controls, Background, Handle, NodeProps, Position } from 'reactflow'
import useBoundStore from '@store'
import { AuthContext } from '@services'
import StudentLearningElement from 'src/common/core/StudentLearningElement/StudentLearningElement'
import { useTranslation } from 'react-i18next'
import 'reactflow/dist/style.css'
import { DefaultSkeleton as Skeleton } from '@common/components'
import { useTopic as _useTopic, TopicHookReturn } from './Topic.hooks'

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
    classification: 'RQ',
    university: 'HS-KE',
    created_by: 'Dimitri Bigler',
    created_at: 'Wed, 05 Apr 2023 13:38:28 GMT',
    last_updated: 'null',
    student_learning_element: studentLearningElement
  },
  {
    id: 5,
    lms_id: 108,
    name: 'Übung 1 - leicht',
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
    name: 'Übung 2 - leicht',
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
    name: 'Übung 3 leicht',
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
    name: 'Animation cool',
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
    name: 'Animation cool 2',
    activity_type: 'h5pactivity',
    classification: 'AN', // AN
    university: 'HS-KE',
    created_by: 'Dimitri Bigler',
    created_at: 'Wed, 05 Apr 2023 13:38:28 GMT',
    last_updated: 'null',
    student_learning_element: studentLearningElement
  }
]

const learningPathLearningElements: LearningPathLearningElement[] = [
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

const learningPathData: LearningPath = {
  based_on: 'aoc',
  calculated_on: 'null',
  course_id: 2,
  id: 16,
  path: learningPathLearningElements
}

// TODO: Ab hier relevant
export type TopicProps = {
  useTopic?: typeof _useTopic
}

// TODO: URL-Struktur überlegen bspw. "localhost:3000/topic?topic=1"
const Topic = ({ useTopic = _useTopic }: TopicProps): JSX.Element => {
  // States
  const [initialNodes, setInitialNodes] = useState<Node[]>()
  const [initialEdges, setInitialEdges] = useState<Edge[]>()
  const fetchUser = useBoundStore((state) => state.fetchUser)
  const fetchLearningPath = useBoundStore((state) => state.fetchLearningPath)

  const authcontext = useContext(AuthContext)
  const navigate = useNavigate()
  const { courseId, topicId } = useParams()

  const theme = useTheme()
  const { t } = useTranslation()
  const { url, title, isOpen, handleClose, mapNodes } = useTopic()

  useEffect(() => {
    // request to backend to get learning path for topic
    // alert('Topic: ' + topic)
    // log.log('Topic page')
    // const preventEndlessLoading = setTimeout(() => {
    //   log.log('Topic page timeout')
    //   navigate('/login')
    // }, 5000)
    //if (authcontext.isAuth) {
    //  clearTimeout(preventEndlessLoading)
    //  fetchUser().then((user) => {
    // fetchLearningPath(user.settings.user_id, user.lms_user_id, user.id, Number(courseId), Number(topicId)).then(
    //  (learning_path_data) => {
    //const { nodes, edges } = mapNodes(learning_path_data)
    const { nodes, edges } = mapNodes(learningPathData, theme)
    setInitialNodes(nodes)
    setInitialEdges(edges)
    //})
    // })
    // }
    return () => {
      // clearTimeout(preventEndlessLoading)
    }
  }, [authcontext.isAuth, courseId, fetchLearningPath, fetchUser, theme, topicId])

  log.setLevel('error')

  return initialNodes && initialEdges ? (
    <Box height={'100%'}>
      <ReactFlow nodes={initialNodes} edges={initialEdges} nodeTypes={nodeTypes} fitView>
        <Background gap={16} />
        <MiniMap nodeBorderRadius={2} />
        <Controls />
      </ReactFlow>
      <IFrameModal url={url} title={title} isOpen={isOpen} onClose={handleClose} key={url} />
    </Box>
  ) : (
    <Skeleton variant="rectangular" width={'80%'} height={'80%'} />
  )
}

export default Topic
