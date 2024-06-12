import { memo, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { Divider, Drawer, Grid, List, Typography } from '@common/components'
import { useLearningPathTopicProgress, useMediaQuery, useTheme } from '@common/hooks'
import { LocalNavItem, SkeletonList } from '@components'

/**
 * Local navigation component.
 * @param param - component props. The {@link LocalNavProps#useLearningPathTopic} are
 *   optional.
 * @returns
 * A JSX Element with the rendered local navigation.
 */
const LocalNav = () => {
  //States
  const [drawerHeight, setDrawerHeight] = useState(0)

  //Hooks
  const { t } = useTranslation()
  const { courseId } = useParams<string>()
  const { topicId } = useParams<string>()
  const theme = useTheme()
  const open = useMediaQuery(theme.breakpoints.up('lg'))

  //Hooks
  const { isLoading, topics, topicProgress } = useLearningPathTopicProgress({ courseId })

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
        {isLoading ? (
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
                isProgressLoading={isLoading}
                courseId={courseId}
                topicId={topicId}
              />
            ))}
            <LocalNavItem courseId="1" />
          </List>
        )}
      </Drawer>
    </Grid>
  )
}

export default memo(LocalNav)
