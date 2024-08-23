import { memo } from 'react'
import { Checkbox, FormControlLabel, FormGroup, Grid, Paper, Typography } from '@common/components'
import { LearningPathTopic } from '@core'

type TableTopicsProps = {
  topics: LearningPathTopic
}

const TableTopics = memo(({ topics }: TableTopicsProps) => {
  console.log(topics)
  return (
    <Grid container direction="column" alignItems="center" spacing={3}>
      <Grid item>
        <Typography variant="h6" sx={{ mt: '1rem' }}>
          Already created topics
        </Typography>
      </Grid>
      <Grid item container>
        <Paper sx={{ padding: '1rem', width: '95%' }}>
          <FormGroup>
            {topics.topics.map((LmsTopic) => (
              <FormControlLabel
                control={<Checkbox disabled checked={true} />}
                label={<Typography>{LmsTopic.name}</Typography>}
                key={LmsTopic.name}
              />
            ))}
          </FormGroup>
        </Paper>
      </Grid>
    </Grid>
  )
})
// eslint-disable-next-line immutable/no-mutation
TableTopics.displayName = 'TableTopics'
export default TableTopics
