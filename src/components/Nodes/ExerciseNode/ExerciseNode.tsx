import { NodeWrapper, Paper, Tooltip, Typography } from '@common/components'
import { AssignmentLate } from '@common/icons'
import { LearningPathLearningElementNode } from '@components'
import { Handle, NodeProps, Position } from 'reactflow'
import { memo } from 'react'
import { getConfig } from '@shared'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import CheckBoxIcon from '@mui/icons-material/CheckBox'
import { useTheme } from '@common/hooks'
import CheckBoxOutlineBlankOutlinedIcon from '@mui/icons-material/CheckBoxOutlineBlankOutlined'
import IndeterminateCheckBoxOutlinedIcon from '@mui/icons-material/IndeterminateCheckBoxOutlined'
import SquareRoundedIcon from '@mui/icons-material/SquareRounded'
import { useTranslation } from 'react-i18next'

/**
 * ExerciseNode component.
 *
 * @param props - Props containing the data of the node.
 *
 * @remarks
 * ExerciseNode presents a component that displays a node with an icon and a name.
 * It can be clicked to open a corresponding activity of the LMS.
 * ExerciseNode can't be used as a standalone component and must be rendered via ReactFlow.
 *
 * @category Components
 */
const ExerciseNode = ({ data }: NodeProps<LearningPathLearningElementNode>) => {
  const theme = useTheme()
  const { t } = useTranslation()
  return (
    <NodeWrapper
      id="exercise-node"
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      onClick={() => {
        data.handleOpen()
        data.handleSetUrl(getConfig().MOODLE + `/mod/${data.activityType}/view.php?id=${data.lmsId}`)
      }}
      data-testid={'exerciseNode'}>
      <Handle type="target" position={Position.Top} style={{ visibility: 'hidden' }} />
      <Paper
        sx={{
          width: '65px',
          height: '65px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
        <AssignmentLate sx={{ fontSize: 50 }} />
      </Paper>
      <Typography variant="h6" style={{ marginLeft: '8px' }}>
        {data.name}
      </Typography>
      <Handle type="source" position={Position.Bottom} id="a" style={{ visibility: 'hidden' }} />
      {data.isDone ? (
        <Tooltip title={t('tooltip.completed')}>
          <CheckBoxIcon
            viewBox={'3 -3 24 24'}
            sx={{
              fontSize: 29,
              position: 'absolute',
              top: -13,
              right: -13,
              color: 'rgba(91,189,91,0.99)',
              background: 'white',
              borderRadius: '10%'
            }}
          />
        </Tooltip>
      ) : null}
    </NodeWrapper>
  )
}

export default memo(ExerciseNode)
