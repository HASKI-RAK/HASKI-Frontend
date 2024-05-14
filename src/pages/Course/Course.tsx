import { useParams } from 'react-router-dom'
import { Box, Grid } from '@common/components'
import { useMediaQuery, useTheme } from '@common/hooks'
import { SkeletonList, TopicCard, useLearningPathTopic } from '@components'
import { useCourse } from './Course.hooks'

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
const Course = () => {
  // Hooks
  const theme = useTheme()
  const { courseId } = useParams() as { courseId: string }
  const isSmOrDown = useMediaQuery(theme.breakpoints.down('sm'))
  const { loading, topics } = useLearningPathTopic(courseId)
  const { calculatedTopicProgress } = useCourse()

  return (
    <>
      {loading ? (
        // Display skeleton list while loading
        <Box sx={{ flewGrow: 1 }}>
          <Grid container direction="column" justifyContent="center" alignItems="center" sx={{ ml: '3rem' }}>
            <Grid item xs zeroMinWidth>
              <Box sx={{ width: '30rem' }}>
                <SkeletonList />
              </Box>
            </Grid>
          </Grid>
        </Box>
      ) : (
        // Display topics once data is loaded // TODO: Fix key
        <Grid container direction="column" justifyContent="center" alignItems="center" sx={{ ml: '3rem' }}>
          {topics.map((topic, index) => (
            <TopicCard
              key={''}
              topic={topic}
              calculatedTopicProgress={calculatedTopicProgress}
              index={index}
              isSmOrDown={isSmOrDown}
            />
          ))}
        </Grid>
      )}
    </>
  )
}

export default Course
