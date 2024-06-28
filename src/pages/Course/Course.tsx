import AddCircleIcon from '@mui/icons-material/AddCircle'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { Box, Button, Card, CardContent, Grid, Stack } from '@common/components'
import { useLearningPathTopicProgress, useMediaQuery, useTheme } from '@common/hooks'
import { SkeletonList, TopicCard, TopicModal } from '@components'
import { usePersistedStore, useStore } from '@store'

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
  const { courseId } = useParams<{ courseId: string }>()
  const { topicProgress, isLoading, topics } = useLearningPathTopicProgress({ courseId })
  const [modalOpen, setModalOpen] = useState(false)

  const handleCloseTopicModal = () => {
    setModalOpen(false)
  }

  const commonButtonStyle = {
    mt: '1rem',
    width: '85%'
  }

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
          <Card
            sx={{
              width: { xs: '10rem', sm: '20rem', md: '40rem', lg: '50rem', xl: '70rem', xxl: '85rem', xxxl: '110rem' },
              mt: '1rem',
              mb: '1rem'
            }}>
            <CardContent>
              <Stack direction="row" justifyContent="center">
                <Button
                  sx={{
                    width: {
                      xs: '6.625rem',
                      sm: '9.625rem',
                      md: '12.625rem',
                      lg: '15.625rem',
                      xl: '18.625rem',
                      xxl: '21.625rem',
                      xxxl: '24.625rem'
                    },
                    mt: '1.625rem'
                  }}
                  id="course-button"
                  variant="contained"
                  color="primary"
                  onClick={() => setModalOpen(true)}>
                  <AddCircleIcon />
                </Button>
              </Stack>
            </CardContent>
            <TopicModal open={modalOpen} handleClose={handleCloseTopicModal}></TopicModal>
          </Card>
        </Grid>
      )}
    </>
  )
}

export default Course
