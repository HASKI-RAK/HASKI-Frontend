import { Box, Grid } from '@common/components'
import { useMediaQuery, useTheme } from '@common/hooks'
import { SkeletonList, TopicCard } from '@components'
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
  const isSmOrDown = useMediaQuery(theme.breakpoints.down('sm'))
  const { calculatedTopicProgress, isLoading, topics } = useCourse()

  return (
    <>
      {isLoading ? (
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
        // Display topics once data is loaded
        <Grid container direction="column" justifyContent="center" alignItems="center" sx={{ ml: '3rem' }}>
          {topics.map((topic, index) => (
            <TopicCard
              key={topic.id}
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
