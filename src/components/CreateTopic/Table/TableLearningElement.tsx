import CheckBoxIcon from '@mui/icons-material/CheckBox'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import { memo, useEffect, useState } from 'react'
import { Box, Checkbox, Fab, FormControlLabel, FormGroup, Grid, Paper, Typography } from '@common/components'
import RemoteLearningElement from '../../../core/RemoteLearningElement/RemoteLearningElement'
import RemoteTopic from '../../../core/RemoteTopic/RemoteTopic'

type TableLearningElementProps = {
  selectedTopicsModal: RemoteTopic[]
  onLearningElementChange: (selectedLearningElements: RemoteLearningElement[]) => void
  selectedLearningElementsState: RemoteLearningElement[]
}

const TableLearningElement = memo(
  ({ selectedTopicsModal, onLearningElementChange, selectedLearningElementsState }: TableLearningElementProps) => {
    const [selectedLearningElements, setSelectedLearningElements] =
      useState<RemoteLearningElement[]>(selectedLearningElementsState)

    useEffect(() => {
      const allLearningElements = selectedTopicsModal.flatMap((topic) => topic.learning_elements)
      const currentLearningElementIds = new Set(selectedLearningElements.map((el) => el.lms_id))

      // Merge existing selected elements with new learning elements
      const mergedSelectedLearningElements = selectedLearningElements
        .filter((el) => allLearningElements.some((newEl) => newEl.lms_id === el.lms_id))
        .concat(allLearningElements.filter((el) => currentLearningElementIds.has(el.lms_id)))

      setSelectedLearningElements(mergedSelectedLearningElements)
      onLearningElementChange(mergedSelectedLearningElements)
    }, [selectedTopicsModal])

    const handleCheckboxChange = (topicId: number, element: RemoteLearningElement, checked: boolean) => {
      const updatedSelectedElements = checked
        ? [...selectedLearningElements, element]
        : selectedLearningElements.filter((el) => el.lms_id !== element.lms_id)

      setSelectedLearningElements(updatedSelectedElements)
      onLearningElementChange(updatedSelectedElements)
    }

    const handleSelectAll = () => {
      const allLearningElements = selectedTopicsModal.flatMap((topic) => topic.learning_elements)
      setSelectedLearningElements(allLearningElements)
      onLearningElementChange(allLearningElements)
    }

    const handleDeselectAll = () => {
      setSelectedLearningElements([])
      onLearningElementChange([])
    }

    return (
      <Grid container direction="column" justifyContent="center" alignItems="center" spacing={3}>
        <Grid item container alignItems="center" justifyContent="space-between" direction="row">
          <Grid item container xs={8.25} justifyContent="flex-end">
            <Typography variant="h6" sx={{ mt: '1rem' }}>
              Available Learning Elements
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Fab sx={{ mt: '1rem', mr: '1rem', color: '#f2852b', bgcolor: 'white' }} onClick={handleSelectAll}>
              <CheckBoxIcon />
            </Fab>
            <Fab sx={{ mt: '1rem', color: '#f2852b', bgcolor: 'white' }} onClick={handleDeselectAll}>
              <CheckBoxOutlineBlankIcon />
            </Fab>
          </Grid>
        </Grid>
        {selectedTopicsModal.length === 0 ? (
          <Grid item alignItems="center">
            <Typography variant="h6" sx={{ mt: '1rem' }}>
              Select a topic to view learning elements
            </Typography>
          </Grid>
        ) : (
          selectedTopicsModal.map((lmsTopic) => (
            <Grid item key={lmsTopic.topic_id} sx={{ width: '100%' }}>
              <Paper sx={{ padding: '1rem', mb: '1rem' }}>
                <Box bgcolor={'rgba(255,168,45,0.34)'} borderRadius={3}>
                  <Grid item container justifyContent="center" alignItems="center">
                    <Typography variant="h6" gutterBottom>
                      {lmsTopic.topic_name}
                    </Typography>
                  </Grid>
                </Box>
                <FormGroup>
                  {lmsTopic.learning_elements.map((lmsLearningElement) => (
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={selectedLearningElements.some((el) => el.lms_id === lmsLearningElement.lms_id)}
                          onChange={(event) =>
                            handleCheckboxChange(lmsTopic.topic_id, lmsLearningElement, event.target.checked)
                          }
                        />
                      }
                      label={lmsLearningElement.learning_element_name}
                      key={lmsLearningElement.lms_id}
                    />
                  ))}
                </FormGroup>
              </Paper>
            </Grid>
          ))
        )}
      </Grid>
    )
  }
)
// eslint-disable-next-line immutable/no-mutation
TableLearningElement.displayName = 'TableLearningElement'
export default TableLearningElement
