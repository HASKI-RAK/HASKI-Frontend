import { memo, useEffect, useState } from 'react'
import { Checkbox, FormControlLabel, FormGroup, Grid, TableRow } from '@common/components'
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
    fetchRemoteTopics(2).then((response) => {
      setLmsTopics(response)
    })
  }, [open])

  const handleTopicChange = (topic: RemoteTopic, checked: boolean) => {
    let updatedTopics = []
    if (checked) {
      updatedTopics = [...selectedTopics, topic]
    } else {
      updatedTopics = selectedTopics.filter((t) => t.topic_id !== topic.topic_id)
    }
    setSelectedTopics(updatedTopics)
    onTopicChange(updatedTopics)
  }

  return (
    <Grid container direction="column" justifyContent="center" alignItems="center">
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
    </Grid>
  )
})
// eslint-disable-next-line immutable/no-mutation
TableTopic.displayName = 'TableTopic'
export default TableTopic
