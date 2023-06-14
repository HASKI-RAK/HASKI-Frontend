import { DefaultBox as Box, DefaultPaper as Paper, DefaultTypography as Typography } from '@common/components'
import { LearningPathLearningElementNode } from '@components'
import { Handle, NodeProps, Position } from 'reactflow'
import ArticleIcon from '@mui/icons-material/Article' // TODO: DI
import { memo } from 'react'

const AdditionalLiteratureNode = ({ data }: NodeProps<LearningPathLearningElementNode>) => {
  const handleClick = (data: any) => {
    data.handleOpen()
    data.handleSetUrl(process.env.MOODLE + `/mod/${data.activityType}/view.php?id=${data.lmsId}`)
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} onClick={() => handleClick(data)}>
      <Handle type="target" position={Position.Top} style={{ visibility: 'hidden' }} />
      <Paper
        sx={{
          width: '65px',
          height: '65px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
        <ArticleIcon sx={{ fontSize: 50 }} />
      </Paper>
      <Typography variant="h6" style={{ marginLeft: '8px' }}>
        {data.name}
      </Typography>
      <Handle type="source" position={Position.Bottom} id="a" style={{ visibility: 'hidden' }} />
    </Box>
  )
}

export default memo(AdditionalLiteratureNode)
