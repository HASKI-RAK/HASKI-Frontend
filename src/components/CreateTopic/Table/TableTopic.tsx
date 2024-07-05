import { memo, useEffect, useState } from 'react'
import { Checkbox, FormControlLabel, FormGroup, Grid, Paper, TableRow, Typography } from '@common/components'
import { SkeletonList } from '@components'
import RemoteTopic from '../../../core/RemoteTopic/RemoteTopic'
import { fetchRemoteTopics } from '../../../services/RemoteTopics/fetchRemoteTopics'

type TableTopicProps = {
  open?: boolean
  onTopicChange: (selectedTopics: RemoteTopic[]) => void
}

const TableTopic = memo(({ open = false, onTopicChange }: TableTopicProps) => {
  const [LmsTopics, setLmsTopics] = useState<RemoteTopic[]>([])
  const [selectedTopics, setSelectedTopics] = useState<RemoteTopic[]>([])

  useEffect(() => {
    const savedTopics = localStorage.getItem('selectedTopics')
    if (savedTopics) {
      setSelectedTopics(JSON.parse(savedTopics))
    }

    if (LmsTopics.length === 0) {
      fetchRemoteTopics(2).then((response) => {
        setLmsTopics(response)
      })
    }
  }, [open])

  const handleTopicChange = (topic: RemoteTopic, checked: boolean) => {
    const updatedTopics = checked
      ? [...selectedTopics, topic]
      : selectedTopics.filter((t) => t.topic_id !== topic.topic_id)
    setSelectedTopics(updatedTopics)
    localStorage.setItem('selectedTopics', JSON.stringify(updatedTopics))
    onTopicChange(updatedTopics)
  }

  return (
    <Grid container direction="column" alignItems="center" spacing={3}>
      <Grid item alignItems="center">
        <Typography variant="h6" sx={{ mt: '1rem' }}>
          Available Topics
        </Typography>
      </Grid>
      <Grid item container alignItems="stretch" direction="row">
        <Paper sx={{ padding: '1rem', width: '100%' }}>
          {LmsTopics.length === 0 ? (
            <TableRow key={'TableTopicTableRow'}>
              <SkeletonList />
            </TableRow>
          ) : (
            <FormGroup>
              {LmsTopics.map((LmsTopic) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedTopics.some((topic) => topic.topic_id === LmsTopic.topic_id)}
                      onChange={(event) => handleTopicChange(LmsTopic, event.target.checked)}
                    />
                  }
                  label={LmsTopic.topic_name}
                  key={LmsTopic.topic_id}
                />
              ))}
            </FormGroup>
          )}
        </Paper>
      </Grid>
    </Grid>
  )
})
// eslint-disable-next-line immutable/no-mutation
TableTopic.displayName = 'TableTopic'
export default TableTopic
