import DefaultModal from '@mui/material/Modal'
import { usePageName } from 'src/services/xAPI/PageName.hooks'
import { memo, useMemo } from 'react'
import { EventHandlers, withXAPI } from 'react-xapi-wrapper'
import { ModalProps as DefaultModalProps } from '@common/components'

// TODO: DOKU
type ModalProps = DefaultModalProps & EventHandlers

// TODO: DOKU
const Modal = ({ ...props }: ModalProps) => {
  const { pageName } = usePageName()

  const WrappedModal = useMemo(() => withXAPI(DefaultModal, {
    componentFilePath: new URL(import.meta.url).pathname,
    pageName,
    componentType: 'Modal'
  }), [pageName])

  return <WrappedModal {...props} />
}

export default memo(Modal)
