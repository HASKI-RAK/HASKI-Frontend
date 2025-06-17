import { memo, SetStateAction, Dispatch } from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Button, Grid } from '@common/components'
import { CreateLearningElementSolutionTable } from '@components'
import { RemoteTopics, RemoteLearningElement } from '@core'
import SelectLearningElementTable from '../SelectLearningElementTable/SelectLearningElementTable'
import {
  RemoteLearningElementWithSolution,
  RemoteLearningElementWithClassification,
  Solution
} from '../../CreateTopic/Modal/CreateTopicModal/CreateTopicModal'

interface CreateLearningElementSolutionStepProps {
  selectedTopics: RemoteTopics[]
  selectedLearningElements: { [key: number]: RemoteLearningElementWithClassification[] }
  selectedSolutions: { [key: number]: Solution[] }
  learningElementsWithSolution: { [key: number]: RemoteLearningElementWithSolution[] }
  setSelectedLearningElements: Dispatch<SetStateAction<{ [key: number]: RemoteLearningElementWithClassification[] }>>
  onNext: () => void
}

const CreateLearningElementSolutionStep = ({
  selectedTopics,
  selectedSolutions,
  selectedLearningElements,
  learningElementsWithSolution,
  setSelectedLearningElements,
  onNext
}: CreateLearningElementSolutionStepProps) => {
  const { t } = useTranslation()

  return (
    <Grid container item>
      <SelectLearningElementTable
        currentTopic={selectedTopics[0]}
        selectedLearningElements={selectedLearningElements}
        setSelectedLearningElements={setSelectedLearningElements}>
        <Box sx={{ padding: '1rem', width: '95%' }}>
          <Grid container justifyContent="space-between" alignItems="center" sx={{ mt: 2 }}>
            <Button
              variant="contained"
              color="primary"
              disabled={
                // Every Solution has to be used
                !selectedTopics.every((topic) =>
                  selectedSolutions[topic.topic_lms_id]?.every((solution) =>
                    learningElementsWithSolution[topic.topic_lms_id]?.some(
                      (element) => element.solutionLmsId === solution.solutionLmsId
                    )
                  )
                )
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

export default memo(CreateLearningElementSolutionStep)