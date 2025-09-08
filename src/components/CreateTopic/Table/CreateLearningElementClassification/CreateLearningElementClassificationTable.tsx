import { memo, ReactNode, useCallback, useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableHead,
  TableRow,
  Typography
} from '@common/components'
import { SkeletonList, Solution, useCreateLearningElementClassificationTable } from '@components'
import { RemoteLearningElement, RemoteTopics } from '@core'

export type LearningElementWithClassification = RemoteLearningElement & {
  classification: string
  disabled?: boolean
}

export type CreateLearningElementClassificationTableProps = {
  selectedTopics: RemoteTopics[]
  selectedLearningElements: { [key: number]: RemoteLearningElement[] }
  LearningElementsClassification: { [key: number]: LearningElementWithClassification[] }
  selectedSolutions: { [key: number]: Solution[] }
  onLearningElementChange: (selectedLearningElements: { [key: number]: LearningElementWithClassification[] }) => void
  onSolutionChange: (selectedSolutions: { [key: number]: Solution[] }) => void
  children?: ReactNode
}

export type CreateLearningElementClassificationTableOptionsType = {
  name: string
  key: string
}[]

const CreateLearningElementClassificationTable = ({
  selectedTopics,
  selectedLearningElements,
  LearningElementsClassification,
  selectedSolutions,
  onLearningElementChange,
  onSolutionChange,
  children
}: CreateLearningElementClassificationTableProps) => {
  //Hooks
  const { t } = useTranslation()
  const { handleClassificationChange, handleSolutionchange } = useCreateLearningElementClassificationTable({
    LearningElementsClassification,
    selectedSolutions,
    onLearningElementChange,
    onSolutionChange
  })

  //Constants
  const learningElementClassifications: CreateLearningElementClassificationTableOptionsType = useMemo(() => {
    return t('components.CreateLearningElementClassificationTable.classifications', {
      returnObjects: true
    })
  }, [t])

  //function to check if more than than half of elements would be selected as solution if another was selected
  const canNotSelectSolution = (topicId: number) => {
    const nextLength = selectedSolutions[topicId].length + 1
    const halfOfLearningElements = LearningElementsClassification[topicId].length / 2
    return nextLength > halfOfLearningElements
  }

  //function to check if solution is checked
  const isSolution = useCallback(
    (topicId: number, elementLmsId: number) =>
      selectedSolutions[topicId].some((solution) => solution.solutionLmsId === elementLmsId),
    [selectedSolutions]
  )

  useEffect(() => {
    const updatedClassifications = Object.keys(selectedLearningElements).reduce((accumulator, topicId) => {
      const topicIdInt = parseInt(topicId)
      const existingClassifications = LearningElementsClassification[topicIdInt] || []

      // Keep only the elements that are still present in LearningElements
      const filteredClassifications = existingClassifications.filter((existingElement) =>
        selectedLearningElements[topicIdInt].some((newElement) => newElement.lms_id === existingElement.lms_id)
      )

      // Give elements the default classification that are in LearningElements but not yet classified
      const newClassifications = selectedLearningElements[topicIdInt].map((element) => {
        const existingElement = filteredClassifications.find((e) => e.lms_id === element.lms_id)
        return existingElement ?? { ...element, classification: '' }
      })

      return { ...accumulator, [topicIdInt]: newClassifications }
    }, {})

    onLearningElementChange(updatedClassifications)
  }, [selectedLearningElements])

  const handleSelectChange = useCallback(
    (lmsTopic: RemoteTopics, element: LearningElementWithClassification) => (event: SelectChangeEvent<unknown>) => {
      const { value } = event.target
      if (typeof value === 'string') {
        handleClassificationChange(lmsTopic.topic_lms_id, element.lms_id, value)
      }
    },
    [handleClassificationChange]
  )

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
            <Table
              sx={{
                [`& .${tableCellClasses.root}`]: {
                  borderBottom: 'none'
                },
                [`& .${tableCellClasses.body}`]: {
                  margin: '0rem'
                }
              }}>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ textAlign: 'center' }}>{t('appGlobal.learningElement')}</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>{t('appGlobal.classification')}</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>
                    {t('components.CreateLearningElementClassificationTable.IsSolution')}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {LearningElementsClassification[lmsTopic.topic_lms_id]?.map((element) => (
                  <TableRow key={element.lms_id}>
                    <TableCell sx={{ padding: '0rem' }}>
                      <FormControlLabel
                        control={<Checkbox checked={true} disabled={true} />}
                        label={<Typography>{element.lms_learning_element_name}</Typography>}
                      />
                    </TableCell>
                    <TableCell sx={{ textAlign: 'center', padding: '0rem' }}>
                      <FormControl sx={{ m: 1, width: '21rem' }} size="small">
                        <InputLabel>{t('appGlobal.classification')}</InputLabel>
                        <Select
                          value={element.classification}
                          onChange={handleSelectChange(lmsTopic, element)}
                          label={t('appGlobal.classification')}
                          disabled={element.disabled}>
                          {learningElementClassifications.map((classification) => (
                            <MenuItem key={classification.key} value={classification.key}>
                              {classification.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </TableCell>
                    <TableCell sx={{ textAlign: 'center', padding: '0rem' }}>
                      <Checkbox
                        checked={isSolution(lmsTopic.topic_lms_id, element.lms_id)}
                        disabled={
                          canNotSelectSolution(lmsTopic.topic_lms_id) &&
                          !isSolution(lmsTopic.topic_lms_id, element.lms_id)
                        }
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                          handleSolutionchange(
                            lmsTopic.topic_lms_id,
                            element.lms_id,
                            element.lms_learning_element_name,
                            event.target.checked,
                            element.lms_activity_type
                          )
                        }
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </Grid>
      ))}
      {children}
    </Grid>
  )
}

// eslint-disable-next-line immutable/no-mutation
CreateLearningElementClassificationTable.displayName = 'CreateLearningElementClassificationTable'
export default memo(CreateLearningElementClassificationTable)
