import { ReactNode, memo, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Backdrop,
  Box,
  Checkbox,
  CircularProgress,
  FormControl,
  FormControlLabel,
  Grid,
  MenuItem,
  Paper,
  Select,
  Typography
} from '@common/components'
import { SkeletonList } from '@components'
import { RemoteTopics } from '@core'
import {
  RemoteLearningElementWithClassification,
  RemoteLearningElementWithSolution,
  Solution
} from '../../Modal/CreateTopicModal/CreateTopicModal'
import { useCreateLearningElementSolutionTable } from './CreateLearningElementSolutionTable.hooks'

type CreateLearningElementClassificationTableProps = {
  selectedTopics: RemoteTopics[]
  selectedLearningElementsClassification: { [key: number]: RemoteLearningElementWithClassification[] }
  selectedSolutions: { [key: number]: Solution[] }
  learningElementsWithSolutions: { [key: number]: RemoteLearningElementWithSolution[] }
  onLearningElementSolutionChange: (selectedSolutions: { [key: number]: RemoteLearningElementWithSolution[] }) => void
  children?: ReactNode
}

const CreateLearningElementClassificationTable = memo(
  ({
    selectedTopics,
    selectedLearningElementsClassification,
    selectedSolutions,
    learningElementsWithSolutions,
    onLearningElementSolutionChange,
    children
  }: CreateLearningElementClassificationTableProps) => {
    const [displayedSolutions, setDisplayedSolutions] = useState<{ [key: number]: Solution[] }>({})
    //Hooks
    const { t } = useTranslation()
    const { handleSolutionChange, resetUnavailableSolutions } = useCreateLearningElementSolutionTable({
      learningElementsWithSolutions,
      selectedSolutions,
      selectedLearningElementsClassification,
      onLearningElementSolutionChange
    })

    const allSolutionsUsed = (topicId: number) => {
      const allSolutions = selectedSolutions[topicId] || []
      const allElementsWithSolutions = learningElementsWithSolutions[topicId] || []
      return allSolutions.every((solution) =>
        allElementsWithSolutions.some((element) => element.solutionLmsId === solution.solutionLmsId)
      )
    }

    useEffect(() => {
      // Create Solutions from LearningElementsClassification
      const updatedSolutions = Object.keys(selectedLearningElementsClassification).reduce((accumulator, topicId) => {
        const topicIdInt = parseInt(topicId)
        const existingLeElSolutions = learningElementsWithSolutions[topicIdInt] || []

        const newSolutions = selectedLearningElementsClassification[topicIdInt].reduce<
          RemoteLearningElementWithSolution[]
        >((acc, element) => {
          const existingElement = existingLeElSolutions.find((e) => e.learningElementLmsId === element.lms_id)
          if (!existingElement && !element.disabled) {
            return [
              ...acc,
              {
                learningElementLmsId: element.lms_id,
                learningElementName: element.lms_learning_element_name,
                solutionLmsId: 0
              }
            ]
          } else if (existingElement && element.disabled) {
            return acc.filter((e) => e.learningElementLmsId !== element.lms_id)
          }
          return acc
        }, existingLeElSolutions)

        const resetLeElsWithSolution = resetUnavailableSolutions(newSolutions, topicIdInt)

        return { ...accumulator, [topicIdInt]: resetLeElsWithSolution }
      }, {})

      onLearningElementSolutionChange(updatedSolutions)
    }, [selectedLearningElementsClassification, resetUnavailableSolutions])

    useEffect(() => {
      const updatedDisplayedSolutions = Object.keys(selectedSolutions).reduce((accumulator, topicId) => {
        const topicIdInt = parseInt(topicId)
        const newDisplayedSolutions = [
          { solutionLmsId: 0, solutionLmsName: t('components.CreateLearningElementSolutionTable.noSolution') },
          ...(selectedSolutions[topicIdInt] || [])
        ]

        return { ...accumulator, [topicIdInt]: newDisplayedSolutions }
      }, {})
      setDisplayedSolutions(updatedDisplayedSolutions)
    }, [selectedSolutions])

    //Return early
    if (Object.keys(selectedLearningElementsClassification).length === 0) {
      return (
        <Grid container direction="column" justifyContent="center" alignItems="center" spacing={3}>
          <Grid container direction="column" alignItems="center" sx={{ mt: '2rem' }}>
            <SkeletonList />
            {children}
          </Grid>
        </Grid>
      )
    }

    return (
      <Grid container direction="column" justifyContent="center" alignItems="center" spacing={3}>
        <Grid item container justifyContent="center">
          <Typography variant="h6" sx={{ mt: '1rem' }}>
            {t('components.CreateLearningElementSolutionTable.setLearningElementSolution')}
          </Typography>
        </Grid>
        {selectedTopics.map(
          (lmsTopic) =>
            selectedSolutions[lmsTopic.topic_lms_id].length >= 1 && (
              <Grid
                item
                container
                alignItems="center"
                justifyContent="center"
                direction="column"
                key={'Create Topic - Learning Element Solution: ' + lmsTopic.topic_lms_id}>
                <Paper sx={{ padding: '1rem', width: '95%' }}>
                  <Box bgcolor={(theme) => theme.palette.info.light} borderRadius={3}>
                    <Grid item container justifyContent="center" alignItems="center">
                      <Typography variant="h6" gutterBottom>
                        {lmsTopic.topic_lms_name}
                      </Typography>
                    </Grid>
                  </Box>
                  {learningElementsWithSolutions[lmsTopic.topic_lms_id]?.map((element) => (
                    <Grid container alignItems="center" spacing={2} key={element.learningElementLmsId}>
                      <Grid item xs={6}>
                        <FormControlLabel control={<Checkbox checked={true} />} label={element.learningElementName} />
                      </Grid>
                      <Grid item container xs={6} justifyContent="flex-end">
                        <FormControl sx={{ m: 1, width: '21rem' }} size="small">
                          <Select
                            disabled={element.solutionLmsId <= 0 && allSolutionsUsed(lmsTopic.topic_lms_id)}
                            value={String(
                              element.solutionLmsId > 0
                                ? element.solutionLmsId
                                : displayedSolutions[lmsTopic.topic_lms_id]?.[0].solutionLmsId ?? 0
                            )}
                            onChange={(event) =>
                              handleSolutionChange(
                                lmsTopic.topic_lms_id,
                                element.learningElementLmsId,
                                parseInt(event.target.value)
                              )
                            }>
                            {(displayedSolutions[lmsTopic.topic_lms_id] || []).map((solution) => (
                              <MenuItem
                                key={solution.solutionLmsId}
                                value={solution.solutionLmsId}
                                disabled={learningElementsWithSolutions[lmsTopic.topic_lms_id]?.some(
                                  (element) =>
                                    element.solutionLmsId === solution.solutionLmsId && solution.solutionLmsId > 0
                                )}>
                                {solution.solutionLmsName}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                    </Grid>
                  ))}
                </Paper>
              </Grid>
            )
        )}
        {children}
      </Grid>
    )
  }
)
// eslint-disable-next-line immutable/no-mutation
CreateLearningElementClassificationTable.displayName = 'CreateLearningElementClassificationTable'
export default CreateLearningElementClassificationTable
