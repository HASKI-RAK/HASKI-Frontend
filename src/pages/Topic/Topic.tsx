import { memo, useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
import ReactFlow, { Background, Controls, Edge, Node, Panel, useReactFlow } from 'reactflow'
import { Grid, Skeleton } from '@common/components'
import {
  BadgeNotification,
  CreateLearningElement,
  GameFeedback,
  GameSidePanel,
  handleError,
  IFrameModal,
  LabeledSwitch,
  nodeTypes,
  ResponsiveMiniMap
} from '@components'
import { ExperiencePoints, ExperiencePointsPostResponse, LearningPathElementStatus, User } from '@core'
import { AuthContext, postCheckStudentBadge, postExperiencePoints, RoleContext, SnackbarContext } from '@services'
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
  const setExperiencePoints = useStore((state) => state.setExperiencePoints)
  const getTopicBadges = useStore((state) => state.getTopicBadges)
  const setStudentBadge = useStore((state) => state.setStudentBadge)

  const learningPathElementCache = useStore((state) => state._cache_learningPathElement_record)
  const learningPathLearningElementStatusCache = usePersistedStore((state) => state._learningPathElementStatus)

  const { url, title, lmsId, isOpen, learningElementStartTime, currentActivityClassification, handleClose, mapNodes } =
    useTopic()

  // Translation
  const { t } = useTranslation()

  // States
  const [initialNodes, setInitialNodes] = useState<Node[]>()
  const [initialEdges, setInitialEdges] = useState<Edge[]>()
  const [learningPathElementStatus, setLearningPathElementStatus] = useState<LearningPathElementStatus[]>()
  const [isGrouped, setIsGrouped] = useState(true)
  const [experiencePointDetails, setExperiencePointDetails] = useState<ExperiencePointsPostResponse>(
    {} as ExperiencePointsPostResponse
  )
  const [badgeKeys, setBadgeKeys] = useState<string[]>([])
  const [openFeedbackModal, setOpenFeedbackModal] = useState(false)
  const [learningElementEndTime, setLearningElementEndTime] = useState<Date | undefined>(undefined)
  const [numberOfLearningPathElements, setNumberOfLearningPathElements] = useState<number>(0)

  const handleCloseFeedbackModal = () => {
    setOpenFeedbackModal(false)
  }

  const getLearningElementsWithStatus = (learningPathElementStatusData: LearningPathElementStatus[], user: User) => {
    setLearningPathElementStatus(learningPathElementStatusData)

    getLearningPathElement(user.settings.user_id, user.lms_user_id, user.id, courseId, topicId)
      .then((learningPathElementData) => {
        setNumberOfLearningPathElements(learningPathElementData.path.length)
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
          nodes: [{ id: initialNodes[0]?.id }]
        })
        setHasCentered(true)
      }, 100)
    }
  }, [initialNodes, navigate, hasCentered])

  /**
   * Update the learning path element status for the user after he closes a learning Element (iframe)
   * @param user - current user for which the status should be updated
   */
  const updateLearningPathElementStatus = (user: User) => {
    courseId &&
      getLearningPathElementSpecificStatus(courseId, user.lms_user_id, lmsId)
        .then((data) => {
          setLearningPathElementSpecificStatus(courseId.toString(), user.lms_user_id, data[0]).then((data) => {
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
    setLearningElementEndTime(new Date())
    getUser().then((user) => {
      // user.id used as studentId should maybe be replaced in the future
      if (courseId && topicId) {
        postExperiencePoints(user.id, {
          course_id: Number.parseInt(courseId),
          learning_element_id: lmsId,
          user_lms_id: user.lms_user_id.toString(),
          topic_id: Number.parseInt(topicId),
          classification: currentActivityClassification,
          start_time: learningElementStartTime
        })
          .then((experiencePoints) => {
            setExperiencePoints(user.id, {
              experience_points: experiencePoints.total_xp,
              student_id: user.id
            } as ExperiencePoints)
            setExperiencePointDetails(experiencePoints)
            setOpenFeedbackModal(true)
          })
          .catch((error) => {
            // TODO: translation string missing
            handleError(t, addSnackbar, 'error.postExperiencePoints', error, 3000)
          })
        postCheckStudentBadge(user.id, {
          course_id: Number.parseInt(courseId),
          topic_id: Number.parseInt(topicId),
          lms_user_id: user.lms_user_id.toString(),
          timestamp: learningElementStartTime,
          classification: currentActivityClassification
        })
          .then((badges) => {
            getTopicBadges(parseInt(courseId), false).then((topicBadges) => {
              const keys = badges.map((earnedBadge) => {
                const badge = topicBadges.find((topicBadge) => topicBadge.id === earnedBadge.badge_id)
                return badge ? badge.variant_key : ''
              })
              const validKeys = keys.filter((key) => key !== '')
              setBadgeKeys(validKeys)
            })
            setStudentBadge(String(user.id), badges)
          })
          .catch((error) => {
            handleError(t, addSnackbar, 'error.postCheckStudentBadge', error, 3000)
          })
      } else {
        // TODO: translation string missing
        handleError(t, addSnackbar, 'error.noCourseOrTopicId', 'No courseId or topicId given', 3000)
      }
      return updateLearningPathElementStatus(user)
    })
    return handleClose()
  }

  // Show Loading-Skeleton until Nodes, Edges and LearningPathElementStatus are loaded
  return initialNodes && initialEdges && learningPathElementStatus ? (
    <Grid container height={'100%'}>
      <Grid item xs={12}>
        <ReactFlow
          id="react-flow"
          proOptions={{ hideAttribution: true }}
          nodes={initialNodes}
          edges={initialEdges}
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={{
            padding: 5,
            minZoom: 0.75,
            nodes: [{ id: initialNodes[0]?.id }]
          }}>
          <ResponsiveMiniMap style={{ position: 'absolute', right: '5%' }} />
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
          <Controls showInteractive={false} position="bottom-right" style={{ marginTop: 25 }} />
        </ReactFlow>
        <IFrameModal
          url={url}
          title={title}
          isOpen={isOpen}
          onClose={getHandleClose}
          key={url}
          learningElementId={lmsId}
        />
        <GameSidePanel
          experiencePointDetails={experiencePointDetails}
          learningPathElements={initialNodes}
          topicId={topicId}
          numberOfLearningPathElements={numberOfLearningPathElements}
        />
        <BadgeNotification badgeQueue={badgeKeys} />
        <GameFeedback
          open={openFeedbackModal && experiencePointDetails.new_attempt}
          onClose={handleCloseFeedbackModal}
          experiencePointDetails={experiencePointDetails}
          startTime={learningElementStartTime}
          endTime={Number(learningElementEndTime)}
        />
      </Grid>
    </Grid>
  ) : (
    <Skeleton variant="rectangular" width={'80%'} height={'80%'} />
  )
}

export default memo(Topic)
