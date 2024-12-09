import { memo, ReactNode, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Handle, NodeProps, Position } from 'reactflow'
import { NodeWrapper, Paper, Tooltip, Typography, IconButton, Grid, Collapse } from '@common/components'
import { CheckBox, Feedback, FavoriteBorderIcon, FavoriteIcon, Task } from '@common/icons'
import { LearningPathLearningElementNode } from '@components'
import { useTheme } from '@common/hooks'
import { getConfig } from '@shared'

/**
 * @prop children - The icon of the node.
 * @prop {@link NodeProps} - The props of the node.
 * @interface
 */

type BasicNodeProps = NodeProps<LearningPathLearningElementNode> & {
  icon?: JSX.Element
  children?: ReactNode
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
const BasicNode = ({ id, icon = <Feedback sx={{ fontSize: 50 }} />, ...props }: BasicNodeProps) => {
  const { t } = useTranslation()
  const theme = useTheme()
  const [isFavorite, setIsFavorite] = useState(false)
  const onMouseEnter = () => {
    setIsHovered(true)
  }
  const onMouseLeave = () => {
    setIsHovered(false)
  }
  const addToFavorites = (event: React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    setIsFavorite(!isFavorite)
    event.stopPropagation()
  }
  const handleShowSolution = (event: React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    props.data.handleOpen()
    props.data.handleSetUrl(getConfig().MOODLE + `/mod/${props.data.activityType}/view.php?id=${props.data.lmsId}`)
    props.data.handleSetLmsId(props.data.lmsId)
    event.stopPropagation()
  }
  const [isHovered, setIsHovered] = useState(false)
  return (
    <NodeWrapper
      id={id + '-' + props.data.lmsId}
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      onClick={() => {
        props.data.handleOpen()
        props.data.handleSetUrl(getConfig().MOODLE + `/mod/${props.data.activityType}/view.php?id=${props.data.lmsId}`)
        props.data.handleSetLmsId(props.data.lmsId)
      }}
      data-testid={'basicNode'}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      >
      <Collapse in={isHovered} style={{ transitionDelay: isHovered ? '100ms' : '500ms'}}>
        <Grid container direction="row" justifyContent="flex-end" alignItems="center" sx={{position: 'absolute', top: '-3rem', left: '0.2rem'}}>
          <IconButton onClick={addToFavorites} sx={{
            marginLeft: '1rem',
            color: theme.palette.secondary.contrastText,
            backgroundColor: theme.palette.primary.main
            , border: '1px solid grey'
            }}>
            {isFavorite ? <FavoriteIcon/> : <FavoriteBorderIcon/>}
          </IconButton>
          <IconButton onClick={handleShowSolution}
          sx={{backgroundColor:theme.palette.primary.main,
          marginLeft: '0.5rem',
          border: '1px solid grey',
          }}>
            <Task/>
          </IconButton>
          {props.children}
        </Grid>
      </Collapse>
      <Handle type="target" position={Position.Top} style={{ visibility: 'hidden' }} />
      <Paper
        sx={{
          width: '65px',
          height: '65px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
        {icon}
      </Paper>
      <Typography variant="h6" style={{ marginLeft: '8px' }}>
        {props.data.name}
      </Typography>
      <Handle type="source" position={Position.Bottom} id="a" style={{ visibility: 'hidden' }} />
      {props.data.isDone && (
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
      )}
    </NodeWrapper>
  )
}

export default memo(BasicNode)
