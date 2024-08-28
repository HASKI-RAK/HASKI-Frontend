import { ReactNode, memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { Checkbox, FormControlLabel, FormGroup, Grid, Paper, Typography } from '@common/components'
import { SkeletonList } from '@components'
import RemoteTopic from '../../../core/RemoteTopic/RemoteTopic'

type TableTopicProps = {
  onTopicChange: (selectedTopics: RemoteTopic[]) => void
  selectedTopicsModal: RemoteTopic[]
  remoteTopics: RemoteTopic[]
  children?: ReactNode
}

const TableRemoteTopics = memo(({ onTopicChange, selectedTopicsModal, remoteTopics, children }: TableTopicProps) => {
  const { t } = useTranslation()
  const handleTopicChange = useCallback(
    (topic: RemoteTopic, checked: boolean) => {
      const updatedTopics = checked
        ? [...selectedTopicsModal, topic]
        : selectedTopicsModal.filter((t) => t.topic_lms_id !== topic.topic_lms_id)
      onTopicChange(updatedTopics)
    },
    [onTopicChange, selectedTopicsModal]
  )

  return (
    <Grid container direction="column" alignItems="center" spacing={3}>
      <Grid item>
        <Typography variant="h6" sx={{ mt: '1rem' }}>
          {t('components.TableRemoteTopics')}
        </Typography>
      </Grid>
      <Grid item container alignItems="stretch" direction="row">
        {remoteTopics.length === 0 ? (
          <Grid container direction="column" alignItems="center">
            <SkeletonList />
          </Grid>
        ) : (
          <Grid item container direction="column" alignItems="center">
            <Paper sx={{ padding: '1rem', width: '95%' }}>
              <FormGroup>
                {remoteTopics.map((LmsTopic) => (
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={selectedTopicsModal.some((topic) => topic.topic_lms_id === LmsTopic.topic_lms_id)}
                        onChange={(event) => handleTopicChange(LmsTopic, event.target.checked)}
                        id={'topic-modal-available-topics-checkbox-' + LmsTopic.topic_lms_name}
                      />
                    }
                    label={LmsTopic.topic_lms_name}
                    key={LmsTopic.topic_lms_id}
                  />
                ))}
              </FormGroup>
            </Paper>
            {children}
          </Grid>
        )}
      </Grid>
    </Grid>
  )
})
// eslint-disable-next-line immutable/no-mutation
TableRemoteTopics.displayName = 'TableRemoteTopics'
export default TableRemoteTopics
