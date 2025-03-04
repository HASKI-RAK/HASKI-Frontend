import DefaultButton from '@mui/material/Button'
import { Ref, forwardRef, useMemo } from 'react'
import { withXAPI, EventHandlers } from 'src/services/xAPI/library/withXAPI'
import { useDefaultComponent } from 'src/services/xAPI/notlib/DefaultComponent.hooks'
import {ButtonProps as DefaultButtonProps} from '@common/components' 

type ButtonProps = DefaultButtonProps & EventHandlers

const Button = forwardRef(({...props}: ButtonProps, ref: Ref<HTMLButtonElement>) => {
  const { pageName } = useDefaultComponent();

  const WrappedButton = useMemo(() => withXAPI(DefaultButton, {
    componentFilePath: new URL(import.meta.url).pathname,
    componentType: "Button",
    pageName: pageName,
  }), [pageName]);

  return <WrappedButton ref={ref} {...props}/>;
});


// eslint-disable-next-line
Button.displayName = "Button"
export default Button