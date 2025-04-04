import DefaultStepButton from '@mui/material/StepButton'
import { usePageName } from 'src/services/PageName/PageName.hooks'
import { memo } from 'react'
import { EventHandlers, withXAPI } from 'react-xapi-wrapper'
import { StepButtonProps as DefaultStepButtonProps } from '@common/components'

// TODO: DOKU
type StepButtonProps = DefaultStepButtonProps & EventHandlers

// TODO: doku
const WrappedStepButton = withXAPI(DefaultStepButton, {
  componentFilePath: new URL(import.meta.url).pathname,
  componentType: 'StepButton'
})

// TODO: DOKU
const StepButton = ({ ...props }: StepButtonProps) => {
  const { pageName } = usePageName()
  return <WrappedStepButton pageName={pageName} {...props} />
}

export default memo(StepButton)
