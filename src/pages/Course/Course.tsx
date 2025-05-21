import { useContext, useState } from 'react'
import { useParams } from 'react-router-dom'

import { Box, Button, Card, CardContent, Grid, Stack } from '@common/components'
import { useLearningPathTopicProgress, useMediaQuery, useTheme } from '@common/hooks'
import { AddCircle } from '@common/icons'
import { CreateTopicModal, SkeletonList, TopicCard } from '@components'
import { RoleContext } from '@services'
import { usePersistedStore, useStore } from '@store'

/**
 * # Course Page
 * Presents an overview of the course.
 * @param props - The props object should be empty.
 * @returns A JSX Element with the rendered course page.
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

  //Store
  const clearLearningPathTopicCache = useStore((state) => state.clearLearningPathTopicCache)
  const clearLearningPathElementCache = useStore((state) => state.clearLearningPathElementCache)
  const clearLearningPathElementStatusCache = usePersistedStore((state) => state.clearLearningPathElementStatusCache)

  const handleCloseTopicModal = () => {
    clearLearningPathTopicCache()
    clearLearningPathElementCache()
    clearLearningPathElementStatusCache()
    setCreateTopicModalOpen(false)
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
                    id="create-topic-button"
                    data-testid="create-topic-button"
                    variant="contained"
                    color="primary"
                    onClick={() => setCreateTopicModalOpen(true)}>
                    <AddCircle />
                  </Button>
                </Stack>
              </CardContent>
              <CreateTopicModal
                openCreateTopicModal={createTopicModalOpen}
                handleCloseCreateTopicModal={handleCloseTopicModal}></CreateTopicModal>
            </Card>
          )}
        </Grid>
      )}
    </>
  )
}

export default Course
