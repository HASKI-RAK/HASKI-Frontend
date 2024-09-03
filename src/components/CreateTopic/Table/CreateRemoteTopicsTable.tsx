import { ReactNode, memo } from 'react'
import { useTranslation } from 'react-i18next'
import { Checkbox, FormControlLabel, FormGroup, Grid, Paper, Typography } from '@common/components'
import { SkeletonList } from '@components'
import { RemoteTopic } from '@core'
import { useCreateRemoteTopicsTable } from './CreateRemoteTopicsTable.hooks'

type CreateRemoteTopicsTableProps = {
  onTopicChange: (selectedTopics: RemoteTopic[]) => void
  selectedTopicsModal: RemoteTopic[]
  remoteTopics: RemoteTopic[]
  children?: ReactNode
}

const CreateRemoteTopicsTable = memo(
  ({ onTopicChange, selectedTopicsModal, remoteTopics, children }: CreateRemoteTopicsTableProps) => {
    const { t } = useTranslation()
    const { handleTopicChange } = useCreateRemoteTopicsTable({ onTopicChange, selectedTopicsModal })

    return (
      <Grid container direction="column" alignItems="center" spacing={3}>
        <Grid item>
          <Typography variant="h6" sx={{ mt: '1rem' }}>
            {t('components.TableRemoteTopics.title')}
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
                          id={'create-topic-modal-available-topics-checkbox-' + LmsTopic.topic_lms_name}
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
  }
)
// eslint-disable-next-line immutable/no-mutation
CreateRemoteTopicsTable.displayName = 'CreateRemoteTopicsTable'
export default CreateRemoteTopicsTable
