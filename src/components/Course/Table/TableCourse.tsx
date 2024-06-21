import { Checkbox, Paper, Table, TableBody, TableContainer, TableHead, TableRow } from '@common/components'
import {
  StyledTableCell,
  StyledTableCellWithoutBorder,
  StyledTableRow
} from '../../Questionnaire/QuestionnaireResults/Table/QuestionnaireResultTableStyle'
import { memo, useEffect, useState } from 'react'
import { RemoteCourse } from '@core'
import { fetchRemoteCourses } from '../../../services/RemoteCourses'
import { SkeletonList } from '@components'
import { Radio } from '@mui/material'

type TableCourseProps = {
  open?: boolean
}

const formatUnixDate = (unixTime: number): string => {
  if(unixTime === 0 ) return '---'
  const date = new Date(unixTime * 1000)
  return date.toLocaleDateString('de-DE',{day:'2-digit', month:'2-digit', year:'numeric'})
}

const TableCourse = memo(({open=false}:TableCourseProps) => {

  const [LmsCourses,setLmsCourses] = useState<RemoteCourse[]>([])

  useEffect(() => {
    fetchRemoteCourses().then((response) => {
      setLmsCourses(response)
    })
  }, [open])

    const [selectedValue, setSelectedValue] = useState('a');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSelectedValue(event.target.value);
    };

    const controlProps = (item: string) => ({
      checked: selectedValue === item,
      onChange: handleChange,
      value: item,
      name: 'color-radio-button-demo',
      inputProps: { 'aria-label': item },
    });

  return (
    <TableContainer component={Paper} style={{ minWidth: 300 }}>
      <Table style={{ minWidth: 300 }} key={'TableCourse'}>
        <TableHead key={'TableCourseHead'}>
          <StyledTableCell align="left">{'Select'}</StyledTableCell>
          <StyledTableCell align="left">{'ID'}</StyledTableCell>
          <StyledTableCell align="left">{'Fullname'}</StyledTableCell>
          <StyledTableCell align="left">{'Shortname'}</StyledTableCell>
          <StyledTableCell align="left">{'Startdate'}</StyledTableCell>
          <StyledTableCell align="left">{'Enddate'}</StyledTableCell>
          <StyledTableCell align="left">{'Timecreated'}</StyledTableCell>
          <StyledTableCell align="left">{'Timemodified'}</StyledTableCell>
        </TableHead>
          <TableBody key={'TableCourseBody'}>
          {LmsCourses.length === 0 ? (
            <TableRow key={'TableCourseTableRow'}>
              <SkeletonList/>
            </TableRow>
          ): (
            LmsCourses.map((LmsCourse) => (
                <TableRow key={'TableCourseTableRow'}>
                  <StyledTableCell align="left"><Radio {...controlProps(LmsCourse.id.toString())} /></StyledTableCell>
                  <StyledTableCell align="center">{LmsCourse.id}</StyledTableCell>
                  <StyledTableCell align="left">{LmsCourse.fullname}</StyledTableCell>
                  <StyledTableCell align="left">{LmsCourse.shortname}</StyledTableCell>
                  <StyledTableCell align="center">{formatUnixDate(LmsCourse.startdate)}</StyledTableCell>
                  <StyledTableCell align="center">{formatUnixDate(LmsCourse.enddate)}</StyledTableCell>
                  <StyledTableCell align="center">{formatUnixDate(LmsCourse.timecreated)}</StyledTableCell>
                  <StyledTableCell align="center">{formatUnixDate(LmsCourse.timemodified)}</StyledTableCell>
                </TableRow>
              ))
            )}
          </TableBody>
      </Table>
    </TableContainer>
  )
}
)
// eslint-disable-next-line immutable/no-mutation
TableCourse.displayName = 'TableCourse'
export default TableCourse