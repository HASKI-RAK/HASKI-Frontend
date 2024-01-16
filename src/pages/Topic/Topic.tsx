import { useTopic as _useTopic, useTopicHookParams, TopicHookReturn } from './Topic.hooks'
import ReactFlow, { Node, Edge, MiniMap, Controls, Background } from 'reactflow'
import { useEffect, useState, useContext, memo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AuthContext, SnackbarContext } from '@services'
import { useStore, usePersistedStore } from '@store'
import { IFrameModal, nodeTypes } from '@components'
import { Box, Skeleton } from '@common/components'
import { useTheme } from '@common/hooks'
import { LearningPathElementStatus } from '@core'

/**
 * @prop useTopic - Does the heavy work such as mapping nodes and edges and fetching.
 * @interface
 */
export type TopicProps = {
  useTopic?: (params?: useTopicHookParams) => TopicHookReturn
}
// TODO: URL-Struktur überlegen bspw. "localhost:3000/topic?topic=1"

/**
 * Topic page.
 *
 * @param props - Dependency injects {@link useTopic}.
 *
 * @remarks
 * Presents a page that displays a learning path containing nodes of learning elements and edges.
 *
 * @category Pages
 */
export const Topic = ({ useTopic = _useTopic }: TopicProps): JSX.Element => {
  const theme = useTheme()
  const navigate = useNavigate()
  const authContext = useContext(AuthContext)
  const { addSnackbar } = useContext(SnackbarContext)

  const { courseId, topicId } = useParams()
  const getUser = usePersistedStore((state) => state.getUser)
  const getLearningPathElement = useStore((state) => state.getLearningPathElement)
  const getLearningPathElementStatus = usePersistedStore((state) => state.getLearningPathElementStatus)
  const getLearningPathElementSpecificStatus = useStore((state) => state.getLearningPathElementSpecificStatus)
  const setLearningPathElementSpecificStatus = usePersistedStore((state) => state.setLearningPathElementStatus)

  const { url, title, lmsId, isOpen, handleClose, mapNodes } = useTopic()

  // States
  const [initialNodes, setInitialNodes] = useState<Node[]>()
  const [initialEdges, setInitialEdges] = useState<Edge[]>()
  const [learningPathElementStatus, setLearningPathElementStatus] = useState<LearningPathElementStatus[]>()

  // Get status of every learning element for user by request to backend
  // then get every learning element for topic by request to backend
  // Map to nodes and edges and set them as initial nodes and edges
  useEffect(() => {
    const preventEndlessLoading = setTimeout(() => {
      navigate('/login')
    }, 1000)
    if (authContext.isAuth && courseId && topicId) {
      clearTimeout(preventEndlessLoading)
      getUser()
        .then((user) => {
          getLearningPathElementStatus(courseId, user.lms_user_id)
            .then((learningPathElementStatusData) => {
              setLearningPathElementStatus(learningPathElementStatusData)
              getLearningPathElement(user.settings.user_id, user.lms_user_id, user.id, courseId, topicId)
                .then((learningPathElementData) => {
                  const { nodes, edges } = mapNodes(learningPathElementData, theme, learningPathElementStatusData)
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
    getLearningPathElement,
    getUser,
    theme,
    topicId,
    mapNodes,
    navigate,
    setInitialNodes,
    setInitialEdges,
    learningPathElementStatus
  ])

  // On Close of IFrameModal, fetch new LearningPathElementStatus, update it in
  // the persisted store and return it. Then close the IFrameModal and rerender page.
  // Catch for getUser is handled in the useEffect
  const handleOwnClose = () => {
    getUser()
    .then((user) => {
      getLearningPathElementSpecificStatus(courseId, user.lms_user_id, lmsId)
      .then((data) => {
        setLearningPathElementSpecificStatus(courseId?.toString(), user.lms_user_id, data[0]).then((data) => {
          setLearningPathElementStatus(data)
          return handleClose()
        })
      })
       .catch((error: string) => {
        addSnackbar({
          message: error,
          severity: 'error',
          autoHideDuration: 3000
        })
        return handleClose()
      })
    })
  }

  // Show Loading-Skeleton until Nodes, Edges and LearningPathElementStatus are loaded
  return initialNodes && initialEdges && learningPathElementStatus ? (
    <Box height={'100%'}>
      <ReactFlow nodes={initialNodes} edges={initialEdges} nodeTypes={nodeTypes} fitView>
        <Background gap={16} />
        <MiniMap nodeBorderRadius={2} />
        <Controls />
      </ReactFlow>
      <IFrameModal url={url} title={title} isOpen={isOpen} onClose={handleOwnClose} key={url} />
    </Box>
  ) : (
    <Skeleton variant="rectangular" width={'80%'} height={'80%'} />
  )
}

export default memo(Topic)
