import DefaultModal from '@mui/material/Modal'
import { memo } from 'react'
import { EventHandlers, withXAPI } from 'react-xapi-wrapper'
import { ModalProps as DefaultModalProps } from '@common/components'
import { usePageName } from '@services'

/**
 * @prop {@link DefaultModalProps} - The props of the default Modal component.
 * @prop {@link EventHandlers} - The props containing the event handlers.
 * @interface
 */
type ModalProps = DefaultModalProps & EventHandlers

/**
 * WrappedModal component.
 *
 * @remarks
 * The WrappedModal component is a wrapper around the MUI Modal component.
 * It is enhanced with xAPI functionality to track user interactions.
 * WrappedModal can be used as a standalone component on a page.
 *
 * @category Components
 */
const WrappedModal = withXAPI(DefaultModal, {
  componentFilePath: new URL(import.meta.url).pathname,
  componentType: 'Modal'
})

/**
 * Modal component.
 *
 * @param props - Props containing the default Modal props and event handlers.
 *
 * @remarks
 * The Modal component is a wrapper around the WrappedModal component.
 * It retrieves the page name from a hook and passes it to the WrappedModal component.
 * Modal can be used as a standalone component on a page.
 *
 * @category Components
 */
const Modal = ({ ...props }: ModalProps) => {
  const { pageName } = usePageName()
  return <WrappedModal pageName={pageName} {...props} />
}

export default memo(Modal)
