import { styled } from '@common/styles'
import {
  TableCell,
  TableRow,
  tableCellClasses
} from '@common/components'

export const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#24262a',
    color: '#FFFFFF',
    fontSize: 13
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 13
  },
  [`&.MuiTableCell-root`]: {
    borderLeft: '3px solid rgba(224, 224, 224, 1)'
  }
}))

export const StyledTableCellWithoutBorder = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#24262a',
    color: '#FFFFFF',
    fontSize: 13
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 13
  }
}))

export const StyledTableRow = styled(TableRow)(() => ({
  '&:nth-of-type(odd)': {
    backgroundColor: 'rgba(200,205,219,0.25)'
  }
}))
