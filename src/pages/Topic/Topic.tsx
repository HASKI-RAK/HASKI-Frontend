import { useTopic as _useTopic, useTopicHookParams, TopicHookReturn } from './Topic.hooks'
import ReactFlow, { Node, Edge, MiniMap, Controls, Background, ReactFlowProvider, useReactFlow } from 'reactflow'
import React, { useEffect, useState, useContext, memo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AuthContext, SnackbarContext } from '@services'
import { useStore, usePersistedStore } from '@store'
import { IFrameModal, nodeTypes } from '@components'
import { Box, Skeleton, Button } from '@common/components'
import { useTheme } from '@common/hooks'
import { LearningPathElementStatus, User } from '@core'

// custom fitView centering on first uncompleted element, needs to be in the react-flow component
const CustomFitViewButton = ({ node }: { node: Node[] }) => {
  const { fitView } = useReactFlow()
  //console.log(node)
  const firstUncompletedElement = /*node.find(node => !node.data?.isDone) || */ node[0]

  const handleClick = () => {
    //with setViewport (useReactFlow) it is possible to set the view to a specific position and zoom
    //(for example first uncomplete node) ({ x: nodeX, y: nodeY, zoom: 1 }, { duration: 500 })
    fitView({
      padding: 5,
      minZoom: 0.75,
      nodes: [{ id: firstUncompletedElement.id }]
    })
  }

  return <Button id="customFitViewButton" style={{ display: 'none' }} onClick={handleClick}/>
}

/**
 * @prop useTopic - Does the heavy work such as mapping nodes and edges and fetching.
 * @interface
 */
export type TopicProps = {
  useTopic?: (params?: useTopicHookParams) => TopicHookReturn
}

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

  // Search for the 'fit view'-button of <Controls/> and trigger click event
  /*const handleFitView = () => {
    const fitViewButton = document.querySelector('.react-flow__controls-button.react-flow__controls-fitview')

    if (fitViewButton) {
      (fitViewButton as HTMLButtonElement).click()
    }
  }*/

  // Trigger the click event of the custom 'fit view'-button
  const handleCustomFitView = () => {
    const fitViewButton = document.getElementById('customFitViewButton')

    if (fitViewButton) {
      fitViewButton.click()
    }
  }

  const fetchLearningElementsWithStatus = async (learningPathElementStatusData: LearningPathElementStatus[], user: User) => {
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
  }

  // Effect to handle the fitting of the view when the topic changes with the LocalNav
  // [handleCustomFitView] as dependency because inside of it the fitViewButton changes,
  // that way the reactFlow background is changed before rendering it in a old position from the prev. topic
  useEffect(() => {
      handleCustomFitView()
  }, [handleCustomFitView])

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
              return fetchLearningElementsWithStatus(learningPathElementStatusData, user)
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

  const updateLearningPathElementStatus = async (user: User) => {
    getLearningPathElementSpecificStatus(courseId, user.lms_user_id, lmsId)
    .then((data) => {
      setLearningPathElementSpecificStatus(courseId?.toString(), user.lms_user_id, data[0]).then((data) => {
        setLearningPathElementStatus(data)
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

  // On Close of IFrameModal, fetch new LearningPathElementStatus, update it in
  // the persisted store and return it. Then close the IFrameModal and rerender page.
  // Catch for getUser is handled in the useEffect
  const getHandleClose = () => {
    getUser().then((user) => {
      return updateLearningPathElementStatus(user)
    })
    return handleClose()
  }

  // Show Loading-Skeleton until Nodes, Edges and LearningPathElementStatus are loaded
  return initialNodes && initialEdges && learningPathElementStatus ? (
    <Box height={'100%'}>
      <ReactFlowProvider>
        <ReactFlow
          nodes={initialNodes}
          edges={initialEdges}
          nodeTypes={nodeTypes}
          fitView
          onInit={() => {
            setTimeout(() => {
              handleCustomFitView()
            }, 0)
          }}
          fitViewOptions={{
            padding: 5,
            minZoom: 0.75,
            nodes: [{ id: initialNodes[0].id }]
          }}>
          <CustomFitViewButton node={initialNodes} />
          <Background gap={16} />
          <MiniMap nodeBorderRadius={2} />
          <Controls />
        </ReactFlow>
      </ReactFlowProvider>
      <IFrameModal url={url} title={title} isOpen={isOpen} onClose={getHandleClose} key={url} />
    </Box>
  ) : (
    <Skeleton variant="rectangular" width={'80%'} height={'80%'} />
  )
}

export default memo(Topic)
