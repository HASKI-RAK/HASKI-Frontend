import DefaultStepButton from '@mui/material/StepButton'
import { usePageName } from 'src/services/xAPI/PageName.hooks'
import { memo } from 'react'
import { EventHandlers, withXAPI } from 'react-xapi-wrapper'
import { StepButtonProps as DefaultStepButtonProps } from '@common/components'

// TODO: DOKU
type StepButtonProps = DefaultStepButtonProps & EventHandlers

// TODO: DOKU
const StepButton = ({ ...props }: StepButtonProps) => {
  const { pageName } = usePageName()

  const WrappedComponent = withXAPI(DefaultStepButton, {
    componentFilePath: new URL(import.meta.url).pathname,
    pageName,
    componentType: 'StepButton'
  })

  return <WrappedComponent {...props} />
}

export default memo(StepButton)
