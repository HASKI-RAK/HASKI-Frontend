import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Button, Grid } from '@common/components'
import { CreateLearningElementSolutionTable } from '@components'
import { RemoteTopics } from '@core'
import {
  RemoteLearningElementWithClassification,
  RemoteLearningElementWithSolution,
  Solution
} from '../CreateTopicModal/CreateTopicModal'

interface CreateLearningElementSolutionStepProps {
  selectedTopics: RemoteTopics[]
  LearningElementsClassification: { [key: number]: RemoteLearningElementWithClassification[] }
  selectedSolutions: { [key: number]: Solution[] }
  learningElementsWithSolutions: { [key: number]: RemoteLearningElementWithSolution[] }
  onLearningElementSolutionChange: (selectedSolutions: { [key: number]: RemoteLearningElementWithSolution[] }) => void
  onNext: () => void
  onBack: () => void
}

const CreateLearningElementSolutionStep = ({
  selectedTopics,
  LearningElementsClassification,
  selectedSolutions,
  learningElementsWithSolutions,
  onLearningElementSolutionChange,
  onNext,
  onBack
}: CreateLearningElementSolutionStepProps) => {
  const { t } = useTranslation()

  return (
    <Grid container item>
      <CreateLearningElementSolutionTable
        selectedTopics={selectedTopics}
        LearningElementsClassification={LearningElementsClassification}
        selectedSolutions={selectedSolutions}
        learningElementsWithSolutions={learningElementsWithSolutions}
        onLearningElementSolutionChange={onLearningElementSolutionChange}>
        <Box sx={{ padding: '1rem', width: '95%' }}>
          <Grid container justifyContent="space-between" alignItems="center" sx={{ mt: 2 }}>
            <Button variant="contained" color="primary" onClick={onBack} sx={{ ml: 1 }}>
              {t('appGlobal.back')}
            </Button>
            <Button
              variant="contained"
              color="primary"
              disabled={
                // Every Solution has to be used
                !selectedTopics.every((topic) =>
                  selectedSolutions[topic.topic_lms_id]?.every((solution) =>
                    learningElementsWithSolutions[topic.topic_lms_id]?.some(
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
      </CreateLearningElementSolutionTable>
    </Grid>
  )
}

export default memo(CreateLearningElementSolutionStep)
