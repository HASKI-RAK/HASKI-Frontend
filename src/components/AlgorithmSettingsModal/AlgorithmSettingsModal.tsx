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

type AlgorithmSettingsModalProps = {
  isOpen: boolean
  handleClose: () => void
  getIDs: () => { courseID: string | null, topicID: string | null}
}

const AlgorithmSettingsModal = (props: AlgorithmSettingsModalProps): JSX.Element => {
    //const [open, setOpen] = useState(true)
    const [selected, setSelected] = useState(0)
    const { t } = useTranslation()
    const options = t('components.AlgorithmSettingsModal.algorithms', {returnObjects: true}) as [{name: string, description: string, key: string}]
    const handleSelect = useCallback((event: React.ChangeEvent<HTMLInputElement>) => { setSelected(parseInt(event.target.value))}, [setSelected])
    const handleSave = useCallback(() => {
      console.log('Save selected algorithm', options[selected].name, 'for course', props.getIDs().courseID, 'and topic', props.getIDs().topicID)
      // TODO: Set the selected algorithm for the Course using getIDs() to get the courseID and topicID; string has to be converted to number
    props.handleClose() }, [props.handleClose])
    const theme = useTheme()

    return <Modal
      open={props.isOpen}
      onClose={props.handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      test-id = 'algorithm-modal'>
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
              <Fab sx={{width: {xl: '3.5rem', md:'2rem', sm: '2rem', xs: '2rem'}, height:{xl: '3.5rem', md:'2rem', xs: '2rem'}, position: 'absolute', top: '0.5rem', right:'0.5rem'}}
               color="primary" onClick={props.handleClose} test-id='algorithm-modal-close-button'><Close/></Fab>
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
            <Fab onClick={handleSave} aria-label="save" sx={{position: 'absolute', right: '0.5rem', bottom: '0.5rem'}}>
              <Save/>
            </Fab>    
        </Grid>
      </Modal>
}
export default memo(AlgorithmSettingsModal)