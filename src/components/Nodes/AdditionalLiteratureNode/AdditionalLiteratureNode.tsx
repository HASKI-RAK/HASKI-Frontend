import { NodeWrapper, Paper, Tooltip, Typography } from '@common/components'
import { LearningPathLearningElementNode } from '@components'
import { Handle, NodeProps, Position } from 'reactflow'
import { Article } from '@common/icons'
import { memo } from 'react'
import { getConfig } from '@shared'
import CheckBoxIcon from '@mui/icons-material/CheckBox'
import { useTheme } from '@common/hooks'
import { useTranslation } from 'react-i18next'

/**
 * AdditionalLiteratureNode component.
 *
 * @param props - Props containing the data of the node.
 *
 * @remarks
 * AdditionalLiteratureNode presents a component that displays a node with an icon and a name.
 * It can be clicked to open a corresponding activity of the LMS.
 * AdditionalLiteratureNode can't be used as a standalone component and must be rendered via ReactFlow.
 *
 * @category Components
 */
const AdditionalLiteratureNode = ({ data }: NodeProps<LearningPathLearningElementNode>) => {
  const theme = useTheme()
  const { t } = useTranslation()
  return (
    <NodeWrapper
      id="additional-literature-node"
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      onClick={() => {
        data.handleOpen()
        data.handleSetUrl(getConfig().MOODLE + `/mod/${data.activityType}/view.php?id=${data.lmsId}`)
        data.handleSetLmsId(data.lmsId)
      }}
      data-testid={'additionalLiteratureNode'}>
      <Handle type="target" position={Position.Top} style={{ visibility: 'hidden' }} />
      <Paper
        sx={{
          width: '65px',
          height: '65px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
        <Article sx={{ fontSize: 50 }} />
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
              color: theme.palette.success.main,
              background: theme.palette.common.white,
              borderRadius: '10%'
            }}
          />
        </Tooltip>
      ) : null}
    </NodeWrapper>
  )
}

export default memo(AdditionalLiteratureNode)
