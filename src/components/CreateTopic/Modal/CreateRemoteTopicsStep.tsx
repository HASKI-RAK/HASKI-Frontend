import React from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Button, Grid } from '@common/components'
import { CreateRemoteTopicsTable, ExistingTopicsTable } from '@components'
import { LearningPathTopic, RemoteTopics } from '@core'

type CreateRemoteTopicsStepProps = {
  remoteTopics: RemoteTopics[]
  selectedTopics: RemoteTopics[]
  alreadyCreatedTopics: LearningPathTopic | undefined
  handleTopicChange: (selectedTopics: RemoteTopics[]) => void
  onNext: () => void
}

const CreateRemoteTopicsStep: React.FC<CreateRemoteTopicsStepProps> = ({
  remoteTopics,
  selectedTopics,
  alreadyCreatedTopics,
  handleTopicChange,
  onNext
}) => {
  const { t } = useTranslation()

  return (
    <>
      <CreateRemoteTopicsTable
        onTopicChange={handleTopicChange}
        selectedTopics={selectedTopics}
        remoteTopics={remoteTopics}>
        <Box sx={{ padding: '1rem', width: '95%' }}>
          <Grid container justifyContent="flex-end" alignItems="flex-end">
            <Button
              variant="contained"
              color="primary"
              data-test-id={'create-topic-modal-remote-topics-next-step'}
              disabled={selectedTopics.length === 0}
              onClick={onNext}
              sx={{ mr: -2 }}>
              {t('appGlobal.next')}
            </Button>
          </Grid>
        </Box>
      </CreateRemoteTopicsTable>
      {alreadyCreatedTopics && alreadyCreatedTopics.topics.length > 0 && (
        <ExistingTopicsTable existingTopics={alreadyCreatedTopics} />
      )}
    </>
  )
}

export default CreateRemoteTopicsStep
