import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
import { Divider, Drawer, Typography, Grid, List, ListItem, ListItemButton, ListItemText, Skeleton } from '@common/components'
import { FiberManualRecord } from '@common/icons'
import {
  SkeletonList,
  Fraction
} from '@components'
import { Topic } from '@core'
import { useEffect, useState } from 'react'
import { Theme } from '@common/theme'
import { useMediaQuery, useTheme, useLearningPathTopic as _useLearningPathTopic, useLearningPathTopicProgress } from '@common/hooks'

type TopicListItemProps = {
  topic: Topic;
  topicProgress: number[];
  isProgressLoading: boolean;
  courseId: string;
  topicId: string;
}

/**
 * Topic list item component, displaying a topic with its done learning elements out of total learning elements.
 * @param
 * topic: Topic - The topic to display.
 * index: number - The index of the topic in the topics array.
 * topicProgress: number[][] - The progress of each topic.
 * isProgressLoading: boolean - Whether the progress is loading.
 * courseId: string - The course id.
 * topicId: string - The topic id.
 * @returns
 * A JSX Element with the rendered topic list item.
 */

const TopicListItem = ({ topic, topicProgress, isProgressLoading, courseId, topicId}: TopicListItemProps) => {
  const navigate = useNavigate()
  return (
    <Grid
      key={topic.id}
      data-testid={`topic-list-item-${topic.id}`}
      container
      sx={{
        width: '100%',
        bgcolor: parseInt(topicId) == topic.id ? 'lightgrey' : 'transparent',
        borderRadius: 2
      }}
    >
      <ListItem key={topic.id} sx={{ width: '100%', p: 0 }}>
        <ListItemButton
          key={topic.id}
          sx={{ width: '100%' }}
          onClick={() => {
            navigate(`/course/${courseId}/topic/${topic.id}`)
          }}
        >
          <Grid container direction="row" justifyContent="space-between" alignItems="center">
            <FiberManualRecord
              sx={{
                color:
                  parseInt(topicId) == topic.id
                    ? (theme: Theme) => theme.palette.primary.main
                    : (theme: Theme) => theme.palette.info.dark,
                width: '0.5rem'
              }}
            />
            <Grid item xs={7} sm={7} md={8} lg={8} xl={8}>
              <ListItemText primary={topic.name} primaryTypographyProps={{ fontSize: 18 }} />
            </Grid>
            <Grid item xs={3} sm={3} md={3} lg={2} xl={2}>
              {topicProgress && !isProgressLoading ? (
                <ListItemText
                  primary={
                    <Fraction
                      variant="body1"
                      sx={{ fontSize: 16 }}
                      numerator={topicProgress[0]}
                      denominator={topicProgress[1]}
                    />
                  }
                  primaryTypographyProps={{
                    p: 0.25,
                    borderRadius: 3,
                    bgcolor: (theme: Theme) => theme.palette.info.light
                  }}
                  sx={{ textAlign: 'center' }}
                />
              ) : (
                <Skeleton variant="text" width={'70%'} height={20} sx={{ ml: 2 }} />
              )}
            </Grid>
          </Grid>
        </ListItemButton>
      </ListItem>
    </Grid>
  )
}
/**
 *  Local navigation component props.
 *  @prop {@link useLearningPathTopic} - hook to get learning path topics
 */
export type LocalNavProps = {
  useLearningPathTopic?: (courseId: string) => { loading: boolean; topics: Topic[] }
}

type RouteParams = {
  courseId: string
  topicId: string
}

/**
 * Local navigation component.
 * @param param - component props. The {@link LocalNavProps#useLearningPathTopic} are
 *   optional.
 * @returns
 * A JSX Element with the rendered local navigation.
 */
const LocalNav = ({ useLearningPathTopic = _useLearningPathTopic }: LocalNavProps) => {
  const { t } = useTranslation()
  const { courseId } = useParams<string>()
  const { topicId } = useParams<string>()
  const definedCourseId = courseId ?? "default"
  const definedTopicId = topicId ?? "default"

  const theme = useTheme()
  const open = useMediaQuery(theme.breakpoints.up('lg'))
  const [drawerHeight, setDrawerHeight] = useState(0)

  //Resizing the window resizes drawer height
  useEffect(() => {
    const handleResize = () => {
      setDrawerHeight(window.innerHeight - 200)
    }

    handleResize() // Set initial drawer height

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const { topics, loading: topicLoading } = useLearningPathTopic(definedCourseId)
  const { topicProgress, loading: isProgressLoading } = useLearningPathTopicProgress(definedCourseId, topics)

  return (
    <Grid container>
      <Drawer
        variant='persistent'
        anchor='left'
        open={open}
        sx={{
          width: '26.5rem',
          height: drawerHeight,
          [`& .MuiDrawer-paper`]: {
            maxWidth: '26.5rem',
            position: 'relative',
            borderRadius: '0rem',
            border: 0,
            backgroundColor: 'transparent',
          },
        }}
      >
        <Grid item sx={{ ml: '0.9rem' }}>
          <Typography variant="h5">{t('appGlobal.topics')}</Typography>
        </Grid>
        <Divider />
        {topicLoading ? (
          <Grid container>
            <Grid item>
              <SkeletonList />
            </Grid>
          </Grid>
        ) : (
          <List sx={{ width: '100%', bgcolor: 'transparent', p: 0 }}>
            {topics.map((topic, index) => (
              <TopicListItem
                key={topic.id}
                topic={topic}
                topicProgress={topicProgress[index]}
                isProgressLoading={isProgressLoading}
                courseId={definedCourseId}
                topicId={definedTopicId}
              />
            ))}
          </List>
        )}
      </Drawer>
    </Grid>
  )
}

export default LocalNav
