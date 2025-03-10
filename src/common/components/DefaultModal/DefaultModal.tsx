import DefaultModal from '@mui/material/Modal'
import { usePageName } from 'src/services/xAPI/PageName.hooks'
import { memo } from 'react'
import { EventHandlers, withXAPI } from 'react-xapi-wrapper'
import { ModalProps as DefaultModalProps } from '@common/components'

// TODO: DOKU
type ModalProps2 = DefaultModalProps & EventHandlers

// TODO: DOKU
const Modal2 = ({ ...props }: ModalProps2) => {
  const { pageName } = usePageName()

  const WrappedComponent = withXAPI(DefaultModal, {
    componentFilePath: new URL(import.meta.url).pathname,
    pageName,
    componentType: 'Modal'
  })

  return <WrappedComponent {...props} />
}

export default memo(Modal2)
