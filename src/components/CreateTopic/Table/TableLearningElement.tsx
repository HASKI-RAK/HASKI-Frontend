import CheckBoxIcon from '@mui/icons-material/CheckBox'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import { memo, useEffect, useState } from 'react'
import { Box, Checkbox, Fab, FormControlLabel, FormGroup, Grid, Paper, Typography } from '@common/components'
import RemoteLearningElement from '../../../core/RemoteLearningElement/RemoteLearningElement'
import RemoteTopic from '../../../core/RemoteTopic/RemoteTopic'

type TableLearningElementProps = {
  selectedTopicsModal: RemoteTopic[]
  onLearningElementChange: (selectedLearningElements: { [key: number]: RemoteLearningElement[] }) => void
  selectedLearningElementsState: { [key: number]: RemoteLearningElement[] }
}

const TableLearningElement = memo(
  ({ selectedTopicsModal, onLearningElementChange, selectedLearningElementsState }: TableLearningElementProps) => {
    const [selectedLearningElements, setSelectedLearningElements] = useState<{
      [key: number]: RemoteLearningElement[]
    }>(selectedLearningElementsState)

    useEffect(() => {
      const allLearningElements = selectedTopicsModal.reduce((acc, topic) => {
        acc[topic.topic_lms_id] = topic.lms_learning_elements
        return acc
      }, {} as { [key: number]: RemoteLearningElement[] })

      setSelectedLearningElements(allLearningElements)
      onLearningElementChange(allLearningElements)
    }, [selectedTopicsModal, onLearningElementChange])

    const handleCheckboxChange = (topicId: number, element: RemoteLearningElement, checked: boolean) => {
      const updatedSelectedElements = {
        ...selectedLearningElements,
        [topicId]: checked
          ? [...(selectedLearningElements[topicId] || []), element]
          : (selectedLearningElements[topicId] || []).filter((el) => el.lms_id !== element.lms_id)
      }

      setSelectedLearningElements(updatedSelectedElements)
      onLearningElementChange(updatedSelectedElements)
    }

    const handleSelectAll = () => {
      const allLearningElements = selectedTopicsModal.reduce((acc, topic) => {
        acc[topic.topic_lms_id] = topic.lms_learning_elements
        return acc
      }, {} as { [key: number]: RemoteLearningElement[] })

      setSelectedLearningElements(allLearningElements)
      onLearningElementChange(allLearningElements)
    }

    const handleDeselectAll = () => {
      const clearedElements = selectedTopicsModal.reduce((acc, topic) => {
        acc[topic.topic_lms_id] = []
        return acc
      }, {} as { [key: number]: RemoteLearningElement[] })

      setSelectedLearningElements(clearedElements)
      onLearningElementChange(clearedElements)
    }

    return (
      <Grid container direction="column" justifyContent="center" alignItems="center" spacing={3}>
        {selectedTopicsModal.length === 0 ? (
          <Grid item>
            <Typography variant="h6" sx={{ mt: '1rem' }}>
              Select a topic to set learning elements
            </Typography>
          </Grid>
        ) : (
          <>
            <Grid item container alignItems="center" justifyContent="space-between" direction="row">
              <Grid item container xs={7.75} justifyContent="flex-end">
                <Typography variant="h6" sx={{ mt: '1rem' }}>
                  Select learning elements
                </Typography>
              </Grid>
              <Grid item xs={1.75}>
                <Fab sx={{ mt: '1rem', mr: '0.5rem', color: '#f2852b', bgcolor: 'white', }} onClick={handleSelectAll} size='medium'>
                  <CheckBoxIcon />
                </Fab>
                <Fab sx={{ mt: '1rem', color: '#f2852b', bgcolor: 'white' }} onClick={handleDeselectAll} size='medium'>
                  <CheckBoxOutlineBlankIcon />
                </Fab>
              </Grid>
            </Grid>
            {selectedTopicsModal.map((lmsTopic) => (
              <Grid item container alignItems="center" justifyContent="center" direction="column">
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
          </>
        )}
      </Grid>
    )
  }
)

TableLearningElement.displayName = 'TableLearningElement'
export default TableLearningElement
