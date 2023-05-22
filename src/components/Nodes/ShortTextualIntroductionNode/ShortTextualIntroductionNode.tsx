import { Paper, Typography} from '@mui/material'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Handle, NodeProps, Position } from 'react-flow-renderer'
import { IFrameModal, LearningPathLearningElementNode } from '@components'
import ShortTextIcon from '@mui/icons-material/ShortText'

export const ShortTextualIntroductionNode = ({ data }: NodeProps<LearningPathLearningElementNode>) => {
    const { t } = useTranslation()
    const [isOpen, setIsOpen] = useState(false)
    const [url] = useState(process.env.MOODLE + `/mod/${data.activity_type}/view.php?id=${data.lms_id}`)
    const [title] = useState(data.name)
    const handleOpen = () => setIsOpen(true)
    const handleClose = () => setIsOpen(false)

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <Handle type="target" position={Position.Top} style={{ background: '#555' }} />
            <Paper
                onClick={handleOpen}
                sx={{
                    width: '65px',
                    height: '65px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                <ShortTextIcon sx={{ fontSize: 50 }} />
            </Paper>
            <Typography variant="h6" style={{marginLeft: '8px'}}>
                {data.name}
            </Typography>
            <IFrameModal url={url} title={title} isOpen={isOpen} onClose={handleClose} />
            <Handle type="source" position={Position.Bottom} id="a" style={{ top: '50%', background: '#555' }} />
        </div>
    )
}