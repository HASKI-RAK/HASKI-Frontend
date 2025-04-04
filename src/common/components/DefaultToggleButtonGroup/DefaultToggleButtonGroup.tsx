import DefaultToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import { usePageName } from 'src/services/PageName/PageName.hooks'
import { memo } from 'react'
import { EventHandlers, withXAPI } from 'react-xapi-wrapper'
import { ToggleButtonGroupProps as DefaultToggleButtonGroupProps } from '@common/components'

// TODO: DOKU 
type ToggleButtonGroupProps = DefaultToggleButtonGroupProps & EventHandlers

// TODO: DOKU
const WrappedToggleButtonGroup = withXAPI(DefaultToggleButtonGroup, {
  componentFilePath: new URL(import.meta.url).pathname,
  componentType: 'ToggleButtonGroup',
})

// TODO: DOKU
const ToggleButtonGroup = ({ ...props }: ToggleButtonGroupProps) => {
  const { pageName } = usePageName()
  return <WrappedToggleButtonGroup pageName={pageName} {...props} />
}

export default memo(ToggleButtonGroup)
