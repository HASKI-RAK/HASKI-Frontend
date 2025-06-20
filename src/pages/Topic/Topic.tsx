import { memo, useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
import ReactFlow, { Background, Controls, Edge, Node, Panel, useReactFlow } from 'reactflow'
import { Grid, Skeleton } from '@common/components'
import {
  CreateLearningElement,
  handleError,
  IFrameModal,
  LabeledSwitch,
  nodeTypes,
  ResponsiveMiniMap
} from '@components'
import { LearningPathElementStatus, User } from '@core'
import { AuthContext, RoleContext, SnackbarContext } from '@services'
import { usePersistedStore, useStore } from '@store'
import { TopicHookReturn, useTopic as _useTopic, useTopicHookParams } from './Topic.hooks'

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
  const navigate = useNavigate()
  const { isAuth } = useContext(AuthContext)
  const { addSnackbar } = useContext(SnackbarContext)
  const { fitView } = useReactFlow()
  const { isCourseCreatorRole } = useContext(RoleContext)
  const [hasCentered, setHasCentered] = useState(false)

  const { courseId, topicId } = useParams()
  const getUser = usePersistedStore((state) => state.getUser)
  const getLearningPathElement = useStore((state) => state.getLearningPathElement)
  const getLearningPathElementStatus = usePersistedStore((state) => state.getLearningPathElementStatus)
  const getDefaultLearningPath = usePersistedStore((state) => state.getDefaultLearningPath)
  const getLearningPathElementSpecificStatus = useStore((state) => state.getLearningPathElementSpecificStatus)
  const setLearningPathElementSpecificStatus = usePersistedStore((state) => state.setLearningPathElementStatus)

  const learningPathElementCache = useStore((state) => state._cache_learningPathElement_record)
  const learningPathLearningElementStatusCache = usePersistedStore((state) => state._learningPathElementStatus)

  const { url, title, lmsId, isOpen, handleClose, mapNodes } = useTopic()

  // Translation
  const { t } = useTranslation()

  // States
  const [initialNodes, setInitialNodes] = useState<Node[]>()
  const [initialEdges, setInitialEdges] = useState<Edge[]>()
  const [learningPathElementStatus, setLearningPathElementStatus] = useState<LearningPathElementStatus[]>()
  const [isGrouped, setIsGrouped] = useState(true)

  const getLearningElementsWithStatus = (learningPathElementStatusData: LearningPathElementStatus[], user: User) => {
    setLearningPathElementStatus(learningPathElementStatusData)

    getLearningPathElement(user.settings.user_id, user.lms_user_id, user.id, courseId, topicId)
      .then((learningPathElementData) => {
        if (learningPathElementData.based_on === 'default') {
          return getDefaultLearningPath(user.settings.user_id, user.lms_user_id).then((defaultLearningPath) => {
            const disabledClassificationsList = defaultLearningPath
              .filter((classificationElement) => classificationElement.disabled)
              .map((classificationElement) => classificationElement.classification)
            return { learningPathElementData, disabledClassificationsList }
          })
        } else {
          return { learningPathElementData, disabledClassificationsList: [] }
        }
      })
      .then(({ learningPathElementData, disabledClassificationsList }) => {
        const { nodes, edges } = mapNodes(
          learningPathElementData,
          learningPathElementStatusData,
          disabledClassificationsList,
          isGrouped
        )
        setInitialNodes(nodes)
        setInitialEdges(edges)
      })
      .catch((error) => {
        handleError(t, addSnackbar, 'error.mapNodes', error, 3000)
      })
  }

  // Effect to handle the fitting of the view when the topic changes with the LocalNav
  // [handleCustomFitView] as dependency because inside of it the fitViewButton changes,
  // that way the reactFlow background is changed before rendering it in a old position from the prev. topic

  // Get status of every learning element for user by request to backend
  // then get every learning element for topic by request to backend
  // Map to nodes and edges and set them as initial nodes and edges
  useEffect(() => {
    if (isAuth && courseId && topicId) {
      getUser()
        .then((user) => {
          getLearningPathElementStatus(courseId, user.lms_user_id)
            .then((learningPathElementStatusData) => {
              return getLearningElementsWithStatus(learningPathElementStatusData, user)
            })
            .catch((error) => {
              handleError(t, addSnackbar, 'error.getLearningElementStatus', error, 3000)
            })
        })
        .catch((error) => {
          handleError(t, addSnackbar, 'error.getUser', error, 3000)
        })
    }
  }, [
    isAuth,
    courseId,
    getLearningPathElement,
    getUser,
    topicId,
    mapNodes,
    navigate,
    setInitialNodes,
    setInitialEdges,
    learningPathElementStatus,
    isGrouped,
    learningPathElementCache,
    learningPathLearningElementStatusCache
  ])

  useEffect(() => {
    setHasCentered(false)
  }, [topicId])

  // custom fitView centering on first uncompleted element
  // currently focuses on first element
  // can also focus on first element that is uncomplete (node.find(node => !node.data?.isDone) || node[0])
  useEffect(() => {
    if (initialNodes && !hasCentered) {
      setTimeout(() => {
        fitView({
          padding: 5,
          minZoom: 0.75,
          duration: 100,
          nodes: [{ id: initialNodes[0].id }]
        })
        setHasCentered(true)
      }, 100)
    }
  }, [initialNodes, navigate, hasCentered])

  /**
   * Update the learning path element status for the user after he closes a learning Element (iframe)
   * @param user
   */
  const updateLearningPathElementStatus = (user: User) => {
    getLearningPathElementSpecificStatus(courseId, user.lms_user_id, lmsId)
      .then((data) => {
        setLearningPathElementSpecificStatus(courseId?.toString(), user.lms_user_id, data[0]).then((data) => {
          setLearningPathElementStatus(data)
        })
      })
      .catch((error) => {
        handleError(t, addSnackbar, 'error.setLearningPathElementSpecificStatus', error, 3000)
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
    <Grid container height={'100%'}>
      <Grid item xs={12}>
        <ReactFlow
          nodes={initialNodes}
          edges={initialEdges}
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={{
            padding: 5,
            minZoom: 0.75,
            nodes: [{ id: initialNodes[0]?.id }]
          }}>
          <ResponsiveMiniMap />
          <Background gap={16} />
          <Panel position="top-right">
            <LabeledSwitch
              labelLeft={t('pages.topic.grouped')}
              labelRight={t('pages.topic.single')}
              isGrouped={isGrouped}
              setIsGrouped={setIsGrouped}
            />
          </Panel>
          {isCourseCreatorRole && (
            <Panel position={'top-right'} style={{ right: '2rem', top: '2.5rem' }}>
              <CreateLearningElement />
            </Panel>
          )}
          <Controls showInteractive={false} position="top-right" style={{ marginTop: 25 }} />
        </ReactFlow>
        <IFrameModal url={url} title={title} isOpen={isOpen} onClose={getHandleClose} key={url} />
      </Grid>
    </Grid>
  ) : (
    <Skeleton variant="rectangular" width={'80%'} height={'80%'} />
  )
}

export default memo(Topic)
