import { ChangeEvent, Dispatch, memo, ReactNode, SetStateAction, useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { Box, Checkbox, FormControlLabel, Grid, Paper, Typography } from '@common/components'
import { handleError, RemoteLearningElementWithClassification } from '@components'
import { LearningElementSolution, LearningPathLearningElement, Topic } from '@core'
import { SnackbarContext } from '@services'
import { usePersistedStore, useStore } from '@store'

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
  children
}: SelectLearningElementTableProps) => {
  const [learningElements, setLearningElements] = useState<RemoteLearningElementWithClassification[]>([])

  const { courseId } = useParams()
  const { topicId } = useParams()

  const { t } = useTranslation()

  const { addSnackbar } = useContext(SnackbarContext)

  const getLearningPathElement = useStore((state) => state.getLearningPathElement)
  const getUser = usePersistedStore((state) => state.getUser)
  const getLearningElementSolution = useStore((state) => state.getLearningElementSolution)

  // Handles checkbox state changes for learning elements.
  const handleCheckboxChange = (learningElement: RemoteLearningElementWithClassification, checked: boolean) => {
    const updatedLearningElements = {
      [currentTopic.lms_id]: checked
        ? [...(selectedLearningElements[currentTopic.lms_id] || []), learningElement]
        : (selectedLearningElements[currentTopic.lms_id] || []).filter((el) => el.lms_id !== learningElement.lms_id)
    }
    setSelectedLearningElements(updatedLearningElements)
  }

  // Loads learning elements for the current topic and filters out ones that already have a solution.
  useEffect(() => {
    if (!courseId || !topicId) return

    getUser().then((user) => {
      getLearningPathElement(user.settings.user_id, user.lms_user_id, user.id, courseId, topicId)
        .then(async (learningPathElement) => {
          // Build the list of learning elements
          const learningElements: RemoteLearningElementWithClassification[] = learningPathElement.path.map(
            (element: LearningPathLearningElement): RemoteLearningElementWithClassification => ({
              lms_id: element.learning_element.lms_id,
              lms_learning_element_name: element.learning_element.name,
              classification: '',
              lms_activity_type: element.learning_element.activity_type
            })
          )

          // Check which learning elements already have a solution
          const solutions: (LearningElementSolution | null)[] = await Promise.all(
            learningElements.map((el) => getLearningElementSolution(el.lms_id).catch(() => null))
          )

          // Extract IDs for elements that have a solution and store in a Set for efficient lookup
          const solutionIds = new Set(
            solutions.filter((sol): sol is LearningElementSolution => !!sol).map((sol) => sol.learning_element_lms_id)
          )

          // Filter out learning elements that already have solutions
          const filteredLearningElements = learningElements.filter((el) => !solutionIds.has(el.lms_id))

          setLearningElements(filteredLearningElements)
        })
        .catch((error) => {
          handleError(t, addSnackbar, 'error.fetchLearningPathElement', error, 5000)
        })
    })
  }, [
    courseId,
    topicId,
    getUser,
    getLearningPathElement,
    getLearningElementSolution,
    t,
    addSnackbar,
    setLearningElements
  ])

  return learningElements.length === 0 ? (
    <Grid container item>
      <Box sx={{ padding: '1rem', width: '95%' }}>
        <Typography variant="body1" align={'center'}>
          {t('components.SelectLearningElementTable.noLearningElements')}
        </Typography>
      </Box>
    </Grid>
  ) : (
    <Grid container direction="column" justifyContent="center" alignItems="center" spacing={3}>
      <Grid item container justifyContent="center">
        <Typography variant="h6" sx={{ mt: '1rem' }}>
          {t('components.SelectLearningElementTable.title')}
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
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedLearningElements[currentTopic.lms_id]?.some(
                        (el) => el.lms_id === element.lms_id
                      )}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        handleCheckboxChange(element, event.target.checked)
                      }
                      id={`select-learning-element-table-checkbox-${element.lms_learning_element_name}`}
                    />
                  }
                  label={element.lms_learning_element_name}
                />
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
