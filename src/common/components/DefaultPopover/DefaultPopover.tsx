import DefaultPopover from '@mui/material/Popover'
import { usePageName } from 'src/services/xAPI/PageName.hooks'
import { memo } from 'react'
import { EventHandlers, withXAPI } from 'react-xapi-wrapper'
import { PopoverProps as DefaultPopoverProps } from '@common/components'

// TODO: DOKU
type PopoverProps = DefaultPopoverProps & EventHandlers

// TODO: DOKU
const Popover = ({ ...props }: PopoverProps) => {
  const { pageName } = usePageName()

  const WrappedPopover = withXAPI(DefaultPopover, {
    componentFilePath: new URL(import.meta.url).pathname,
    componentType: 'Popover',
    pageName
  })

  return <WrappedPopover {...props} />
}

export default memo(Popover)
