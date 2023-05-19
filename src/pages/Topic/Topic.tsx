import { nodeTypes, LearningPathLearningElementNode } from '@components'
import { LearningElement, LearningPath, LearningPathLearningElement, LearningPathReturn } from '@core'
import { Box } from '@mui/material'
import log from 'loglevel'
import { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import ReactFlow, { Node, Edge, MiniMap, Controls, Background } from 'reactflow'
import useBoundStore from '@store'
import { AuthContext } from '@services'
import StudentLearningElement from 'src/common/core/StudentLearningElement/StudentLearningElement'

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
    id: 4,
    lms_id: 108,
    name: 'Kurzübersicht',
    activity_type: 'h5pactivity',
    classification: 'EK',
    university: 'HS-KE',
    created_by: 'Dimitri Bigler',
    created_at: 'Wed, 05 Apr 2023 13:38:28 GMT',
    last_updated: 'null',
    student_learning_element: studentLearningElement
  },
  {
    id: 4,
    lms_id: 108,
    name: 'Kurzübersicht',
    activity_type: 'h5pactivity',
    classification: 'AN',
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
    id: 4,
    learning_element_id: 246,
    learning_path_id: 16,
    recommended: true,
    learning_element: learningElement[1]
  },
  {
    position: 3,
    id: 4,
    learning_element_id: 246,
    learning_path_id: 16,
    recommended: true,
    learning_element: learningElement[2]
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
  const [initalNodes, setInitalNodes] = useState<Node[]>()
  const [initalEdges, setInitalEdges] = useState<Edge[]>()
  const authcontext = useContext(AuthContext)
  const { courseId, topicId } = useParams()

  const fetchUser = useBoundStore((state) => state.fetchUser)
  const fetchLearningPath = useBoundStore((state) => state.fetchLearningPath)

  /*useEffect(() => {
    // request to backend to get learning path for topic
    // alert('Topic: ' + topic)
    if (authcontext.isAuth)
      fetchUser()
        .then((user) => {
          fetchLearningPath(user.settings.user_id, user.lms_user_id, user.id, Number(courseId), Number(topicId)).then(
            (learning_path_data) => {
              const nodes = mapLeaningPathToNodes(learning_path_data)
              setInitalNodes(nodes)
              const edges: Edge[] = nodes.map((item, index) => ({
                id: index.toString(),
                source: item.id,
                target: nodes[index + 1]?.id
              }))
              setInitalEdges(edges)
            }
          )
        })
        .catch((error) => {
          // 🍿 snackbar error
          alert('Error: ' + error)
        })
  }, [authcontext.isAuth])*/

  useEffect(() => {
    const nodes = mapLeaningPathToNodes(learningPath)
    setInitalNodes(nodes)
    const edges: Edge[] = nodes.map((item, index) => ({
      id: index.toString(),
      source: item.id,
      target: nodes[index + 1]?.id
    }))
    setInitalEdges(edges)
  })

  log.setLevel('error')
  return initalNodes && initalEdges ? (
    <Box height={'100%'}>
      <ReactFlow nodes={initalNodes} edges={initalEdges} nodeTypes={nodeTypes} fitView></ReactFlow>
    </Box>
  ) : (
    <div>Loading...</div>
  )
}

export default Topic

const mapLeaningPathToNodes = (learning_path: LearningPath) => {
  // alert('map_TopicLearningElements_to_reactflow')
  const sorted_learning_path = learning_path.path.sort((a, b) => a.position - b.position)
  return sorted_learning_path.map((item, index) => {
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
        x: 0,
        y: index * 200
      }
    }
  })
}
