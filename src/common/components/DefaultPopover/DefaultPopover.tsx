import DefaultPopover from '@mui/material/Popover'
import { usePageName } from 'src/services/PageName/PageName.hooks'
import { memo } from 'react'
import { EventHandlers, withXAPI } from 'react-xapi-wrapper'
import { PopoverProps as DefaultPopoverProps } from '@common/components'

// TODO: DOKU
type PopoverProps = DefaultPopoverProps & EventHandlers

// TODO DOKU
const WrappedPopover = withXAPI(DefaultPopover, {
  componentFilePath: new URL(import.meta.url).pathname,
  componentType: 'Popover',
})

// TODO: DOKU
const Popover = ({ ...props }: PopoverProps) => {
  const { pageName } = usePageName()
  return <WrappedPopover pageName={pageName} {...props} />
}

export default memo(Popover)
