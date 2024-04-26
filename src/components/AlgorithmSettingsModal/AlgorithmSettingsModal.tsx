import { memo, useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Form, useLocation, useNavigate } from 'react-router-dom'
import {
  FormControlLabel,
  Grid,
  Stack,
  RadioGroup,
  IconButton,
  Modal,
  Tooltip,
  Typography,
  Radio,
  Divider
} from '@common/components'

const AlgorithmSettingsModal = () => {
    const [open, setOpen] = useState(true)
    const [selected, setSelected] = useState(0)
    const { t } = useTranslation()
    const options = t('components.AlgorithmSettingsModal.algorithmNames', {returnObjects: true}) as string[];
    const descriptions = t('components.AlgorithmSettingsModal.algorithmDescriptions', {returnObjects: true}) as string[];
    const handleSelect = useCallback((event: React.ChangeEvent<HTMLInputElement>) => { setSelected(parseInt(event.target.value)) }, [setSelected])

    return <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description">
        <Grid sx={{width: 800, height: 600, right: 50, bgcolor: 'background.paper', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
         border: '2px solid #D4D4D4',
         borderRadius: 6,
         boxShadow: 24,
        p: 4,
        display: 'flex'}}>
            <Stack direction='row' spacing={2}>
              <Stack direction='column' spacing={2}>
                <Typography id="modal-title" variant="h6" component="h6" align='center'> {t('components.AlgorithmSettingsModal.headerLeft')} </Typography>
                <RadioGroup onChange={handleSelect}>
                  {options.map((option, index) => {
                    return <FormControlLabel value={index} control={<Radio />} label={option} key={index} />
                  })}
                </RadioGroup>
              </Stack>
              <Divider orientation='vertical'/>
                <Stack direction='column' spacing={2}>
                <Typography id="modal-description-header" variant="h6" component="p" align='center'> {t('components.AlgorithmSettingsModal.headerRight')} </Typography>
                <Typography id='modal-description' variant="body1" component="p" align='center'> {descriptions[selected]} </Typography>
                <IconButton onClick={() => setOpen(false)} aria-label="close" sx={{position: 'absolute', right: 8, top: 8}}></IconButton>
              </Stack>
            </Stack>
        </Grid>
      </Modal>
}
export default memo(AlgorithmSettingsModal)