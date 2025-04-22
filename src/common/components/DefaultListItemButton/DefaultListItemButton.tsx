import DefaultListItemButton from '@mui/material/ListItemButton'
import { EventHandlers, withXAPI } from 'react-xapi-wrapper'
import { ListItemButtonProps as DefaultListItemButtonProps } from '@common/components'
import { usePageName } from '@services'
import { memo } from 'react'

/**
 * @prop {@link DefaultListItemButtonProps} - The props of the default ListItemButton component.
 * @prop {@link EventHandlers} - The props containing the event handlers.
 * @interface
 */
type ListItemButtonProps = DefaultListItemButtonProps & EventHandlers

/**
 * WrappedListItemButton component.	
 * 
 * @remarks
 * The WrappedListItemButton component is a wrapper around the MUI ListItemButton component.
 * It is enhanced with xAPI functionality to track user interactions.
 * WrappedListItemButton can be used as a standalone component on a page.
 * 
 * @category Components
 */
const WrappedListItemButton = withXAPI(DefaultListItemButton, {
    componentFilePath: new URL(import.meta.url).pathname,
    componentType: 'ListItemButton'
})

/**
 * ListItemButton component.
 * 
 * @param props - Props containing the default ListItemButton props and event handlers.
 * 
 * @remarks
 * The ListItemButton component is a wrapper around the WrappedListItemButton component.
 * It retrieves the page name from a hook and passes it to the WrappedListItemButton component.
 * ListItemButton can be used as a standalone component on a page.
 * 
 * @category Components
 */
const ListItemButton = ({ ...props }: ListItemButtonProps) => {
    const { pageName } = usePageName()
    return <WrappedListItemButton pageName={pageName} {...props} />
}

export default memo(ListItemButton)