import { Dispatch, memo, SetStateAction } from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Button, Grid } from '@common/components'
import { CreateLearningElementTable, Solution } from '@components'
import { RemoteLearningElement, RemoteTopics } from '@core'

type CreateLearningElementsStepProps = {
  selectedTopics: RemoteTopics[]
  selectedLearningElements: { [key: number]: RemoteLearningElement[] }
  selectedSolutions: { [key: number]: Solution[] }
  onSolutionChange: (selectedSolutions: { [key: number]: Solution[] }) => void
  handleLearningElementChange: (selectedLearningElements: { [key: number]: RemoteLearningElement[] }) => void
  selectAllLearningElementsChecked: boolean
  setSelectAllLearningElementsChecked: Dispatch<SetStateAction<boolean>>
  onNext: () => void
  onBack?: () => void
}

const CreateLearningElementsStep = ({
  selectedTopics,
  selectedLearningElements,
  selectedSolutions,
  onSolutionChange,
  handleLearningElementChange,
  selectAllLearningElementsChecked,
  setSelectAllLearningElementsChecked,
  onNext,
  onBack
}: CreateLearningElementsStepProps) => {
  const { t } = useTranslation()

  return (
    <Grid container item>
      <CreateLearningElementTable
        selectedTopics={selectedTopics}
        onLearningElementChange={handleLearningElementChange}
        selectedLearningElements={selectedLearningElements}
        selectedSolutions={selectedSolutions}
        onSolutionChange={onSolutionChange}
        selectAllLearningElementsChecked={selectAllLearningElementsChecked}
        setSelectAllLearningElementsChecked={setSelectAllLearningElementsChecked}>
        <Box sx={{ padding: '1rem', width: '95%' }}>
          <Grid container justifyContent="space-between" alignItems="center" sx={{ mt: 2 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={onBack}
              disabled={!onBack}
              sx={{ ml: 1 }}
              id={'create-learning-element-step-back-button'}>
              {t('appGlobal.back')}
            </Button>
            <Button
              variant="contained"
              color="primary"
              id={'create-learning-element-step-next-button'}
              disabled={!selectedTopics.every((topic) => selectedLearningElements[topic.topic_lms_id]?.length > 0)}
              onClick={onNext}
              sx={{ mr: -2 }}>
              {t('appGlobal.next')}
            </Button>
          </Grid>
        </Box>
      </CreateLearningElementTable>
    </Grid>
  )
}

export default memo(CreateLearningElementsStep)
