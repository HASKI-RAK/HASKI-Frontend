import { useParams } from 'react-router-dom'
import { Box, Grid } from '@common/components'
import { useLearningPathTopicProgress, useMediaQuery, useTheme } from '@common/hooks'
import { SkeletonList, TopicCard } from '@components'

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
  const { t } = useTranslation()
  const theme = useTheme()
  const isSmOrDown = useMediaQuery(theme.breakpoints.down('sm'))
  const { courseId } = useParams<{courseId: string}>()
  const { topicProgress, isLoading, topics } = useLearningPathTopicProgress({ courseId })

  return (
    <>
      {isLoading ? (
        // Display skeleton list while loading
        <Box sx={{ flewGrow: 1 }}>
          <Grid container direction="column" justifyContent="center" alignItems="center">
            <Grid item xs sx={{ width: '70%' }}>
              <SkeletonList />
            </Grid>
          </Grid>
        </Box>
      ) : (
        // Display topics once data is loaded
        <Grid container direction="column" justifyContent="center" alignItems="center">
          {topics.map((topic, index) => (
            <TopicCard
              key={topic.id}
              topic={topic}
              calculatedTopicProgress={topicProgress[index]}
              isSmOrDown={isSmOrDown}
            />
          ))}
        </Grid>
      )}
    </>
  )
}

export default Course
