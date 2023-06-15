import { useTopic as _useTopic, useTopicHookParams, TopicHookReturn } from './Topic.hooks'
import { DefaultBox as Box, DefaultSkeleton as Skeleton } from '@common/components'
import ReactFlow, { Node, Edge, MiniMap, Controls, Background } from 'reactflow'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState, useContext } from 'react'
import { IFrameModal, nodeTypes } from '@components'
import { useTheme } from '@mui/material' // TODO: DI?
import { AuthContext } from '@services'
import useBoundStore from '@store'

export type TopicProps = {
  useTopic?: (params?: useTopicHookParams) => TopicHookReturn
}

// TODO: URL-Struktur überlegen bspw. "localhost:3000/topic?topic=1"
const Topic = ({ useTopic = _useTopic }: TopicProps): JSX.Element => {
  const theme = useTheme()
  const navigate = useNavigate()
  const authcontext = useContext(AuthContext)

  const { courseId, topicId } = useParams()
  const { url, title, isOpen, handleClose, mapNodes } = useTopic()
  const fetchUser = useBoundStore((state) => state.fetchUser)
  const fetchLearningPath = useBoundStore((state) => state.fetchLearningPath)

  // States
  const [initialNodes, setInitialNodes] = useState<Node[]>()
  const [initialEdges, setInitialEdges] = useState<Edge[]>()

  // Get learning path for topic by request to backend
  useEffect(() => {
    const preventEndlessLoading = setTimeout(() => {
      navigate('/login')
    }, 5000)
    if (authcontext.isAuth) {
      clearTimeout(preventEndlessLoading)
      fetchUser().then(
        (user) => {
          fetchLearningPath(user.settings.userId, user.lmsUserId, user.id, Number(courseId), Number(topicId)).then(
            (learningPathData) => {
              const { nodes, edges } = mapNodes(learningPathData, theme)
              setInitialNodes(nodes)
              setInitialEdges(edges)
            },
            () => console.log('innerFailed') // TODO: Maybe add Snackbar
          )
        },
        () => console.log('failed')
      ) // TODO: Maybe add Snackbar
    }
    return () => {
      clearTimeout(preventEndlessLoading)
    }
  }, [authcontext.isAuth, courseId, fetchLearningPath, fetchUser, theme, topicId, mapNodes, navigate])

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
