import { Card, Paper, Typography } from '@mui/material'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Handle, NodeProps, Position } from 'reactflow'
import { IFrameModal, LearningPathLearningElementNode } from '@components'
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates'
export const ExplanationNode = ({ data }: NodeProps<LearningPathLearningElementNode>) => {
  console.log(data)
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const [url] = useState(process.env.MOODLE + `/mod/${data.activity_type}/view.php?id=${data.lms_id}`)
  const [title] = useState(data.name)
  const handleOpen = () => setIsOpen(true)
  const handleClose = () => setIsOpen(false)
  return (
    <>
      <Handle type="target" position={Position.Top} style={{ background: '#555' }} />
      <Paper
        onClick={handleOpen}
        sx={{
          width: '60px',
          height: '60px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
        <TipsAndUpdatesIcon sx={{ fontSize: 50 }} />

        {/* <Typography variant="h5" sx={{ textAlign: 'center' }}>
          {data.name}
        </Typography>
        <Typography variant="h6" sx={{ textAlign: 'center' }}>
        {t('topic.type')}: {data.activity_type}
        </Typography> */}
      </Paper>
      <IFrameModal url={url} title={title} isOpen={isOpen} onClose={handleClose} />
      <Handle type="source" position={Position.Bottom} id="a" style={{ top: '50%', background: '#555' }} />
    </>
  )
}
