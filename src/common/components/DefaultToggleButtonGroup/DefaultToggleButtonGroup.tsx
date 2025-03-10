import DefaultToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import { usePageName } from 'src/services/xAPI/PageName.hooks'
import { memo } from 'react'
import { EventHandlers, withXAPI } from 'react-xapi-wrapper'
import { ToggleButtonGroupProps as DefaultToggleButtonGroupProps } from '@common/components'

// TODO: DOKU 
type ToggleButtonGroupProps = DefaultToggleButtonGroupProps & EventHandlers

// TODO: DOKU
const ToggleButtonGroup = ({ ...props }: ToggleButtonGroupProps) => {
  const { pageName } = usePageName()

  const WrappedToggleButtonGroup = withXAPI(DefaultToggleButtonGroup, {
    componentFilePath: new URL(import.meta.url).pathname,
    componentType: 'ToggleButtonGroup',
    pageName
  })

  return <WrappedToggleButtonGroup {...props} />
}

export default memo(ToggleButtonGroup)
