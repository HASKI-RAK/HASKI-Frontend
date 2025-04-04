import DefaultModal from '@mui/material/Modal'
import { usePageName } from 'src/services/PageName/PageName.hooks'
import { memo } from 'react'
import { EventHandlers, withXAPI } from 'react-xapi-wrapper'
import { ModalProps as DefaultModalProps } from '@common/components'

// TODO: DOKU
type ModalProps = DefaultModalProps & EventHandlers

// TODO: DOKU
const WrappedModal = withXAPI(DefaultModal, {
  componentFilePath: new URL(import.meta.url).pathname,
  componentType: 'Modal'
})

// TODO: DOKU
const Modal = ({ ...props }: ModalProps) => {
  const { pageName } = usePageName()
  return <WrappedModal pageName={pageName} {...props} />
}

export default memo(Modal)
