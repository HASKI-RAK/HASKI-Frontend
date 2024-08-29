import { ReactNode, memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Checkbox, Fab, FormControlLabel, FormGroup, Grid, Paper, Typography } from '@common/components'
import { CheckBox, CheckBoxOutlineBlank } from '@common/icons'
import { SkeletonList } from '@components'
import { RemoteLearningElement, RemoteTopic } from '@core'

type TableLearningElementProps = {
  selectedTopicsModal: RemoteTopic[]
  onLearningElementChange: (selectedLearningElements: { [key: number]: RemoteLearningElement[] }) => void
  selectedLearningElements: { [key: number]: RemoteLearningElement[] }
  children?: ReactNode
}

const CreateLearningElementTable = memo(
  ({ selectedTopicsModal, onLearningElementChange, selectedLearningElements, children }: TableLearningElementProps) => {
    const { t } = useTranslation()
    const handleCheckboxChange = (topicId: number, element: RemoteLearningElement, checked: boolean) => {
      const updatedSelectedElements = {
        ...selectedLearningElements,
        [topicId]: checked
          ? [...(selectedLearningElements[topicId] || []), element]
          : (selectedLearningElements[topicId] || []).filter((el) => el.lms_id !== element.lms_id)
      }

      onLearningElementChange(updatedSelectedElements)
    }

    const handleSelectAll = useCallback(() => {
      const allLearningElements = selectedTopicsModal.reduce(
        (accumulator, topic) => ({
          ...accumulator,
          [topic.topic_lms_id]: topic.lms_learning_elements
        }),
        {} as { [key: number]: RemoteLearningElement[] }
      )

      onLearningElementChange(allLearningElements)
    }, [onLearningElementChange, selectedTopicsModal])

    const handleDeselectAll = useCallback(() => {
      const clearedElements = selectedTopicsModal.reduce(
        (accumulator, topic) => ({
          ...accumulator,
          [topic.topic_lms_id]: []
        }),
        {} as { [key: number]: RemoteLearningElement[] }
      )

      onLearningElementChange(clearedElements)
    }, [onLearningElementChange, selectedTopicsModal])

    // Return early
    if (selectedTopicsModal.length === 0) {
      return (
        <Grid container direction="column" justifyContent="center" alignItems="center" spacing={3}>
          <Grid container direction="column" alignItems="center" sx={{ mt: '2rem' }}>
            <SkeletonList />
            {children}
          </Grid>
        </Grid>
      )
    }

    return (
      <Grid container direction="column" justifyContent="center" alignItems="center" spacing={3}>
        <Grid item container alignItems="center" justifyContent="space-between">
          <Grid item container xs={7.75} justifyContent="flex-end">
            <Typography variant="h6" sx={{ mt: '1rem' }}>
              {t('components.TableLearningElements.selectLearningElements')}
            </Typography>
          </Grid>
          <Grid item xs={1.75}>
            <Fab
              sx={{ mt: '1rem', mr: '0.5rem', color: '#f2852b', bgcolor: 'white' }}
              onClick={handleSelectAll}
              size="medium">
              <CheckBox />
            </Fab>
            <Fab sx={{ mt: '1rem', color: '#f2852b', bgcolor: 'white' }} onClick={handleDeselectAll} size="medium">
              <CheckBoxOutlineBlank />
            </Fab>
          </Grid>
        </Grid>
        {selectedTopicsModal.map((lmsTopic) => (
          <Grid
            item
            container
            alignItems="center"
            direction="column"
            key={'Create Topic - Learning Element: ' + lmsTopic.topic_lms_id}>
            <Paper sx={{ padding: '1rem', width: '95%' }}>
              <Box bgcolor={'rgba(255,168,45,0.34)'} borderRadius={3}>
                <Grid container justifyContent="center" alignItems="center">
                  <Typography variant="h6" gutterBottom>
                    {lmsTopic.topic_lms_name}
                  </Typography>
                </Grid>
              </Box>
              <FormGroup>
                {lmsTopic.lms_learning_elements.map((lmsLearningElement) => (
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={(selectedLearningElements[lmsTopic.topic_lms_id] || []).some(
                          (el) => el.lms_id === lmsLearningElement.lms_id
                        )}
                        onChange={(event) =>
                          handleCheckboxChange(lmsTopic.topic_lms_id, lmsLearningElement, event.target.checked)
                        }
                      />
                    }
                    label={lmsLearningElement.lms_learning_element_name}
                    key={lmsLearningElement.lms_id}
                  />
                ))}
              </FormGroup>
            </Paper>
          </Grid>
        ))}
        {children}
      </Grid>
    )
  }
)
// eslint-disable-next-line immutable/no-mutation
CreateLearningElementTable.displayName = 'TableLearningElement'
export default CreateLearningElementTable
