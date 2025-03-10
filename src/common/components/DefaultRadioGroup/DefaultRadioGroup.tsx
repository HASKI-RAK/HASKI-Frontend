import DefaultRadioGroup from '@mui/material/RadioGroup'
import { usePageName } from 'src/services/xAPI/PageName.hooks'
import { memo } from 'react'
import { EventHandlers, withXAPI } from 'react-xapi-wrapper'
import { RadioGroupProps as DefaultRadioGroupProps } from '@common/components'

// TODO: DOKU
type RadioGroupProps = DefaultRadioGroupProps & EventHandlers

// TODO: DOKU
const RadioGroup = ({ ...props }: RadioGroupProps) => {
  const { pageName } = usePageName()

  const WrappedRadioGroup = withXAPI(DefaultRadioGroup, {
    componentType: 'RadioGroup',
    componentFilePath: new URL(import.meta.url).pathname,
    pageName
  })

  return <WrappedRadioGroup {...props} />
}

export default memo(RadioGroup)
