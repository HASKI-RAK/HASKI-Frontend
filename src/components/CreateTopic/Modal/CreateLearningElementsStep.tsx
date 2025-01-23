import { Dispatch, SetStateAction, memo } from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Button, Grid } from '@common/components'
import { CreateLearningElementTable } from '@components'
import { RemoteLearningElement, RemoteTopics } from '@core'

type CreateLearningElementsStepProps = {
  selectedTopics: RemoteTopics[]
  selectedLearningElements: { [key: number]: RemoteLearningElement[] }
  handleLearningElementChange: (selectedLearningElements: { [key: number]: RemoteLearningElement[] }) => void
  selectAllLearningElementsChecked: boolean
  setSelectAllLearningElementsChecked: Dispatch<SetStateAction<boolean>>
  onNext: () => void
  onBack: () => void
}

const CreateLearningElementsStep = ({
  selectedTopics,
  selectedLearningElements,
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
        selectAllLearningElementsChecked={selectAllLearningElementsChecked}
        setSelectAllLearningElementsChecked={setSelectAllLearningElementsChecked}>
        <Box sx={{ padding: '1rem', width: '95%' }}>
          <Grid container justifyContent="space-between" alignItems="center" sx={{ mt: 2 }}>
            <Button variant="contained" color="primary" onClick={onBack} sx={{ ml: 1 }}>
              {t('appGlobal.back')}
            </Button>
            <Button
              variant="contained"
              color="primary"
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