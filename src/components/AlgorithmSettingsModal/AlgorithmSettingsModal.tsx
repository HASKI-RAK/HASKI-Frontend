import { memo, useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  FormControlLabel,
  Grid,
  Stack,
  RadioGroup,
  IconButton,
  Modal,
  Button,
  Tooltip,
  Typography,
  Radio,
  Divider,
  Fab
} from '@common/components'
import { Close, Save } from '@common/icons'
import { useTheme, useMediaQuery } from '@common/hooks'

const AlgorithmSettingsModal = () => {
    const [open, setOpen] = useState(true)
    const [selected, setSelected] = useState(0)
    const { t } = useTranslation()
    const options = t('components.AlgorithmSettingsModal.algorithms', {returnObjects: true}) as [{name: string, description: string, key: string}]
    const handleSelect = useCallback((event: React.ChangeEvent<HTMLInputElement>) => { setSelected(parseInt(event.target.value)) }, [setSelected])
    const handleSave = useCallback(() => {
      // TODO: Set the selected algorithm for the Course 
    setOpen(false) }, [setOpen])
    const theme = useTheme()

    return <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description">
        <Grid sx={{width: {xl: '50rem', lg: '40rem', md: '30rem', xs:'18rem'},height: '30rem', right: 50, bgcolor: 'background.paper', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
         border: '2px solid #D4D4D4',
         borderRadius: 6,
         boxShadow: 24,
        p: 4,
        display: 'flex'}}>
            <Stack direction='row' spacing={2}>
              <Stack direction='column' spacing={2}>
                <Typography id="modal-title" variant='h6' component="h6" align='center'> {t('components.AlgorithmSettingsModal.headerLeft')} </Typography>
                <RadioGroup onChange={handleSelect}>
                  {options.map((option, index) => {
                    return <FormControlLabel sx={{width: {xl: '16rem'}}}  value={index} control={<Radio checked={index === selected}/>} label={option.name} key={option.key} />
                  })}
                </RadioGroup>
              </Stack>
              <Fab sx={{width: {xl: '3.5rem', md:'2rem', sm: '2rem', xs: '2rem'}, height:{xl: '3.5rem', md:'2rem', xs: '2rem'}, position: 'absolute', top: '0.5rem', right:'0.5rem'}} color="primary" onClick={() => setOpen(false)}><Close/></Fab>
              {useMediaQuery(theme.breakpoints.up('md')) && 
                <>
                  <Divider orientation='vertical'/>
                  <Stack direction='column' spacing={2}>
                    <Typography id="modal-description-header" variant="h6" component="p" align='center'> {t('components.AlgorithmSettingsModal.headerRight')} </Typography>
                    <Typography id='modal-description' variant="body1" component="p" align='center'> {options[selected].description} </Typography>
                  </Stack>  
                </>
              }
            </Stack>
            <Button onClick={handleSave} aria-label="save" sx={{position: 'absolute', width: '2rem', height: '1.5rem', left: '85%', top: '85%'}}>
              <Save/>
            </Button>    
        </Grid>
      </Modal>
}
export default memo(AlgorithmSettingsModal)