import { memo, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { Divider, Drawer, Grid, List, Typography } from '@common/components'
import {
  useLearningPathTopic as _useLearningPathTopic,
  useLearningPathTopicProgress,
  useMediaQuery,
  useTheme
} from '@common/hooks'
import { LocalNavItem, SkeletonList } from '@components'
import { Topic } from '@core'

/**
 *  Local navigation component props.
 *  @prop {@link useLearningPathTopic} - hook to get learning path topics
 */
export type LocalNavProps = {
  useLearningPathTopic?: (courseId: string) => { loading: boolean; topics: Topic[] }
}

/**
 * Local navigation component.
 * @param param - component props. The {@link LocalNavProps#useLearningPathTopic} are
 *   optional.
 * @returns
 * A JSX Element with the rendered local navigation.
 */
const LocalNav = ({ useLearningPathTopic = _useLearningPathTopic }: LocalNavProps) => {
  // TODO: Hook should be inserted directly and not via params
  //States
  const [drawerHeight, setDrawerHeight] = useState(0)

  //Hooks
  const { t } = useTranslation()
  const { courseId } = useParams<string>()
  const { topicId } = useParams<string>()
  const theme = useTheme()
  const open = useMediaQuery(theme.breakpoints.up('lg'))

  //Default values
  const definedCourseId = courseId ?? 'default'
  const definedTopicId = topicId ?? 'default'

  //Hooks
  const { topics, loading: topicLoading } = useLearningPathTopic(definedCourseId)
  const { topicProgress, loading: isProgressLoading } = useLearningPathTopicProgress(definedCourseId)

  //Resizing the window resizes drawer height
  useEffect(() => {
    const handleResize = () => {
      setDrawerHeight(window.innerHeight - 200)
    }

    handleResize() // Set initial drawer height

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <Grid container>
      <Drawer
        variant="persistent"
        anchor="left"
        open={open}
        sx={{
          width: '26.5rem',
          height: drawerHeight,
          [`& .MuiDrawer-paper`]: {
            maxWidth: '26.5rem',
            position: 'relative',
            borderRadius: '0rem',
            border: 0,
            backgroundColor: 'transparent'
          }
        }}>
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
              <LocalNavItem
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

export default memo(LocalNav)
