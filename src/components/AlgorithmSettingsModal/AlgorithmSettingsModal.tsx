import { ForwardedRef, memo, useCallback, useState, useImperativeHandle, forwardRef } from 'react'
import { useTranslation } from 'react-i18next'
import {
  FormControlLabel,
  Grid,
  Stack,
  RadioGroup,
  Modal,
  Typography,
  Radio,
  Divider,
  Fab
} from '@common/components'
import { Close, Save } from '@common/icons'
import { useTheme } from '@common/hooks'
import useAlgorithmSettingsModal from './AlgorithmSettingsModal.hooks'

export type TestRefType = {
  handleSave: () => void
}

type AlgorithmSettingsModalProps = {
  isOpen: boolean
  handleClose: () => void
  getIDs: () => { courseID: string | null, topicID: string | null}
  options?: {name: string, description: string, key: string}[] //for 
  ref?: ForwardedRef<TestRefType> | null | undefined
}

type optionsType = {
  name: string;
  description: string;
  key: string;
}[]


const AlgorithmSettingsModal = (props: AlgorithmSettingsModalProps): JSX.Element => {
    //const [open, setOpen] = useState(true)
    const [selected, setSelected] = useState(0)
    const { t } = useTranslation()
    const options = props.options ?? [...t('components.AlgorithmSettingsModal.algorithms', {returnObjects: true}) as optionsType]
    const handleSelect = useCallback((event: React.ChangeEvent<HTMLInputElement>) => { setSelected(parseInt(event.target.value))}, [setSelected])
    const { handleSave } = useAlgorithmSettingsModal({handleClose: props.handleClose, options, selected, getIDs: props.getIDs})
    const theme = useTheme()
    //useImperativeHandle(props.ref, () => ({handleSave}), [handleSave])

    return <Modal
      open={props.isOpen}
      onClose={props.handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      data-testid = 'algorithm-modal'>
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
                    return <FormControlLabel sx={{width: {xl: '16rem'}}}  value={index} control={<Radio role='radio-button' checked={index === selected}/>} label={option.name} key={option.key} />
                  })}
                </RadioGroup>
              </Stack>
              <Fab sx={{width: {xl: '3.5rem', md:'2rem', sm: '2rem', xs: '2rem'}, height:{xl: '3.5rem', md:'2rem', xs: '2rem'}, position: 'absolute', top: '0.5rem', right:'0.5rem'}}
               color="primary" onClick={props.handleClose} data-testid='algorithm-modal-close-button'><Close/></Fab>
                  <Divider orientation='vertical' sx={{display: { xs: 'none', md: 'flex' }}}/>
                  <Stack direction='column' spacing={2} sx={{display: { xs: 'none', md: 'flex' }}}>
                    <Typography id="modal-description-header" variant="h6" component="p" align='center'> {t('components.AlgorithmSettingsModal.headerRight')} </Typography>
                    <Typography id='modal-description' variant="body1" component="p" align='center'> {options[selected].description} </Typography>
                  </Stack>  
            </Stack>
            <Fab onClick={handleSave} aria-label="save" data-testid={'algorithm-save-button'} sx={{position: 'absolute', right: '0.5rem', bottom: '0.5rem'}}>
              <Save/>
            </Fab>    
        </Grid>
      </Modal>
}
export default memo(AlgorithmSettingsModal)