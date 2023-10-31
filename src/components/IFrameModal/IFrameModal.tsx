import { Box, Modal, Fab } from '@common/components'
import { memo } from 'react'
import { Close } from '@common/icons'

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
  overflow: 'visible'
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
 * @returns An element that renders an iframe in a modal
 * @category Components
 */
const IFrameModalMemo = (props: IFrameModalProps): JSX.Element => {
  const { url, title, isOpen, onClose } = props

  return (
    <Modal open={props.isOpen} onClose={props.onClose}>
      <Box sx={style_box}>
        <Fab
         color="primary"
         onClick={() => props.onClose()}
         style={{
           top: '-5%',
           left: '105%'
         }}>
          <Close />
        </Fab>
        <iframe
          src={props.url}
          title={props.title}
          width="100%"
          height="100%"
          style={{
            position: 'relative',
            border: 0,
            top: '-10%',
          }}
        />
      </Box>
    </Modal>
  )
}

export default memo(IFrameModalMemo)