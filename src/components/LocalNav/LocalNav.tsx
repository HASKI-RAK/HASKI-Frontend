import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
import { Box, Divider, Drawer, Stack, Typography, Grid, List, ListItem, ListItemButton, ListItemText, Skeleton } from '@common/components'
import { FiberManualRecord } from '@common/icons'
import {
  SkeletonList,
  useLearningPathTopic as _useLearningPathTopic,
  Fraction
} from '@components'
import { Topic } from '@core'
import React, { useEffect, useState } from 'react'
import { useLearningPathTopicProgress } from './../../pages/Course/Course.hook'
import { Theme } from '@common/theme'
import { useMediaQuery, useTheme } from '@common/hooks'


/**
 *  Local navigation component props.
 *  @prop {@link _useLearningPathTopic} - hook to get learning path topics
 */
export type LocalNavProps = {
  useLearningPathTopic?: (courseId: string) => { loading: boolean; topics: Topic[] }
}

/**
 * Local navigation component.
 * @param param - component props. The {@link LocalNavProps#useLearningPathTopic} and {@link LocalNavProps#useLearningPathElement} are
 *   optional.
 * @returns
 */
const LocalNav = ({ useLearningPathTopic = _useLearningPathTopic }: LocalNavProps) => {
  const { t } = useTranslation()
  const { courseId, topicId } = useParams() as { courseId: string; topicId: string }
  const navigate = useNavigate()

  const theme = useTheme()
  const open = useMediaQuery(theme.breakpoints.up('lg'))
  const [drawerHeight, setDrawerHeight] = useState(0)

  //Resizing windows, also resizes drawer height
  useEffect(() => {
    const handleResize = () => {
      setDrawerHeight(window.innerHeight - 200)
    }

    handleResize() // Set initial drawer height

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const { topics, loading: topicLoading } = useLearningPathTopic(courseId)
  const { calculatedTopicProgress, loading: progressLoading } = useLearningPathTopicProgress(courseId, topics)

  return (
    <Box>
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
      <Grid sx={{ ml: '0.9rem' }}>
        <Typography variant="h5">{t('appGlobal.topics')}</Typography>
      </Grid>
      <Divider />
      {topicLoading ? (
        <Box>
          <Stack spacing={1}>
            <SkeletonList />
          </Stack>
        </Box>
      ) : (
        <List sx={{ width: '100%', bgcolor: 'transparent', p: 0 }}>
          {topics.map((topic, index) => (
            <Box
              key={topic.id}
              data-testid={`topic-list-item-${topic.id}`}
              sx={{
                width: '100%',
                bgcolor: parseInt(topicId) == topic.id ? 'lightgrey' : 'transparent',
                borderRadius: 2
              }}>
              <ListItem key={topic.id} sx={{ width: '100%', p: 0 }} color={'black'}>
                <ListItemButton
                  key={topic.id}
                  sx={{ width: '100%' }}
                  onClick={() => {
                    navigate(`/course/${courseId}/topic/${topic.id}`)
                  }}>
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

                      {calculatedTopicProgress[index] && !progressLoading ? (
                        <ListItemText
                          primary={
                            <Fraction
                              numerator={calculatedTopicProgress[index][0]}
                              denominator={calculatedTopicProgress[index][1]}
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
            </Box>
          ))}
        </List>
      )}
      </Drawer>
      </Box>
  )
}

export default LocalNav
