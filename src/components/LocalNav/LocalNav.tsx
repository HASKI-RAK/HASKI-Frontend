import { Box, Divider, Typography, Stack, List, ListItem, ListItemText, Grid, Skeleton } from '@common/components'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
import { Topic } from '@core'
import { SkeletonList, useLearningPathTopic as _useLearningPathTopic, Fraction } from '@components'
import { ListItemButton } from '@mui/material'
import React from 'react'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord'
import { useLearningPathTopicProgress } from '../../pages/Course/Course.hook'

/**
 *  Local navigation component props.
 *  @prop {@link _useLearningPathTopic} - hook to get learning path topics
 *  @prop {@link _useLearningPathElement} - hook to get learning path elements
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

  const { topics, loading: topicLoading } = useLearningPathTopic(courseId)
  const { calculatedTopicProgress, loading: progressLoading } = useLearningPathTopicProgress(courseId, topics)

  return (
    <Box flexGrow={1} sx={{ minWidth: '20rem' }}>
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
        <List sx={{ width: '100%', bgcolor: 'background.paper', p: 0 }}>
          {topics.map((topic, index) => (
            <Box
              key={topic.id}
              data-testid={`topic-list-item-${topic.id}`}
              sx={{
                width: '100%',
                bgcolor: parseInt(topicId) == topic.id ? 'lightgrey' : 'background.paper',
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
                    <FiberManualRecordIcon
                      sx={{ color: parseInt(topicId) == topic.id ? '#f2852b' : 'rgba(55,55,55,0.65)', width: '0.5rem' }}
                    />
                    <Grid item xs={7} sm={7} md={8} lg={8} xl={8}>
                      <ListItemText
                        primary={topic.name}
                        primaryTypographyProps={{ fontSize: 18 }}
                      />
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
                          primaryTypographyProps={{ p: 0.25, borderRadius: 3, bgcolor: '#e9e9e8' }}
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
    </Box>
  )
}

export default LocalNav
