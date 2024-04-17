import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
import { Box, Button, Card, CardContent, Grid, Typography } from '@common/components'
import { useMediaQuery, useTheme } from '@common/hooks'
import { CheckBox } from '@common/icons'
import { SkeletonList, StyledLinearProgress, useLearningPathTopic } from '@components'
import { useLearningPathTopicProgress } from './Course.hook'

/**
 * # Course Page
 * Presents an overview of the course.
 * @param props - The props object should be empty.
 * @returns A JSX Element with the rendered course page.
 * @remarks
 * Uses the {@link useLearningPathTopic} hook to get the topics of the course.
 * Uses the {@link LinearProgressWithLabel} hook to calculate the progress of each topic in the course.
 * @category Pages
 */
const Course = (): JSX.Element => {
  const { t } = useTranslation()
  const theme = useTheme()
  const navigate = useNavigate()
  const { courseId } = useParams() as { courseId: string }
  const isSmOrDown = useMediaQuery(theme.breakpoints.down('sm'))

  const { topics, loading: topicLoading } = useLearningPathTopic(courseId)
  const { calculatedTopicProgress, loading: progressLoading } = useLearningPathTopicProgress(courseId, topics)

  return (
    <>
      {topicLoading ? (
        //display skeleton list while loading
        <Box sx={{ flewGrow: 1 }}>
          <Grid container direction="column" justifyContent="center" alignItems="center">
            <Grid item xs zeroMinWidth>
              <Box sx={{ width: '30rem' }}>
                <SkeletonList />
              </Box>
            </Grid>
          </Grid>
        </Box>
      ) : (
        //display topics once data is loaded
        <Grid container direction="column" justifyContent="center" alignItems="center">
          {topics.map((topic, index) => {
            return (
              <Card
                key={topic.id}
                sx={{ width: { xs: '10rem', sm: '20rem', md: '40rem', lg: '40rem', xl: '60rem', xxl: '70rem', xxxl: '80rem' }, mt: '1rem' }}>
                <CardContent>
                  <Grid container direction="column" justifyContent="center" alignItems="center">
                    <Grid item md={1}>
                      {/*if topic is done 100%, a checkbox is displayed*/}
                      {calculatedTopicProgress[index] &&
                        calculatedTopicProgress[index][0] / calculatedTopicProgress[index][1] == 1 && (
                          <CheckBox
                            sx={{
                              mt: '-0.8rem',
                              ml: { xs: '7rem', sm: '17rem', md: '37rem', lg: '37rem', xl: '57rem', xxl: '67rem', xxxl: '77rem' },
                              fontSize: 29
                            }}
                            color={'success'}
                          />
                        )}
                    </Grid>
                    <Grid item md={11}>
                      <Typography variant={isSmOrDown ? 'subtitle1' : 'h5'}>{topic.name}</Typography>
                    </Grid>
                  </Grid>
                  <Grid container item direction="column" justifyContent="center" alignItems="center">
                    <Button
                      id={topic.name.concat('-button').replaceAll(' ', '-')}
                      sx={{
                        width: { xs: '6.625rem', sm: '9.625rem', md: '12.625rem', lg: '15.625rem', xl: '18.625rem' },
                        mt: '1.625rem'
                      }}
                      variant="contained"
                      data-testid={'Course-Card-Topic-' + topic.name}
                      color="primary"
                      onClick={() => {
                        navigate('topic/' + topic.id)
                      }}>
                      {t('pages.course.topicButton')}
                    </Button>
                  </Grid>
                </CardContent>
                {/* Display topic progress bar */}
                <Grid container item direction="row" justifyContent="flex-end" alignItems="flex-end">
                  {calculatedTopicProgress[index] && !progressLoading ? (
                    <StyledLinearProgress learningElementProgressTopics={calculatedTopicProgress} index={index} />
                  ) : (
                    // Display loading state if progress is not available yet
                    <StyledLinearProgress />
                  )}
                </Grid>
              </Card>
            )
          })}
        </Grid>
      )}
    </>
  )
}

export default Course
