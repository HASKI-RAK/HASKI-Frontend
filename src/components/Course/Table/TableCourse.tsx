import { Checkbox, Paper, Table, TableBody, TableContainer, TableHead, TableRow, Grid } from '@common/components'
import {
  StyledTableCell,
  StyledTableCellWithoutBorder,
  StyledTableRow
} from '../../Questionnaire/QuestionnaireResults/Table/QuestionnaireResultTableStyle'
import { memo, useEffect, useState } from 'react'
import { RemoteCourse } from '@core'
import { fetchRemoteCourses } from '../../../services/RemoteCourses'
import { SkeletonList } from '@components'
import { ToggleButton, ToggleButtonGroup } from '@mui/material'
import FormatAlignLeftIcon from '@mui/icons-material/ViewList'


type TableCourseProps = {
  open?: boolean,
  onCourseSelect: (course: RemoteCourse) => void
}

const formatUnixDate = (unixTime: number): string => {
  if(unixTime === 0) return '---'
  const date = new Date(unixTime * 1000)
  return date.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' })
}

const TableCourse = memo(({ open = false, onCourseSelect }: TableCourseProps) => {

    const [LmsCourses, setLmsCourses] = useState<RemoteCourse[]>([])
    const [view, setView] = useState<string>('list')

    useEffect(() => {
      fetchRemoteCourses().then((response) => {
        setLmsCourses(response)
      })
    }, [open])


    const handleChange = (event: React.MouseEvent<HTMLElement>, nextView: string) => {
      setView(nextView)
      if(nextView !== null) {
        const selectedCourse = LmsCourses.find(course => course.fullname === nextView)
        if(selectedCourse) {
          onCourseSelect(selectedCourse)
        }
      }
    }

    return (<Grid container direction="column" justifyContent="center" alignItems="center">
        {LmsCourses.length === 0 ? (
          <TableRow key={'TableCourseTableRow'}>
            <SkeletonList />
          </TableRow>
        ) : (
          <ToggleButtonGroup
            orientation="vertical"
            value={view}
            exclusive
            onChange={handleChange}
            sx={{
              '& .MuiToggleButtonGroup-grouped:not(:first-of-type)': {
                borderColor: 'black'
              }
            }}>
            {LmsCourses.map((LmsCourse) => (
              <ToggleButton value={LmsCourse.fullname} aria-label={LmsCourse.fullname} key={LmsCourse.id}
                            sx={{ minWidth: '30rem', mb: 2, borderColor: 'black' }}>
                <Grid direction="column" justifyContent="center" alignItems="center">
                  <Grid direction="row" justifyContent="flex-start" alignItems="center">
                    {LmsCourse.fullname}
                  </Grid>
                </Grid>
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        )}
      </Grid>
    )
  }
)
// eslint-disable-next-line immutable/no-mutation
TableCourse.displayName = 'TableCourse'
export default TableCourse