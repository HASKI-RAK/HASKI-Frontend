import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { Handle, NodeProps, Position } from 'reactflow'
import { Box, NodeWrapper, Paper, Tooltip, Typography } from '@common/components'
import { CheckBox, Feedback, Warning } from '@common/icons'
import { LearningPathLearningElementNode } from '@components'
import { getConfig } from '@shared'

/**
 * @prop children - The icon of the node.
 * @prop {@link NodeProps} - The props of the node.
 * @interface
 */
type BasicNodeProps = NodeProps<LearningPathLearningElementNode> & {
  children?: JSX.Element
}

/**
 * BasicNode component.
 *
 * @param props - Props containing the id, children and data of the node.
 *
 * @remarks
 * BasicNode represents a component that displays a node with a name.
 * It can be clicked to open a corresponding activity of the LMS.
 * BasicNode can't be used as a standalone component and must be rendered via ReactFlow.
 *
 * @category Components
 */
const BasicNode = ({ id, children = <Feedback sx={{ fontSize: 50 }} />, data }: BasicNodeProps) => {
  const { t } = useTranslation()
  return (
    <NodeWrapper
      id={id + '-' + data.lmsId}
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      onClick={() => {
        data.handleOpen()
        data.handleSetUrl(getConfig().MOODLE + `/mod/${data.activityType}/view.php?id=${data.lmsId}`)
        data.handleSetLmsId(data.lmsId)
      }}
      data-testid={'basicNode'}>
      <Handle type="target" position={Position.Top} style={{ visibility: 'hidden' }} />
      <Paper
        sx={{
          width: '65px',
          height: '65px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
        {children}
      </Paper>
      <Typography variant="h6" style={{ marginLeft: '8px' }}>
        {data.name}
      </Typography>
      <Handle type="source" position={Position.Bottom} id="a" style={{ visibility: 'hidden' }} />
      {data.isDisabled ? (
        <Tooltip title="Classification is not set in the Default Learning Path">
          <Box
            sx={{
              position: 'absolute',
              top: -20,
              right: -20,
              width: 40,
              height: 40
            }}>
            {/* The Typography component is used to "color" the ! inside the Warning Icon White */}
            <Typography
              variant="h4"
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                color: 'white',
                fontWeight: 'bold',
                lineHeight: 1
              }}>
              |
            </Typography>
            <Warning
              sx={{
                fontSize: 40,
                color: (theme) => theme.palette.error.main,
                position: 'absolute',
                top: 0,
                left: 0
              }}
            />
          </Box>
        </Tooltip>
      ) : data.isDone ? (
        <Tooltip title={t('tooltip.completed')}>
          <CheckBox
            viewBox={'3 -3 24 24'}
            sx={{
              fontSize: 29,
              position: 'absolute',
              top: -13,
              right: -13,
              color: (theme) => theme.palette.success.main,
              background: (theme) => theme.palette.common.white,
              borderRadius: '10%'
            }}
          />
        </Tooltip>
      ) : null}
    </NodeWrapper>
  )
}

export default memo(BasicNode)
