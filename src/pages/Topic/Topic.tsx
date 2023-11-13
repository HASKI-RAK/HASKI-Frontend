import { useTopic as _useTopic, useTopicHookParams, TopicHookReturn } from './Topic.hooks'
import { Box, Skeleton } from '@common/components'
import ReactFlow, { Node, Edge, MiniMap, Controls, Background } from 'reactflow'
import { useNavigate, useParams } from 'react-router-dom'
import { AuthContext, SnackbarContext } from '@services'
import { useEffect, useState, useContext } from 'react'
import { useStore, usePersistedStore } from '@store'
import { IFrameModal, nodeTypes } from '@components'
import { useTheme } from '@common/hooks'

export type TopicProps = {
  /**
   * {@link useTopic | Topic hook} does the heavy work such as mapping nodes and edges
   *  and fetching.
   * @remarks
   * The hook is dependency injected.
   * @defaultValue {@link _useTopic}
   */
  useTopic?: (params?: useTopicHookParams) => TopicHookReturn
}
// TODO: URL-Struktur überlegen bspw. "localhost:3000/topic?topic=1"

/**
 * # Topic Page
 * Presents a page that displays a learning path containing nodes of learning elements and edges.
 * @param props - Dependency injects {@link useTopic}.
 * @category Pages
 */
export const Topic = ({ useTopic = _useTopic }: TopicProps): JSX.Element => {
  const theme = useTheme()
  const navigate = useNavigate()
  const authContext = useContext(AuthContext)
  const { addSnackbar } = useContext(SnackbarContext)

  const { courseId, topicId } = useParams()
  const { url, title, isOpen, handleClose, mapNodes } = useTopic()
  const fetchUser = usePersistedStore((state) => state.fetchUser)
  const fetchLearningPathElement = useStore((state) => state.fetchLearningPathElement)

  // States
  const [initialNodes, setInitialNodes] = useState<Node[]>()
  const [initialEdges, setInitialEdges] = useState<Edge[]>()

  // Get learning path for topic by request to backend
  useEffect(() => {
    const preventEndlessLoading = setTimeout(() => {
      navigate('/login')
    }, 1000)
    if (authContext.isAuth && courseId && topicId) {
      clearTimeout(preventEndlessLoading)
      fetchUser()
        .then((user) => {
          fetchLearningPathElement(user.settings.user_id, user.lms_user_id, user.id, courseId, topicId)
            .then((learningPathElementData) => {
              const { nodes, edges } = mapNodes(learningPathElementData, theme)
              setInitialNodes(nodes)
              setInitialEdges(edges)
            })
            .catch((error: string) => {
              addSnackbar({
                message: error,
                severity: 'error',
                autoHideDuration: 3000
              })
            })
        })
        .catch((error: string) => {
          addSnackbar({
            message: error,
            severity: 'error',
            autoHideDuration: 3000
          })
        })
    }
    return () => {
      clearTimeout(preventEndlessLoading)
    }
  }, [
    authContext.isAuth,
    courseId,
    fetchLearningPathElement,
    fetchUser,
    theme,
    topicId,
    mapNodes,
    navigate,
    setInitialNodes,
    setInitialEdges
  ])

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
