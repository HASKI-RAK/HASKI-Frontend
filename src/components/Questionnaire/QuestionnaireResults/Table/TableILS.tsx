import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { Paper, Table, TableBody, TableContainer, TableHead, TableRow } from '@common/components'
import { ILS } from '@core'
import { StyledTableCell, StyledTableCellWithoutBorder, StyledTableRow } from './QuestionnaireResultTableStyle'

//Returns the Interpretation of the ILS-Test (balanced, moderate, strong + Dimension (if score is not balanced))
export const ILSInterpretation = (score: number, interpretationString: string, onlyEnglish?: boolean): string => {
  const { t, i18n } = useTranslation()

  const inter = new Map<number, string>()

  if (onlyEnglish) {
    const en = i18n.getFixedT('en')

    inter.set(-1, en('components.TableILS.balanced'))
    inter.set(1, en('components.TableILS.balanced'))
    inter.set(-3, en('components.TableILS.balanced'))
    inter.set(3, en('components.TableILS.balanced'))
    inter.set(-5, en('components.TableILS.moderate'))
    inter.set(5, en('components.TableILS.moderate'))
    inter.set(-7, en('components.TableILS.moderate'))
    inter.set(7, en('components.TableILS.moderate'))
    inter.set(-9, en('components.TableILS.strong'))
    inter.set(9, en('components.TableILS.strong'))
    inter.set(-11, en('components.TableILS.strong'))
    inter.set(11, en('components.TableILS.strong'))
  } else {
    inter.set(-1, t('components.TableILS.balanced'))
    inter.set(1, t('components.TableILS.balanced'))
    inter.set(-3, t('components.TableILS.balanced'))
    inter.set(3, t('components.TableILS.balanced'))
    inter.set(-5, t('components.TableILS.moderate'))
    inter.set(5, t('components.TableILS.moderate'))
    inter.set(-7, t('components.TableILS.moderate'))
    inter.set(7, t('components.TableILS.moderate'))
    inter.set(-9, t('components.TableILS.strong'))
    inter.set(9, t('components.TableILS.strong'))
    inter.set(-11, t('components.TableILS.strong'))
    inter.set(11, t('components.TableILS.strong'))
  }

  //if the interpretation is "balanced", then only return "balanced" without the Dimension
  return inter.get(score) === t('components.TableILS.balanced')
    ? t('components.TableILS.balanced')
    : inter.get(score) + ' ' + interpretationString
}

//Depending on the score, return the corresponding dimension
export const ILSDimension = (dimensionNumber: number, score: number, onlyEnglish?: boolean): string => {
  const { t, i18n } = useTranslation()

  switch (dimensionNumber) {
    case 1:
      if (onlyEnglish) {
        const en = i18n.getFixedT('en')
        if (score > 0) return en('components.TableILS.active')
        else return en('components.TableILS.reflective')
      } else if (score > 0) return t('components.TableILS.active')
      else return t('components.TableILS.reflective')
    case 2:
      if (onlyEnglish) {
        const en = i18n.getFixedT('en')
        if (score > 0) return en('components.TableILS.sensory')
        else return en('components.TableILS.intuitive')
      } else if (score > 0) return t('components.TableILS.sensory')
      else return t('components.TableILS.intuitive')
    case 3:
      if (onlyEnglish) {
        const en = i18n.getFixedT('en')
        if (score > 0) return en('components.TableILS.visual')
        else return en('components.TableILS.verbal')
      } else if (score > 0) return t('components.TableILS.visual')
      else return t('components.TableILS.verbal')
    case 4:
      if (onlyEnglish) {
        const en = i18n.getFixedT('en')
        if (score > 0) return en('components.TableILS.sequential')
        else return en('components.TableILS.global')
      } else if (score > 0) return t('components.TableILS.sequential')
      else return t('components.TableILS.global')
    default:
      return 'No dimension found'
  }
}

type TableILSProps = {
  data: ILS
}

const TableILS = memo(({ data }: TableILSProps) => {
  const { t } = useTranslation()

  const dimensionOneScore = data.processing_value
  const dimensionTwoScore = data.perception_value
  const dimensionThreeScore = data.input_value
  const dimensionFourScore = data.understanding_value

  const rows = [
    {
      id: 1,
      col1: t('components.TableILS.dimension'),
      col2: '',
      col3: t('components.TableILS.interpretation'),
      col4: t('components.TableILS.score')
    },
    {
      id: 2,
      col1: t('components.TableILS.reflective'),
      col2: t('components.TableILS.active'),
      col3: ILSInterpretation(dimensionOneScore, ILSDimension(1, dimensionOneScore).toLowerCase()),
      col4: [dimensionOneScore].toString()
    },
    {
      id: 3,
      col1: t('components.TableILS.intuitive'),
      col2: t('components.TableILS.sensory'),
      col3: ILSInterpretation(dimensionTwoScore, ILSDimension(2, dimensionTwoScore).toLowerCase()),
      col4: [dimensionTwoScore].toString()
    },
    {
      id: 4,
      col1: t('components.TableILS.verbal'),
      col2: t('components.TableILS.visual'),
      col3: ILSInterpretation(dimensionThreeScore, ILSDimension(3, dimensionThreeScore).toLowerCase()),
      col4: [dimensionThreeScore].toString()
    },
    {
      id: 5,
      col1: t('components.TableILS.global'),
      col2: t('components.TableILS.sequential'),
      col3: ILSInterpretation(dimensionFourScore, ILSDimension(4, dimensionFourScore).toLowerCase()),
      col4: [dimensionFourScore].toString()
    }
  ]

  return (
    <TableContainer component={Paper} style={{ minWidth: 300 }} key={'TableILSContainer'}>
      <Table style={{ minWidth: 300 }} key={'TableILS'}>
        <TableHead key={'TableILSHead'}>
          <TableRow key={'TableILSTableRow'}>
            <StyledTableCellWithoutBorder align="left">{rows[0].col1}</StyledTableCellWithoutBorder>
            <StyledTableCellWithoutBorder></StyledTableCellWithoutBorder>
            <StyledTableCellWithoutBorder align="left">{rows[0].col3}</StyledTableCellWithoutBorder>
            <StyledTableCellWithoutBorder align="left">{rows[0].col4}</StyledTableCellWithoutBorder>
          </TableRow>
        </TableHead>
        <TableBody key={'TableILSBody'}>
          {rows
            .filter((row) => {
              return row.id !== 1
            })
            .map((row) => (
              <StyledTableRow key={row.id}>
                <StyledTableCellWithoutBorder align="left">{row.col1}</StyledTableCellWithoutBorder>
                <StyledTableCellWithoutBorder align="left">{row.col2}</StyledTableCellWithoutBorder>
                <StyledTableCell align="left">{row.col3}</StyledTableCell>
                <StyledTableCell align="right">{row.col4}</StyledTableCell>
              </StyledTableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
})
// eslint-disable-next-line immutable/no-mutation
TableILS.displayName = 'TableILS'
export default TableILS
