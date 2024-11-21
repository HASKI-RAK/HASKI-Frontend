import { ReactNode, memo } from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Checkbox, Fab, FormControlLabel, FormGroup, Grid, Paper, Typography } from '@common/components'
import { CheckBox, CheckBoxOutlineBlank } from '@common/icons'
import { SkeletonList } from '@components'
import { RemoteLearningElement, RemoteTopics } from '@core'
import { useCreateLearningElementTable } from './CreateLearningElementTable.hooks'

type CreateLearningElementTableProps = {
  selectedTopics: RemoteTopics[]
  onLearningElementChange: (selectedLearningElements: { [key: number]: RemoteLearningElement[] }) => void
  selectedLearningElements: { [key: number]: RemoteLearningElement[] }
  children?: ReactNode
}

const CreateLearningElementTable = ({
  selectedTopics,
  onLearningElementChange,
  selectedLearningElements,
  children
}: CreateLearningElementTableProps) => {
  //Hooks
  const { t } = useTranslation()
  const { handleLearningElementCheckboxChange, handleSelectAllLearningElements, handleDeselectAllLearningElements } =
    useCreateLearningElementTable({ selectedLearningElements, onLearningElementChange, selectedTopics })

  // Return early
  if (selectedTopics.length === 0) {
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
        <Grid item container xs={7} justifyContent="flex-end">
          <Typography variant="h6" sx={{ mt: '1rem' }}>
            {t('components.CreateLearningElementTable.selectLearningElements')}
          </Typography>
        </Grid>
        <Grid item container xs={4} justifyContent="flex-end" sx={{ mr: '1%' }}>
          <Fab
            sx={{ mt: '1rem', mr: '0.5rem', color: (theme) => theme.palette.primary.main, bgcolor: 'white' }}
            onClick={handleSelectAllLearningElements}
            size="medium"
            data-testid={'createLearningElementTable-Select-All-Button'}>
            <CheckBox />
          </Fab>
          <Fab
            sx={{ mt: '1rem', color: (theme) => theme.palette.primary.main, bgcolor: 'white' }}
            onClick={handleDeselectAllLearningElements}
            size="medium"
            data-testid={'createLearningElementTable-Deselect-All-Button'}>
            <CheckBoxOutlineBlank />
          </Fab>
        </Grid>
      </Grid>
      {selectedTopics.map((lmsTopic) => (
        <Grid
          item
          container
          alignItems="center"
          direction="column"
          key={'Create Topic - Learning Element: ' + lmsTopic.topic_lms_id}>
          <Paper sx={{ padding: '1rem', width: '95%' }}>
            <Box bgcolor={(theme) => theme.palette.info.light} borderRadius={3}>
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
                        handleLearningElementCheckboxChange(
                          lmsTopic.topic_lms_id,
                          lmsLearningElement,
                          event.target.checked
                        )
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

export default memo(CreateLearningElementTable)
