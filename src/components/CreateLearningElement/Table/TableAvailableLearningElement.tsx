import CheckBoxIcon from '@mui/icons-material/CheckBox'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import { memo, useEffect, useState } from 'react'
import { Box, Checkbox, Fab, FormControlLabel, FormGroup, Grid, Paper, Typography } from '@common/components'
import RemoteLearningElement from '../../../core/RemoteLearningElement/RemoteLearningElement'

type TableLearningElementProps = {
  availableLearningElements: RemoteLearningElement[]
  onLearningElementChange: (selectedLearningElements: RemoteLearningElement[]) => void
}

const TableAvailableLearningElement = memo(
  ({ availableLearningElements, onLearningElementChange }: TableLearningElementProps) => {
    const [selectedLearningElements, setSelectedLearningElements] = useState<RemoteLearningElement[]>([])

    useEffect(() => {
      setSelectedLearningElements(availableLearningElements)
    }, [availableLearningElements])

    const handleSelectAll = () => {
      setSelectedLearningElements(availableLearningElements)
      onLearningElementChange(availableLearningElements)
    }

    const handleDeselectAll = () => {
      setSelectedLearningElements([])
      onLearningElementChange([])
    }

    const handleCheckboxChange = (element: RemoteLearningElement, checked: boolean) => {
      const updatedSelectedElements = checked
        ? [...selectedLearningElements, element]
        : selectedLearningElements.filter((el) => el.lms_id !== element.lms_id)

      setSelectedLearningElements(updatedSelectedElements)
      onLearningElementChange(updatedSelectedElements)
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
        {availableLearningElements.length === 0 ? (
          <Grid item alignItems="center">
            <Typography variant="h6" sx={{ mt: '1rem' }}>
              No available Learning Elements.
            </Typography>
          </Grid>
        ) : (
          <Paper sx={{ padding: '1rem', mb: '1rem', maxWidth: '49rem' }}>
            {availableLearningElements.map((lmsElement) => (
              <Grid item key={lmsElement.lms_id} sx={{ width: '100%' }}>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={selectedLearningElements.some((el) => el.lms_id === lmsElement.lms_id)}
                        onChange={(event) => handleCheckboxChange(lmsElement, event.target.checked)}
                      />
                    }
                    label={lmsElement.lms_learning_element_name}
                  />
                </FormGroup>
              </Grid>
            ))}
          </Paper>
        )}
      </Grid>
    )
  }
)
// eslint-disable-next-line immutable/no-mutation
TableAvailableLearningElement.displayName = 'TableAvailableLearningElement'
export default TableAvailableLearningElement
