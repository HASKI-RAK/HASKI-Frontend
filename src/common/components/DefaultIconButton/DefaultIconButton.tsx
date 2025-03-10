import DefaultIconButton from '@mui/material/IconButton'
import { usePageName } from 'src/services/xAPI/PageName.hooks'
import {Ref,  forwardRef, memo,useMemo } from 'react'
import { EventHandlers, withXAPI } from 'react-xapi-wrapper'
import { IconButtonProps as DefaultIconButtonProps } from '@common/components'

// TODO: DOKU
type IconButtonProps = DefaultIconButtonProps & EventHandlers

// TODO: DOKU
const IconButton = forwardRef(({ ...props }: IconButtonProps, ref: Ref<HTMLButtonElement>) => {
  const { pageName } = usePageName()

  const WrappedIconButton = useMemo(
    () =>
      withXAPI(DefaultIconButton, {
        componentFilePath: new URL(import.meta.url).pathname,
        componentType: 'IconButton',
        pageName
      }),
    [pageName]
  )

  return <WrappedIconButton ref={ref} {...props} />
})

// eslint-disable-next-line
IconButton.displayName = 'IconButton'
export default memo(IconButton)
