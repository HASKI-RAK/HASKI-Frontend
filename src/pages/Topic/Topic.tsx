import { nodeTypes, LearningPathLearningElementNode } from '@components'
import { LearningPath } from '@core'
import { Box } from '@mui/material'
import log from 'loglevel'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams, useSearchParams } from 'react-router-dom'
import ReactFlow, { Node, Edge } from 'reactflow'
import useBoundStore from '@store'
import { useAuthProvider } from 'src/common/services/AuthProvider/AuthProvider.hooks'

const _useTopic = () => {
  console.log('useTopic')
}

type TopicProps = {
  useTopic?: typeof _useTopic
}
// TODO URL Stuktur übelrgeen. bzswp. localhost:3000/topic?topic=1

// Topic Page - TODO Component extract
export const Topic = ({ useTopic = _useTopic }: TopicProps): JSX.Element => {
  const [initalNodes, setInitalNodes] = useState<Node[]>()
  const [initalEdges, setInitalEdges] = useState<Edge[]>()
  const isAuth = useAuthProvider().isAuth
  const { id } = useParams<{ id: string }>()

  const fetchUser = useBoundStore((state) => state.fetchUser)
  const course = useBoundStore((state) => state.course)
  const fetchLearningPath = useBoundStore((state) => state.fetchLearningPath)

  useEffect(() => {
    // request to backend to get learning path for topic
    // alert('Topic: ' + topic)
    if (isAuth)
      fetchUser()
        .then((user) => {
          fetchLearningPath(user.id, user.lms_user_id, user.id, 1, Number(id)).then((learning_path_data) => {
            const nodes = mapLeaningPathToNodes(learning_path_data)
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
        })
        .catch((error) => {
          console.log(error) // 🍿 snackbar error
          alert('Error: ' + error)
        })
    else alert('Error: ' + 'Not logged in')
  }, [isAuth])

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

const mapLeaningPathToNodes = (learning_path: LearningPath) => {
  // alert('map_TopicLearningElements_to_reactflow')
  return learning_path.path.map((item, index) => {
    const node_data: LearningPathLearningElementNode = {
      lms_id: item.learning_element.lms_id,
      name: item.learning_element.name,
      activity_type: item.learning_element.activity_type,
      classification: item.learning_element.classification,
      done: item.learning_element.student_learning_element.done,
      done_at: item.learning_element.student_learning_element.done_at,
      is_recommended: item.recommended
    }
    return {
      id: item.position.toString(),
      type: 'basic',
      data: node_data,
      position: {
        x: 0,
        y: index * 200
      }
    }
  })
}
