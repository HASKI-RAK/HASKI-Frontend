import { Dispatch, memo, SetStateAction } from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Button, Grid, Typography } from '@common/components'
import { RemoteLearningElementWithClassification, SelectLearningElementTable } from '@components'
import { Topic } from '@core'

type SelectLearningElementStepProps = {
  selectedTopics?: Topic
  selectedLearningElements: { [key: number]: RemoteLearningElementWithClassification[] }
  setSelectedLearningElements: Dispatch<SetStateAction<{ [key: number]: RemoteLearningElementWithClassification[] }>>
  onNext: () => void
}

const SelectLearningElementStep = ({
  selectedTopics,
  selectedLearningElements,
  setSelectedLearningElements,
  onNext
}: SelectLearningElementStepProps) => {
  const { t } = useTranslation()

  return !selectedTopics || !selectedLearningElements[selectedTopics.lms_id] ? (
    <Grid container item>
      <Box sx={{ padding: '1rem', width: '95%' }}>
        <Typography variant="body1" align={'center'}>
          {!selectedTopics
            ? t('components.SelectLearningElementStep.noTopicSelected')
            : t('components.SelectLearningElementStep.noLearningElements')}
        </Typography>
      </Box>
    </Grid>
  ) : (
    <Grid container item>
      <SelectLearningElementTable
        currentTopic={selectedTopics}
        selectedLearningElements={selectedLearningElements}
        setSelectedLearningElements={setSelectedLearningElements}>
        <Box sx={{ padding: '1rem', width: '95%' }}>
          <Grid container justifyContent="space-between" alignItems="center" sx={{ mt: 2 }}>
            <Button
              id="select-learning-element-step-next-button"
              variant="contained"
              color="primary"
              disabled={
                // At least one learning element must be selected
                !selectedLearningElements[selectedTopics.lms_id] ||
                selectedLearningElements[selectedTopics.lms_id]?.length === 0
              }
              onClick={onNext}
              sx={{ mr: -2 }}>
              {t('appGlobal.next')}
            </Button>
          </Grid>
        </Box>
      </SelectLearningElementTable>
    </Grid>
  )
}

export default memo(SelectLearningElementStep)
