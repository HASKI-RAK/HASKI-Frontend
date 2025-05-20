import { Checkbox, FormControlLabel, FormGroup, Grid, Paper, Typography } from '@common/components'
import { SkeletonList } from '@components'
import { RemoteTopics } from '@core'
import { memo,ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

import { useCreateRemoteTopicsTable } from './CreateRemoteTopicsTable.hooks'

type CreateRemoteTopicsTableProps = {
  onTopicChange: (selectedTopics: RemoteTopics[]) => void
  selectedTopics: RemoteTopics[]
  remoteTopics?: RemoteTopics[]
  children?: ReactNode
}

const CreateRemoteTopicsTable = ({
  onTopicChange,
  selectedTopics,
  remoteTopics,
  children
}: CreateRemoteTopicsTableProps) => {
  //Hooks
  const { t } = useTranslation()
  const { handleTopicChange } = useCreateRemoteTopicsTable({ onTopicChange, selectedTopics })

  const noAdditionalTopics = () => (
    <Paper sx={{ padding: '1rem', width: '95%' }}>
      <FormGroup>
        <FormControlLabel
          control={<Checkbox checked={true} disabled={true} />}
          label={t('components.TableRemoteTopics.noAdditionalTopics')}
          key={t('components.TableRemoteTopics.noAdditionalTopics')}
        />
      </FormGroup>
    </Paper>
  )

  const remoteTopicRows = (remoteTopics: RemoteTopics[]) => (
    <Grid item container alignItems="center" direction="column">
      <Paper sx={{ padding: '1rem', width: '95%' }}>
        <FormGroup>
          {remoteTopics.map((LmsTopic) => (
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectedTopics.some((topic) => topic.topic_lms_id === LmsTopic.topic_lms_id)}
                  onChange={(event) => handleTopicChange(LmsTopic, event.target.checked)}
                  id={`create-topic-modal-available-topics-checkbox-${LmsTopic.topic_lms_name}`}
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
  )

  return (
    <Grid container direction="column" alignItems="center" spacing={3}>
      <Grid item>
        <Typography variant="h6" sx={{ mt: '1rem' }}>
          {t('components.TableRemoteTopics.title')}
        </Typography>
      </Grid>
      <Grid item container alignItems="center" direction="column">
        {!remoteTopics ? (
          <Paper sx={{ padding: '1rem', width: '95%' }}>
            <SkeletonList />
          </Paper>
        ) : remoteTopics.length === 0 ? (
          noAdditionalTopics()
        ) : (
          remoteTopicRows(remoteTopics)
        )}
      </Grid>
    </Grid>
  )
}

export default memo(CreateRemoteTopicsTable)
