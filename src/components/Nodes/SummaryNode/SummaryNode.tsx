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
      {data.status ? (
        <Tooltip title={t("tooltip.completed")}>
          <CheckBoxIcon
            sx={{
              fontSize: 35,
              position: 'absolute',
              top: -15,
              right: -15,
              color: theme.palette.success.main,
              backgroundColor: 'white',
              border: '1px solid',
              borderRadius: 1
            }}
          />
        </Tooltip>
      ) : (
        <Tooltip title={t("tooltip.pending")}>
          <CheckBoxOutlineBlankIcon
            sx={{
              fontSize: 35,
              position: 'absolute',
              top: -15,
              right: -13,
              color: theme.palette.success.main,
              backgroundColor: 'white',
              border: '1px solid',
              borderRadius: 1
            }}
          />
        </Tooltip>
      )}
    </NodeWrapper>
  )
}

export default memo(SummaryNode)
