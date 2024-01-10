import { NodeWrapper, Paper, Tooltip, Typography } from '@common/components'
import { Description } from '@common/icons'
import { LearningPathLearningElementNode } from '@components'
import { Handle, NodeProps, Position } from 'reactflow'
import { memo } from 'react'
import { getConfig } from '@shared'
import CheckBoxIcon from '@mui/icons-material/CheckBox'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import { useTheme } from '@common/hooks'
import { useTranslation } from 'react-i18next'
import SquareRoundedIcon from '@mui/icons-material/SquareRounded'

/**
 * SummaryNode component.
 *
 * @param props - Props containing the data of the node.
 *
 * @remarks
 * SummaryNode presents a component that displays a node with an icon and a name.
 * It can be clicked to open a corresponding activity of the LMS.
 * SummaryNode can't be used as a standalone component and must be rendered via ReactFlow.
 *
 * @category Components
 */
const SummaryNode = ({ data }: NodeProps<LearningPathLearningElementNode>) => {
  const theme = useTheme()
  const {t} = useTranslation()
  return (
    <NodeWrapper
      id="summary-node"
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      onClick={() => {
        data.handleOpen()
        data.handleSetUrl(getConfig().MOODLE + `/mod/${data.activityType}/view.php?id=${data.lmsId}`)
      }}
      data-testid={'summaryNode'}>
      <Handle type="target" position={Position.Top} style={{ visibility: 'hidden' }} />
      <Paper
        sx={{
          width: '65px',
          height: '65px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
        <Description sx={{ fontSize: 50 }} />
      </Paper>
      <Typography variant="h6" style={{ marginLeft: '8px' }}>
        {data.name}
      </Typography>
      <Handle type="source" position={Position.Bottom} id="a" style={{ visibility: 'hidden' }} />
      {data.isDone ? (
        <Tooltip title={t("tooltip.completed")}>
          <CheckBoxIcon
            sx={{
              fontSize: 27,
              position: 'absolute',
              top: -13,
              right: -13,
              color: 'rgba(91,189,91,0.68)',
              backgroundColor: 'white',
              border: '1px solid #000',
              borderRadius: 1
            }}
          />
        </Tooltip>
      ) : (
        <Tooltip title={t("tooltip.uncompleted")}>
          <SquareRoundedIcon
            sx={{
              fontSize: 25,
              position: 'absolute',
              top: -13,
              right: -13,
              color: 'rgba(153,157,160,0.36)',
              backgroundColor: 'white',
              border: '1px solid #000',
              borderRadius: 1
            }}
          />
        </Tooltip>
      )}
    </NodeWrapper>
  )
}

export default memo(SummaryNode)
