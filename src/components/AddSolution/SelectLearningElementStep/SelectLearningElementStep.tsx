import { memo, SetStateAction, Dispatch } from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Button, Grid } from '@common/components'
import { Topic } from '@core'
import SelectLearningElementTable from '../SelectLearningElementTable/SelectLearningElementTable'
import {
  RemoteLearningElementWithSolution,
  RemoteLearningElementWithClassification,
  Solution
} from '../../CreateTopic/Modal/CreateTopicModal/CreateTopicModal'

interface SelectLearningElementStep {
  selectedTopics: Topic
  selectedLearningElements: { [key: number]: RemoteLearningElementWithClassification[] }
  selectedSolutions: { [key: number]: Solution[] }
  learningElementsWithSolution: { [key: number]: RemoteLearningElementWithSolution[] }
  setSelectedLearningElements: Dispatch<SetStateAction<{ [key: number]: RemoteLearningElementWithClassification[] }>>
  onNext: () => void
}

const SelectLearningElementStep = ({
  selectedTopics,
  selectedSolutions,
  selectedLearningElements,
  learningElementsWithSolution,
  setSelectedLearningElements,
  onNext
}: SelectLearningElementStep) => {
  const { t } = useTranslation()

  return (
    <Grid container item>
      <SelectLearningElementTable
        currentTopic={selectedTopics}
        selectedLearningElements={selectedLearningElements}
        setSelectedLearningElements={setSelectedLearningElements}>
        <Box sx={{ padding: '1rem', width: '95%' }}>
          <Grid container justifyContent="space-between" alignItems="center" sx={{ mt: 2 }}>
            <Button
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