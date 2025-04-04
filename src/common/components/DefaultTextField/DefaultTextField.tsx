import DefaultTextField from '@mui/material/TextField'
import { usePageName } from 'src/services/PageName/PageName.hooks'
import { memo } from 'react'
import { EventHandlers, withXAPI } from 'react-xapi-wrapper'
import { TextFieldProps as DefaultTextFieldProps } from '@common/components'

// TODO: DOKU
type TextFieldProps = DefaultTextFieldProps & EventHandlers

// TODO: doku
const WrappedTextField = withXAPI(DefaultTextField, {
  componentFilePath: new URL(import.meta.url).pathname,
  componentType: 'TextField',
})

// TODO: DOKU
const TextField = ({ ...props }: TextFieldProps) => {
  const { pageName } = usePageName()
  return <WrappedTextField pageName={pageName} {...props} />
}

export default memo(TextField)
