import DefaultLink from '@mui/material/Link'
import { usePageName } from 'src/services/PageName/PageName.hooks'
import { EventHandlers, withXAPI } from 'react-xapi-wrapper'
import {ElementType, memo } from 'react'
import { LinkProps as DefaultLinkProps } from '@common/components'

// TODO: DOKU
type LinkProps<C extends ElementType, P = object> = DefaultLinkProps<C, P> & EventHandlers

// TODO: DOKU
const WrappedComponent = withXAPI(DefaultLink, {
      componentFilePath: new URL(import.meta.url).pathname,
      componentType: 'Link',
})

// TODO: DOKU
const Link =  <C extends ElementType>({ ...props }: LinkProps<C, { component?: C }>) => {
  const { pageName } = usePageName()
  return <WrappedComponent pageName={pageName} {...props} />
}

export default memo(Link)
