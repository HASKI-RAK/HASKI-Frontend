import DefaultLink from '@mui/material/Link'
import { usePageName } from 'src/services/xAPI/PageName.hooks'
import { EventHandlers, withXAPI } from 'react-xapi-wrapper'
import {memo, useMemo } from 'react'
import { LinkProps as DefaultLinkProps } from '@common/components'

// TODO: DOKU
type LinkProps = DefaultLinkProps & EventHandlers

// TODO: DOKU
const Link = ({ ...props }: LinkProps) => {
  const { pageName } = usePageName()
  const WrappedComponent = useMemo(
    () =>
      withXAPI(DefaultLink, {
        componentFilePath: new URL(import.meta.url).pathname,
        componentType: 'Link',
        pageName: pageName
      }),
    [pageName]
  )

  return <WrappedComponent {...props} />
}

export default memo(Link)
