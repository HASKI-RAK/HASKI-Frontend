import CheckBoxIcon from '@mui/icons-material/CheckBox'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import { memo, useEffect, useState } from 'react'
import { Box, Checkbox, Fab, FormControlLabel, FormGroup, Grid, Paper, Typography } from '@common/components'
import { LearningPathLearningElement } from '@core'
import RemoteLearningElement from '../../../core/RemoteLearningElement/RemoteLearningElement'
import RemoteTopic from '../../../core/RemoteTopic/RemoteTopic'

type TableLearningElementProps = {
  alreadyCreatedLearningElements: LearningPathLearningElement[]
}

const TableAlreadyCreatedLearningElement = memo(({ alreadyCreatedLearningElements }: TableLearningElementProps) => {
  const [selectedLearningElements, setSelectedLearningElements] =
    useState<LearningPathLearningElement[]>(alreadyCreatedLearningElements)

  useEffect(() => {
    setSelectedLearningElements(alreadyCreatedLearningElements)
  }, [selectedLearningElements, setSelectedLearningElements])

  return (
    <Grid container direction="column" justifyContent="center" alignItems="center">
      {selectedLearningElements.length > 0 && (
        <Grid container direction="column" alignItems="center">
          <Grid item alignItems="center">
            <Typography variant="h6" sx={{ mt: '1rem' }}>
              Already created Learning Elements
            </Typography>
          </Grid>
          <Paper sx={{ padding: '1rem', width: '100%', maxWidth: '49rem' }}>
            <FormGroup>
              {selectedLearningElements.map((LmsTopic) => (
                <FormControlLabel
                  control={<Checkbox disabled checked={true} />}
                  label={<Typography>{LmsTopic.learning_element.name}</Typography>}
                  key={LmsTopic.learning_element.name}
                />
              ))}
            </FormGroup>
          </Paper>
        </Grid>
      )}
    </Grid>
  )
})
// eslint-disable-next-line immutable/no-mutation
TableAlreadyCreatedLearningElement.displayName = 'TableLearningElement'
export default TableAlreadyCreatedLearningElement
