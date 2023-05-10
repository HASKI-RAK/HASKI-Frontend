import { DefaultBox as Box, DefaultModal as Modal } from '@common/components'

const style_box = {
  position: 'absolute',
  top: '25%',
  left: '25%',
  transform: 'translate(-20%, -20%)',
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
  onClose?: () => void
}

/**
 * IFrameModal is a component that renders an iframe in a modal.
 * This can be used to render an activity from Moodle.
 * @param props.url is the url of the iframe.
 * @param props.title is the title of the iframe.
 * @param props.isOpen is a boolean that determines if the modal is open or not.
 * @returns {JSX.Element} - An element that renders an iframe in a modal.
 * @category Components
 */
const IFrameModal = (props: IFrameModalProps): JSX.Element => {
  return (
    <Modal open={props.isOpen} onClose={props.onClose}>
      <Box sx={style_box}>
        <iframe
          src={props.url}
          title={props.title}
          width="120%"
          height="130%"
          style={{
            position: 'relative',
            left: '-19%',
            top: '-21%'
          }}
        />
      </Box>
    </Modal>
  )
}

export default IFrameModal
