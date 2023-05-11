import { nodeTypes } from '@components'
import { LearningPath } from '@core'
import { Box } from '@mui/material'
import log from 'loglevel'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams, useSearchParams } from 'react-router-dom'
import ReactFlow, { Node, Edge } from 'reactflow'
import useBoundStore from '@store'

const _useTopic = () => {
  const [initalNodes, setInitalNodes] = useState()
  const [initalEdges, setInitalEdges] = useState()
  const [searchParams] = useSearchParams()
  const topic = searchParams.get('topic')

  useEffect(() => {
    if (topic) {
      // request to backend to get learning path for topic
      // alert('Topic: ' + topic)
      // const nodes: TopicNode[] = topiclearningelements_to_nodes(learning_path_mock)
      // setInitalNodes(nodes)
      // const edges: TopicEdge[] = nodes.map((item, index) => ({
      //   id: index.toString(),
      //   source: item.id,
      //   target: item.id
      // }))
      // setInitalEdges(edges)
    }
  }, [topic])

  return { topic }
}

type TopicProps = {
  useTopic?: typeof _useTopic
}
// TODO URL Stuktur übelrgeen. bzswp. localhost:3000/topic?topic=1
const initialNodes = [
  { id: '1', position: { x: 0, y: 0 }, data: { label: '1' } },
  { id: '2', position: { x: 0, y: 100 }, data: { label: '2' } }
]
const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }]
// Topic Page - TODO Component extract
export const Topic = ({ useTopic = _useTopic }: TopicProps): JSX.Element => {
  const [initalNodes, setInitalNodes] = useState<Node[]>()
  const [initalEdges, setInitalEdges] = useState<Edge[]>()
  const { id } = useParams<{ id: string }>()

  const user = useBoundStore((state) => state.user)
  const course = useBoundStore((state) => state.course)
  const fetchLearningPath = useBoundStore((state) =>
    state.fetchLearningPath(user.userId, user.lmsUserId, user.studentId, course.id, Number(id))
  )

  useEffect(() => {
    // request to backend to get learning path for topic
    // alert('Topic: ' + topic)
    fetchLearningPath
      .then((learning_path_data) => {
        const nodes = topiclearningelements_to_nodes(learning_path_data)
        setInitalNodes(nodes)
        const edges: Edge[] = nodes.map((item, index) => ({
          id: index.toString(),
          source: item.id,
          target: nodes[index + 1]?.id
        }))
        setInitalEdges(edges)
        console.log('nodes', nodes)
        console.log('edges', edges)
      })
      .catch((error) => {
        console.log(error) // 🍿 snackbar error
        alert('Error: ' + error)
      })
  }, [fetchLearningPath])

  log.setLevel('error')
  return initalNodes && initalEdges ? (
    <Box height={'100%'}>
      <ReactFlow fitView nodes={initalNodes} edges={initalEdges} nodeTypes={nodeTypes} />
      {/* {design_patterns_general.map((item) => (
        <Card
          key={item.name}
          sx={{ p: 2, m: 2 }}
          onClick={() => {
            setIsOpen(true)
            setUrl(item.link)
            setTitle(item.name)
          }}>
          <h2>{item.name}</h2>
          <p>{item.description}</p>
        </Card>
      ))} */}
      {/* <IframeModal url={url} title={title} isOpen={isOpen} onClose={() => setIsOpen(false)} /> */}
    </Box>
  ) : (
    <div>Loading...</div>
  )
}

export default Topic

type TopicNode = {
  lms_id: number
  label: string
  activity_type: string
  classification: string
  done: boolean
  done_at: string
  recommended: boolean
}

const topiclearningelements_to_nodes = (learning_path: LearningPath) => {
  // alert('map_TopicLearningElements_to_reactflow')
  return learning_path.path.map((item, index) => {
    return {
      id: item.position.toString(),
      type: 'basic',
      data: {
        lms_id: item.learning_element.lms_id,
        label: item.learning_element.name,
        activity_type: item.learning_element.activity_type,
        classification: item.learning_element.classification,
        done: item.learning_element.student_learning_element.done,
        done_at: item.learning_element.student_learning_element.done_at,
        recommended: item.recommended
      },
      position: {
        x: 0,
        y: index * 200
      }
    }
  })
}
