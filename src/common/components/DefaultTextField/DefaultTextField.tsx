import DefaultTextField from '@mui/material/TextField'
import { usePageName } from 'src/services/xAPI/PageName.hooks'
import { memo } from 'react'
import { EventHandlers, withXAPI } from 'react-xapi-wrapper'
import { TextFieldProps as DefaultTextFieldProps } from '@common/components'

// TODO: DOKU
type TextFieldProps = DefaultTextFieldProps & EventHandlers

// TODO: DOKU
const TextField = ({ ...props }: TextFieldProps) => {
  const { pageName } = usePageName()

  const WrappedTextField = withXAPI(DefaultTextField, {
    componentFilePath: new URL(import.meta.url).pathname,
    componentType: 'TextField',
    pageName
  })

  return <WrappedTextField {...props} />
}

export default memo(TextField)
