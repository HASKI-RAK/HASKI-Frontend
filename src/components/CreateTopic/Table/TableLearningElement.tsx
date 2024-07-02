import FormatAlignLeftIcon from '@mui/icons-material/ViewList'
import { ToggleButton, ToggleButtonGroup } from '@mui/material'
import { memo, useEffect, useState } from 'react'
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow
} from '@common/components'
import { SkeletonList } from '@components'
import { RemoteCourse } from '@core'
import RemoteLearningElement from '../../../core/RemoteLearningElement/RemoteLearningElement'
import RemoteTopic from '../../../core/RemoteTopic/RemoteTopic'
import { fetchRemoteCourses } from '../../../services/RemoteCourses'
import { fetchRemoteTopics } from '../../../services/RemoteTopics/fetchRemoteTopics'
import {
  StyledTableCell,
  StyledTableCellWithoutBorder,
  StyledTableRow
} from '../../Questionnaire/QuestionnaireResults/Table/QuestionnaireResultTableStyle'

type TableLearningElementProps = {
  lmsRemoteTopics?: RemoteTopic[]
}

const TableLearningElement = memo(({ lmsRemoteTopics = [] }: TableLearningElementProps) => {
  const [LmsLearningElements, setLmsLearningElements] = useState<RemoteLearningElement[]>([])
  const [view, setView] = useState<string>('list')

  return (
    <Grid container direction="column" justifyContent="center" alignItems="center">
      {lmsRemoteTopics.length === 0 ? (
        <TableRow key={'TableTopicTableRow'}>
          <SkeletonList />
        </TableRow>
      ) : (
        <FormGroup>
          {lmsRemoteTopics.map((lmsLearningElementList) =>
            lmsLearningElementList.learning_elements.map((lmsLearningElement) => (
              <FormControlLabel
                control={<Checkbox />}
                label={lmsLearningElement.learning_element_name}
                key={lmsLearningElement.lms_id}
              />
            ))
          )}
        </FormGroup>
      )}
    </Grid>
  )
})
// eslint-disable-next-line immutable/no-mutation
TableLearningElement.displayName = 'TableLearningElement'
export default TableLearningElement
