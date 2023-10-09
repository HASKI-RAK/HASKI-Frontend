import { Table, TableBody, TableContainer, TableHead, TableRow, Paper } from '@common/components'
import { useTranslation } from 'react-i18next'
import { StyledTableCell, StyledTableCellWithoutBorder, StyledTableRow } from './QuestionnaireResultTableStyle'
import { ILS } from '@core'

//Returns the Interpretation of the ILS-Test (balanced, moderate, strong + Dimension (if score is not balanced))
export const ILSInterpretation = (score: number, interpretationString: string, onlyEnglish?: boolean): string => {
  const { t, i18n } = useTranslation()

  const inter = new Map<number, string>()

  if (onlyEnglish) {
    const en = i18n.getFixedT('en')

    inter.set(-1, en('components.Questionnaire.QuestionnaireResults.Table.TableILS.balanced'))
    inter.set(1, en('components.Questionnaire.QuestionnaireResults.Table.TableILS.balanced'))
    inter.set(-3, en('components.Questionnaire.QuestionnaireResults.Table.TableILS.balanced'))
    inter.set(3, en('components.Questionnaire.QuestionnaireResults.Table.TableILS.balanced'))
    inter.set(-5, en('components.Questionnaire.QuestionnaireResults.Table.TableILS.moderate'))
    inter.set(5, en('components.Questionnaire.QuestionnaireResults.Table.TableILS.moderate'))
    inter.set(-7, en('components.Questionnaire.QuestionnaireResults.Table.TableILS.moderate'))
    inter.set(7, en('components.Questionnaire.QuestionnaireResults.Table.TableILS.moderate'))
    inter.set(-9, en('components.Questionnaire.QuestionnaireResults.Table.TableILS.strong'))
    inter.set(9, en('components.Questionnaire.QuestionnaireResults.Table.TableILS.strong'))
    inter.set(-11, en('components.Questionnaire.QuestionnaireResults.Table.TableILS.strong'))
    inter.set(11, en('components.Questionnaire.QuestionnaireResults.Table.TableILS.strong'))
  } else {
    inter.set(-1, t('components.Questionnaire.QuestionnaireResults.Table.TableILS.balanced'))
    inter.set(1, t('components.Questionnaire.QuestionnaireResults.Table.TableILS.balanced'))
    inter.set(-3, t('components.Questionnaire.QuestionnaireResults.Table.TableILS.balanced'))
    inter.set(3, t('components.Questionnaire.QuestionnaireResults.Table.TableILS.balanced'))
    inter.set(-5, t('components.Questionnaire.QuestionnaireResults.Table.TableILS.moderate'))
    inter.set(5, t('components.Questionnaire.QuestionnaireResults.Table.TableILS.moderate'))
    inter.set(-7, t('components.Questionnaire.QuestionnaireResults.Table.TableILS.moderate'))
    inter.set(7, t('components.Questionnaire.QuestionnaireResults.Table.TableILS.moderate'))
    inter.set(-9, t('components.Questionnaire.QuestionnaireResults.Table.TableILS.strong'))
    inter.set(9, t('components.Questionnaire.QuestionnaireResults.Table.TableILS.strong'))
    inter.set(-11, t('components.Questionnaire.QuestionnaireResults.Table.TableILS.strong'))
    inter.set(11, t('components.Questionnaire.QuestionnaireResults.Table.TableILS.strong'))
  }

  //if the interpretation is "balanced", then only return "balanced" without the Dimension
  return inter.get(score) === t('components.Questionnaire.QuestionnaireResults.Table.TableILS.balanced')
    ? t('components.Questionnaire.QuestionnaireResults.Table.TableILS.balanced')
    : inter.get(score) + ' ' + interpretationString
}

//Depending on the score, return the corresponding dimension
export const ILSDimension = (dimensionNumber: number, score: number, onlyEnglish?: boolean): string => {
  const { t, i18n } = useTranslation()

  switch (dimensionNumber) {
    case 1:
      if (onlyEnglish) {
        const en = i18n.getFixedT('en')
        if (score > 0) return en('components.Questionnaire.QuestionnaireResults.Table.TableILS.Active')
        else return en('components.Questionnaire.QuestionnaireResults.Table.TableILS.Reflective')
      } else if (score > 0) return t('components.Questionnaire.QuestionnaireResults.Table.TableILS.Active')
      else return t('components.Questionnaire.QuestionnaireResults.Table.TableILS.Reflective')
    case 2:
      if (onlyEnglish) {
        const en = i18n.getFixedT('en')
        if (score > 0) return en('components.Questionnaire.QuestionnaireResults.Table.TableILS.Sensory')
        else return en('components.Questionnaire.QuestionnaireResults.Table.TableILS.Intuitive')
      } else if (score > 0) return t('components.Questionnaire.QuestionnaireResults.Table.TableILS.Sensory')
      else return t('components.Questionnaire.QuestionnaireResults.Table.TableILS.Intuitive')
    case 3:
      if (onlyEnglish) {
        const en = i18n.getFixedT('en')
        if (score > 0) return en('components.Questionnaire.QuestionnaireResults.Table.TableILS.Visual')
        else return en('components.Questionnaire.QuestionnaireResults.Table.TableILS.Verbal')
      } else if (score > 0) return t('components.Questionnaire.QuestionnaireResults.Table.TableILS.Visual')
      else return t('components.Questionnaire.QuestionnaireResults.Table.TableILS.Verbal')
    case 4:
      if (onlyEnglish) {
        const en = i18n.getFixedT('en')
        if (score > 0) return en('components.Questionnaire.QuestionnaireResults.Table.TableILS.Sequential')
        else return en('components.Questionnaire.QuestionnaireResults.Table.TableILS.Global')
      } else if (score > 0) return t('components.Questionnaire.QuestionnaireResults.Table.TableILS.Sequential')
      else return t('components.Questionnaire.QuestionnaireResults.Table.TableILS.Global')
    default:
      return 'No dimension found'
  }
}

type TableILSProps = {
  data: ILS
}

const TableILS = ({ data }: TableILSProps) => {
  const { t } = useTranslation()

  const dimensionOneScore = data.input_value
  const dimensionTwoScore = data.perception_value
  const dimensionThreeScore = data.processing_value
  const dimensionFourScore = data.understanding_value

  const rows = [
    {
      id: 1,
      col1: t('components.Questionnaire.QuestionnaireResults.Table.TableILS.Dimension'),
      col2: '',
      col3: t('components.Questionnaire.QuestionnaireResults.Table.TableILS.Interpretation'),
      col4: t('components.Questionnaire.QuestionnaireResults.Table.TableILS.Score')
    },
    {
      id: 2,
      col1: t('components.Questionnaire.QuestionnaireResults.Table.TableILS.Reflective'),
      col2: t('components.Questionnaire.QuestionnaireResults.Table.TableILS.Active'),
      col3: ILSInterpretation(dimensionOneScore, ILSDimension(1, dimensionOneScore).toLowerCase()),
      col4: [dimensionOneScore].toString()
    },
    {
      id: 3,
      col1: t('components.Questionnaire.QuestionnaireResults.Table.TableILS.Intuitive'),
      col2: t('components.Questionnaire.QuestionnaireResults.Table.TableILS.Sensory'),
      col3: ILSInterpretation(dimensionTwoScore, ILSDimension(2, dimensionTwoScore).toLowerCase()),
      col4: [dimensionTwoScore].toString()
    },
    {
      id: 4,
      col1: t('components.Questionnaire.QuestionnaireResults.Table.TableILS.Verbal'),
      col2: t('components.Questionnaire.QuestionnaireResults.Table.TableILS.Visual'),
      col3: ILSInterpretation(dimensionThreeScore, ILSDimension(3, dimensionThreeScore).toLowerCase()),
      col4: [dimensionThreeScore].toString()
    },
    {
      id: 5,
      col1: t('components.Questionnaire.QuestionnaireResults.Table.TableILS.Global'),
      col2: t('components.Questionnaire.QuestionnaireResults.Table.TableILS.Sequential'),
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
}

export default TableILS
