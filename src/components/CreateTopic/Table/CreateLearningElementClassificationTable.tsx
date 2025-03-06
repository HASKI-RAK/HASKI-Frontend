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
  Table,
  TableHead,
  TableRow,
  TableCell,
  Typography
} from '@common/components'
import { tableCellClasses } from '@mui/material'
import { SkeletonList } from '@components'
import { RemoteLearningElement, RemoteTopic } from '@core'
import { useCreateLearningElementClassificationTable } from './CreateLearningElementClassificationTable.hooks'
import { Solution } from '../Modal/CreateTopicModal'

export type LearningElementWithClassification = RemoteLearningElement & {
  classification: string
  disabled?: boolean
}

type CreateLearningElementClassificationTableProps = {
  selectedTopics: RemoteTopic[]
  LearningElements: { [key: number]: RemoteLearningElement[] }
  LearningElementsClassification: { [key: number]: LearningElementWithClassification[] }
  selectedSolutions: { [key: number]: Solution[] }
  onLearningElementChange: (selectedLearningElements: { [key: number]: LearningElementWithClassification[] }) => void
  onSolutionChange: (selectedSolutions: { [key: number]: Solution[] }) => void
  children?: ReactNode
}

const CreateLearningElementClassificationTable = memo(
  ({
    selectedTopics,
    LearningElements,
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
    const learningElementClassifications = useMemo(() => {
      return t('components.CreateLearningElementClassificationTable.classifications', {
        returnObjects: true
      }) as [{ name: string; key: string; disabled: boolean }]
    }, [])

    useEffect(() => {
      const updatedClassifications = Object.keys(LearningElements).reduce((accumulator, topicId) => {
        const topicIdInt = parseInt(topicId)
        const existingClassifications = LearningElementsClassification[topicIdInt] || []

        // Keep only the elements that are still present in LearningElements
        const filteredClassifications = existingClassifications.filter((existingElement) =>
          LearningElements[topicIdInt].some((newElement) => newElement.lms_id === existingElement.lms_id)
        )

        // Give elements the default classification that are in LearningElements but not yet classified
        const newClassifications = LearningElements[topicIdInt].map((element) => {
          const existingElement = filteredClassifications.find((e) => e.lms_id === element.lms_id)
          return existingElement || { ...element, classification: 'noKey' }
        })

        return { ...accumulator, [topicIdInt]: newClassifications }
      }, {})

      onLearningElementChange(updatedClassifications)
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
                    <TableCell sx={{textAlign: 'center'}}>{t('Learning Element')}</TableCell>
                    <TableCell sx={{textAlign: 'center'}}>{t('Klassifikation')}</TableCell>
                    <TableCell sx={{textAlign: 'center'}}>{t('Ist Lösung')}</TableCell>
                  </TableRow>
                </TableHead>
                {LearningElementsClassification[lmsTopic.topic_lms_id]?.map((element) => (
                  <TableRow key={element.lms_id}>
                    <TableCell sx={{padding: '0rem'}}>
                      <FormControlLabel control={<Checkbox checked={true} />} label={element.lms_learning_element_name} />
                    </TableCell>
                    <TableCell sx={{textAlign: 'center', padding: '0rem'}}>
                      <FormControl sx={{ m: 1, width: '21rem' }} size="small">
                        <Select
                          value={element.classification}
                          onChange={(event) =>
                            handleClassificationChange(
                              lmsTopic.topic_lms_id,
                              element.lms_id,
                              event.target.value as string
                            )
                          }
                          disabled={element.disabled}>
                          {learningElementClassifications.map((classification) => (
                            <MenuItem
                              key={classification.key}
                              value={classification.key}
                              disabled={classification.disabled && element.classification !== 'noKey'}>
                              {classification.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </TableCell>
                    <TableCell sx={{textAlign: 'center', padding: '0rem'}}>
                      <Checkbox checked={(selectedSolutions[lmsTopic.topic_lms_id] || []).some((el) => el.solutionLmsId === element.lms_id)}
                       onChange={(event)=>handleSolutionchange(lmsTopic.topic_lms_id, element.lms_id, element.lms_learning_element_name, event.target.checked)}/>
                    </TableCell>
                  </TableRow>
                ))}
              </Table>
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
