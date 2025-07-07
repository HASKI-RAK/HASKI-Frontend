import { Dispatch, memo, ReactNode, SetStateAction } from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Checkbox, FormControlLabel, FormGroup, Grid, Paper, Typography } from '@common/components'
import { SkeletonList } from '@components'
import { RemoteLearningElement, RemoteTopics } from '@core'
import { useCreateLearningElementTable } from './CreateLearningElementTable.hooks'

/**
 * Props for the {@link CreateLearningElementTable} component.
 */
type CreateLearningElementTableProps = {
  /**
   * The list of topics (with their learning elements) to be displayed.
   */
  selectedTopics: RemoteTopics[]
  /**
   * Callback triggered when the selection of learning elements changes.
   *
   * @param selectedLearningElements - The new selection state, mapped by topic ID.
   */
  onLearningElementChange: (selectedLearningElements: { [key: number]: RemoteLearningElement[] }) => void
  /**
   * The currently selected learning elements, mapped by topic ID.
   */
  selectedLearningElements: { [key: number]: RemoteLearningElement[] }
  /**
   * Boolean indicating whether the "select all learning elements" checkbox is checked.
   */
  selectAllLearningElementsChecked: boolean
  /**
   * React state setter for the "select all" checkbox state.
   */
  setSelectAllLearningElementsChecked: Dispatch<SetStateAction<boolean>>
  /**
   * Optional children to render (e.g., placeholders or additional content).
   */
  children?: ReactNode
}

const CreateLearningElementTable = ({
  selectedTopics,
  onLearningElementChange,
  selectedLearningElements,
  selectAllLearningElementsChecked,
  setSelectAllLearningElementsChecked,
  children
}: CreateLearningElementTableProps) => {
  // Hooks
  const { t } = useTranslation()
  const { handleLearningElementCheckboxChange, handleToggleAll } = useCreateLearningElementTable({
    selectedLearningElements,
    onLearningElementChange,
    selectedTopics,
    setSelectAllLearningElementsChecked
  })

  // Render placeholder if no topics available
  if (selectedTopics.length === 0) {
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
      <Grid item container alignItems="center" direction="column">
        <Paper
          sx={{
            padding: '1rem',
            width: '95%',
            boxShadow: 0,
            mt: 2,
            mb: -2
          }}>
          <Box>
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectAllLearningElementsChecked}
                  onChange={(event) => handleToggleAll(event.target.checked)}
                  data-testid={'createLearningElementTable-Toggle-All-Checkbox'}
                />
              }
              label={t('components.CreateLearningElementTable.selectAllToggle')}
            />
          </Box>
        </Paper>
      </Grid>
      {selectedTopics.map((lmsTopic) => (
        <Grid
          item
          container
          alignItems="center"
          direction="column"
          key={'Create Topic - Learning Element: ' + lmsTopic.topic_lms_id}>
          <Paper sx={{ padding: '1rem', width: '95%' }}>
            <Box bgcolor={(theme) => theme.palette.info.light} borderRadius={3}>
              <Grid container justifyContent="center" alignItems="center">
                <Typography variant="h6" gutterBottom>
                  {lmsTopic.topic_lms_name}
                </Typography>
              </Grid>
            </Box>
            <FormGroup>
              {lmsTopic.lms_learning_elements.map((lmsLearningElement) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={(selectedLearningElements[lmsTopic.topic_lms_id] || []).some(
                        (el) => el.lms_id === lmsLearningElement.lms_id
                      )}
                      onChange={(event) =>
                        handleLearningElementCheckboxChange(
                          lmsTopic.topic_lms_id,
                          lmsLearningElement,
                          event.target.checked
                        )
                      }
                    />
                  }
                  label={lmsLearningElement.lms_learning_element_name}
                  key={lmsLearningElement.lms_id}
                />
              ))}
            </FormGroup>
          </Paper>
        </Grid>
      ))}
      {children}
    </Grid>
  )
}

/**
 * Renders a table for selecting learning elements from a list of topics.
 *
 * Displays each topic with its associated learning elements as a group of checkboxes,
 * along with a master "Select all" toggle. Utilizes {@link useCreateLearningElementTable}
 * to centralize selection logic and keep UI in sync with state.
 *
 * If no topics are provided, renders a placeholder (`SkeletonList`) and optional children.
 *
 * @param props - See {@link CreateLearningElementTableProps}
 * @returns A React component for learning element selection within topics.
 *
 * @example
 * <CreateLearningElementTable
 *   selectedTopics={topics}
 *   selectedLearningElements={selectedElements}
 *   onLearningElementChange={handleElementChange}
 *   selectAllLearningElementsChecked={allChecked}
 *   setSelectAllLearningElementsChecked={setAllChecked}
 * />
 *
 * @see {@link useCreateLearningElementTable}
 */
export default memo(CreateLearningElementTable)
