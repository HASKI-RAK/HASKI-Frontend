import AddCircleIcon from '@mui/icons-material/AddCircle'
import { useContext, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Box, Button, Card, CardContent, Grid, Stack } from '@common/components'
import { useLearningPathTopicProgress, useMediaQuery, useTheme } from '@common/hooks'
import { CreateTopicModal, SkeletonList, TopicCard } from '@components'
import { RoleContext } from '@services'
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
  const theme = useTheme()
  const isSmOrDown = useMediaQuery(theme.breakpoints.down('sm'))
  const { isCourseCreatorRole } = useContext(RoleContext)
  const { courseId } = useParams<{ courseId: string }>()
  const { topicProgress, isLoading, topics } = useLearningPathTopicProgress({ courseId })
  const [createTopicModalOpen, setCreateTopicModalOpen] = useState<boolean>(false)
  const [successTopicCreated, setSuccessTopicCreated] = useState<boolean>(false)

  //Store
  const triggerLearningPathTopicReload = useStore((state) => state.triggerLearningPathTopicReload)
  const triggerLearningElementReload = useStore((state) => state.triggerLearningElementReload)
  const triggerLearningElementStatusReload = usePersistedStore((state) => state.triggerLearningPathElementStatusReload)

  const handleCloseTopicModal = () => {
    triggerLearningPathTopicReload(true)
    triggerLearningElementReload(true)
    triggerLearningElementStatusReload(true)
    setCreateTopicModalOpen(false)
    setSuccessTopicCreated(false)
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
          {isCourseCreatorRole && (
            <Card
              sx={{
                width: {
                  xs: '10rem',
                  sm: '20rem',
                  md: '40rem',
                  lg: '50rem',
                  xl: '70rem',
                  xxl: '85rem',
                  xxxl: '110rem'
                },
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
                    onClick={() => setCreateTopicModalOpen(true)}>
                    <AddCircleIcon />
                  </Button>
                </Stack>
              </CardContent>
              <CreateTopicModal
                openCreateTopicModal={createTopicModalOpen}
                handleCloseCreateTopicModal={handleCloseTopicModal}
                successTopicCreated={successTopicCreated}
                setSuccessTopicCreated={setSuccessTopicCreated}></CreateTopicModal>
            </Card>
          )}
        </Grid>
      )}
    </>
  )
}

export default Course
