import { Box, Modal } from '@common/components'
import { memo } from 'react'

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
  // const [open, setOpen] = useState(false)

  // const handleOpen = () => setOpen(true)
  // const handleClose = () => {
  //   setOpen(false)
  //   props.onClose()
  // }

  // useEffect(() => {
  //   setOpen(props.isOpen)
  // }, [props.isOpen])

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

export default memo(IFrameModalMemo)
