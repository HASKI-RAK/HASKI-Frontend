import DefaultRadioGroup from '@mui/material/RadioGroup'
import { usePageName } from 'src/services/PageName/PageName.hooks'
import { memo } from 'react'
import { EventHandlers, withXAPI } from 'react-xapi-wrapper'
import { RadioGroupProps as DefaultRadioGroupProps } from '@common/components'

// TODO: DOKU
type RadioGroupProps = DefaultRadioGroupProps & EventHandlers

// TODO: DOku
const WrappedRadioGroup = withXAPI(DefaultRadioGroup, {
  componentType: 'RadioGroup',
  componentFilePath: new URL(import.meta.url).pathname,
})

// TODO: DOKU
const RadioGroup = ({ ...props }: RadioGroupProps) => {
  const { pageName } = usePageName()
  return <WrappedRadioGroup pageName={pageName} {...props} />
}

export default memo(RadioGroup)
