import { Backdrop, Button, CircularProgress, Paper, Grid, Typography, Stack } from '@common/components'
import { useLoginForm as _useLoginForm, LoginFormHookReturn } from './LoginForm.hooks'
import { useTranslation } from 'react-i18next'

/**
 * LoginFormProps is the type of the props object that must be passed to
 * @prop onSubmit - The function to be called when the form is submitted.
 * @prop onValidate - The function to be called when the form is validated.
 * @prop usernameDefaultValue - The default value for the username field.
 * @prop isLoading - Whether the form is loading or not.
 * @prop moodleLogin - Whether the form displays a moodle login button or not.
 * @prop onMoodleLogin - The function to be called when the moodle login button is clicked.
 * @prop useLoginForm - The hook to be used for the form logic.
 */
export type LoginFormProps = {
  onMoodleLogin?: () => void
  isLoading?: boolean
  moodleLogin?: boolean
  useLoginForm?: () => LoginFormHookReturn
}
/**
 *
 * LoginForm presents a form for the user to login.
 * It can be used as a standalone component on a page. The functionality
 * comes by default, but it can be overriden by custom functions passed as described
 * in {@link LoginFormProps.useLoginForm} or {@link LoginFormProps.onSubmit} and {@link LoginFormProps.onValidate}.
 * @param props - {@link LoginFormProps} Props containing the form logic and the form state.
 * @returns The Form component.
 * @category Components
 */
const LoginForm = ({ useLoginForm = _useLoginForm, ...props }: LoginFormProps) => {
  // Application logic hooks
  const { loginMoodle } = useLoginForm()

  // Props destructuring
  const { onMoodleLogin = loginMoodle, isLoading = false, moodleLogin = false } = props

  // Translation
  const { t } = useTranslation()

  return (
    <Stack justifyContent="center" alignItems="center">
      <Paper elevation={3}>
        <Stack direction="column" justifyContent="center" alignItems="center" margin={2} spacing={2}>
          <Typography variant="h4" component="h1" gutterBottom>
            {t('components.LoginForm.title')}
          </Typography>
          <Typography variant="h6" component="h2" gutterBottom maxWidth={400} align={'center'}>
            {t('components.LoginForm.subtitle')}
          </Typography>

          {moodleLogin && (
            <Grid container sx={{ justifyContent: 'center' }} direction="column" rowSpacing={1}>
              <Grid item display="flex" justifyContent="center" md={5}>
                <Button onClick={onMoodleLogin} data-testid="moodle-login-button" variant="contained">
                  <img src="/path12.png" alt="Haski" style={{ width: '30px' }} />
                  {
                    <Typography variant="h6" component="h2" marginLeft={'10px'}>
                      {t('components.LoginForm.loginButton')}
                    </Typography>
                  }
                </Button>
              </Grid>
            </Grid>
          )}
        </Stack>
        <Backdrop open={isLoading}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </Paper>
    </Stack>
  )
}

export default LoginForm
