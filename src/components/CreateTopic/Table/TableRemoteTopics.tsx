import { memo, useEffect, useState } from 'react'
import { Checkbox, FormControlLabel, FormGroup, Grid, Paper, TableRow, Typography } from '@common/components'
import { SkeletonList } from '@components'
import { useStore } from '@store'
import RemoteTopic from '../../../core/RemoteTopic/RemoteTopic'

type TableTopicProps = {
  onTopicChange: (selectedTopics: RemoteTopic[]) => void
  selectedTopicsModal: RemoteTopic[]
  remoteTopics: RemoteTopic[]
}

const TableRemoteTopics = memo(({ onTopicChange, selectedTopicsModal, remoteTopics }: TableTopicProps) => {
  const [LmsTopics, setLmsTopics] = useState<RemoteTopic[]>(remoteTopics)
  const [selectedTopics, setSelectedTopics] = useState<RemoteTopic[]>(selectedTopicsModal)
  const getRemoteTopics = useStore((state) => state.getRemoteTopic)

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
        {LmsTopics.length === 0 ? (
          <Grid container direction="column" alignItems="center" xs sx={{ width: '70%' }}>
            <SkeletonList />
          </Grid>
        ) : (
          <Paper sx={{ padding: '1rem', width: '100%', maxWidth: '49rem' }}>
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
          </Paper>
        )}
      </Grid>
    </Grid>
  )
})
// eslint-disable-next-line immutable/no-mutation
TableRemoteTopics.displayName = 'TableRemoteTopics'
export default TableRemoteTopics
