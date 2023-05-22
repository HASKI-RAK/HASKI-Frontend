import { Box, Paper, Typography } from '@mui/material'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Handle, NodeProps, Position } from 'reactflow'
import { IFrameModal, LearningPathLearningElementNode } from '@components'
import AssignmentLateIcon from '@mui/icons-material/AssignmentLate'

export const ExerciseNode = ({ data }: NodeProps<LearningPathLearningElementNode>) => {
    const { t } = useTranslation()
    const [isOpen, setIsOpen] = useState(false)
    const [url] = useState(process.env.MOODLE + `/mod/${data.activity_type}/view.php?id=${data.lms_id}`)
    const [title] = useState(data.name)
    const handleOpen = () => setIsOpen(true)
    const handleClose = () => setIsOpen(false)

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} onClick={handleOpen}>
      <Handle type="target" position={Position.Top} style={{ visibility: 'hidden' }} />
      <Paper
        sx={{
          width: '65px',
          height: '65px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
        <AssignmentLateIcon sx={{ fontSize: 50 }} />
      </Paper>
      <Typography variant="h6" style={{ marginLeft: '8px' }}>
        {data.name}
      </Typography>
      <IFrameModal url={url} title={title} isOpen={isOpen} onClose={handleClose} />
      <Handle type="source" position={Position.Bottom} id="a" style={{ visibility: 'hidden' }} />
    </Box>
  )
}
