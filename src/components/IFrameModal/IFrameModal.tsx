import { Box, Fab, Modal } from '@common/components'
import { Close } from '@common/icons'
import { memo } from 'react'

const style_box = {
  position: 'absolute',
  top: '25%',
  left: '25%',
  transform: 'translate(-20%, -25%)',
  width: '75%',
  height: '85%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  overflow: 'hidden'
}

type IFrameModalProps = {
  url: string
  title: string
  isOpen: boolean
  onClose: () => void
}

/**
 * IFrameModal is a component that renders an iframe in a modal
 * This can be used to render an activity from Moodle
 * @prop url of the iframe
 * @prop title of the iframe
 * @prop boolean that determines if the modal is open or not
 * @prop function that is called when the modal is closed
 *
 * @remarks
 * On close the component sends a post request to calculate a new rating for the user and the learning element the user attempted.
 *
 * @returns An element that renders an iframe in a modal
 * @category Components
 */
const IFrameModalMemo = (props: IFrameModalProps): JSX.Element => {
  const handleClose = () => {
    props.onClose()
  }

  return (
    <Modal id="iframe-modal" open={props.isOpen} onClose={props.onClose} data-testid={'IFrameModal'}>
      <Box sx={style_box}>
        <Fab
          id="iframe-modal-close-button"
          color="primary"
          data-testid={'IFrameModal-Close-Button'}
          onClick={handleClose}
          style={{
            position: 'absolute',
            top: '2%',
            left: '94.75%'
          }}>
          <Close />
        </Fab>
        <iframe
          src={props.url + '&haski=true'}
          title={props.title}
          width="100%"
          height="104%"
          style={{
            position: 'relative',
            border: 0
          }}
        />
      </Box>
    </Modal>
  )
}

export default memo(IFrameModalMemo)
