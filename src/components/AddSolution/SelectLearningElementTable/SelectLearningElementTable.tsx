import { useParams } from 'react-router-dom'
import { memo, ReactNode, useState, useEffect } from 'react'
import { useStore, usePersistedStore } from '@store'
import { useTranslation } from 'react-i18next'
import { Box, Grid, Typography, FormControlLabel, Checkbox, Paper, FormControl } from '@common/components'
import { LearningElement, RemoteLearningElement, RemoteTopics, Topic } from '@core'

type SelectLearningElementTableProps = {
    currentTopic: Topic
    selectedLearningElements: { [key: number]: RemoteLearningElement[]
    children?: ReactNode
     }
}


const SelectLearningElementTable = (
    { currentTopic, selectedLearningElements, children }: SelectLearningElementTableProps
) => {
    const [learningElements, setLearningElements] = useState<LearningElement[]>([])

    const { courseId } = useParams()
    const { topicId } = useParams()

    const { t } = useTranslation()

    const getLearningPathElement = useStore((state) => state.getLearningPathElement)
    const getUser = usePersistedStore((state) => state.getUser)

    useEffect(() => {
        if (!courseId || !topicId) return
        getUser().then((user) => {
            getLearningPathElement(user.settings.user_id, user.lms_user_id, user.id, courseId)
                .then((learningPathElement) => {
                    const learningElements = learningPathElement.path.map((element) => 
                        element.learning_element)
                    setLearningElements(learningElements)
                })
                .catch((error) => {
                    // Handle error
                })
        })
    })



  return (
    <Grid container direction="column" justifyContent="center" alignItems="center" spacing={3}>
        <Grid item container justifyContent="center">
          <Typography variant="h6" sx={{ mt: '1rem' }}>
            {t('') // add translation key here
            }
          </Typography>
        </Grid>
        {learningElements.map((learningElement) => (
          <Grid
            item
            container
            alignItems="center"
            justifyContent="center"
            direction="column"
            key={'Create Topic - Learning Element Solution: ' + lmsTopic.topic_lms_id}>
            <Paper sx={{ padding: '1rem', width: '95%' }}>
              <Box bgcolor={(theme) => theme.palette.info.light} borderRadius={3}>
                <Grid item container justifyContent="center" alignItems="center">
                  <Typography variant="h6" gutterBottom>
                    {currentTopic.name}
                  </Typography>
                </Grid>
              </Box>
              {learningElements.map((element) => (
                <Grid container alignItems="center" spacing={2} key={element.lms_id}>
                  <Grid item xs={6}>
                    <FormControlLabel control={<Checkbox checked={true} />} label={element.name} />
                  </Grid>
                </Grid>
              ))}
            </Paper>
          </Grid>
        ))}
    </Grid>
  )
}

export default memo(SelectLearningElementTable)