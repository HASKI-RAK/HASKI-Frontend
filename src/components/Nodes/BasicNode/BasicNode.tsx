import { Card, Typography } from '@mui/material'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Handle, NodeProps, Position } from 'reactflow'
import { IFrameModal } from '@components'
type TopicNode = {
  lms_id: number
  label: string
  activity_type: string
  classification: string
  done: boolean
  nr_of_visits: number
  last_visit: string
  time_spend: number
  is_recommended: boolean
}

export const BasicNode = ({ data }: NodeProps<TopicNode>) => {
  console.log(data)
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const [url, setUrl] = useState(process.env.MOODLE + `/mod/${data.activity_type}/view.php?id=${data.lms_id}`)
  const [title, setTitle] = useState(data.label)
  console.log(url)
  const handleOpen = () => setIsOpen(true)
  const handleClose = () => setIsOpen(false)
  return (
    <>
      <Handle type="target" position={Position.Top} style={{ background: '#555' }} />
      <Card
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0.5rem',
          cursor: 'pointer'
        }}
        onClick={handleOpen}>
        <Typography variant="h5" sx={{ textAlign: 'center' }}>
          {data.label}
        </Typography>
        <Typography variant="h6" sx={{ textAlign: 'center' }}>
          {t('topic.type')}: {data.activity_type}
        </Typography>
        <Typography variant="h6" sx={{ textAlign: 'center' }}>
          {t('topic.visits')}: {data.nr_of_visits}
        </Typography>
        <IFrameModal url={url} title={title} isOpen={isOpen} onClose={handleClose} />
      </Card>
      <Handle type="source" position={Position.Bottom} id="a" style={{ top: '50%', background: '#555' }} />
    </>
  )
}
