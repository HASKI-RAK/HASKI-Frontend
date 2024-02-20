import { Box, Divider, Typography, Stack, List, ListItem, ListItemText, Grid } from '@common/components'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
import { Topic } from '@core'
import {
  SkeletonList, StyledLinearProgress, useLearningPathTopic,
  useLearningPathTopic as _useLearningPathTopic
} from '@components'
import { ListItemButton } from '@mui/material'
import { useTheme, useMediaQuery } from '@common/hooks'
import { useContext, useEffect, useState } from 'react'
import { AuthContext, SnackbarContext } from '@services'
import { usePersistedStore, useStore } from '@store'
import log from 'loglevel'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord'

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
  const theme = useTheme()
  const { courseId, topicId } = useParams() as { courseId: string; topicId: string }
  const navigate = useNavigate()
  const { loading, topics } = useLearningPathTopic(courseId)
  const isSmOrSmaller = useMediaQuery(theme.breakpoints.down('sm'))
  const authContext = useContext(AuthContext)
  const { addSnackbar } = useContext(SnackbarContext)

  const getUser = usePersistedStore((state) => state.getUser)
  const getLearningPathElement = useStore((state) => state.getLearningPathElement)
  const getLearningPathElementStatus = usePersistedStore((state) => state.getLearningPathElementStatus)

  const [calculatedTopicProgress, setCalculatedTopicProgress] = useState<number[][]>([[]])

  useEffect(() => {
    const preventEndlessLoading = setTimeout(() => {
      log.log('Course timeout')
      navigate('/login')
    }, 1000)

    if(authContext.isAuth) {
      clearTimeout(preventEndlessLoading)
      Promise.all(
        topics.map((topic) => {
          return getUser().then((user) => {
            return getLearningPathElementStatus(courseId, user.lms_user_id).then((learningPathElementStatusData) => {
              //filter all learning elements with state 1 (done)
              const allDoneLearningElements = learningPathElementStatusData.filter((learningPathElementStatus) => {
                return learningPathElementStatus.state === 1
              })
              return getLearningPathElement(
                user.settings.user_id,
                user.lms_user_id,
                user.id,
                courseId,
                topic.id.toString()
              ).then((allLearningElementsInTopic) => {
                //filter all learning elements in topic for done learning elements
                const allDoneLearningElementsInTopic = allLearningElementsInTopic.path.map((learningElement) => {
                  return allDoneLearningElements.some(
                    (status) => status.cmid === learningElement.learning_element.lms_id
                  )
                })
                //build a array[][] with the number of done learning elements and the number of all learning elements in topic
                //do that for every topic, and lastly return an array with all the arrays for every topic
                //example: [[1,2],[2,2],[0,2]]
                return [
                  allDoneLearningElementsInTopic.filter((stateDone) => stateDone).length,
                  allLearningElementsInTopic.path.length
                ]
              }).catch((error: string) => {
                addSnackbar({
                  message: error,
                  severity: 'error',
                  autoHideDuration: 3000
                })
                return []
              })
            }).catch((error: string) => {
              addSnackbar({
                message: error,
                severity: 'error',
                autoHideDuration: 3000
              })
              return []
            })
          })
        })
      ).then((result) => {
        // Handle resulting array with calculated topic progress
        setCalculatedTopicProgress(result)
      })
    }

    return () => {
      clearTimeout(preventEndlessLoading)
    }
  }, [authContext.isAuth, courseId, navigate, topics, getUser, getLearningPathElement, getLearningPathElementStatus])

  return (
    <Box flexGrow={1}>
      <Grid sx={{ ml: '0.9rem' }}>
        <Typography variant="h5">{t('appGlobal.topics')}</Typography>
      </Grid>
      <Divider />
      {loading ? (
        <Box>
          <Stack spacing={1}>
            <SkeletonList />
          </Stack>
        </Box>
      ) : (
        <List sx={{ width: '100%', bgcolor: 'background.paper', padding: 0 }}>
          {topics.map((topic, index) => (
            <Box key={topic.id}
                 sx={{ width: '100%', bgcolor: parseInt(topicId) == topic.id ? 'lightgrey' : 'background.paper', borderRadius: 2 }}>
              <ListItem key={topic.id} sx={{ width: '100%', p: 0 }} color={'black'}>
                <ListItemButton
                  key={topic.id}
                  sx={{ width: '100%' }}
                  onClick={() => {
                    navigate(`/course/${courseId}/topic/${topic.id}`)
                  }}>
                  <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <FiberManualRecordIcon
                      sx={{ color: parseInt(topicId) == topic.id ? '#f2852b' : 'rgba(55,55,55,0.65)', width: '0.5rem' }} />
                    <Grid item md={8}>
                      <ListItemText
                        primary={topic.name}
                        primaryTypographyProps={
                          isSmOrSmaller ? { fontSize: 12, fontWeight: 'medium' } : { fontSize: 18, fontWeight: 'medium' }
                        }
                      />
                    </Grid>
                    <Grid item md={3}>
                      {calculatedTopicProgress[index] && (
                        <ListItemText
                          primary={calculatedTopicProgress[index][0] + ' | ' + calculatedTopicProgress[index][1]}
                          primaryTypographyProps={
                            isSmOrSmaller ? { fontSize: 8, fontWeight: 'medium' } : { fontSize: 14, fontWeight: 'medium' }
                          }
                          sx={{ border: 1, borderRadius: 3, borderColor: 'rgba(55,55,55,0.49)', textAlign: 'center', p: 0.25, bgcolor: '#fb9424' }}
                        />
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
