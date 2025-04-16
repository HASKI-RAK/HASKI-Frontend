import { Box, Grid, Typography } from '@common/components'
import { useMediaQuery, useTheme } from '@common/hooks'
import { SkeletonList, TopicCard } from '@components'
import { Topic } from '@core'

const mockTopics: Topic[] = [
  {
    contains_le: true,
    created_at: 'Thu, 23 Jan 2025 00:00:00 GMT',
    created_by: 'Admin User',
    id: 2,
    is_topic: true,
    last_updated: null,
    lms_id: 19,
    name: 'Themenbereich 1',
    parent_id: null,
    student_topic: {
      done: false,
      done_at: null,
      id: 4,
      student_id: 2,
      topic_id: 2,
      visits: []
    },
    university: 'HS-KE'
  },
  {
    contains_le: true,
    created_at: 'Thu, 23 Jan 2025 00:00:00 GMT',
    created_by: 'Admin User',
    id: 3,
    is_topic: true,
    last_updated: null,
    lms_id: 21,
    name: 'Themenbereich 2',
    parent_id: null,
    student_topic: {
      done: false,
      done_at: null,
      id: 8,
      student_id: 2,
      topic_id: 3,
      visits: []
    },
    university: 'HS-KE'
  },
  {
    contains_le: true,
    created_at: 'Thu, 23 Jan 2025 00:00:00 GMT',
    created_by: 'Admin User',
    id: 4,
    is_topic: true,
    last_updated: null,
    lms_id: 22,
    name: 'Themenbereich 3',
    parent_id: null,
    student_topic: {
      done: false,
      done_at: null,
      id: 14,
      student_id: 2,
      topic_id: 4,
      visits: []
    },
    university: 'HS-KE'
  }
]

const mockTopicProgress: [number, number][] = [
  [0, 2],
  [1, 1],
  [1, 3]
]

const TopicsLearningPath = () => {
  const theme = useTheme()
  const isSmOrDown = useMediaQuery(theme.breakpoints.down('sm'))
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container direction="column" justifyContent="center" alignItems="center">
        {mockTopics.map((topic, index) => (
          <TopicCard
            key={topic.id}
            topic={topic}
            calculatedTopicProgress={mockTopicProgress[index]}
            isSmOrDown={isSmOrDown}
          />
        ))}
      </Grid>
      <Grid container direction="column" justifyContent="center" alignItems="center">
        <Typography variant={'h4'}>...</Typography>
      </Grid>
      <Grid container direction="column" justifyContent="center" alignItems="center">
        <Grid item xs sx={{ width: '70%' }}>
          <SkeletonList />
        </Grid>
      </Grid>
    </Box>
  )
}

export default TopicsLearningPath
