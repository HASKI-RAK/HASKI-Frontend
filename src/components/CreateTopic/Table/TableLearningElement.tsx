import { memo, useState } from 'react'
import { Box, Checkbox, FormControlLabel, FormGroup, Grid, Paper, TableRow, Typography } from '@common/components'
import { SkeletonList } from '@components'
import RemoteLearningElement from '../../../core/RemoteLearningElement/RemoteLearningElement'
import RemoteTopic from '../../../core/RemoteTopic/RemoteTopic'

type TableLearningElementProps = {
  lmsRemoteTopics?: RemoteTopic[]
}

const TableLearningElement = memo(({ lmsRemoteTopics = [] }: TableLearningElementProps) => {
  const [LmsLearningElements, setLmsLearningElements] = useState<RemoteLearningElement[]>([])
  const [view, setView] = useState<string>('list')

  return (
    <Grid container direction="column" justifyContent="center" alignItems="center" spacing={3}>
      <Grid item alignItems="center">
        <Typography variant="h6" sx={{ mt: '1rem' }}>
          Available Learning Elements
        </Typography>
      </Grid>
      {lmsRemoteTopics.length === 0 ? (
        <Grid item alignItems="center">
          <Typography variant="h6" sx={{ mt: '1rem' }}>
            Select a topic to view learning elements
          </Typography>
        </Grid>
      ) : (
        lmsRemoteTopics.map((lmsTopic) => (
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
                    control={<Checkbox />}
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
})
// eslint-disable-next-line immutable/no-mutation
TableLearningElement.displayName = 'TableLearningElement'
export default TableLearningElement
