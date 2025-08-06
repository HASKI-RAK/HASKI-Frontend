import { memo } from 'react'
import { EventHandlers, withXAPI } from 'react-xapi-wrapper'
import DefaultFab from '@mui/material/Fab'
import { FabProps as DefaultFabProps } from '@common/components'
import { usePageName } from '@services'

/**
 * @prop {@link DefaultFabProps} - The props of the default Fab component.
 * @prop {@link EventHandlers} - The props containing the event handlers.
 * @interface
 */
type FabProps = DefaultFabProps & EventHandlers

/**
 * WrappedFab component.
 *
 * @remarks
 * The WrappedFab component is a wrapper around the MUI Fab component.
 * It is enhanced with xAPI functionality to track user interactions.
 * WrappedFab can be used as a standalone component on a page.
 *
 * @category Components
 */
const WrappedFab = withXAPI(DefaultFab, {
  componentFilePath: new URL(import.meta.url).pathname,
  componentType: 'Fab'
})

/**
 * Fab component.
 *
 * @param props - Props containing the default Fab props and event handlers.
 *
 * @remarks
 * The Fab component is a wrapper around the WrappedFab component.
 * It retrieves the page name from a hook and passes it to the WrappedFab component.
 * Fab can be used as a standalone component on a page.
 *
 * @category Components
 */
const Fab = ({ ...props }: FabProps) => {
  const { pageName } = usePageName()
  return <WrappedFab pageName={pageName} {...props} />
}

export default memo(Fab)
