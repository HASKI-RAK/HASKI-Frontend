import { memo, useEffect, useState } from 'react'
import { Checkbox, FormControlLabel, FormGroup, Grid, Paper, TableRow, Typography } from '@common/components'
import { SkeletonList } from '@components'
import { useStore } from '@store'
import RemoteTopic from '../../../core/RemoteTopic/RemoteTopic'

type TableTopicProps = {
  onTopicChange: (selectedTopics: RemoteTopic[]) => void
  selectedTopicsModal: RemoteTopic[]
}

const TableTopic = memo(({ onTopicChange, selectedTopicsModal }: TableTopicProps) => {
  const [LmsTopics, setLmsTopics] = useState<RemoteTopic[]>([])
  const [selectedTopics, setSelectedTopics] = useState<RemoteTopic[]>([])
  const getRemoteTopics = useStore((state) => state.getRemoteTopic)

  useEffect(() => {
    setSelectedTopics(selectedTopicsModal)
    getRemoteTopics(2).then((response) => {
      setLmsTopics(response)
    })
  }, [open, selectedTopics, setSelectedTopics])

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
          <Paper sx={{ padding: '1rem', width: '100%' }}>
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
TableTopic.displayName = 'TableTopic'
export default TableTopic
