import { memo } from 'react'
import { Checkbox, FormControlLabel, FormGroup, Grid, Paper, Typography } from '@common/components'
import { LearningPathTopic } from '@core'

type TableTopicsProps = {
  topics: LearningPathTopic
}

const TableTopics = memo(({ topics }: TableTopicsProps) => {
  return (
    <Grid container direction="column" alignItems="center">
      <Grid item alignItems="center">
        <Typography variant="h6" sx={{ mt: '1rem' }}>
          Already created Topics
        </Typography>
      </Grid>
      <Paper sx={{ padding: '1rem', width: '100%', maxWidth: '49rem' }}>
        <FormGroup>
          {topics.topics.map((LmsTopic) => (
            <FormControlLabel
              control={<Checkbox disabled checked={true} />}
              label={LmsTopic.name}
              key={LmsTopic.name}
            />
          ))}
        </FormGroup>
      </Paper>
    </Grid>
  )
})
// eslint-disable-next-line immutable/no-mutation
TableTopics.displayName = 'TableTopics'
export default TableTopics
