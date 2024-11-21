import React, { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Button, Grid } from '@common/components'
import { CreateLearningElementClassificationTable } from '@components'
import { RemoteLearningElement, RemoteTopics } from '@core'
import { RemoteLearningElementWithClassification } from './CreateTopicModal'

type CreateLearningElementClassificationsStepProps = {
  selectedTopics: RemoteTopics[]
  selectedLearningElements: { [key: number]: RemoteLearningElement[] }
  selectedLearningElementsClassification: { [key: number]: RemoteLearningElementWithClassification[] }
  handleLearningElementClassification: (classification: {
    [key: number]: RemoteLearningElementWithClassification[]
  }) => void
  onNext: () => void
  onBack: () => void
}

const CreateLearningElementClassificationsStep = ({
  selectedTopics,
  selectedLearningElements,
  selectedLearningElementsClassification,
  handleLearningElementClassification,
  onNext,
  onBack
}: CreateLearningElementClassificationsStepProps) => {
  const { t } = useTranslation()

  return (
    <Grid container item>
      <CreateLearningElementClassificationTable
        selectedTopics={selectedTopics}
        LearningElements={selectedLearningElements}
        LearningElementsClassification={selectedLearningElementsClassification}
        onLearningElementChange={handleLearningElementClassification}>
        <Box sx={{ padding: '1rem', width: '95%' }}>
          <Grid container justifyContent="space-between" alignItems="center" sx={{ mt: 2 }}>
            <Button variant="contained" color="primary" onClick={onBack} sx={{ ml: 1 }}>
              {t('appGlobal.back')}
            </Button>
            <Button
              variant="contained"
              color="primary"
              disabled={
                !selectedTopics.every((topic) =>
                  selectedLearningElementsClassification[topic.topic_lms_id]?.every(
                    (el) => el.classification !== 'noKey'
                  )
                )
              }
              onClick={onNext}
              sx={{ mr: -2 }}>
              {t('appGlobal.next')}
            </Button>
          </Grid>
        </Box>
      </CreateLearningElementClassificationTable>
    </Grid>
  )
}

export default memo(CreateLearningElementClassificationsStep)
