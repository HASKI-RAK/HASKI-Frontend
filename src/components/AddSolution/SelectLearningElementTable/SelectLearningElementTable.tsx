import { useParams } from 'react-router-dom'
import { memo, ReactNode, useState, useEffect, useContext, SetStateAction, Dispatch } from 'react'
import { useStore, usePersistedStore } from '@store'
import { useTranslation } from 'react-i18next'
import { Box, Grid, Typography, FormControlLabel, Checkbox, Paper, FormControl } from '@common/components'
import { handleError } from '@components'
import { SnackbarContext } from '@services'
import { LearningElement, LearningElementSolution, RemoteLearningElement, RemoteTopics, Topic } from '@core'
import { RemoteLearningElementWithClassification } from '../../CreateTopic/Modal/CreateTopicModal/CreateTopicModal'

type SelectLearningElementTableProps = {
    currentTopic: Topic
    selectedLearningElements: { [key: number]: RemoteLearningElementWithClassification[] }
    setSelectedLearningElements: Dispatch<SetStateAction<{ [key: number]: RemoteLearningElementWithClassification[] }>>
    children?: ReactNode
}


const SelectLearningElementTable = ({ 
    currentTopic,
    selectedLearningElements,
    setSelectedLearningElements,
    children }: SelectLearningElementTableProps
) => {
    const [learningElements, setLearningElements] = useState<RemoteLearningElementWithClassification[]>([])

    const { courseId } = useParams()
    const { topicId } = useParams()

    const { t } = useTranslation()

    const { addSnackbar } = useContext(SnackbarContext)

    const getLearningPathElement = useStore((state) => state.getLearningPathElement)
    const getUser = usePersistedStore((state) => state.getUser)
    const getLearningElementSolution = useStore((state) => state.getLearningElementSolution)
    
    const [existingSolutions, setExistingSolutions] = useState<LearningElementSolution[]>([])

    const handleCheckboxChange = (learningElement: RemoteLearningElementWithClassification, checked:boolean) => {
      const updatedLearningElements = {
        [currentTopic.lms_id]: checked ?
          [...(selectedLearningElements[currentTopic.lms_id] || []), learningElement] :
          (selectedLearningElements[currentTopic.lms_id] || []).filter((el) => el.lms_id !== learningElement.lms_id)
      }
      setSelectedLearningElements(updatedLearningElements)
    }

    useEffect(() => {
        if (!courseId || !topicId) return
        getUser().then((user) => {
            getLearningPathElement(user.settings.user_id, user.lms_user_id, user.id, courseId, topicId)
                .then((learningPathElement) => {
                    const learningElements = learningPathElement.path.map((element) => {
                        const learningElement : RemoteLearningElementWithClassification = {
                            lms_id: element.learning_element.lms_id,
                            lms_learning_element_name: element.learning_element.name,
                            classification: "",
                            lms_activity_type: element.learning_element.activity_type,
                        }
                        return learningElement
                    })

                    // fetch solutions for the learning elements
                    learningElements.forEach((learningElement) => {
                      getLearningElementSolution(learningElement.lms_id)
                        .then((solution: LearningElementSolution) => {
                          setExistingSolutions((prev) => [...prev, solution])
                        })
                        .catch((error) => {
                          handleError(t, addSnackbar, 'error.fetchLearningElementSolution', error, 3000)
                        })
                    })

                    // filter out learning elements that already have solutions
                    const filteredLearningElements = learningElements.filter((element) => {
                        return !existingSolutions.some((solution) => solution.learning_element_lms_id === element.lms_id)
                    })
                    
                    setLearningElements(filteredLearningElements)

                    
                })
                .catch((error) => {
                    handleError(t, addSnackbar, 'error.fetchLearningPathElement', error, 5000)
                    // Handle error
                })
        })
    }, [courseId, topicId, getUser, getLearningPathElement, t, addSnackbar, handleError, setLearningElements])



  return (
    <Grid container direction="column" justifyContent="center" alignItems="center" spacing={3}>
        <Grid item container justifyContent="center">
          <Typography variant="h6" sx={{ mt: '1rem' }}>
            {t('components.SelectLearningElementTable.title') // add translation key here
            }
          </Typography>
        </Grid>
          <Grid
            item
            container
            alignItems="center"
            justifyContent="center"
            direction="column"
            key={'Create Topic - Learning Element Solution: ' + currentTopic.lms_id}>
            <Paper sx={{ padding: '1rem', width: '95%' }}>
              <Box bgcolor={(theme) => theme.palette.info.light} borderRadius={3}>
                <Grid item container justifyContent="center" alignItems="center">
                  <Typography variant="h6" gutterBottom>
                    {currentTopic.name}
                  </Typography>
                </Grid>
              </Box>
              {learningElements.map((element) => (
                <Grid container alignItems="center" spacing={2} key={element.lms_id}>
                  <Grid item xs={6}>
                    <FormControlLabel control={
                      <Checkbox checked={selectedLearningElements[currentTopic.lms_id]?.some(el => el.lms_id === element.lms_id)} 
                      onChange={(event) => handleCheckboxChange(element, event.target.checked)}/>} label={element.lms_learning_element_name} />
                  </Grid>
                </Grid>
              ))}
            </Paper>
          </Grid>
      {children}
    </Grid>
  )
}

export default memo(SelectLearningElementTable)