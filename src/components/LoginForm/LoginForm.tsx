import { useTranslation } from 'react-i18next'
import { Backdrop, Button, CircularProgress, Grid, Paper, Stack, Typography } from '@common/components'
import { LoginFormHookReturn, useLoginForm as _useLoginForm } from './LoginForm.hooks'

/**
 * LoginFormProps is the type of the props object that must be passed to
 * @prop isLoading - Whether the form is loading or not.
 * @prop moodleLogin - Whether the form displays a moodle login button or not.
 * @prop onMoodleLogin - The function to be called when the moodle login button is clicked.
 * @prop useLoginForm - The hook to be used for the form logic.
 */
export type LoginFormProps = {
  onMoodleLogin?: () => void
  isLoading?: boolean
  useLoginForm?: () => LoginFormHookReturn
}
/**
 *
 * LoginForm presents a form for the user to login.
 * It can be used as a standalone component on a page. The functionality
 * comes by default, but it can be overriden by custom functions passed as described
 * in {@link LoginFormProps.useLoginForm}.
 * @param props - {@link LoginFormProps} Props containing the form logic and the form state.
 * @returns The Form component.
 * @category Components
 */
const LoginForm = ({ useLoginForm = _useLoginForm, ...props }: LoginFormProps) => {
  // Application logic hooks
  const { loginMoodle } = useLoginForm()

  // Props destructuring
  const { onMoodleLogin = loginMoodle, isLoading = false } = props

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

          {
            <Grid container sx={{ justifyContent: 'center' }} direction="column" rowSpacing={1}>
              <Grid item display="flex" justifyContent="center" md={5}>
                <Button onClick={onMoodleLogin} data-testid="moodle-login-button" variant="contained" id="login-button">
                  <img
                    alt="Haski-logo-in-white"
                    src="/LogoHaskiWhite.png"
                    style={{ width: '30px' }}
                    className="MuiAvatar-img css-1pqm26d-MuiAvatar-img"
                  />
                  <Typography variant="h6" component="h2" marginLeft={'10px'}>
                    {t('components.LoginForm.loginButton')}
                  </Typography>
                </Button>
              </Grid>
            </Grid>
          }
        </Stack>
        <Backdrop open={isLoading}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </Paper>
    </Stack>
  )
}

export default LoginForm
