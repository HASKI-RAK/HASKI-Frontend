import { memo, useEffect, useState } from 'react'
import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  MenuItem,
  Paper,
  Select,
  Typography
} from '@common/components'
import RemoteLearningElement from '../../../core/RemoteLearningElement/RemoteLearningElement'
import RemoteTopic from '../../../core/RemoteTopic/RemoteTopic'

type LearningElementWithClassification = RemoteLearningElement & {
  classification: string
}

type TableLearningElementClassificationProps = {
  selectedTopicsModal: RemoteTopic[]
  LearningElements: { [key: number]: LearningElementWithClassification[] }
  onLearningElementChange: (selectedLearningElements: { [key: number]: LearningElementWithClassification[] }) => void
}

const TableLearningElementClassification = memo(
  ({ selectedTopicsModal, LearningElements, onLearningElementChange }: TableLearningElementClassificationProps) => {
    const [selectedLearningElements, setSelectedLearningElements] = useState<{
      [key: number]: LearningElementWithClassification[]
    }>(LearningElements)

    useEffect(() => {
      setSelectedLearningElements(LearningElements)
    }, [LearningElements])

    const classifications = [
      {
        name: 'KÜ - Kurzübersicht',
        key: 'KÜ'
      },
      {
        name: 'EK - Erklärung',
        key: 'EK'
      },
      {
        name: 'AN - Animation',
        key: 'AN'
      },
      {
        name: 'BE - Beispiel',
        key: 'BE'
      },
      {
        name: 'ÜB - Übung',
        key: 'ÜB'
      },
      {
        name: 'SE - Selbsteinschätzungstest',
        key: 'SE'
      },
      {
        name: 'ZL - Zusatzliteratur',
        key: 'ZL'
      },
      {
        name: 'ZF - Zusammenfassung',
        key: 'ZF'
      }
    ]

    const handleClassificationChange = (topicId: number, elementId: number, classificationKey: string) => {
      const updatedClassification = {
        ...selectedLearningElements,
        [topicId]: selectedLearningElements[topicId].map((element) =>
          element.lms_id === elementId ? { ...element, classification: classificationKey } : element
        )
      }
      setSelectedLearningElements(updatedClassification)
      onLearningElementChange(updatedClassification) // Call the prop function to update the parent component
    }

    return (
      <Grid container direction="column" justifyContent="center" alignItems="center" spacing={3}>
        {Object.keys(selectedLearningElements).length === 0 ? (
          <Grid item>
            <Typography variant="h6" sx={{ mt: '1rem' }}>
              Select learning elements to set classification
            </Typography>
          </Grid>
        ) : (
          <>
            <Grid item container alignItems="center" justifyContent="space-between" direction="row">
              <Grid item container justifyContent="center">
                <Typography variant="h6" sx={{ mt: '1rem' }}>
                  Set learning element classification
                </Typography>
              </Grid>
            </Grid>
            {selectedTopicsModal.map((lmsTopic) => (
              <Grid item container alignItems="center" justifyContent="center" direction="column">
                <Paper sx={{ padding: '1rem', width: '95%' }}>
                  <Box bgcolor={'rgba(255,168,45,0.34)'} borderRadius={3}>
                    <Grid item container justifyContent="center" alignItems="center">
                      <Typography variant="h6" gutterBottom>
                        {lmsTopic.topic_lms_name}
                      </Typography>
                    </Grid>
                  </Box>
                  {selectedLearningElements[lmsTopic.topic_lms_id]?.map((element) => (
                    <Grid container alignItems="center" spacing={2} key={element.lms_id}>
                      <Grid item xs={6}>
                        <FormControlLabel
                          control={<Checkbox checked={true} />}
                          label={element.lms_learning_element_name}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <FormControl sx={{ m: 1, width: '21rem', left: '10%' }} size="small">
                          <Select
                            value={element.classification}
                            onChange={(event) =>
                              handleClassificationChange(
                                lmsTopic.topic_lms_id,
                                element.lms_id,
                                event.target.value as string
                              )
                            }
                            displayEmpty>
                            <MenuItem value="">Select Classification</MenuItem>
                            {classifications.map((classification) => (
                              <MenuItem key={classification.key} value={classification.key}>
                                {classification.name}
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
          </>
        )}
      </Grid>
    )
  }
)

// eslint-disable-next-line immutable/no-mutation
TableLearningElementClassification.displayName = 'TableLearningElementClassification'
export default TableLearningElementClassification
