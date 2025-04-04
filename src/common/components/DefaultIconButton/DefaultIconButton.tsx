import DefaultIconButton from '@mui/material/IconButton'
import { usePageName } from 'src/services/PageName/PageName.hooks'
import {Ref,  forwardRef, memo } from 'react'
import { EventHandlers, withXAPI } from 'react-xapi-wrapper'
import { IconButtonProps as DefaultIconButtonProps } from '@common/components'

// TODO: DOKU
type IconButtonProps = DefaultIconButtonProps & EventHandlers

// TODO: DOKU
const WrappedIconButton = withXAPI(DefaultIconButton, {
      componentFilePath: new URL(import.meta.url).pathname,
      componentType: 'IconButton',
})


// TODO: DOKU
const IconButton = forwardRef(({ ...props }: IconButtonProps, ref: Ref<HTMLButtonElement>) => {
  const { pageName } = usePageName()
  return <WrappedIconButton ref={ref} pageName={pageName} {...props} />
})


// eslint-disable-next-line
IconButton.displayName = 'IconButton'
export default memo(IconButton)
