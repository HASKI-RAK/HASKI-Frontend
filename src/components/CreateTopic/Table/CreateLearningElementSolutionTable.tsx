import { ReactNode, memo, useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  MenuItem,
  Paper,
  Select,
  Typography
} from '@common/components'
import { SkeletonList } from '@components'
import { RemoteLearningElement, RemoteTopic, LearningElementWithSolution } from '@core'
import { useCreateLearningElementSolutionTable } from './CreateLearningElementSolutionTable.hooks'
import { Solution, RemoteLearningElementWithSolution } from '../Modal/CreateTopicModal'
import { LearningElementWithClassification } from './CreateLearningElementClassificationTable'

type CreateLearningElementClassificationTableProps = {
  selectedTopics: RemoteTopic[]
  LearningElements: { [key: number]: RemoteLearningElement[] }
  LearningElementsClassification: { [key: number]: LearningElementWithClassification[] }
  selectedSolutions: { [key: number]: Solution[] }
  learningElementsWithSolutions: { [key: number]: RemoteLearningElementWithSolution[] }
  onLearningElementSolutionChange: (selectedSolutions: { [key: number]: LearningElementWithSolution[] }) => void
  children?: ReactNode
}

const CreateLearningElementClassificationTable = memo(
  ({
    selectedTopics,
    LearningElements,
    LearningElementsClassification,
    selectedSolutions,
    learningElementsWithSolutions,
    onLearningElementSolutionChange,
    children
  }: CreateLearningElementClassificationTableProps) => {
    //Hooks
    const { t } = useTranslation()
    const { handleSolutionChange } = useCreateLearningElementSolutionTable({
      learningElementsWithSolutions,
      selectedSolutions,
      onLearningElementSolutionChange
    })


    useEffect(() => {
      const updatedSolutions = Object.keys(LearningElementsClassification).reduce((accumulator, topicId) => {
        const topicIdInt = parseInt(topicId)
        const existingLeElSolutions = learningElementsWithSolutions[topicIdInt] || []

        const newSolutions = LearningElementsClassification[topicIdInt].reduce((acc, element) => {
          const existingElement = existingLeElSolutions.find((e) => e.learningElementLmsId === element.lms_id)
          if (!existingElement && !element.disabled) {
        return [...acc, { learningElementLmsId: element.lms_id, lmsSolutionId: 0 }]
          } else if (existingElement && element.disabled) {
        return acc.filter((e) => e.learningElementLmsId !== element.lms_id)
          }
          return acc
        }, existingLeElSolutions)

        return { ...accumulator, [topicIdInt]: newSolutions }
      }, {})

      onLearningElementSolutionChange(updatedSolutions)
    }, [LearningElements])

    //Return early
    if (Object.keys(LearningElementsClassification).length === 0) {
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
            {t('components.CreateLearningElementClassificationTable.setLearningElementClassification')}
          </Typography>
        </Grid>
        {selectedTopics.map((lmsTopic) => (
          <Grid
            item
            container
            alignItems="center"
            justifyContent="center"
            direction="column"
            key={'Create Topic - Learning Element Classification: ' + lmsTopic.topic_lms_id}>
            <Paper sx={{ padding: '1rem', width: '95%' }}>
              <Box bgcolor={(theme) => theme.palette.info.light} borderRadius={3}>
                <Grid item container justifyContent="center" alignItems="center">
                  <Typography variant="h6" gutterBottom>
                    {lmsTopic.topic_lms_name}
                  </Typography>
                </Grid>
              </Box>
              {LearningElements[lmsTopic.topic_lms_id]?.map((element) => (
                <Grid container alignItems="center" spacing={2} key={element.lms_id}>
                  <Grid item xs={6}>
                    <FormControlLabel control={<Checkbox checked={true} />} label={element.lms_learning_element_name} />
                  </Grid>
                  <Grid item container xs={6} justifyContent="flex-end">
                    <FormControl sx={{ m: 1, width: '21rem' }} size="small">
                      <Select
                        value={''}
                        onChange={(event) =>
                          handleSolutionChange(
                            lmsTopic.topic_lms_id,
                            element.lms_id,
                            parseInt(event.target.value)
                          )
                        }>
                        {selectedSolutions[lmsTopic.topic_lms_id].map((solution) => (
                          <MenuItem
                            key={solution.solutionLmsId}
                            value={solution.solutionLmsId}>
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
        ))}
        {children}
      </Grid>
    )
  }
)
// eslint-disable-next-line immutable/no-mutation
CreateLearningElementClassificationTable.displayName = 'CreateLearningElementClassificationTable'
export default CreateLearningElementClassificationTable
