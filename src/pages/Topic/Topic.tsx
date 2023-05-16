import { nodeTypes, LearningPathLearningElementNode } from '@components'
import { LearningPath } from '@core'
import { Box } from '@mui/material'
import log from 'loglevel'
import { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import ReactFlow, { Node, Edge } from 'reactflow'
import useBoundStore from '@store'
import { AuthContext } from '@services'

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
  const authcontext = useContext(AuthContext)
  const { id } = useParams<{ id: string }>()

  const fetchUser = useBoundStore((state) => state.fetchUser)
  const course = useBoundStore((state) => state.course)
  const fetchLearningPath = useBoundStore((state) => state.fetchLearningPath)

  useEffect(() => {
    // request to backend to get learning path for topic
    // alert('Topic: ' + topic)
    if (authcontext.isAuth)
      fetchUser()
        .then((user) => {
          fetchLearningPath(user.settings.user_id, user.lms_user_id, user.id, 2, Number(id)).then(
            (learning_path_data) => {
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
            }
          )
        })
        .catch((error) => {
          console.log(error) // 🍿 snackbar error
          alert('Error: ' + error)
        })
    else console.log('not logged in')
  }, [authcontext.isAuth])

  log.setLevel('error')
  return initalNodes && initalEdges ? (
    <Box height={'100%'}>
      <ReactFlow fitView nodes={initalNodes} edges={initalEdges} nodeTypes={nodeTypes} />
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
      type: item.learning_element.activity_type,
      data: node_data,
      position: {
        x: 0,
        y: index * 200
      }
    }
  })
}
