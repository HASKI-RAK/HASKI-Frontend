import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { Paper, Table, TableBody, TableContainer, TableHead, TableRow } from '@common/components'
import { ListK } from '@core'
import { StyledTableCell, StyledTableCellWithoutBorder, StyledTableRow } from './QuestionnaireResultTableStyle'

const StyledTableRowListK = Object.assign({}, StyledTableRow)

StyledTableRowListK.defaultProps = {
  sx: {
    '&:nth-of-type(1)': {
      backgroundColor: '#24262a'
    },
    '&:nth-of-type(6)': {
      backgroundColor: '#24262a'
    }
  }
}

export const getSubscaleScore = (score: number[]): number => score.reduce((a, b) => a + b, 0) / score.length

type TableListKProps = {
  data: ListK
}

const TableListK = ({ data }: TableListKProps) => {
  const { t } = useTranslation()

  const organize = data.org
  const elaborate = data.elab
  const criticalReview = data.crit_rev
  const repeat = data.rep
  const attention = data.att
  const effort = data.eff
  const time = data.time
  const goalsPlans = data.goal_plan
  const control = data.con
  const regulate = data.reg
  const learnWithClassmates = data.lrn_w_cls
  const literatureResearch = data.lit_res
  const learningEnvironment = data.lrn_env
  const averageCognitiveStrategies = data.cogn_str
  const averageInternalResourceManagementStrategies = data.int_res_mng_str
  const averageMetacognitiveStrategies = data.metacogn_str
  const averageExternalResourcesManagementStrategies = data.ext_res_mng_str

  const rows = [
    {
      id: 1,
      col1: t('components.TableListK.factorsAndSubscales'),
      col2: t('components.TableListK.score')
    },
    {
      id: 2,
      col1: t('components.TableListK.cognitiveStrategies'),
      col2: (Math.round((averageCognitiveStrategies + Number.EPSILON) * 100) / 100).toFixed(2),
      col3: t('components.TableListK.internalResourceManagementStrategies'),
      col4: (Math.round((averageInternalResourceManagementStrategies + Number.EPSILON) * 100) / 100).toFixed(2)
    },
    {
      id: 3,
      col1: t('components.TableListK.organize'),
      col2: organize.toFixed(2),
      col3: t('components.TableListK.attention'),
      col4: attention.toFixed(2)
    },
    {
      id: 4,
      col1: t('components.TableListK.elaborate'),
      col2: elaborate.toFixed(2),
      col3: t('components.TableListK.effort'),
      col4: effort.toFixed(2)
    },
    {
      id: 5,
      col1: t('components.TableListK.criticalReview'),
      col2: criticalReview.toFixed(2),
      col3: t('components.TableListK.time'),
      col4: time.toFixed(2)
    },
    {
      id: 6,
      col1: t('components.TableListK.repeat'),
      col2: repeat.toFixed(2),
      col3: '',
      col4: ''
    },
    {
      id: 7,
      col1: t('components.TableListK.metacognitiveStrategies'),
      col2: (Math.round((averageMetacognitiveStrategies + Number.EPSILON) * 100) / 100).toFixed(2),
      col3: t('components.TableListK.externalResourceManagementStrategies'),
      col4: (Math.round((averageExternalResourcesManagementStrategies + Number.EPSILON) * 100) / 100).toFixed(2)
    },
    {
      id: 8,
      col1: t('components.TableListK.goalsAndPlans'),
      col2: goalsPlans.toFixed(2),
      col3: t('components.TableListK.learningWithClassmates'),
      col4: learnWithClassmates.toFixed(2)
    },
    {
      id: 9,
      col1: t('components.TableListK.control'),
      col2: control.toFixed(2),
      col3: t('components.TableListK.literatureResearch'),
      col4: literatureResearch.toFixed(2)
    },
    {
      id: 10,
      col1: t('components.TableListK.regulate'),
      col2: regulate.toFixed(2),
      col3: t('components.TableListK.learningEnvironment'),
      col4: learningEnvironment.toFixed(2)
    }
  ]

  return (
    <TableContainer component={Paper} style={{ minWidth: 300 }}>
      <Table sx={{ minWidth: 300 }}>
        <TableHead>
          <TableRow>
            <StyledTableCellWithoutBorder align="left">{rows[0].col1}</StyledTableCellWithoutBorder>
            <StyledTableCellWithoutBorder align="left">{rows[0].col2}</StyledTableCellWithoutBorder>
            <StyledTableCellWithoutBorder align="left">{rows[0].col1}</StyledTableCellWithoutBorder>
            <StyledTableCellWithoutBorder align="left">{rows[0].col2}</StyledTableCellWithoutBorder>
          </TableRow>
        </TableHead>
        <TableBody>
          <StyledTableRowListK>
            <StyledTableCellWithoutBorder align="left" style={{ color: 'white' }}>
              {rows[1].col1}
            </StyledTableCellWithoutBorder>
            <StyledTableCellWithoutBorder align="left" style={{ color: 'white' }}>
              {rows[1].col2}
            </StyledTableCellWithoutBorder>
            <StyledTableCellWithoutBorder align="left" style={{ color: 'white' }}>
              {rows[1].col3}
            </StyledTableCellWithoutBorder>
            <StyledTableCellWithoutBorder align="left" style={{ color: 'white' }}>
              {rows[1].col4}
            </StyledTableCellWithoutBorder>
          </StyledTableRowListK>
          <StyledTableRowListK>
            <StyledTableCellWithoutBorder align="left">{rows[2].col1}</StyledTableCellWithoutBorder>
            <StyledTableCell align="left">{rows[2].col2}</StyledTableCell>
            <StyledTableCell align="left">{rows[2].col3}</StyledTableCell>
            <StyledTableCell align="left">{rows[2].col4}</StyledTableCell>
          </StyledTableRowListK>
          <StyledTableRowListK>
            <StyledTableCellWithoutBorder align="left">{rows[3].col1}</StyledTableCellWithoutBorder>
            <StyledTableCell align="left">{rows[3].col2}</StyledTableCell>
            <StyledTableCell align="left">{rows[3].col3}</StyledTableCell>
            <StyledTableCell align="left">{rows[3].col4}</StyledTableCell>
          </StyledTableRowListK>
          <StyledTableRowListK>
            <StyledTableCellWithoutBorder align="left">{rows[4].col1}</StyledTableCellWithoutBorder>
            <StyledTableCell align="left">{rows[4].col2}</StyledTableCell>
            <StyledTableCell align="left">{rows[4].col3}</StyledTableCell>
            <StyledTableCell align="left">{rows[4].col4}</StyledTableCell>
          </StyledTableRowListK>
          <StyledTableRowListK>
            <StyledTableCellWithoutBorder align="left">{rows[5].col1}</StyledTableCellWithoutBorder>
            <StyledTableCell align="left">{rows[5].col2}</StyledTableCell>
            <StyledTableCell align="left">{rows[5].col3}</StyledTableCell>
            <StyledTableCell align="left">{rows[5].col4}</StyledTableCell>
          </StyledTableRowListK>
          <StyledTableRowListK>
            <StyledTableCellWithoutBorder align="left" style={{ color: 'white' }}>
              {rows[6].col1}
            </StyledTableCellWithoutBorder>
            <StyledTableCellWithoutBorder align="left" style={{ color: 'white' }}>
              {rows[6].col2}
            </StyledTableCellWithoutBorder>
            <StyledTableCellWithoutBorder align="left" style={{ color: 'white' }}>
              {rows[6].col3}
            </StyledTableCellWithoutBorder>
            <StyledTableCellWithoutBorder align="left" style={{ color: 'white' }}>
              {rows[6].col4}
            </StyledTableCellWithoutBorder>
          </StyledTableRowListK>
          <StyledTableRowListK>
            <StyledTableCellWithoutBorder align="left">{rows[7].col1}</StyledTableCellWithoutBorder>
            <StyledTableCell align="left">{rows[7].col2}</StyledTableCell>
            <StyledTableCell align="left">{rows[7].col3}</StyledTableCell>
            <StyledTableCell align="left">{rows[7].col4}</StyledTableCell>
          </StyledTableRowListK>
          <StyledTableRowListK>
            <StyledTableCellWithoutBorder align="left">{rows[8].col1}</StyledTableCellWithoutBorder>
            <StyledTableCell align="left">{rows[8].col2}</StyledTableCell>
            <StyledTableCell align="left">{rows[8].col3}</StyledTableCell>
            <StyledTableCell align="left">{rows[8].col4}</StyledTableCell>
          </StyledTableRowListK>
          <StyledTableRowListK>
            <StyledTableCellWithoutBorder align="left">{rows[9].col1}</StyledTableCellWithoutBorder>
            <StyledTableCell align="left">{rows[9].col2}</StyledTableCell>
            <StyledTableCell align="left">{rows[9].col3}</StyledTableCell>
            <StyledTableCell align="left">{rows[9].col4}</StyledTableCell>
          </StyledTableRowListK>
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default memo(TableListK)
// eslint-disable-next-line immutable/no-mutation
TableListK.displayName = 'TableListK'
